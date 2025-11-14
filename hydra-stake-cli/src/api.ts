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
  type DeploymentParams,
  type HydraStakeContract,
  type HydraStakeContractProvider,
  HydraStakePrivateStateKey,
  type LedgerInfo,
} from "./common-types.js";
import {
  getLedgerRefinedData,
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
  readonly state$: Observable<LedgerInfo>;
}

export class HydraStakeAPI implements DeployedHydraStakeAPI {
  public readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<LedgerInfo>;

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
      (publicState, privateState) => {
        const userPk = pureCircuits.generateStakerId(privateState.secretKey);
        return getLedgerRefinedData(publicState, userPk);
      }
    );
  }

  static deployHydraStakePool = async (
    walletAddress: string,
    providers: HydraStakeContractProvider,
    deploymentParams: DeploymentParams
  ) => {
    try {
      let deployedHydraStakeContract = await deployContract<HydraStakeContract>(
        providers,
        {
          contract: HydraStakeContractInstance,
          initialPrivateState: await this.getPrivateState(providers),
          privateStateId: HydraStakePrivateStateKey,
          args: [
            randomNonceBytes(32),
            encodeTokenType(deploymentParams.ValidAssetCoinType),
            stringTo32ByteArray(deploymentParams.MintDomain),
            stringTo32ByteArray(deploymentParams.DelegationContractAddress),
            BigInt(deploymentParams.ScaleFactor),
            stringTo32ByteArray(walletAddress),
          ],
        }
      );
      console.log("Contract Deployed");

      return new HydraStakeAPI(providers, deployedHydraStakeContract);
    } catch (error) {
      throw error;
    }
  };

  static joinHydraStakePool = async (
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
    deployedContract: DeployedHydraStakeContract
  ): Promise<FinalizedCallTxData<HydraStakeContract, "redeem">> {
    const coin: CoinInfo = {
      nonce: randomNonceBytes(32),
      color: encodeTokenType(color),
      value: BigInt(amount),
    };

    return await deployedContract.callTx.redeem(coin);
  }

  // static async setTokenColor(
  //   deployedContract: DeployedHydraStakeContract
  // ): Promise<FinalizedCallTxData<HydraStakeContract, "setTokenColor">> {
  //   return await deployedContract.callTx.setTokenColor();
  // }

  // static async addAdmin(
  //   userCPK: Uint8Array,
  //   deployedContract: DeployedHydraStakeContract
  // ): Promise<FinalizedCallTxData<HydraStakeContract, "addNewAdmin">> {
  //   return await deployedContract.callTx.addNewAdmin(userCPK);
  // }

  // static async removeAdmin(
  //   userCPK: Uint8Array,
  //   deployedContract: DeployedHydraStakeContract
  // ): Promise<FinalizedCallTxData<HydraStakeContract, "removeNewAdmin">> {
  //   return await deployedContract.callTx.removeNewAdmin(userCPK);
  // }

  static async getPrivateState(
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
