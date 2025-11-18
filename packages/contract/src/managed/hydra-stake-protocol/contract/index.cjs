'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.8.1';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

var StakeStatus;
(function (StakeStatus) {
  StakeStatus[StakeStatus['open'] = 0] = 'open';
  StakeStatus[StakeStatus['closed'] = 1] = 'closed';
})(StakeStatus = exports.StakeStatus || (exports.StakeStatus = {}));

var StakePoolStatus;
(function (StakePoolStatus) {
  StakePoolStatus[StakePoolStatus['available'] = 0] = 'available';
  StakePoolStatus[StakePoolStatus['delegated'] = 1] = 'delegated';
})(StakePoolStatus = exports.StakePoolStatus || (exports.StakePoolStatus = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

const _descriptor_1 = new __compactRuntime.CompactTypeEnum(1, 1);

const _descriptor_2 = new __compactRuntime.CompactTypeBytes(32);

class _CoinInfo_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_2.fromValue(value_0),
      color: _descriptor_2.fromValue(value_0),
      value: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.nonce).concat(_descriptor_2.toValue(value_0.color).concat(_descriptor_0.toValue(value_0.value)));
  }
}

const _descriptor_3 = new _CoinInfo_0();

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_5 = new __compactRuntime.CompactTypeEnum(1, 1);

class _Stake_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_4.alignment().concat(_descriptor_5.alignment())));
  }
  fromValue(value_0) {
    return {
      staker_id: _descriptor_2.fromValue(value_0),
      stake_hash: _descriptor_2.fromValue(value_0),
      created_at: _descriptor_4.fromValue(value_0),
      status: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.staker_id).concat(_descriptor_2.toValue(value_0.stake_hash).concat(_descriptor_4.toValue(value_0.created_at).concat(_descriptor_5.toValue(value_0.status))));
  }
}

const _descriptor_6 = new _Stake_0();

const _descriptor_7 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_8 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

class _QualifiedCoinInfo_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_2.fromValue(value_0),
      color: _descriptor_2.fromValue(value_0),
      value: _descriptor_0.fromValue(value_0),
      mt_index: _descriptor_4.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.nonce).concat(_descriptor_2.toValue(value_0.color).concat(_descriptor_0.toValue(value_0.value).concat(_descriptor_4.toValue(value_0.mt_index))));
  }
}

const _descriptor_9 = new _QualifiedCoinInfo_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_2.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.bytes);
  }
}

const _descriptor_10 = new _ContractAddress_0();

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_2.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.bytes);
  }
}

const _descriptor_11 = new _ZswapCoinPublicKey_0();

class _Either_0 {
  alignment() {
    return _descriptor_7.alignment().concat(_descriptor_11.alignment().concat(_descriptor_10.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_7.fromValue(value_0),
      left: _descriptor_11.fromValue(value_0),
      right: _descriptor_10.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_7.toValue(value_0.is_left).concat(_descriptor_11.toValue(value_0.left).concat(_descriptor_10.toValue(value_0.right)));
  }
}

const _descriptor_12 = new _Either_0();

class _StakePrivateState_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment()));
  }
  fromValue(value_0) {
    return {
      stAssets_minted: _descriptor_4.fromValue(value_0),
      deposit_amount: _descriptor_4.fromValue(value_0),
      redeemable: _descriptor_4.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.stAssets_minted).concat(_descriptor_4.toValue(value_0.deposit_amount).concat(_descriptor_4.toValue(value_0.redeemable)));
  }
}

const _descriptor_13 = new _StakePrivateState_0();

const _descriptor_14 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

class _tuple_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_4.alignment());
  }
  fromValue(value_0) {
    return [
      _descriptor_4.fromValue(value_0),
      _descriptor_4.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0[0]).concat(_descriptor_4.toValue(value_0[1]));
  }
}

const _descriptor_15 = new _tuple_0();

class _Maybe_0 {
  alignment() {
    return _descriptor_7.alignment().concat(_descriptor_3.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_7.fromValue(value_0),
      value: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_7.toValue(value_0.is_some).concat(_descriptor_3.toValue(value_0.value));
  }
}

const _descriptor_16 = new _Maybe_0();

class _SendResult_0 {
  alignment() {
    return _descriptor_16.alignment().concat(_descriptor_3.alignment());
  }
  fromValue(value_0) {
    return {
      change: _descriptor_16.fromValue(value_0),
      sent: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_16.toValue(value_0.change).concat(_descriptor_3.toValue(value_0.sent));
  }
}

const _descriptor_17 = new _SendResult_0();

const _descriptor_18 = new __compactRuntime.CompactTypeField();

const _descriptor_19 = new __compactRuntime.CompactTypeVector(2, _descriptor_2);

const _descriptor_20 = new __compactRuntime.CompactTypeVector(3, _descriptor_2);

const _descriptor_21 = new __compactRuntime.CompactTypeBytes(6);

class _CoinPreimage_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_7.alignment().concat(_descriptor_2.alignment().concat(_descriptor_21.alignment())));
  }
  fromValue(value_0) {
    return {
      info: _descriptor_3.fromValue(value_0),
      dataType: _descriptor_7.fromValue(value_0),
      data: _descriptor_2.fromValue(value_0),
      domain_sep: _descriptor_21.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.info).concat(_descriptor_7.toValue(value_0.dataType).concat(_descriptor_2.toValue(value_0.data).concat(_descriptor_21.toValue(value_0.domain_sep))));
  }
}

const _descriptor_22 = new _CoinPreimage_0();

const _descriptor_23 = new __compactRuntime.CompactTypeVector(3, _descriptor_18);

const _descriptor_24 = new __compactRuntime.CompactTypeVector(2, _descriptor_18);

const _descriptor_25 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.get_stake_private_state) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named get_stake_private_state');
    }
    if (typeof(witnesses_0.update_stake_private_state) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named update_stake_private_state');
    }
    if (typeof(witnesses_0.divide) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named divide');
    }
    if (typeof(witnesses_0.secrete_key) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named secrete_key');
    }
    if (typeof(witnesses_0.get_current_time) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named get_current_time');
    }
    if (typeof(witnesses_0.call_backend_for_delegation) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named call_backend_for_delegation');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      delegate: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`delegate: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('delegate',
                                      'argument 1 (as invoked from Typescript)',
                                      'Admin.compact line 7 char 5',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._delegate_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_7.toValue(result_0), alignment: _descriptor_7.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      addNewAdmin: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`addNewAdmin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const adminCpk_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('addNewAdmin',
                                      'argument 1 (as invoked from Typescript)',
                                      'Admin.compact line 23 char 5',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(adminCpk_0.buffer instanceof ArrayBuffer && adminCpk_0.BYTES_PER_ELEMENT === 1 && adminCpk_0.length === 32)) {
          __compactRuntime.type_error('addNewAdmin',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'Admin.compact line 23 char 5',
                                      'Bytes<32>',
                                      adminCpk_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(adminCpk_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addNewAdmin_0(context,
                                             partialProofData,
                                             adminCpk_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setTokenColor: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`setTokenColor: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('setTokenColor',
                                      'argument 1 (as invoked from Typescript)',
                                      'Admin.compact line 29 char 5',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setTokenColor_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      removeNewAdmin: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`removeNewAdmin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const adminCpk_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('removeNewAdmin',
                                      'argument 1 (as invoked from Typescript)',
                                      'Admin.compact line 38 char 5',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(adminCpk_0.buffer instanceof ArrayBuffer && adminCpk_0.BYTES_PER_ELEMENT === 1 && adminCpk_0.length === 32)) {
          __compactRuntime.type_error('removeNewAdmin',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'Admin.compact line 38 char 5',
                                      'Bytes<32>',
                                      adminCpk_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(adminCpk_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeNewAdmin_0(context,
                                                partialProofData,
                                                adminCpk_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      stake: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`stake: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const stakeCoin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('stake',
                                      'argument 1 (as invoked from Typescript)',
                                      'hydra-stake-protocol.compact line 34 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(stakeCoin_0) === 'object' && stakeCoin_0.nonce.buffer instanceof ArrayBuffer && stakeCoin_0.nonce.BYTES_PER_ELEMENT === 1 && stakeCoin_0.nonce.length === 32 && stakeCoin_0.color.buffer instanceof ArrayBuffer && stakeCoin_0.color.BYTES_PER_ELEMENT === 1 && stakeCoin_0.color.length === 32 && typeof(stakeCoin_0.value) === 'bigint' && stakeCoin_0.value >= 0n && stakeCoin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('stake',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'hydra-stake-protocol.compact line 34 char 1',
                                      'struct CoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211455>>',
                                      stakeCoin_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(stakeCoin_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._stake_0(context, partialProofData, stakeCoin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      redeem: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`redeem: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const mintedCoin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('redeem',
                                      'argument 1 (as invoked from Typescript)',
                                      'hydra-stake-protocol.compact line 88 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(mintedCoin_0) === 'object' && mintedCoin_0.nonce.buffer instanceof ArrayBuffer && mintedCoin_0.nonce.BYTES_PER_ELEMENT === 1 && mintedCoin_0.nonce.length === 32 && mintedCoin_0.color.buffer instanceof ArrayBuffer && mintedCoin_0.color.BYTES_PER_ELEMENT === 1 && mintedCoin_0.color.length === 32 && typeof(mintedCoin_0.value) === 'bigint' && mintedCoin_0.value >= 0n && mintedCoin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('redeem',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'hydra-stake-protocol.compact line 88 char 1',
                                      'struct CoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211455>>',
                                      mintedCoin_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(mintedCoin_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._redeem_0(context, partialProofData, mintedCoin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      recieveDelegateReward: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`recieveDelegateReward: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const coin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('recieveDelegateReward',
                                      'argument 1 (as invoked from Typescript)',
                                      'hydra-stake-protocol.compact line 136 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('recieveDelegateReward',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'hydra-stake-protocol.compact line 136 char 1',
                                      'struct CoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211455>>',
                                      coin_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(coin_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._recieveDelegateReward_0(context,
                                                       partialProofData,
                                                       coin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      delegate: this.circuits.delegate,
      addNewAdmin: this.circuits.addNewAdmin,
      setTokenColor: this.circuits.setTokenColor,
      removeNewAdmin: this.circuits.removeNewAdmin,
      stake: this.circuits.stake,
      redeem: this.circuits.redeem,
      recieveDelegateReward: this.circuits.recieveDelegateReward
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 6) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 6 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const initialNonce_0 = args_0[1];
    const initValidAssetCoinType_0 = args_0[2];
    const initMintDomain_0 = args_0[3];
    const initDelegationContractAddress_0 = args_0[4];
    const initScaleFactor_0 = args_0[5];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(initialNonce_0.buffer instanceof ArrayBuffer && initialNonce_0.BYTES_PER_ELEMENT === 1 && initialNonce_0.length === 32)) {
      __compactRuntime.type_error('Contract state constructor',
                                  'argument 1 (argument 2 as invoked from Typescript)',
                                  'hydra-stake-protocol.compact line 17 char 1',
                                  'Bytes<32>',
                                  initialNonce_0)
    }
    if (!(initValidAssetCoinType_0.buffer instanceof ArrayBuffer && initValidAssetCoinType_0.BYTES_PER_ELEMENT === 1 && initValidAssetCoinType_0.length === 32)) {
      __compactRuntime.type_error('Contract state constructor',
                                  'argument 2 (argument 3 as invoked from Typescript)',
                                  'hydra-stake-protocol.compact line 17 char 1',
                                  'Bytes<32>',
                                  initValidAssetCoinType_0)
    }
    if (!(initMintDomain_0.buffer instanceof ArrayBuffer && initMintDomain_0.BYTES_PER_ELEMENT === 1 && initMintDomain_0.length === 32)) {
      __compactRuntime.type_error('Contract state constructor',
                                  'argument 3 (argument 4 as invoked from Typescript)',
                                  'hydra-stake-protocol.compact line 17 char 1',
                                  'Bytes<32>',
                                  initMintDomain_0)
    }
    if (!(initDelegationContractAddress_0.buffer instanceof ArrayBuffer && initDelegationContractAddress_0.BYTES_PER_ELEMENT === 1 && initDelegationContractAddress_0.length === 32)) {
      __compactRuntime.type_error('Contract state constructor',
                                  'argument 4 (argument 5 as invoked from Typescript)',
                                  'hydra-stake-protocol.compact line 17 char 1',
                                  'Bytes<32>',
                                  initDelegationContractAddress_0)
    }
    if (!(typeof(initScaleFactor_0) === 'bigint' && initScaleFactor_0 >= 0n && initScaleFactor_0 <= 4294967295n)) {
      __compactRuntime.type_error('Contract state constructor',
                                  'argument 5 (argument 6 as invoked from Typescript)',
                                  'hydra-stake-protocol.compact line 17 char 1',
                                  'Uint<0..4294967295>',
                                  initScaleFactor_0)
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = stateValue_0;
    state_0.setOperation('delegate', new __compactRuntime.ContractOperation());
    state_0.setOperation('addNewAdmin', new __compactRuntime.ContractOperation());
    state_0.setOperation('setTokenColor', new __compactRuntime.ContractOperation());
    state_0.setOperation('removeNewAdmin', new __compactRuntime.ContractOperation());
    state_0.setOperation('stake', new __compactRuntime.ContractOperation());
    state_0.setOperation('redeem', new __compactRuntime.ContractOperation());
    state_0.setOperation('recieveDelegateReward', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state_0,
      currentPrivateState: constructorContext_0.initialPrivateState,
      currentZswapLocalState: constructorContext_0.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state_0.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(0n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(1n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(2n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(3n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue({ nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n, mt_index: 0n }),
                                                                            alignment: _descriptor_9.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(4n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(5n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(6n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(7n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(8n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(9n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(10n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(11n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(12n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(13n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(14n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(11n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(initialNonce_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(6n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(initValidAssetCoinType_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    const tmp_0 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(12n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_14.toValue(tmp_0),
                                              alignment: _descriptor_14.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(13n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(initMintDomain_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(14n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(initScaleFactor_0),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    const tmp_1 = this._ownPublicKey_0(context, partialProofData).bytes;
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(7n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_1),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(10n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(initDelegationContractAddress_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    state_0.data = context.transactionContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _some_0(value_0) { return { is_some: true, value: value_0 }; }
  _none_0() {
    return { is_some: false,
             value:
               { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n } };
  }
  _left_0(value_0) {
    return { is_left: true, left: value_0, right: { bytes: new Uint8Array(32) } };
  }
  _right_0(value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_23, value_0);
    return result_0;
  }
  _transientHash_1(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_24, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_20, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_22, value_0);
    return result_0;
  }
  _persistentCommit_0(value_0, rand_0) {
    const result_0 = __compactRuntime.persistentCommit(_descriptor_13,
                                                       value_0,
                                                       rand_0);
    return result_0;
  }
  _persistentCommit_1(value_0, rand_0) {
    const result_0 = __compactRuntime.persistentCommit(_descriptor_19,
                                                       value_0,
                                                       rand_0);
    return result_0;
  }
  _degradeToTransient_0(x_0) {
    const result_0 = __compactRuntime.degradeToTransient(x_0);
    return result_0;
  }
  _upgradeFromTransient_0(x_0) {
    const result_0 = __compactRuntime.upgradeFromTransient(x_0);
    return result_0;
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_11.toValue(result_0),
      alignment: _descriptor_11.alignment()
    });
    return result_0;
  }
  _createZswapInput_0(context, partialProofData, coin_0) {
    const result_0 = __compactRuntime.createZswapInput(context, coin_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _createZswapOutput_0(context, partialProofData, coin_0, recipient_0) {
    const result_0 = __compactRuntime.createZswapOutput(context,
                                                        coin_0,
                                                        recipient_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _tokenType_0(domain_sep_0, contractAddress_0) {
    return this._persistentCommit_1([domain_sep_0, contractAddress_0.bytes],
                                    new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 100, 101, 114, 105, 118, 101, 95, 116, 111, 107, 101, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  }
  _mintToken_0(context,
               partialProofData,
               domain_sep_0,
               value_0,
               nonce_0,
               recipient_0)
  {
    const coin_0 = { nonce: nonce_0,
                     color:
                       this._tokenType_0(domain_sep_0,
                                         _descriptor_10.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 2 } },
                                                                                   { idx: { cached: true,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_25.toValue(0n),
                                                                                                              alignment: _descriptor_25.alignment() } }] } },
                                                                                   { popeq: { cached: true,
                                                                                              result: undefined } }]).value)),
                     value: value_0 };
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(4n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(domain_sep_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { dup: { n: 1 } },
                     { dup: { n: 1 } },
                     'member',
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(value_0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { swap: { n: 0 } },
                     'neg',
                     { branch: { skip: 4 } },
                     { dup: { n: 2 } },
                     { dup: { n: 2 } },
                     { idx: { cached: true,
                              pushPath: false,
                              path: [ { tag: 'stack' }] } },
                     'add',
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const cm_0 = this._coinCommitment_0(coin_0, recipient_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(2n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(cm_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    return coin_0;
  }
  _evolveNonce_0(index_0, nonce_0) {
    return this._upgradeFromTransient_0(this._transientHash_0([__compactRuntime.convert_Uint8Array_to_bigint(28,
                                                                                                             new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101])),
                                                               index_0,
                                                               this._degradeToTransient_0(nonce_0)]));
  }
  _burnAddress_0() { return this._left_0({ bytes: new Uint8Array(32) }); }
  _receive_0(context, partialProofData, coin_0) {
    const recipient_0 = this._right_0(_descriptor_10.fromValue(Contract._query(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 2 } },
                                                                                { idx: { cached: true,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_25.toValue(0n),
                                                                                                           alignment: _descriptor_25.alignment() } }] } },
                                                                                { popeq: { cached: true,
                                                                                           result: undefined } }]).value));
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const tmp_0 = this._coinCommitment_0(coin_0, recipient_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(1n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    return [];
  }
  _send_0(context, partialProofData, input_0, recipient_0, value_0) {
    const selfAddr_0 = _descriptor_10.fromValue(Contract._query(context,
                                                                partialProofData,
                                                                [
                                                                 { dup: { n: 2 } },
                                                                 { idx: { cached: true,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_25.toValue(0n),
                                                                                            alignment: _descriptor_25.alignment() } }] } },
                                                                 { popeq: { cached: true,
                                                                            result: undefined } }]).value);
    this._createZswapInput_0(context, partialProofData, input_0);
    const tmp_0 = this._coinNullifier_0(this._downcastQualifiedCoin_0(input_0),
                                        selfAddr_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(0n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    let t_0;
    const change_0 = (t_0 = input_0.value,
                      (__compactRuntime.assert(!(t_0 < value_0),
                                               'result of subtraction would be negative'),
                       t_0 - value_0));
    const output_0 = { nonce:
                         this._upgradeFromTransient_0(this._transientHash_1([__compactRuntime.convert_Uint8Array_to_bigint(28,
                                                                                                                           new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101])),
                                                                             this._degradeToTransient_0(input_0.nonce)])),
                       color: input_0.color,
                       value: value_0 };
    this._createZswapOutput_0(context, partialProofData, output_0, recipient_0);
    const tmp_1 = this._coinCommitment_0(output_0, recipient_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(2n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_1),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    if (this._equal_0(change_0, 0n)) {
      return { change: this._none_0(), sent: output_0 };
    } else {
      const changeCoin_0 = { nonce:
                               this._upgradeFromTransient_0(this._transientHash_1([__compactRuntime.convert_Uint8Array_to_bigint(30,
                                                                                                                                 new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101, 47, 50])),
                                                                                   this._degradeToTransient_0(input_0.nonce)])),
                             color: input_0.color,
                             value: change_0 };
      this._createZswapOutput_0(context,
                                partialProofData,
                                changeCoin_0,
                                this._right_0(selfAddr_0));
      const cm_0 = this._coinCommitment_0(changeCoin_0,
                                          this._right_0(selfAddr_0));
      Contract._query(context,
                      partialProofData,
                      [
                       { swap: { n: 0 } },
                       { idx: { cached: true,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_25.toValue(2n),
                                                  alignment: _descriptor_25.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(cm_0),
                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newNull().encode() } },
                       { ins: { cached: true, n: 2 } },
                       { swap: { n: 0 } }]);
      Contract._query(context,
                      partialProofData,
                      [
                       { swap: { n: 0 } },
                       { idx: { cached: true,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_25.toValue(1n),
                                                  alignment: _descriptor_25.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(cm_0),
                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newNull().encode() } },
                       { ins: { cached: true, n: 2 } },
                       { swap: { n: 0 } }]);
      return { change: this._some_0(changeCoin_0), sent: output_0 };
    }
  }
  _sendImmediate_0(context, partialProofData, input_0, target_0, value_0) {
    return this._send_0(context,
                        partialProofData,
                        this._upcastQualifiedCoin_0(input_0),
                        target_0,
                        value_0);
  }
  _mergeCoin_0(context, partialProofData, a_0, b_0) {
    const selfAddr_0 = _descriptor_10.fromValue(Contract._query(context,
                                                                partialProofData,
                                                                [
                                                                 { dup: { n: 2 } },
                                                                 { idx: { cached: true,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_25.toValue(0n),
                                                                                            alignment: _descriptor_25.alignment() } }] } },
                                                                 { popeq: { cached: true,
                                                                            result: undefined } }]).value);
    this._createZswapInput_0(context, partialProofData, a_0);
    const tmp_0 = this._coinNullifier_0(this._downcastQualifiedCoin_0(a_0),
                                        selfAddr_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(0n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    this._createZswapInput_0(context, partialProofData, b_0);
    const tmp_1 = this._coinNullifier_0(this._downcastQualifiedCoin_0(b_0),
                                        selfAddr_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(0n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_1),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    __compactRuntime.assert(this._equal_1(a_0.color, b_0.color),
                            'Can only merge coins of the same color');
    const newCoin_0 = { nonce:
                          this._upgradeFromTransient_0(this._transientHash_1([__compactRuntime.convert_Uint8Array_to_bigint(28,
                                                                                                                            new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101])),
                                                                              this._degradeToTransient_0(a_0.nonce)])),
                        color: a_0.color,
                        value:
                          ((t1) => {
                            if (t1 > 340282366920938463463374607431768211455n) {
                              throw new __compactRuntime.CompactError('<standard library>: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                            }
                            return t1;
                          })(a_0.value + b_0.value) };
    this._createZswapOutput_0(context,
                              partialProofData,
                              newCoin_0,
                              this._right_0(selfAddr_0));
    const cm_0 = this._coinCommitment_0(newCoin_0, this._right_0(selfAddr_0));
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(2n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(cm_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(1n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(cm_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    return newCoin_0;
  }
  _mergeCoinImmediate_0(context, partialProofData, a_0, b_0) {
    return this._mergeCoin_0(context,
                             partialProofData,
                             a_0,
                             this._upcastQualifiedCoin_0(b_0));
  }
  _downcastQualifiedCoin_0(coin_0) {
    return { nonce: coin_0.nonce, color: coin_0.color, value: coin_0.value };
  }
  _upcastQualifiedCoin_0(coin_0) {
    return { nonce: coin_0.nonce,
             color: coin_0.color,
             value: coin_0.value,
             mt_index: 0n };
  }
  _coinCommitment_0(coin_0, recipient_0) {
    return this._persistentHash_1({ info: coin_0,
                                    dataType: recipient_0.is_left,
                                    data:
                                      recipient_0.is_left ?
                                      recipient_0.left.bytes :
                                      recipient_0.right.bytes,
                                    domain_sep:
                                      new Uint8Array([109, 100, 110, 58, 99, 99]) });
  }
  _coinNullifier_0(coin_0, addr_0) {
    return this._persistentHash_1({ info: coin_0,
                                    dataType: false,
                                    data: addr_0.bytes,
                                    domain_sep:
                                      new Uint8Array([109, 100, 110, 58, 99, 110]) });
  }
  _get_stake_private_state_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.get_stake_private_state(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && typeof(result_0.stAssets_minted) === 'bigint' && result_0.stAssets_minted >= 0n && result_0.stAssets_minted <= 18446744073709551615n && typeof(result_0.deposit_amount) === 'bigint' && result_0.deposit_amount >= 0n && result_0.deposit_amount <= 18446744073709551615n && typeof(result_0.redeemable) === 'bigint' && result_0.redeemable >= 0n && result_0.redeemable <= 18446744073709551615n)) {
      __compactRuntime.type_error('get_stake_private_state',
                                  'return value',
                                  'GlobalStatesAndWitnesses.compact line 51 char 5',
                                  'struct StakePrivateState<stAssets_minted: Uint<0..18446744073709551615>, deposit_amount: Uint<0..18446744073709551615>, redeemable: Uint<0..18446744073709551615>>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_13.toValue(result_0),
      alignment: _descriptor_13.alignment()
    });
    return result_0;
  }
  _update_stake_private_state_0(context, partialProofData, metadata_0) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.update_stake_private_state(witnessContext_0,
                                                                                     metadata_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 0 )) {
      __compactRuntime.type_error('update_stake_private_state',
                                  'return value',
                                  'GlobalStatesAndWitnesses.compact line 52 char 5',
                                  '[]',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _divide_0(context, partialProofData, numerator_0, denominator_0) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.divide(witnessContext_0,
                                                                 numerator_0,
                                                                 denominator_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 2  && typeof(result_0[0]) === 'bigint' && result_0[0] >= 0n && result_0[0] <= 18446744073709551615n && typeof(result_0[1]) === 'bigint' && result_0[1] >= 0n && result_0[1] <= 18446744073709551615n)) {
      __compactRuntime.type_error('divide',
                                  'return value',
                                  'GlobalStatesAndWitnesses.compact line 53 char 5',
                                  '[Uint<0..18446744073709551615>, Uint<0..18446744073709551615>]',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_15.toValue(result_0),
      alignment: _descriptor_15.alignment()
    });
    return result_0;
  }
  _secrete_key_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.secrete_key(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.type_error('secrete_key',
                                  'return value',
                                  'GlobalStatesAndWitnesses.compact line 54 char 5',
                                  'Bytes<32>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result_0),
      alignment: _descriptor_2.alignment()
    });
    return result_0;
  }
  _get_current_time_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.get_current_time(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'bigint' && result_0 >= 0n && result_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('get_current_time',
                                  'return value',
                                  'GlobalStatesAndWitnesses.compact line 55 char 5',
                                  'Uint<0..18446744073709551615>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_4.toValue(result_0),
      alignment: _descriptor_4.alignment()
    });
    return result_0;
  }
  _call_backend_for_delegation_0(context,
                                 partialProofData,
                                 amount_0,
                                 contractAddress_0)
  {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.call_backend_for_delegation(witnessContext_0,
                                                                                      amount_0,
                                                                                      contractAddress_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'boolean')) {
      __compactRuntime.type_error('call_backend_for_delegation',
                                  'return value',
                                  'GlobalStatesAndWitnesses.compact line 56 char 5',
                                  'Boolean',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_7.toValue(result_0),
      alignment: _descriptor_7.alignment()
    });
    return result_0;
  }
  _mintNewToken_0(context, partialProofData, amount_0) {
    const newTokenNonce_0 = this._evolveNonce_0(_descriptor_4.fromValue(Contract._query(context,
                                                                                        partialProofData,
                                                                                        [
                                                                                         { dup: { n: 0 } },
                                                                                         { idx: { cached: false,
                                                                                                  pushPath: false,
                                                                                                  path: [
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_25.toValue(12n),
                                                                                                                    alignment: _descriptor_25.alignment() } }] } },
                                                                                         { popeq: { cached: true,
                                                                                                    result: undefined } }]).value),
                                                _descriptor_2.fromValue(Contract._query(context,
                                                                                        partialProofData,
                                                                                        [
                                                                                         { dup: { n: 0 } },
                                                                                         { idx: { cached: false,
                                                                                                  pushPath: false,
                                                                                                  path: [
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_25.toValue(11n),
                                                                                                                    alignment: _descriptor_25.alignment() } }] } },
                                                                                         { popeq: { cached: false,
                                                                                                    result: undefined } }]).value));
    this._mintToken_0(context,
                      partialProofData,
                      _descriptor_2.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_25.toValue(13n),
                                                                                          alignment: _descriptor_25.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value),
                      amount_0,
                      newTokenNonce_0,
                      this._left_0(this._ownPublicKey_0(context,
                                                        partialProofData)));
    const tmp_0 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(12n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_14.toValue(tmp_0),
                                              alignment: _descriptor_14.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_1 = _descriptor_0.fromValue(Contract._query(context,
                                                          partialProofData,
                                                          [
                                                           { dup: { n: 0 } },
                                                           { idx: { cached: false,
                                                                    pushPath: false,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_25.toValue(0n),
                                                                                      alignment: _descriptor_25.alignment() } }] } },
                                                           { popeq: { cached: false,
                                                                      result: undefined } }]).value)
                  >
                  0n
                  ?
                  ((t1) => {
                    if (t1 > 18446744073709551615n) {
                      throw new __compactRuntime.CompactError('Utils.compact line 17 char 60: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                    }
                    return t1;
                  })(_descriptor_0.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_25.toValue(0n),
                                                                                         alignment: _descriptor_25.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value))
                  +
                  amount_0
                  :
                  amount_0;
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(0n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _calculateMintCapacity_0(context, partialProofData, depositAmount_0) {
    if (this._equal_2(_descriptor_0.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_25.toValue(0n),
                                                                                          alignment: _descriptor_25.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value),
                      0n))
    {
      return ((t1) => {
               if (t1 > 18446744073709551615n) {
                 throw new __compactRuntime.CompactError('Utils.compact line 22 char 20: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
               }
               return t1;
             })(depositAmount_0);
    } else {
      const exchangeRatio_0 = this._ScaledDivisionFunction_0(context,
                                                             partialProofData,
                                                             ((t1) => {
                                                               if (t1 > 18446744073709551615n) {
                                                                 throw new __compactRuntime.CompactError('Utils.compact line 24 char 58: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                                                               }
                                                               return t1;
                                                             })(_descriptor_0.fromValue(Contract._query(context,
                                                                                                        partialProofData,
                                                                                                        [
                                                                                                         { dup: { n: 0 } },
                                                                                                         { idx: { cached: false,
                                                                                                                  pushPath: false,
                                                                                                                  path: [
                                                                                                                         { tag: 'value',
                                                                                                                           value: { value: _descriptor_25.toValue(0n),
                                                                                                                                    alignment: _descriptor_25.alignment() } }] } },
                                                                                                         { popeq: { cached: false,
                                                                                                                    result: undefined } }]).value)
                                                                *
                                                                _descriptor_8.fromValue(Contract._query(context,
                                                                                                        partialProofData,
                                                                                                        [
                                                                                                         { dup: { n: 0 } },
                                                                                                         { idx: { cached: false,
                                                                                                                  pushPath: false,
                                                                                                                  path: [
                                                                                                                         { tag: 'value',
                                                                                                                           value: { value: _descriptor_25.toValue(14n),
                                                                                                                                    alignment: _descriptor_25.alignment() } }] } },
                                                                                                         { popeq: { cached: false,
                                                                                                                    result: undefined } }]).value)),
                                                             ((t1) => {
                                                               if (t1 > 18446744073709551615n) {
                                                                 throw new __compactRuntime.CompactError('Utils.compact line 24 char 109: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                                                               }
                                                               return t1;
                                                             })(_descriptor_9.fromValue(Contract._query(context,
                                                                                                        partialProofData,
                                                                                                        [
                                                                                                         { dup: { n: 0 } },
                                                                                                         { idx: { cached: false,
                                                                                                                  pushPath: false,
                                                                                                                  path: [
                                                                                                                         { tag: 'value',
                                                                                                                           value: { value: _descriptor_25.toValue(3n),
                                                                                                                                    alignment: _descriptor_25.alignment() } }] } },
                                                                                                         { popeq: { cached: false,
                                                                                                                    result: undefined } }]).value).value));
      const amountMintable_0 = this._ScaledDivisionFunction_0(context,
                                                              partialProofData,
                                                              ((t1) => {
                                                                if (t1 > 18446744073709551615n) {
                                                                  throw new __compactRuntime.CompactError('Utils.compact line 26 char 60: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                                                                }
                                                                return t1;
                                                              })(depositAmount_0
                                                                 *
                                                                 exchangeRatio_0),
                                                              _descriptor_8.fromValue(Contract._query(context,
                                                                                                      partialProofData,
                                                                                                      [
                                                                                                       { dup: { n: 0 } },
                                                                                                       { idx: { cached: false,
                                                                                                                pushPath: false,
                                                                                                                path: [
                                                                                                                       { tag: 'value',
                                                                                                                         value: { value: _descriptor_25.toValue(14n),
                                                                                                                                  alignment: _descriptor_25.alignment() } }] } },
                                                                                                       { popeq: { cached: false,
                                                                                                                  result: undefined } }]).value));
      return amountMintable_0;
    }
  }
  _ScaledDivisionFunction_0(context,
                            partialProofData,
                            numerator_0,
                            denominator_0)
  {
    __compactRuntime.assert(numerator_0 > 0n, 'Invalid arithemetic operation');
    const disclosedNumerator_0 = numerator_0;
    const disclosedDenominator_0 = denominator_0;
    const __compact_pattern_tmp1_0 = this._divide_0(context,
                                                    partialProofData,
                                                    disclosedNumerator_0,
                                                    disclosedDenominator_0);
    const quotient_0 = __compact_pattern_tmp1_0[0];
    const remainder_0 = __compact_pattern_tmp1_0[1];
    __compactRuntime.assert(remainder_0 < denominator_0,
                            'Invalid divsion results');
    __compactRuntime.assert(this._equal_3(quotient_0 * denominator_0
                                          +
                                          remainder_0,
                                          numerator_0),
                            'Invalid division results');
    return quotient_0;
  }
  _generatePrivateStateHash_0(metadata_0, stakerId_0) {
    return this._persistentCommit_0(metadata_0, stakerId_0);
  }
  _generateStakerId_0(context, partialProofData, sk_0) {
    return this._persistentHash_0([new Uint8Array([104, 121, 100, 114, 97, 58, 115, 116, 97, 107, 101, 114, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   sk_0,
                                   _descriptor_10.fromValue(Contract._query(context,
                                                                            partialProofData,
                                                                            [
                                                                             { dup: { n: 2 } },
                                                                             { idx: { cached: true,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_25.toValue(0n),
                                                                                                        alignment: _descriptor_25.alignment() } }] } },
                                                                             { popeq: { cached: true,
                                                                                        result: undefined } }]).value).bytes]);
  }
  _recieveAndAddCoinToTvl_0(context, partialProofData, disclosedCoin_0) {
    this._receive_0(context, partialProofData, disclosedCoin_0);
    const coinToInsert_0 = _descriptor_9.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_25.toValue(3n),
                                                                                               alignment: _descriptor_25.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value).value
                           >
                           0n
                           ?
                           this._mergeCoinImmediate_0(context,
                                                      partialProofData,
                                                      _descriptor_9.fromValue(Contract._query(context,
                                                                                              partialProofData,
                                                                                              [
                                                                                               { dup: { n: 0 } },
                                                                                               { idx: { cached: false,
                                                                                                        pushPath: false,
                                                                                                        path: [
                                                                                                               { tag: 'value',
                                                                                                                 value: { value: _descriptor_25.toValue(3n),
                                                                                                                          alignment: _descriptor_25.alignment() } }] } },
                                                                                               { popeq: { cached: false,
                                                                                                          result: undefined } }]).value),
                                                      disclosedCoin_0)
                           :
                           disclosedCoin_0;
    const tmp_0 = this._right_0(_descriptor_10.fromValue(Contract._query(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 2 } },
                                                                          { idx: { cached: true,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_25.toValue(0n),
                                                                                                     alignment: _descriptor_25.alignment() } }] } },
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value));
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(3n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { dup: { n: 3 } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell(__compactRuntime.coinCommitment(
                                                                            { value: _descriptor_3.toValue(coinToInsert_0),
                                                                              alignment: _descriptor_3.alignment() },
                                                                            { value: _descriptor_12.toValue(tmp_0),
                                                                              alignment: _descriptor_12.alignment() }
                                                                          )).encode() } },
                     { idx: { cached: true,
                              pushPath: false,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(1n),
                                                alignment: _descriptor_25.alignment() } },
                                     { tag: 'stack' }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(coinToInsert_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { swap: { n: 0 } },
                     { concat: { cached: true, n: 91 } },
                     { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _burnReturnedstAsset_0(context, partialProofData, coin_0) {
    const disclosedCoin_0 = coin_0;
    __compactRuntime.assert(this._equal_4(disclosedCoin_0.color,
                                          _descriptor_2.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_25.toValue(9n),
                                                                                                              alignment: _descriptor_25.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value)),
                            'Invalid coin type provided to cover transaction');
    this._receive_0(context, partialProofData, disclosedCoin_0);
    this._sendImmediate_0(context,
                          partialProofData,
                          coin_0,
                          this._burnAddress_0(),
                          disclosedCoin_0.value);
    return [];
  }
  _sendAndManageChange_0(context, partialProofData, amount_0, address_0) {
    const disclosedAmt_0 = amount_0;
    const sendResult_0 = this._send_0(context,
                                      partialProofData,
                                      _descriptor_9.fromValue(Contract._query(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_25.toValue(3n),
                                                                                                          alignment: _descriptor_25.alignment() } }] } },
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value),
                                      this._left_0(address_0),
                                      disclosedAmt_0);
    if (sendResult_0.change.is_some) {
      const tmp_0 = sendResult_0.change.value;
      const tmp_1 = this._right_0(_descriptor_10.fromValue(Contract._query(context,
                                                                           partialProofData,
                                                                           [
                                                                            { dup: { n: 2 } },
                                                                            { idx: { cached: true,
                                                                                     pushPath: false,
                                                                                     path: [
                                                                                            { tag: 'value',
                                                                                              value: { value: _descriptor_25.toValue(0n),
                                                                                                       alignment: _descriptor_25.alignment() } }] } },
                                                                            { popeq: { cached: true,
                                                                                       result: undefined } }]).value));
      Contract._query(context,
                      partialProofData,
                      [
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(3n),
                                                                              alignment: _descriptor_25.alignment() }).encode() } },
                       { dup: { n: 3 } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell(__compactRuntime.coinCommitment(
                                                                              { value: _descriptor_3.toValue(tmp_0),
                                                                                alignment: _descriptor_3.alignment() },
                                                                              { value: _descriptor_12.toValue(tmp_1),
                                                                                alignment: _descriptor_12.alignment() }
                                                                            )).encode() } },
                       { idx: { cached: true,
                                pushPath: false,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_25.toValue(1n),
                                                  alignment: _descriptor_25.alignment() } },
                                       { tag: 'stack' }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                       { swap: { n: 0 } },
                       { concat: { cached: true, n: 91 } },
                       { ins: { cached: false, n: 1 } }]);
    } else {
      Contract._query(context,
                      partialProofData,
                      [
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(3n),
                                                                              alignment: _descriptor_25.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue({ nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n, mt_index: 0n }),
                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } }]);
    }
    return [];
  }
  _delegate_0(context, partialProofData) {
    const userPk_0 = this._ownPublicKey_0(context, partialProofData).bytes;
    __compactRuntime.assert(this._equal_5(userPk_0,
                                          _descriptor_2.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_25.toValue(7n),
                                                                                                              alignment: _descriptor_25.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value))
                            ||
                            _descriptor_7.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_25.toValue(8n),
                                                                                                alignment: _descriptor_25.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(userPk_0),
                                                                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Unauthorized to delegate protocol asset');
    const delegationAmt_0 = _descriptor_9.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_25.toValue(3n),
                                                                                                alignment: _descriptor_25.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value).value;
    this._send_0(context,
                 partialProofData,
                 _descriptor_9.fromValue(Contract._query(context,
                                                         partialProofData,
                                                         [
                                                          { dup: { n: 0 } },
                                                          { idx: { cached: false,
                                                                   pushPath: false,
                                                                   path: [
                                                                          { tag: 'value',
                                                                            value: { value: _descriptor_25.toValue(3n),
                                                                                     alignment: _descriptor_25.alignment() } }] } },
                                                          { popeq: { cached: false,
                                                                     result: undefined } }]).value),
                 this._right_0({ bytes:
                                   _descriptor_2.fromValue(Contract._query(context,
                                                                           partialProofData,
                                                                           [
                                                                            { dup: { n: 0 } },
                                                                            { idx: { cached: false,
                                                                                     pushPath: false,
                                                                                     path: [
                                                                                            { tag: 'value',
                                                                                              value: { value: _descriptor_25.toValue(10n),
                                                                                                       alignment: _descriptor_25.alignment() } }] } },
                                                                            { popeq: { cached: false,
                                                                                       result: undefined } }]).value) }),
                 _descriptor_9.fromValue(Contract._query(context,
                                                         partialProofData,
                                                         [
                                                          { dup: { n: 0 } },
                                                          { idx: { cached: false,
                                                                   pushPath: false,
                                                                   path: [
                                                                          { tag: 'value',
                                                                            value: { value: _descriptor_25.toValue(3n),
                                                                                     alignment: _descriptor_25.alignment() } }] } },
                                                          { popeq: { cached: false,
                                                                     result: undefined } }]).value).value);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(4n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(1),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    const isDelegated_0 = this._call_backend_for_delegation_0(context,
                                                              partialProofData,
                                                              delegationAmt_0,
                                                              _descriptor_10.fromValue(Contract._query(context,
                                                                                                       partialProofData,
                                                                                                       [
                                                                                                        { dup: { n: 2 } },
                                                                                                        { idx: { cached: true,
                                                                                                                 pushPath: false,
                                                                                                                 path: [
                                                                                                                        { tag: 'value',
                                                                                                                          value: { value: _descriptor_25.toValue(0n),
                                                                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                                                                        { popeq: { cached: true,
                                                                                                                   result: undefined } }]).value).bytes);
    __compactRuntime.assert(isDelegated_0, 'Failed to delegated protocol TVL');
    return isDelegated_0;
  }
  _addNewAdmin_0(context, partialProofData, adminCpk_0) {
    __compactRuntime.assert(this._equal_6(this._ownPublicKey_0(context,
                                                               partialProofData).bytes,
                                          _descriptor_2.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_25.toValue(7n),
                                                                                                              alignment: _descriptor_25.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value)),
                            'Unauthorized to add new admin');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(8n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(adminCpk_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _setTokenColor_0(context, partialProofData) {
    const userPk_0 = this._ownPublicKey_0(context, partialProofData).bytes;
    __compactRuntime.assert(this._equal_7(userPk_0,
                                          _descriptor_2.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_25.toValue(7n),
                                                                                                              alignment: _descriptor_25.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value))
                            ||
                            _descriptor_7.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_25.toValue(8n),
                                                                                                alignment: _descriptor_25.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(userPk_0),
                                                                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Unauthorized to add new admin');
    const tmp_0 = this._tokenType_0(_descriptor_2.fromValue(Contract._query(context,
                                                                            partialProofData,
                                                                            [
                                                                             { dup: { n: 0 } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_25.toValue(13n),
                                                                                                        alignment: _descriptor_25.alignment() } }] } },
                                                                             { popeq: { cached: false,
                                                                                        result: undefined } }]).value),
                                    _descriptor_10.fromValue(Contract._query(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 2 } },
                                                                              { idx: { cached: true,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_25.toValue(0n),
                                                                                                         alignment: _descriptor_25.alignment() } }] } },
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value));
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(9n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _removeNewAdmin_0(context, partialProofData, adminCpk_0) {
    __compactRuntime.assert(this._equal_8(this._ownPublicKey_0(context,
                                                               partialProofData).bytes,
                                          _descriptor_2.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_25.toValue(7n),
                                                                                                              alignment: _descriptor_25.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value)),
                            'Unauthorized to add new admin');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(8n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(adminCpk_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _stake_0(context, partialProofData, stakeCoin_0) {
    const disclosedCoin_0 = stakeCoin_0;
    const userPk_0 = this._ownPublicKey_0(context, partialProofData).bytes;
    const stakerId_0 = this._generateStakerId_0(context,
                                                partialProofData,
                                                this._secrete_key_0(context,
                                                                    partialProofData));
    __compactRuntime.assert(disclosedCoin_0.value > 0n,
                            'Insufficient Funds provide for staking');
    const amountMintable_0 = this._calculateMintCapacity_0(context,
                                                           partialProofData,
                                                           disclosedCoin_0.value);
    this._mintNewToken_0(context, partialProofData, amountMintable_0);
    this._recieveAndAddCoinToTvl_0(context, partialProofData, disclosedCoin_0);
    if (_descriptor_7.fromValue(Contract._query(context,
                                                partialProofData,
                                                [
                                                 { dup: { n: 0 } },
                                                 { idx: { cached: false,
                                                          pushPath: false,
                                                          path: [
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_25.toValue(5n),
                                                                            alignment: _descriptor_25.alignment() } }] } },
                                                 { push: { storage: false,
                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(userPk_0),
                                                                                                        alignment: _descriptor_2.alignment() }).encode() } },
                                                 'member',
                                                 { popeq: { cached: true,
                                                            result: undefined } }]).value))
    {
      const stake_0 = _descriptor_6.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_25.toValue(5n),
                                                                                          alignment: _descriptor_25.alignment() } }] } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_2.toValue(userPk_0),
                                                                                          alignment: _descriptor_2.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value);
      __compactRuntime.assert(this._equal_9(stakerId_0, stake_0.staker_id),
                              'Can not add to stake: You are not the oowner');
      const privateState_0 = this._get_stake_private_state_0(context,
                                                             partialProofData);
      const stakeHash_0 = this._generatePrivateStateHash_0(privateState_0,
                                                           userPk_0);
      __compactRuntime.assert(this._equal_10(stakeHash_0, stake_0.stake_hash),
                              'Can not add to stake: You are not the owner');
      const updatedPrivatState_0 = { stAssets_minted:
                                       ((t1) => {
                                         if (t1 > 18446744073709551615n) {
                                           throw new __compactRuntime.CompactError('hydra-stake-protocol.compact line 55 char 33: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                                         }
                                         return t1;
                                       })(privateState_0.stAssets_minted
                                          +
                                          amountMintable_0),
                                     deposit_amount:
                                       ((t1) => {
                                         if (t1 > 18446744073709551615n) {
                                           throw new __compactRuntime.CompactError('hydra-stake-protocol.compact line 54 char 32: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                                         }
                                         return t1;
                                       })(privateState_0.deposit_amount
                                          +
                                          disclosedCoin_0.value),
                                     redeemable: privateState_0.redeemable };
      this._update_stake_private_state_0(context,
                                         partialProofData,
                                         updatedPrivatState_0);
      const newStakeHash_0 = this._generatePrivateStateHash_0(updatedPrivatState_0,
                                                              userPk_0);
      const tmp_0 = { staker_id: stake_0.staker_id,
                      stake_hash: newStakeHash_0,
                      created_at: stake_0.created_at,
                      status: 0 };
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_25.toValue(5n),
                                                  alignment: _descriptor_25.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(userPk_0),
                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_0),
                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }]);
    } else {
      let t_0;
      const newPrivateState_0 = (t_0 = { stAssets_minted: 0n, deposit_amount: 0n, redeemable: 0n },
                                 { stAssets_minted: amountMintable_0,
                                   deposit_amount:
                                     ((t1) => {
                                       if (t1 > 18446744073709551615n) {
                                         throw new __compactRuntime.CompactError('hydra-stake-protocol.compact line 69 char 32: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                                       }
                                       return t1;
                                     })(disclosedCoin_0.value),
                                   redeemable: t_0.redeemable });
      this._update_stake_private_state_0(context,
                                         partialProofData,
                                         newPrivateState_0);
      const newStakeHash_1 = this._generatePrivateStateHash_0(newPrivateState_0,
                                                              userPk_0);
      let t_1;
      const newStake_0 = (t_1 = { staker_id: new Uint8Array(32), stake_hash: new Uint8Array(32), created_at: 0n, status: 0 },
                          { staker_id: stakerId_0,
                            stake_hash: newStakeHash_1,
                            created_at:
                              this._get_current_time_0(context, partialProofData),
                            status: t_1.status });
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_25.toValue(5n),
                                                  alignment: _descriptor_25.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(userPk_0),
                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(newStake_0),
                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }]);
    }
    return [];
  }
  _redeem_0(context, partialProofData, mintedCoin_0) {
    __compactRuntime.assert(_descriptor_1.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_25.toValue(4n),
                                                                                                alignment: _descriptor_25.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value)
                            ===
                            0,
                            'Delegation has already proceeded');
    const disclosedCoin_0 = mintedCoin_0;
    const userPk_0 = this._ownPublicKey_0(context, partialProofData).bytes;
    const stakerId_0 = this._generateStakerId_0(context,
                                                partialProofData,
                                                this._secrete_key_0(context,
                                                                    partialProofData));
    __compactRuntime.assert(_descriptor_7.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_25.toValue(5n),
                                                                                                alignment: _descriptor_25.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(userPk_0),
                                                                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'You do not have any stakes in the pool');
    const stake_0 = _descriptor_6.fromValue(Contract._query(context,
                                                            partialProofData,
                                                            [
                                                             { dup: { n: 0 } },
                                                             { idx: { cached: false,
                                                                      pushPath: false,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_25.toValue(5n),
                                                                                        alignment: _descriptor_25.alignment() } }] } },
                                                             { idx: { cached: false,
                                                                      pushPath: false,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_2.toValue(userPk_0),
                                                                                        alignment: _descriptor_2.alignment() } }] } },
                                                             { popeq: { cached: false,
                                                                        result: undefined } }]).value);
    __compactRuntime.assert(stake_0.status === 0,
                            'Delegation has already proceeded');
    __compactRuntime.assert(this._equal_11(stakerId_0, stake_0.staker_id),
                            'Can not add to stake: You are not the owner');
    const privateState_0 = this._get_stake_private_state_0(context,
                                                           partialProofData);
    __compactRuntime.assert(this._equal_12(privateState_0.stAssets_minted,
                                           disclosedCoin_0.value),
                            'Please provide the accurate value for stAsset to redeem');
    __compactRuntime.assert(this._equal_13(disclosedCoin_0.color,
                                           _descriptor_2.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_25.toValue(9n),
                                                                                                               alignment: _descriptor_25.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value)),
                            'Invalid Token Type: please provide valid type for stAsset');
    __compactRuntime.assert(stake_0.status === 0,
                            'Already reemed stake for specified position');
    const stakeHash_0 = this._generatePrivateStateHash_0(privateState_0,
                                                         userPk_0);
    __compactRuntime.assert(this._equal_14(stakeHash_0, stake_0.stake_hash),
                            'Can not add to stake: You are not the owner');
    const exchangeRate_0 = this._ScaledDivisionFunction_0(context,
                                                          partialProofData,
                                                          ((t1) => {
                                                            if (t1 > 18446744073709551615n) {
                                                              throw new __compactRuntime.CompactError('hydra-stake-protocol.compact line 111 char 50: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                                                            }
                                                            return t1;
                                                          })(_descriptor_9.fromValue(Contract._query(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_25.toValue(3n),
                                                                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value).value
                                                             *
                                                             _descriptor_8.fromValue(Contract._query(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_25.toValue(14n),
                                                                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                                                          ((t1) => {
                                                            if (t1 > 18446744073709551615n) {
                                                              throw new __compactRuntime.CompactError('hydra-stake-protocol.compact line 111 char 98: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                                                            }
                                                            return t1;
                                                          })(_descriptor_0.fromValue(Contract._query(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_25.toValue(0n),
                                                                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)));
    const redeemableAsset_0 = this._ScaledDivisionFunction_0(context,
                                                             partialProofData,
                                                             ((t1) => {
                                                               if (t1 > 18446744073709551615n) {
                                                                 throw new __compactRuntime.CompactError('hydra-stake-protocol.compact line 112 char 53: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                                                               }
                                                               return t1;
                                                             })(privateState_0.stAssets_minted
                                                                *
                                                                exchangeRate_0),
                                                             _descriptor_8.fromValue(Contract._query(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_25.toValue(14n),
                                                                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value));
    this._burnReturnedstAsset_0(context, partialProofData, disclosedCoin_0);
    this._sendAndManageChange_0(context,
                                partialProofData,
                                redeemableAsset_0,
                                this._ownPublicKey_0(context, partialProofData));
    this._update_stake_private_state_0(context,
                                       partialProofData,
                                       { stAssets_minted:
                                           privateState_0.stAssets_minted,
                                         deposit_amount: 0n,
                                         redeemable: 0n });
    const updatedStake_0 = { staker_id: stake_0.staker_id,
                             stake_hash: stake_0.stake_hash,
                             created_at: stake_0.created_at,
                             status: 1 };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_25.toValue(5n),
                                                alignment: _descriptor_25.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(userPk_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(updatedStake_0),
                                                                            alignment: _descriptor_6.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _recieveDelegateReward_0(context, partialProofData, coin_0) {
    const disclosedCoin_0 = coin_0;
    this._recieveAndAddCoinToTvl_0(context, partialProofData, disclosedCoin_0);
    const tmp_0 = ((t1) => {
                    if (t1 > 18446744073709551615n) {
                      throw new __compactRuntime.CompactError('hydra-stake-protocol.compact line 140 char 30: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                    }
                    return t1;
                  })(((t1) => {
                       if (t1 > 18446744073709551615n) {
                         throw new __compactRuntime.CompactError('hydra-stake-protocol.compact line 140 char 31: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                       }
                       return t1;
                     })(_descriptor_0.fromValue(Contract._query(context,
                                                                partialProofData,
                                                                [
                                                                 { dup: { n: 0 } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_25.toValue(1n),
                                                                                            alignment: _descriptor_25.alignment() } }] } },
                                                                 { popeq: { cached: false,
                                                                            result: undefined } }]).value))
                     +
                     disclosedCoin_0.value);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(1n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_25.toValue(4n),
                                                                            alignment: _descriptor_25.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _equal_0(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_9(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_10(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_11(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_12(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_13(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_14(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get total_stAsset_Minted() {
      return _descriptor_0.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_25.toValue(0n),
                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get total_rewards_accrued() {
      return _descriptor_0.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_25.toValue(1n),
                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get total_stake_withdrawn() {
      return _descriptor_0.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_25.toValue(2n),
                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get protocolTVL() {
      return _descriptor_9.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_25.toValue(3n),
                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get stakePoolStatus() {
      return _descriptor_1.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_25.toValue(4n),
                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    stakings: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_7.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_25.toValue(5n),
                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_25.toValue(5n),
                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'GlobalStatesAndWitnesses.compact line 15 char 5',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_7.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_25.toValue(5n),
                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_0),
                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'GlobalStatesAndWitnesses.compact line 15 char 5',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_6.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_25.toValue(5n),
                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_2.toValue(key_0),
                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[5];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_2.fromValue(key.value),      _descriptor_6.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get validAssetCoinType() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_25.toValue(6n),
                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get superAdmin() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_25.toValue(7n),
                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    admins: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_7.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_25.toValue(8n),
                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_25.toValue(8n),
                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'GlobalStatesAndWitnesses.compact line 18 char 5',
                                      'Bytes<32>',
                                      elem_0)
        }
        return _descriptor_7.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_25.toValue(8n),
                                                                                   alignment: _descriptor_25.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(elem_0),
                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[8];
        return self_0.asMap().keys().map((elem) => _descriptor_2.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    get stAssetCoinColor() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_25.toValue(9n),
                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get delegationContractAddress() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_25.toValue(10n),
                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get stAssetDomainSeparator() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_25.toValue(13n),
                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get SCALE_FACTOR() {
      return _descriptor_8.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_25.toValue(14n),
                                                                                 alignment: _descriptor_25.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  get_stake_private_state: (...args) => undefined,
  update_stake_private_state: (...args) => undefined,
  divide: (...args) => undefined,
  secrete_key: (...args) => undefined,
  get_current_time: (...args) => undefined,
  call_backend_for_delegation: (...args) => undefined
});
const pureCircuits = {};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
