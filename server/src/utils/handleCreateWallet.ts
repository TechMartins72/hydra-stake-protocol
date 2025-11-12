import { WalletBuilder, type Resource } from "@midnight-ntwrk/wallet";
import { config as walletConfig } from "./config.js";
import { nativeToken, NetworkId } from "@midnight-ntwrk/zswap";
import fs from "node:fs";
import path from "node:path";
import { WalletState, type Wallet } from '@midnight-ntwrk/wallet-api';
import { filter, firstValueFrom, map, tap, throttleTime } from "rxjs";


/** @param isConnected Track whether or not the wallet has connected successfully */
export let isConnected: boolean = false;
export async function handleCreateOrInstantiateWallet(): Promise<{
    isConnected: boolean;
    wallet: Wallet & Resource;
} | undefined> {
    const statePath = path.resolve("serializedState.txt");
    let wallet: Wallet & Resource | undefined;
    
    if (fs.existsSync(statePath)) {
        console.log(`Current file path ${statePath} 📂`)
        const serializedState = fs.readFileSync(statePath, { encoding: "utf8" });
        console.log(`🚦Retrieved state ${serializedState}`);
        console.log("Finished reading the serialized state ⏱️");
        console.log("Retrieved the serialized wallet state 📑")
        try {
            wallet = await WalletBuilder.restore(
                walletConfig.indexerUri,
                walletConfig.indexerWsUri,
                walletConfig.proofServerUri,
                walletConfig.substrateNodeUri,
                walletConfig.seed,
                serializedState as string,
                "error",
                false
            );

            wallet.start();
            const newWalletState = await waitForSync(wallet);
            if (newWalletState.syncProgress?.synced == true) {
                console.log(`Your wallet address ${newWalletState.address}`)
                isConnected = true;
                await waitForFunds(wallet);
            }

            isConnected = true;
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : "Failed to restore wallet 🧐";
            console.error(errMsg)
        }
    } else {
        console.log("Building wallet state from scratch 🚧")
        try {
            wallet = await WalletBuilder.build(
                walletConfig.indexerUri,
                walletConfig.indexerWsUri,
                walletConfig.proofServerUri,
                walletConfig.substrateNodeUri,
                walletConfig.seed,
                NetworkId.TestNet,
                "error",
                false
            );
            wallet.start();
            const newWalletState = await waitForSync(wallet);
            if (newWalletState.syncProgress?.synced == true) {
                console.log(`Your wallet address ${newWalletState.address}`)
                console.log(`Your seed ${walletConfig.seed}`)
                isConnected = true;
                const serializedState = await wallet!.serializeState();
                fs.writeFileSync("serializedState.txt", serializedState, { encoding: "utf8" });
                await waitForFunds(wallet);
            }
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : "Failed to restore wallet 🧐";
            console.error(errMsg)
        }
    }

    if (!wallet) {
        return undefined;
    }

    return { isConnected, wallet };
}


export const waitForSync = (wallet: Wallet) =>
    firstValueFrom(
        wallet.state().pipe(
            throttleTime(5_000),
            tap((state) => {
                const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
                const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
                console.info(
                    `Waiting for funds. Backend lag: ${sourceGap}, wallet lag: ${applyGap}, transactions=${state.transactionHistory.length}`,
                );
            }),
            filter((state) => {
                // Let's allow progress only if wallet is synced fully
                return state.syncProgress !== undefined && state.syncProgress.synced;
            }),
        ),
    );

async function waitForSyncProgress(walletState: Wallet) {
    await firstValueFrom(
        walletState.state().pipe(
            throttleTime(5_000),
            tap((state) => {
                const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
                const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
                console.info(
                    `Waiting for funds. Backend lag: ${sourceGap}, wallet lag: ${applyGap}, transactions=${state.transactionHistory.length}`,
                );
            }),
            filter((state) => {
                // Let's allow progress only if syncProgress is defined
                return state.syncProgress !== undefined;
            }),
        )
    )
}

const waitForFunds = async (wallet: Wallet) => {
    await firstValueFrom(
        wallet.state().pipe(
            throttleTime(5000), 
            tap((state) => {
                const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
                const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
                console.info(`Wallet lags by ${applyGap}, Backend lags ${sourceGap}, transaction history ${state.transactionHistory.length}`)
            }),
            filter((state) => {
                return state.syncProgress?.synced == true;
            }),
            map((s) => s.balances[nativeToken()] ?? 0n),
            filter((balance) => {
                console.info(`Wallet balance ${balance}`)
                return balance > 0n;
            })
        )
    )
}

const createProviders = (walletState: WalletState) => {
    return {
        
    }
}