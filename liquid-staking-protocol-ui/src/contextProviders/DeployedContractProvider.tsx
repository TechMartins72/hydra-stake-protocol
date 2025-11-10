import {
  LiquidStakingAPI,
  type DeployedLiquidStakingAPI,
  type DerivedState,
} from "@repo/liquid-staking-api";

import type { Logger } from "pino";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { MidnightWalletContext } from "./MidnightWalletProvider";
import { DappContext } from "./DappContextProvider";

export interface DeploymentProvider {
  readonly isJoining: boolean;
  readonly hasJoined: boolean;
  readonly deployedLiquidStakingApi: LiquidStakingAPI | undefined;
  readonly contractState: DerivedState | undefined;
  joinContract: () => Promise<void>;
}

export const DeployedContractContext = createContext<DeploymentProvider | null>(
  null
);

interface DeployedContractProviderProps extends PropsWithChildren {
  logger?: Logger;
  contractAddress?: string;
}

export const DeployedContractProvider = ({
  children,
  logger,
}: DeployedContractProviderProps) => {
  const [deployedLiquidStakingApi, setDeployedLiquidStakingApi] = useState<
    LiquidStakingAPI | undefined
  >(undefined);
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [contractState, setContractState] = useState<DerivedState | undefined>(
    undefined
  );
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const { hasConnected, providers } = useContext(MidnightWalletContext)!;
  const { setNotification } = useContext(DappContext)!;

  const joinContract = async () => {
    if (isJoining || hasJoined) return;
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
      const deployedAPI = await LiquidStakingAPI.joinLiquidStakingContract(
        providers,
        "020072d746dbec791445f9a69a2b8290a51f7dde8e46a7ad1aea92ad74dfe0b2ea5c"
      );
      setDeployedLiquidStakingApi(deployedAPI);
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

  const contextValue: DeploymentProvider = {
    isJoining,
    hasJoined,
    deployedLiquidStakingApi,
    joinContract,
    contractState,
  };

  return (
    <DeployedContractContext.Provider value={contextValue}>
      {children}
    </DeployedContractContext.Provider>
  );
};
