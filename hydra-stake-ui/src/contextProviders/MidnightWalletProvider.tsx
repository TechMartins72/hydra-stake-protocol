import { connectWallet } from "../lib/walletConnection";
import {
  type WalletAPI,
  type HydraStakeCircuitKeys,
  HydraStakePrivateStateKey,
  type HydraStakeContractProvider,
  HydraStakeAPI,
  type LedgerInfo,
  type DeploymentParams,
} from "../api/index";
import type { Logger } from "pino";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import {
  Transaction as ZswapTransaction,
  type ContractAddress,
  type TransactionId,
} from "@midnight-ntwrk/zswap";
import { PrivateStateProviderWrapper } from "./providers/privateStateProvider";
import { levelPrivateStateProvider } from "@midnight-ntwrk/midnight-js-level-private-state-provider";
import {
  createBalancedTx,
  ZKConfigProvider,
  type BalancedTransaction,
  type MidnightProvider,
  type PrivateStateProvider,
  type ProofProvider,
  type PublicDataProvider,
  type UnbalancedTransaction,
  type WalletProvider,
} from "@midnight-ntwrk/midnight-js-types";
import { WrappedPublicStateProvider } from "./providers/publicStateProvider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import type { CoinInfo } from "@midnight-ntwrk/compact-runtime";
import {
  getLedgerNetworkId,
  getZswapNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { nativeToken, Transaction } from "@midnight-ntwrk/ledger";
import { noProofClient, proofClient } from "./providers/proofProvider";
import { WrappedZKConfigProvider } from "./providers/zkConfigProvider";
import type {
  HydraStakePrivateState,
  StakePrivateState,
} from "@repo/hydra-stake-protocol";
import { DappContext } from "./DappContextProvider";

interface WalletAPIType extends WalletAPI {
  address: string | undefined;
}

export interface MidnightWalletState {
  readonly address: string | undefined;
  readonly isConnecting: boolean;
  readonly hasConnected: boolean;
  readonly coinPublicKey: string | undefined;
  readonly encryptionPublicKey: string | undefined;
  readonly providers: HydraStakeContractProvider | undefined;
  readonly walletAPI: WalletAPIType | undefined;
  readonly error: string | null;
}

export type MidnightWalletContextType = {
  connectFn: () => Promise<void>;
  isConnecting: boolean;
  hasConnected: boolean;
  state: MidnightWalletState;
  providers: HydraStakeContractProvider | undefined;
  privateStateProvider: PrivateStateProvider<
    typeof HydraStakePrivateStateKey,
    HydraStakePrivateState
  >;
  deployedHydraStakeApi: HydraStakeAPI | undefined;
  publicDataProvider: PublicDataProvider;
  midnightProvider: MidnightProvider;
  walletProvider: WalletProvider;
  zkConfigProvider: ZKConfigProvider<HydraStakeCircuitKeys>;
  checkProofServerStatus: (uri: string) => Promise<void>;
  proofProvider: ProofProvider<string>;
  disconnect: () => Promise<void>;
  contractState: LedgerInfo | undefined;
  privateState: StakePrivateState | null;
  setPrivateState: Dispatch<SetStateAction<StakePrivateState | null>>;
  isLoadingState: boolean;
  setIsLoadingState: Dispatch<SetStateAction<boolean>>;
};

export const MidnightWalletContext =
  createContext<MidnightWalletContextType | null>(null);

const MidnightWalletProvider = ({
  children,
  logger,
}: PropsWithChildren<{ logger: Logger }>) => {
  const { setNotification } = useContext(DappContext)!;
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [hasConnected, setHasConnected] = useState<boolean>(false);
  const [walletAPI, setWalletAPI] = useState<WalletAPIType | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [providers, setProviders] = useState<
    HydraStakeContractProvider | undefined
  >(undefined);
  const [walletState, setWalletState] = useState<MidnightWalletState>({
    address: undefined,
    isConnecting: false,
    hasConnected: false,
    coinPublicKey: undefined,
    encryptionPublicKey: undefined,
    providers: undefined,
    walletAPI: undefined,
    error: null,
  });
  const [deployedHydraStakeApi, setDeployedHydraStakeApi] = useState<
    HydraStakeAPI | undefined
  >(undefined);
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [privateState, setPrivateState] = useState<StakePrivateState | null>(
    null
  );
  const [contractState, setContractState] = useState<LedgerInfo | undefined>(
    undefined
  );
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);

  // const params: DeploymentParams = {
  //   ValidAssetCoinType: nativeToken(),
  //   MintDomain: "hydra-stake:tdust-pool",
  //   DelegationContractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
  //   ScaleFactor: 1000000,
  // };

  useEffect(() => {
    if (!providers) {
      return;
    }
    HydraStakeAPI.getPrivateState(providers).then((value) =>
      setPrivateState(value.stakeMetadata)
    );
  }, [contractState]);

  useEffect(() => {
    if (!providers) {
      return;
    }

    const params: DeploymentParams = {
      ValidAssetCoinType: nativeToken(),
      MintDomain: "hydra-stake:tdust-pool",
      DelegationContractAddress: import.meta.env.VITE_DUMMY_CONTRACT_ADDRESS,
      ScaleFactor: 1000000,
    };

    console.log("joining...")
    joinPool(import.meta.env.VITE_CONTRACT_ADDRESS);
    console.log("joined");
  }, [providers]);

  useEffect(() => {
    if (!deployedHydraStakeApi) {
      return;
    }
    const subscription = deployedHydraStakeApi.state$.subscribe((state) => {
      console.log({ state });
      setContractState(state);
      return;
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [deployedHydraStakeApi?.state$]);

  const checkProofServerStatus = async (uri: string) => {
    try {
      const result = await fetch(`${uri}`);
      if (result.ok) {
        setNotification({
          type: "success",
          message: "Proof-server is active",
        });
      } else {
        setNotification({
          type: "error",
          message: "Proof-server is in-active",
        });
      }
    } catch (error) {
      const errMsg =
        error instanceof Error
          ? `Proof server inactive: ${error.message}`
          : "Prove server not responding";
      setNotification({
        type: "error",
        message: "An error occured",
      });
      console.log(errMsg);
    }
  };

  const privateStateProvider = useMemo(
    () =>
      new PrivateStateProviderWrapper(
        levelPrivateStateProvider({
          privateStateStoreName: HydraStakePrivateStateKey,
        }),
        logger
      ),
    []
  );

  const publicDataProvider = useMemo(
    () =>
      new WrappedPublicStateProvider(
        indexerPublicDataProvider(
          import.meta.env.VITE_INDEXER_URL as string,
          import.meta.env.VITE_INDEXER_WS_URL as string
        ),
        logger
      ),
    []
  );

  const walletProvider = useMemo(() => {
    if (walletAPI) {
      return {
        coinPublicKey: walletAPI.coinPublicKey,
        encryptionPublicKey: walletAPI.encryptionPublicKey,
        balanceTx(
          tx: UnbalancedTransaction,
          newCoins: CoinInfo[]
        ): Promise<BalancedTransaction> {
          return walletAPI.wallet
            .balanceAndProveTransaction(
              ZswapTransaction.deserialize(
                tx.serialize(getLedgerNetworkId()),
                getZswapNetworkId()
              ),
              newCoins
            )
            .then((zswapTx) =>
              Transaction.deserialize(
                zswapTx.serialize(getZswapNetworkId()),
                getLedgerNetworkId()
              )
            )
            .then(createBalancedTx);
        },
      };
    } else {
      return {
        coinPublicKey: "",
        encryptionPublicKey: "",
        balanceTx: () => {
          return Promise.reject(
            new Error("Wallet API not set @walletProvider")
          );
        },
      };
    }
  }, [walletAPI]);

  const proofProvider = useMemo(() => {
    const proof_server_uri = import.meta.env.VITE_PROOF_SERVER_URI;
    if (walletAPI && proof_server_uri) {
      return proofClient(proof_server_uri as string);
    } else {
      return noProofClient();
    }
  }, [walletAPI]);

  const zkConfigProvider = useMemo(
    () =>
      new WrappedZKConfigProvider<HydraStakeCircuitKeys>(
        window.location.origin,
        fetch.bind(window)
      ),
    []
  );

  const midnightProvider = useMemo(() => {
    if (walletAPI) {
      return {
        submitTx(tx: BalancedTransaction): Promise<TransactionId> {
          return walletAPI.wallet.submitTransaction(tx);
        },
      };
    } else {
      return {
        submitTx() {
          return Promise.reject(
            new Error("Wallet API not found @midnightProvider")
          );
        },
      };
    }
  }, [walletAPI]);

  const reconnectToWalletAndProviders = async () => {
    // Check if we should attempt reconnection
    const wasConnected = sessionStorage.getItem("WALLET_CONNECTED");
    if (!wasConnected || wasConnected !== "true") {
      return;
    }

    setIsConnecting(true);
    logger?.info("Attempting to reconnect wallet...");

    try {
      const { wallet, uris } = await connectWallet();

      const connectedWalletState = await wallet.state();

      // Validate the wallet state
      if (
        !connectedWalletState.address ||
        !connectedWalletState.coinPublicKey
      ) {
        throw new Error("Invalid wallet state - missing required fields");
      }

      const newWalletAPI = {
        address: connectedWalletState.address,
        coinPublicKey: connectedWalletState.coinPublicKey,
        encryptionPublicKey: connectedWalletState.encryptionPublicKey,
        wallet: wallet,
        uris: uris,
      };

      setWalletAPI(newWalletAPI);
      setHasConnected(true);

      // Check proof server status
      await checkProofServerStatus(uris.proverServerUri);
      setNotification({
        type: "success",
        message: "Reconnected Successfully",
      });

      logger?.info("Wallet reconnection successful");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to reconnect to wallet";

      setError(errorMessage);
      setHasConnected(false);

      // Clear the connection flag if reconnection fails
      sessionStorage.removeItem("WALLET_CONNECTED");
      sessionStorage.removeItem("WALLET_STATE");

      setNotification({
        type: "success",
        message: "Failed to reconnect wallet. Please connect manually.",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Enables user connect their wallet to the DAPP
  const connect = async () => {
    if (hasConnected || isConnecting) {
      return;
    }
    setIsConnecting(true);
    setError(undefined);
    logger?.info("Connecting to wallet....");

    try {
      const { wallet, uris } = await connectWallet();
      if (!wallet.state) {
        setNotification({
          type: "error",
          message: "Lace Wallet Not Found.",
        });
        return;
      }
      const connectedWalletState = await wallet.state();

      // Validate the wallet state
      if (
        !connectedWalletState.address ||
        !connectedWalletState.coinPublicKey
      ) {
        throw new Error("Invalid wallet state - missing required fields");
      }

      const newWalletAPI = {
        address: connectedWalletState.address,
        coinPublicKey: connectedWalletState.coinPublicKey,
        encryptionPublicKey: connectedWalletState.encryptionPublicKey,
        wallet: wallet,
        uris: uris,
      };

      setWalletAPI(newWalletAPI);
      setHasConnected(true);

      // Store connection state only after successful connection
      sessionStorage.setItem("WALLET_CONNECTED", "true");

      // Check proof server status
      const proof_server_uri = import.meta.env.VITE_PROOF_SERVER_URI;
      await checkProofServerStatus(proof_server_uri && proof_server_uri);
      setNotification({
        type: "success",
        message: "Connected successfully",
      });

      logger?.info("Wallet connection successful");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to connect to wallet";

      setError(errorMessage);
      setHasConnected(false);
      console.log({ errorMessage });
      setNotification({
        type: "error",
        message: "An error occured",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    sessionStorage.removeItem("WALLET_STATE");
    sessionStorage.removeItem("WALLET_CONNECTED");
    setWalletAPI(undefined);
    setWalletState({
      address: undefined,
      isConnecting: false,
      hasConnected: false,
      coinPublicKey: undefined,
      encryptionPublicKey: undefined,
      providers: undefined,
      walletAPI: undefined,
      error: null,
    });
    window.location.reload();
  };

  const joinPool = async (contractAddress: ContractAddress) => {
    if (isJoining || hasJoined || isDeploying) return;
    if (!hasConnected) {
      setNotification({
        type: "error",
        message: "Wallet must be connected before joining contract",
      });
      return;
    }

    if (!providers) {
      setNotification({
        type: "error",
        message: "Provider not configured",
      });
      return;
    }

    setIsJoining(true);
    setNotification(null);
    try {
      const deployedAPI = await HydraStakeAPI.joinHydraStakePool(
        providers,
        contractAddress
      );
      setDeployedHydraStakeApi(deployedAPI);
      console.log({ deployedAPI });
      setNotification({
        type: "success",
        message: "Contract joined Successfully",
      });
      setHasJoined(true);
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to deploy contract";
      setNotification({
        type: "error",
        message: "An error occured",
      });
      logger?.error("Failed to deploy contract" + errMsg);
    } finally {
      setIsJoining(false);
    }
  };

  const deployNewPool = async (deploymentParams: DeploymentParams) => {
    //confirm if user is admin: authorized function

    try {
      if (isJoining || hasJoined || isDeploying) return;
      if (!hasConnected) {
        setNotification({
          type: "error",
          message: "Wallet must be connected before joining contract",
        });
        return;
      }

      if (!providers || !walletState.address) {
        setNotification({
          type: "error",
          message: "Provider not configured",
        });
        return;
      }
      setIsJoining(true);
      setNotification(null);
      const deployedAPI = await HydraStakeAPI.deployHydraStakePool(
        walletState.address,
        providers,
        deploymentParams
      );
      setDeployedHydraStakeApi(deployedAPI);
      setNotification({
        type: "success",
        message: "Contract joined Successfully",
      });
      setHasJoined(true);
      console.log({ API: deployedAPI });
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to deploy contract";
      setNotification({
        type: "error",
        message: "An error occured",
      });
      logger?.error("Failed to deploy contract" + errMsg);
    } finally {
      setIsJoining(false);
    }
  };

  // Sets the wallet state as soon as the walletAPI is available after connection
  useEffect(() => {
    if (!walletAPI) return;

    const newState: MidnightWalletState = {
      address: walletAPI.address,
      walletAPI: walletAPI,
      coinPublicKey: walletAPI.coinPublicKey,
      isConnecting: isConnecting,
      hasConnected: hasConnected,
      encryptionPublicKey: walletAPI.encryptionPublicKey,
      error: error || null,
      providers: {
        privateStateProvider,
        proofProvider,
        publicDataProvider,
        zkConfigProvider,
        midnightProvider,
        walletProvider,
      },
    };

    setWalletState(newState);

    // Store wallet state only after successful setup
    sessionStorage.setItem("WALLET_STATE", JSON.stringify(newState));

    const newProviders = {
      privateStateProvider,
      publicDataProvider,
      zkConfigProvider,
      midnightProvider,
      walletProvider,
      proofProvider,
    };

    setProviders(newProviders);
  }, [
    walletAPI,
    hasConnected,
    isConnecting,
    error,
    privateStateProvider,
    publicDataProvider,
    midnightProvider,
    walletProvider,
    zkConfigProvider,
    proofProvider,
  ]);

  // Initiates wallet reconnection on component mount
  useEffect(() => {
    void reconnectToWalletAndProviders();
  }, []); // Only run once on mount

  const contextWalletValue: MidnightWalletContextType = useMemo(
    () => ({
      state: walletState,
      connectFn: connect,
      privateStateProvider,
      publicDataProvider,
      midnightProvider,
      walletProvider,
      zkConfigProvider,
      proofProvider,
      isConnecting,
      hasConnected,
      providers,
      disconnect,
      checkProofServerStatus: checkProofServerStatus,
      isJoining,
      hasJoined,
      deployedHydraStakeApi,
      joinPool,
      deployNewPool,
      privateState,
      setPrivateState,
      contractState,
      setIsLoadingState,
      isLoadingState,
    }),
    [
      walletState,
      privateStateProvider,
      publicDataProvider,
      midnightProvider,
      walletProvider,
      zkConfigProvider,
      proofProvider,
      isConnecting,
      hasConnected,
      providers,
      isJoining,
      hasJoined,
      deployedHydraStakeApi,
      joinPool,
      deployNewPool,
      privateState,
      setPrivateState,
      contractState,
    ]
  );

  return (
    <MidnightWalletContext.Provider value={contextWalletValue}>
      {children}
    </MidnightWalletContext.Provider>
  );
};

export default MidnightWalletProvider;
