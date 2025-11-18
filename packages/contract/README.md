# Hydra Stake — Contract Package
This package contains the contract modules, compact contract artifacts, and helper types used by the rest of the monorepo to build, test, and deploy staking contracts.

Table of contents
- Overview
- Project layout
- Key concepts
- Initialization parameters
- Private state
- Entry points (Admin, Staker, Delegation)
- Build & test
- Contributing & license

## Overview

The Hydra Stake contract implements a modular staking protocol with distinct roles:
- **Admin**: manages protocol configuration and deployments (`Admin.compact`).
- **Stakers**: deposit accepted assets (e.g. `tDUST`) and receive protocol tokens (stAssets).
- **Delegation / Third-party systems**: optional contracts that can receive or interact with pooled funds.

Sensitive per-user values (for example `deposit_amount`, `redeemable`, `stAssets_minted`) are stored in private state; only cryptographic hashes and necessary checks are placed on-chain to preserve privacy while enabling verification.

## Project layout

- `Admin.compact`, `hydra-stake-protocol.compact`, `Utils.compact`, `GlobalStatesAndWitnesses.compact` — compiled contract artifacts used by the runtime.
- `witnesses.ts` — witness helpers for tests and local tooling.
- `managed/` — generated/managed outputs (compiled contracts, keys, zkir, etc.).

## Key concepts

- stAsset: the protocol-issued asset minted when a user stakes accepted tokens.
- deposit_amount: amount the user deposited into the pool.
- redeemable: amount the user can redeem (principal + rewards as applicable).

## Initialization parameters

When deploying a new instance the admin supplies initial protocol parameters. Example shape (pseudocode):

```ts
// Constructor / init params (illustrative)
[
  initialNonce: Bytes<32>,                // nonce for deterministic minting
  initValidAssetCoinType: Bytes<32>,     // accepted token coin type (e.g. tDUST)
  initMintDomain: Bytes<32>,             // domain separator for stAsset minting
  initDelegationContractAddress: Bytes<32>, // optional delegation contract address
  initScaleFactor: Uint<32>              // scale/decimals factor for token math
]
```

## Private state shape

Example private-state struct used per-user (illustrative):

```ts
struct StakePrivateState {
  stAssets_minted: Uint<64>;
  deposit_amount: Uint<64>;
  redeemable: Uint<64>;
}
```

## Entry points

Stable entry points are provided for each role. Signatures below are illustrative — refer to the compact contract artifacts for the exact ABI.

- Admin

```ts
circuit delegate(): void         // delegate protocol TVL to configured address
circuit addNewAdmin(address): void
circuit removeAdmin(address): void
```

- Staker

```ts
circuit stake(coin: CoinInfo): void    // deposit accepted token and mint stAsset
circuit redeem(coin: CoinInfo): void   // burn stAsset and return underlying + rewards
```

- Delegation / Third-party

```ts
circuit receiveDelegateReward(coin: CoinInfo): void // accept or reconcile delegated rewards
```

## Build & test

This package is part of a monorepo. Use the workspace tooling from the repository root to build and test contracts.

From the repository root:

```bash
# navigate into compact directory
# install workspace deps (if not already)
yarn install

# build all packages or just the contract package
npx turbo run prebuild

# run tests for the contract package
yarn test
```

## Usage & deployment notes

- Use the compiled `*.compact` artifacts for deployment. Managed outputs under `managed/` contain generated keys and ZK artifacts used by test harnesses.
- Ensure the `initValidAssetCoinType` and `initScaleFactor` match the token being staked.
- Admin keys should be held securely; deployments create new protocol instances per asset-type when needed.

## Contributing

- File issues or PRs to improve contracts, add tests, or expand documentation.
- Keep contract changes minimal and add tests that cover expected behavior and edge cases.

## License

See the repository `LICENSE` file for license terms.

## Contact

For questions about implementation or integration, open an issue on the repository or reach out to the maintainers.

