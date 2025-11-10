import { toHex } from "@midnight-ntwrk/midnight-js-utils";
import type { StakesInfoType } from "./common-types";
export const randomNonceBytes = (length: number): Uint8Array => {
  const newBytes = new Uint8Array(length);
  crypto.getRandomValues(newBytes);
  return newBytes;
};

export function stringTo32ByteArray(input: string): Uint8Array {
  // Create a new 32-byte array filled with zeros
  const result = new Uint8Array(32);
  // Convert string to UTF-8 bytes
  const encoder = new TextEncoder();
  const encoded = encoder.encode(input);
  const copyLength = Math.min(encoded.length, 32);
  result.set(encoded.subarray(0, copyLength));

  return result;
}

export const getStakesInfo = (stakes: {
  isEmpty(): boolean;
  size(): bigint;
  member(key_0: Uint8Array): boolean;
  lookup(key_0: Uint8Array): {
    staker: Uint8Array;
    stakedAmount: bigint;
    status: number;
    stakeTime: bigint;
    closedTime: bigint;
  };
  [Symbol.iterator](): Iterator<
    [
      Uint8Array,
      {
        staker: Uint8Array;
        stakedAmount: bigint;
        status: number;
        stakeTime: bigint;
        closedTime: bigint;
      },
    ]
  >;
}): StakesInfoType[] => {
  const allStakes: StakesInfoType[] = [];

  for (const [key, stake] of stakes) {
    allStakes.push({
      stakeId: toHex(key),
      staker: toHex(stake.staker),
      stakedAmount: Number(stake.stakedAmount),
      status: stake.status === 0 ? "open" : "closed",
      stakeTime: Number(stake.stakeTime),
      closedTime: Number(stake.closedTime),
    });
  }

  return allStakes;
};
