import {
  Contract,
  type HydraStakePrivateState,
  type Witnesses,
  StakePoolStatus,
  StakeStatus,
} from "@repo/hydra-stake-protocol";
import type {
  DeployedContract,
  FoundContract,
} from "@midnight-ntwrk/midnight-js-contracts";
import type {
  ImpureCircuitId,
  MidnightProviders,
} from "@midnight-ntwrk/midnight-js-types";
import type {
  DAppConnectorWalletAPI,
  ServiceUriConfig,
} from "@midnight-ntwrk/dapp-connector-api";
import type { HydraStakeAPI } from "./index";
import type { ContractAddress } from "@midnight-ntwrk/zswap";

export interface WalletAndProvider {
  readonly wallet: DAppConnectorWalletAPI;
  readonly uris: ServiceUriConfig;
  readonly providers: HydraStakeContractProvider;
}
export const HydraStakePrivateStateKey: string = "HydraStakePrivateState";

export type HydraStakeContract = Contract<
  HydraStakePrivateState,
  Witnesses<HydraStakePrivateState>
>;

export type HydraStakeCircuits = ImpureCircuitId<
  Contract<HydraStakePrivateState>
>;

export type HydraStakeCircuitKeys = Exclude<
  keyof HydraStakeContract["impureCircuits"],
  number | symbol
>;

export type HydraStakeContractProvider = MidnightProviders<
  HydraStakeCircuits,
  typeof HydraStakePrivateStateKey,
  HydraStakePrivateState
>;

export type DeployedHydraStakeContract =
  | FoundContract<HydraStakeContract>
  | DeployedContract<HydraStakeContract>;

export interface WalletAndProvider {
  readonly wallet: DAppConnectorWalletAPI;
  readonly uris: ServiceUriConfig;
  readonly providers: HydraStakeContractProvider;
}

export interface WalletAPI {
  wallet: DAppConnectorWalletAPI;
  coinPublicKey: string;
  encryptionPublicKey: string;
  uris: ServiceUriConfig;
}

export interface HydraStakeDeployment {
  status: "inprogress" | "deployed" | "failed";
  api: HydraStakeAPI;
}

export interface StakesInfoType {
  stakeId: string;
  staker: string;
  stakedAmount: number;
  status: "open" | "closed";
  stakeTime: number;
  closedTime: number;
}

export type PoolType = Array<[ContractAddress, string]>;

export type LedgerInfo = {
  userPk: string;
  total_stAsset_Minted: number;
  total_rewards_accrued: number;
  total_stake_withdrawn: number;
  protocolTVL: number;
  stakePoolStatus: StakePoolStatus;
  stakings: Stakes;
  admins: string[];
  assetCoinColor: string;
  SCALE_FACTOR: number;
};

export type Stakes = Array<
  [
    string,
    {
      stakeId: string;
      stakeHash: string;
      status: StakeStatus;
      createAt: number;
    },
  ]
>;

export type DeploymentParams = {
  ValidAssetCoinType: string;
  MintDomain: string;
  DelegationContractAddress: string;
  ScaleFactor: number;
};
