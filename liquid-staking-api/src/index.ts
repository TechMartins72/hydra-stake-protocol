import { map, Observable, combineLatest, from } from "rxjs";
import {
  createLiquidStakingPrivateState,
  type LiquidStakingPrivateState,
  Contract,
  ledger,
  witnesses,
  pureCircuits,
  type Ledger,
  type CoinInfo,
} from "@repo/liquid-staking-protocol-contract";
import {
  type DeployedLiquidStakingContract,
  type DerivedState,
  type LiquidStakingContract,
  type LiquidStakingContractProvider,
  LiquidStakingPrivateStateKey,
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

const LiquidStakingContractInstance: LiquidStakingContract = new Contract(
  witnesses
);

export interface DeployedLiquidStakingAPI {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<DerivedState>;
}

export class LiquidStakingAPI implements DeployedLiquidStakingAPI {
  public readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<DerivedState>;

  private constructor(
    providers: LiquidStakingContractProvider,
    public readonly deployedContract: DeployedLiquidStakingContract
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
            LiquidStakingPrivateStateKey
          ) as Promise<LiquidStakingPrivateState>
        ),
      ],
      // ...and combine them to produce the required derived state.
      (ledgerState, privateState) => {
        const user_pk = toHex(pureCircuits.public_key(privateState.secretKey));

        return {
          stakes: getStakesInfo(ledgerState.stakes),
          userSecretKey: user_pk,
        };
      }
    );
  }

  static deployLiquidStakingContract = async (
    providers: LiquidStakingContractProvider
  ) => {
    try {
      let deployedLiquidStakingContract =
        await deployContract<LiquidStakingContract>(providers, {
          contract: LiquidStakingContractInstance,
          initialPrivateState: await this.getPrivateState(providers),
          privateStateId: LiquidStakingPrivateStateKey,
          args: [randomNonceBytes(32)],
        });
      console.log("Contract Deployed");

      return new LiquidStakingAPI(providers, deployedLiquidStakingContract);
    } catch (error) {
      throw error;
    }
  };

  static joinLiquidStakingContract = async (
    providers: LiquidStakingContractProvider,
    contractAddress: ContractAddress
  ) => {
    try {
      console.log("Joining Contract");
      let deployedLiquidStakingContract =
        await findDeployedContract<LiquidStakingContract>(providers, {
          contractAddress,
          contract: LiquidStakingContractInstance,
          privateStateId: LiquidStakingPrivateStateKey,
          initialPrivateState: await this.getPrivateState(providers),
        });
      return new LiquidStakingAPI(providers, deployedLiquidStakingContract);
    } catch (error) {
      console.log({ error });
    }
  };

  static async stakeAsset(
    amount: number,
    deployedContract: DeployedLiquidStakingContract
  ): Promise<FinalizedCallTxData<LiquidStakingContract, "stakeAsset">> {
    const coin: CoinInfo = {
      nonce: randomNonceBytes(32),
      color: encodeTokenType(nativeToken()),
      value: BigInt(amount),
    };

    return await deployedContract.callTx.stakeAsset(coin);
  }

  static async redeemAsset(
    color: string,
    amount: number,
    stakeId: string,
    deployedContract: DeployedLiquidStakingContract
  ): Promise<FinalizedCallTxData<LiquidStakingContract, "redeemAsset">> {
    const coin = {
      nonce: randomNonceBytes(32),
      color: encodeTokenType(color),
      value: BigInt(amount),
    };

    return await deployedContract.callTx.redeemAsset(
      coin,
      stringTo32ByteArray(stakeId)
    );
  }

  private static async getPrivateState(
    providers: LiquidStakingContractProvider
  ): Promise<LiquidStakingPrivateState> {
    const existingPrivateState = await providers.privateStateProvider.get(
      LiquidStakingPrivateStateKey
    );
    return (
      existingPrivateState ??
      createLiquidStakingPrivateState(randomNonceBytes(32))
    );
  }

  static getLiquidStakingState = (
    providers: LiquidStakingContractProvider,
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
