import * as dotenv from "dotenv";

dotenv.config({})
export const config = (() => {
    if (typeof process.env.PROOF_SERVER_URI == "undefined" ||
        typeof process.env.SUBSTRATE_NODE_URI == "undefined" ||
        typeof process.env.INDEXER_URI == "undefined" ||
        typeof process.env.INDERXER_WS_URI == "undefined" ||
        typeof process.env.SERVER_WALLET_SEED == "undefined" ||
        typeof process.env.NETWORKID == "undefined" ||
        typeof process.env.LOGGING_LEVEL == "undefined" ||
        typeof process.env.PORT == "undefined"
    ) {
        throw new Error("Evironmental variable not loaded correctly");
    }
    return {
        proofServerUri: process.env.PROOF_SERVER_URI,
        substrateNodeUri: process.env.SUBSTRATE_NODE_URI,
        indexerUri: process.env.INDEXER_URI,
        indexerWsUri: process.env.INDERXER_WS_URI,
        seed: process.env.SERVER_WALLET_SEED,
        networkId: process.env.NETWORKID,
        loggingLevel: process.env.LOGGING_LEVEL,
        port: process.env.PORT
    }
})()