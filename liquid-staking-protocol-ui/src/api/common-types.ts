import {
  Contract,
  type HydraStakePrivateState,
  type Witnesses,
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
import type { DeployedHydraStakeAPI, HydraStakeAPI } from "./index";

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
  FoundContract<HydraStakeContract>;

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

export type DerivedState = {
  stakes: StakesInfoType[];
  userSecretKey: string;
};
