import { Ledger } from "./managed/liquid-staking-protocol/contract/index.cjs";
import { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import { v4 as uuidv4 } from "uuid";

export type HydraStakePrivateState = {
  readonly secretKey: Uint8Array;
};

export const createHydraStakePrivateState = (secretKey: Uint8Array) => ({
  secretKey,
});

export const witnesses = {
  local_secret_key: (
    state: WitnessContext<Ledger, HydraStakePrivateState>
  ): [HydraStakePrivateState, Uint8Array] => {
    state.privateState.secretKey;
    return [state.privateState, state.privateState.secretKey];
  },
  generateStakeId: ({
    privateState,
  }: WitnessContext<Ledger, HydraStakePrivateState>): [
    HydraStakePrivateState,
    Uint8Array,
  ] => {
    const randomId = uuidv4().replace(/-/g, "");
    const encoder = new TextEncoder();
    const encoded = encoder.encode(randomId);
    const stakeId = encoded.slice(0, 32);
    return [privateState, stakeId];
  },
  getTime: ({
    privateState,
  }: WitnessContext<Ledger, HydraStakePrivateState>): [
    HydraStakePrivateState,
    bigint,
  ] => {
    const currentTime = BigInt(Date.now());
    return [privateState, currentTime];
  },
  getTotalValue: (
    { privateState }: WitnessContext<Ledger, HydraStakePrivateState>,
    amount: bigint,
    time: bigint
  ): [HydraStakePrivateState, bigint] => {
    return [privateState, amount];
  },
};
