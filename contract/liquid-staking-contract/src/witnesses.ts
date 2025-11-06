import { Ledger } from "./managed/lp-protocol/contract/index.cjs";
import { WitnessContext } from "@midnight-ntwrk/compact-runtime";

export type LsPrivateState = {
  readonly secretKey: Uint8Array;
};

export const createLsPrivateState = (secretKey: Uint8Array) => ({
  secretKey,
});

export const witnesses = {
  local_secret_key: (
    state: WitnessContext<Ledger, LsPrivateState>
  ): [LsPrivateState, Uint8Array] => {
    state.privateState.secretKey;
    return [state.privateState, state.privateState.secretKey];
  },
  generateStakeId: ({
    privateState,
  }: WitnessContext<Ledger, LsPrivateState>): [LsPrivateState, Uint8Array] => {
    const newBytes = new Uint8Array(32);
    crypto.getRandomValues(newBytes);
    return [privateState, newBytes];
  },
  getTime: ({
    privateState,
  }: WitnessContext<Ledger, LsPrivateState>): [LsPrivateState, bigint] => {
    const currentTime = BigInt(Date.now());
    return [privateState, currentTime];
  },
  getTotalValue: (
    { privateState }: WitnessContext<Ledger, LsPrivateState>,
    amount: bigint,
    time: bigint
  ): [LsPrivateState, bigint] => {
    const PERCENTAGE_PER_DAY = 0.1; //dummy daily increment of our TVL
    // const duration = CALC THE DURATION ADN MULTIPLY IT BY THE PPD

    return [privateState, 1n];
  },
};
