import path, { dirname } from "node:path";
import {
  NetworkId,
  setNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { HydraStakePrivateStateKey } from "@repo/liquid-staking-api";
import { fileURLToPath } from "node:url";

export interface Config {
  readonly privateStateStoreName: string;
  readonly logDir: string;
  readonly zkConfigPath: string;
  readonly indexer: string;
  readonly indexerWS: string;
  readonly node: string;
  readonly proofServer: string;

  setNetworkId: () => void;
}

// export const currentDir = path.resolve(new URL(import.meta.url).pathname, "..");

export const currentDir = dirname(fileURLToPath(import.meta.url));

export class TestnetRemoteConfig implements Config {
  privateStateStoreName = HydraStakePrivateStateKey;
  logDir = path.resolve(
    currentDir,
    "..",
    "logs",
    "testnet-remote",
    `${new Date().toISOString()}.log`
  );
  zkConfigPath = path.resolve(
    currentDir,
    "..",
    "..",
    "contract",
    "liquid-staking-protocol-contract",
    "dist",
    "managed",
    "liquid-staking-protocol"
  );
  indexer = "https://indexer.testnet-02.midnight.network/api/v1/graphql";
  indexerWS = "wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws";
  node = "https://rpc.testnet-02.midnight.network";
  proofServer = "http://127.0.0.1:6300";

  setNetworkId() {
    setNetworkId(NetworkId.TestNet);
  }
}
