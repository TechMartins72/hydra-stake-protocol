import { map, Observable, combineLatest, from } from "rxjs";
import {
  createHydraStakePrivateState,
  type HydraStakePrivateState,
  Contract,
  ledger,
  witnesses,
  pureCircuits,
  type Ledger,
  type CoinInfo,
} from "@repo/hydra-stake-protocol";
import {
  type DeployedHydraStakeContract,
  type DerivedState,
  type HydraStakeContract,
  type HydraStakeContractProvider,
  HydraStakePrivateStateKey,
} from "./common-types.js";
import { toHex } from "@midnight-ntwrk/midnight-js-utils";
import {
  getStakesInfo,
  randomNonceBytes,
  stringTo32ByteArray,
} from "./utils.js";
import {
  encodeTokenType,
  type ContractAddress,
} from "@midnight-ntwrk/compact-runtime";
import {
  deployContract,
  findDeployedContract,
  type FinalizedCallTxData,
} from "@midnight-ntwrk/midnight-js-contracts";
import { nativeToken } from "@midnight-ntwrk/ledger";

const HydraStakeContractInstance: HydraStakeContract = new Contract(witnesses);

export interface DeployedHydraStakeAPI {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<DerivedState>;
}

export class HydraStakeAPI implements DeployedHydraStakeAPI {
  public readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<DerivedState>;

  private constructor(
    providers: HydraStakeContractProvider,
    public readonly deployedContract: DeployedHydraStakeContract
  ) {
    this.deployedContractAddress =
      deployedContract.deployTxData.public.contractAddress;
    this.state$ = combineLatest(
      [
        // Combine public (ledger) state with...
        providers.publicDataProvider
          .contractStateObservable(this.deployedContractAddress, {
            type: "all",
          })
          .pipe(map((contractState) => ledger(contractState.data))),
        from(
          providers.privateStateProvider.get(
            HydraStakePrivateStateKey
          ) as Promise<HydraStakePrivateState>
        ),
      ],
      // ...and combine them to produce the required derived state.
      (ledgerState, privateState) => {
        const user_pk = toHex(pureCircuits(privateState.secretKey));

        return {
          stakes: getStakesInfo(ledgerState.stakes),
          userSecretKey: user_pk,
        };
      }
    );
  }

  static deployHydraStakeContract = async (
    providers: HydraStakeContractProvider
  ) => {
    try {
      let deployedHydraStakeContract = await deployContract<HydraStakeContract>(
        providers,
        {
          contract: HydraStakeContractInstance,
          initialPrivateState: await this.getPrivateState(providers),
          privateStateId: HydraStakePrivateStateKey,
          args: [randomNonceBytes(32)],
        }
      );
      console.log("Contract Deployed");

      return new HydraStakeAPI(providers, deployedHydraStakeContract);
    } catch (error) {
      throw error;
    }
  };

  static joinHydraStakeContract = async (
    providers: HydraStakeContractProvider,
    contractAddress: ContractAddress
  ) => {
    try {
      console.log("Joining Contract");
      let deployedHydraStakeContract =
        await findDeployedContract<HydraStakeContract>(providers, {
          contractAddress,
          contract: HydraStakeContractInstance,
          privateStateId: HydraStakePrivateStateKey,
          initialPrivateState: await this.getPrivateState(providers),
        });
      return new HydraStakeAPI(providers, deployedHydraStakeContract);
    } catch (error) {
      console.log({ error });
    }
  };

  static async stakeAsset(
    amount: number,
    deployedContract: DeployedHydraStakeContract
  ): Promise<FinalizedCallTxData<HydraStakeContract, "stake">> {
    const coin: CoinInfo = {
      nonce: randomNonceBytes(32),
      color: encodeTokenType(nativeToken()),
      value: BigInt(amount),
    };

    return await deployedContract.callTx.stake(coin);
  }

  static async redeemAsset(
    color: string,
    amount: number,
    stakeId: string,
    deployedContract: DeployedHydraStakeContract
  ): Promise<FinalizedCallTxData<HydraStakeContract, "redeem">> {
    const coin = {
      nonce: randomNonceBytes(32),
      color: encodeTokenType(color),
      value: BigInt(amount),
    };

    return await deployedContract.callTx.redeem(
      coin,
      stringTo32ByteArray(stakeId)
    );
  }

  private static async getPrivateState(
    providers: HydraStakeContractProvider
  ): Promise<HydraStakePrivateState> {
    const existingPrivateState = await providers.privateStateProvider.get(
      HydraStakePrivateStateKey
    );
    return (
      existingPrivateState ?? createHydraStakePrivateState(randomNonceBytes(32))
    );
  }

  static getHydraStakeState = (
    providers: HydraStakeContractProvider,
    contractAddress: ContractAddress
  ): Promise<Ledger | null> =>
    providers.publicDataProvider
      .queryContractState(contractAddress)
      .then((contractState) =>
        contractState != null ? ledger(contractState.data) : null
      );
}

export * from "./common-types.js";
export * from "./utils.js";
