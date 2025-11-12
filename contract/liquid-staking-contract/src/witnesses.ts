import {
  Ledger,
  QualifiedCoinInfo,
  StakePrivateState,
} from "./managed/hydra-stake-protocol/contract/index.cjs";
import { WitnessContext } from "@midnight-ntwrk/compact-runtime";

export type HydraStakePrivateState = {
  readonly secretKey: Uint8Array;
  readonly stakeMetadata: StakePrivateState;
};

export interface LedgerMapItem<T> {
  key: Uint8Array; // User public key
  state: T; // Diff. stake with specific coin
}

export interface LedgerMap<T> {
  isEmpty(): boolean;
  size(): bigint;
  member(key_0: Uint8Array<ArrayBufferLike>): boolean;
  lookup(key_0: Uint8Array): T;
  [Symbol.iterator](): Iterator<[Uint8Array, T]>;
}

export const createArrayFromMapping = <T>(
  mapping: LedgerMap<T>
): LedgerMapItem<T>[] => {
  return Array.from(mapping).map(([key, state]) => ({
    key: key,
    state: state,
  }));
};

export const createHydraStakePrivateState = (
  secretKey: Uint8Array
): HydraStakePrivateState => ({
  secretKey,
  stakeMetadata: {
    deposit_amount: 0n,
    stAssets_minted: 0n,
    redeemable: 0n,
  },
});

export const witnesses = {
  secrete_key: (
    state: WitnessContext<Ledger, HydraStakePrivateState>
  ): [HydraStakePrivateState, Uint8Array] => {
    state.privateState.secretKey;
    return [state.privateState, state.privateState.secretKey];
  },
  divide: (
    { privateState }: WitnessContext<Ledger, HydraStakePrivateState>,
    numerator: bigint, //Scalled by 1_000_000n
    denominator: bigint //Scalled by 1_000_000n
  ): [HydraStakePrivateState, [bigint, bigint]] => {
    if (numerator == 0n) throw new Error("Invalid division arithemetics");
    const quotient = numerator / denominator;
    const remainder = numerator % denominator;

    return [privateState, [quotient, remainder]];
  },

  get_stake_private_state: ({
    privateState,
  }: WitnessContext<Ledger, HydraStakePrivateState>): [
    HydraStakePrivateState,
    StakePrivateState,
  ] => {
    return [privateState, privateState.stakeMetadata];
  },

  update_stake_private_state: (
    { privateState }: WitnessContext<Ledger, HydraStakePrivateState>,
    metadata: StakePrivateState
  ): [HydraStakePrivateState, []] => {
    const newPrivateState = {
      ...privateState,
      stakeMetadata: {
        ...privateState.stakeMetadata,
        ...metadata,
      },
    };
    return [newPrivateState, []];
  },

  get_current_time: ({
    privateState,
  }: WitnessContext<Ledger, HydraStakePrivateState>): [
    HydraStakePrivateState,
    bigint,
  ] => {
    return [privateState, BigInt(Date.now())];
  },

  /** Test delegation functionality
   * Interact with backend API which provide back dlegagtion funds
   * Receive response and then exit the witness
   */
  call_backend_for_delegation: (
    { privateState }: WitnessContext<Ledger, HydraStakePrivateState>,
    delegate_amount: bigint
  ): [HydraStakePrivateState, boolean] => {
    try {
      const response = fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pool_stake_amount: Number(delegate_amount) }),
      });
      return [privateState, true];
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  },
};
