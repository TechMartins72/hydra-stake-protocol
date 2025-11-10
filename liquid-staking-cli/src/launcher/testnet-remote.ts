import { run } from "../index.js";
import { TestnetRemoteConfig } from "../config.js";

const config = new TestnetRemoteConfig();
config.setNetworkId();
await run(config);
