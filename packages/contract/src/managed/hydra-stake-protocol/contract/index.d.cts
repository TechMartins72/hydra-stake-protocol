import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type StakePrivateState = { stAssets_minted: bigint;
                                  deposit_amount: bigint;
                                  redeemable: bigint
                                };

export type Stake = { staker_id: Uint8Array;
                      stake_hash: Uint8Array;
                      created_at: bigint;
                      status: StakeStatus
                    };

export enum StakeStatus { open = 0, closed = 1 }

export type QualifiedCoinInfo = { nonce: Uint8Array;
                                  color: Uint8Array;
                                  value: bigint;
                                  mt_index: bigint
                                };

export type CoinInfo = { nonce: Uint8Array; color: Uint8Array; value: bigint };

export enum StakePoolStatus { available = 0, delegated = 1 }

export type Witnesses<T> = {
  get_stake_private_state(context: __compactRuntime.WitnessContext<Ledger, T>): [T, StakePrivateState];
  update_stake_private_state(context: __compactRuntime.WitnessContext<Ledger, T>,
                             metadata_0: StakePrivateState): [T, []];
  divide(context: __compactRuntime.WitnessContext<Ledger, T>,
         numerator_0: bigint,
         denominator_0: bigint): [T, [bigint, bigint]];
  secrete_key(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Uint8Array];
  get_current_time(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint];
  call_backend_for_delegation(context: __compactRuntime.WitnessContext<Ledger, T>,
                              amount_0: bigint,
                              contractAddress_0: Uint8Array): [T, boolean];
}

export type ImpureCircuits<T> = {
  delegate(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, boolean>;
  addNewAdmin(context: __compactRuntime.CircuitContext<T>,
              adminCpk_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  setTokenColor(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  removeNewAdmin(context: __compactRuntime.CircuitContext<T>,
                 adminCpk_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  stake(context: __compactRuntime.CircuitContext<T>, stakeCoin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  redeem(context: __compactRuntime.CircuitContext<T>, mintedCoin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  recieveDelegateReward(context: __compactRuntime.CircuitContext<T>,
                        coin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  delegate(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, boolean>;
  addNewAdmin(context: __compactRuntime.CircuitContext<T>,
              adminCpk_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  setTokenColor(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  removeNewAdmin(context: __compactRuntime.CircuitContext<T>,
                 adminCpk_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  stake(context: __compactRuntime.CircuitContext<T>, stakeCoin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  redeem(context: __compactRuntime.CircuitContext<T>, mintedCoin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  recieveDelegateReward(context: __compactRuntime.CircuitContext<T>,
                        coin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
}

export type Ledger = {
  readonly total_stAsset_Minted: bigint;
  readonly total_rewards_accrued: bigint;
  readonly total_stake_withdrawn: bigint;
  readonly protocolTVL: QualifiedCoinInfo;
  readonly stakePoolStatus: StakePoolStatus;
  stakings: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Stake;
    [Symbol.iterator](): Iterator<[Uint8Array, Stake]>
  };
  readonly validAssetCoinType: Uint8Array;
  readonly superAdmin: Uint8Array;
  admins: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  readonly stAssetCoinColor: Uint8Array;
  readonly delegationContractAddress: Uint8Array;
  readonly stAssetDomainSeparator: Uint8Array;
  readonly SCALE_FACTOR: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>,
               initialNonce_0: Uint8Array,
               initValidAssetCoinType_0: Uint8Array,
               initMintDomain_0: Uint8Array,
               initDelegationContractAddress_0: Uint8Array,
               initScaleFactor_0: bigint): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
