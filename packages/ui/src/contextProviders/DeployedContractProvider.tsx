// import {
//   HydraStakeAPI,
//   type DeploymentParams,
//   type HydraStakeContractProvider,
//   type LedgerInfo,
// } from "../api/index";
// import type { Logger } from "pino";
// import {
//   createContext,
//   useContext,
//   useState,
//   type PropsWithChildren,
// } from "react";
// import { DappContext } from "./DappContextProvider";
// import type { ContractAddress } from "@midnight-ntwrk/zswap";
// import { MidnightWalletContext } from "./MidnightWalletProvider";

// export interface DeploymentProvider {
//   readonly isJoining: boolean;
//   readonly hasJoined: boolean;
//   readonly deployedHydraStakeApi: HydraStakeAPI | undefined;
//   readonly contractState: LedgerInfo | undefined;
//   joinPool: (
//     contractAddress: ContractAddress,
//     providers: HydraStakeContractProvider
//   ) => Promise<void>;
//   deployNewPool: (
//     providers: HydraStakeContractProvider,
//     deploymentParams: DeploymentParams
//   ) => Promise<void>;
// }

// export const DeployedContractContext = createContext<DeploymentProvider | null>(
//   null
// );

// interface DeployedContractProviderProps extends PropsWithChildren {
//   logger?: Logger;
//   contractAddress?: string;
// }

// export const DeployedContractProvider = ({
//   children,
//   logger,
// }: DeployedContractProviderProps) => {
//   const { hasConnected } = useContext(MidnightWalletContext)!;
//   const [deployedHydraStakeApi, setDeployedHydraStakeApi] = useState<
//     HydraStakeAPI | undefined
//   >(undefined);
//   const [isJoining, setIsJoining] = useState<boolean>(false);
//   const [isDeploying, setIsDeploying] = useState<boolean>(false);
//   const [contractState, setContractState] = useState<LedgerInfo | undefined>(
//     undefined
//   );
//   const [hasJoined, setHasJoined] = useState<boolean>(false);
//   const { setNotification } = useContext(DappContext)!;

//   const joinPool = async (
//     contractAddress: ContractAddress,
//     providers: HydraStakeContractProvider
//   ) => {
//     if (isJoining || hasJoined || isDeploying) return;
//     if (!hasConnected) {
//       setNotification({
//         type: "error",
//         message: "Wallet must be connected before joining contract",
//       });
//       return;
//     }

//     if (!providers) {
//       setNotification({
//         type: "error",
//         message: "Provider not configured",
//       });
//       return;
//     }

//     setIsJoining(true);
//     setNotification(null);
//     try {
//       const deployedAPI = await HydraStakeAPI.joinHydraStakePool(
//         providers,
//         contractAddress
//       );
//       setDeployedHydraStakeApi(deployedAPI);
//       console.log({ deployedAPI });
//       setNotification({
//         type: "success",
//         message: "Contract joined Successfully",
//       });
//       setHasJoined(true);
//       console.log({ API: deployedAPI });
//     } catch (error) {
//       const errMsg =
//         error instanceof Error ? error.message : "Failed to deploy contract";
//       setNotification({
//         type: "error",
//         message: "An error occured",
//       });
//       logger?.error("Failed to deploy contract" + errMsg);
//     } finally {
//       setIsJoining(false);
//     }
//   };

//   const deployNewPool = async (
//     providers: HydraStakeContractProvider,
//     deploymentParams: Omit<DeploymentParams, "initialNonce">
//   ) => {
//     //confirm if user is admin: authorized function

//     try {
//       if (isJoining || hasJoined || isDeploying) return;
//       if (!hasConnected) {
//         setNotification({
//           type: "error",
//           message: "Wallet must be connected before joining contract",
//         });
//         return;
//       }

//       if (!providers) {
//         setNotification({
//           type: "error",
//           message: "Provider not configured",
//         });
//         return;
//       }
//       setIsJoining(true);
//       setNotification(null);
//       const deployedAPI = await HydraStakeAPI.deployHydraStakePool(
//         providers,
//         deploymentParams
//       );
//       setDeployedHydraStakeApi(deployedAPI);
//       setNotification({
//         type: "success",
//         message: "Contract joined Successfully",
//       });
//       setHasJoined(true);
//       console.log({ API: deployedAPI });
//     } catch (error) {
//       const errMsg =
//         error instanceof Error ? error.message : "Failed to deploy contract";
//       setNotification({
//         type: "error",
//         message: "An error occured",
//       });
//       logger?.error("Failed to deploy contract" + errMsg);
//     } finally {
//       setIsJoining(false);
//     }
//   };

//   const contextValue: DeploymentProvider = {
//     isJoining,
//     hasJoined,
//     deployedHydraStakeApi,
//     joinPool,
//     deployNewPool,
//     contractState,
//   };

//   return (
//     <DeployedContractContext.Provider value={contextValue}>
//       {children}
//     </DeployedContractContext.Provider>
//   );
// };
