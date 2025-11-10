import {
  Contract,
  type LiquidStakingPrivateState,
  type Witnesses,
} from "@repo/liquid-staking-protocol-contract";
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
import type { DeployedLiquidStakingAPI, LiquidStakingAPI } from "./index";

export interface WalletAndProvider {
  readonly wallet: DAppConnectorWalletAPI;
  readonly uris: ServiceUriConfig;
  readonly providers: LiquidStakingContractProvider;
}
export const LiquidStakingPrivateStateKey: string = "LiquidStakingPrivateState";

export type LiquidStakingContract = Contract<
  LiquidStakingPrivateState,
  Witnesses<LiquidStakingPrivateState>
>;

export type LiquidStakingCircuits = ImpureCircuitId<
  Contract<LiquidStakingPrivateState>
>;

export type LiquidStakingCircuitKeys = Exclude<
  keyof LiquidStakingContract["impureCircuits"],
  number | symbol
>;

export type LiquidStakingContractProvider = MidnightProviders<
  LiquidStakingCircuits,
  typeof LiquidStakingPrivateStateKey,
  LiquidStakingPrivateState
>;

export type DeployedLiquidStakingContract =
  FoundContract<LiquidStakingContract>;

export interface WalletAndProvider {
  readonly wallet: DAppConnectorWalletAPI;
  readonly uris: ServiceUriConfig;
  readonly providers: LiquidStakingContractProvider;
}

export interface WalletAPI {
  wallet: DAppConnectorWalletAPI;
  coinPublicKey: string;
  encryptionPublicKey: string;
  uris: ServiceUriConfig;
}

export interface LiquidStakingDeployment {
  status: "inprogress" | "deployed" | "failed";
  api: LiquidStakingAPI;
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
