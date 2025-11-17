import { useContext, useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import StakingModal from "./components/StakingModal";
import NotificationCenter from "./components/NotificationCenter";
import { DappContext } from "./contextProviders/DappContextProvider";
import NewPoolModal from "./components/NewPoolModal";
import AdminDashboard from "./components/Admin";
import { MidnightWalletContext } from "./contextProviders/MidnightWalletProvider";
import UnauthenticatedPage from "./components/UnauthenticatedPage";
import { DeployedContractContext } from "./contextProviders/DeployedContractProvider";

function App() {
  const {
    notification,
    setNotification,
    route,
    isStakingOpen,
    setIsStakingOpen,
    isOpenCreatePool,
    action,
  } = useContext(DappContext)!;
  const walletContext = useContext(MidnightWalletContext);
  const deploymentContext = useContext(DeployedContractContext);
  const notificationContext = useContext(DappContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleActionComplete = (success: boolean, message: string) => {
    setNotification({ type: success ? "success" : "error", message });
    setIsStakingOpen(false);
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    (async () => {
      console.log("Trying to join contract")
      setIsLoading(true);
      try {
        await deploymentContext?.onJoinContract();
        console.log("Joined contract")
        setIsLoading(false);

      } catch (error) {
        setIsLoading(false);
        const errMsg =
          error instanceof Error ? error.message : "Failed to join contract";
        notificationContext?.setNotification({
          type: "error",
          message: errMsg
        });
      }
    })();
  }, [walletContext?.state]);


  if (isLoading) {
    return <div>Loading.....</div>
  }

  return walletContext?.hasConnected ? (
    <>
      <Header />
      {route === "dashboard" && <Dashboard />}
      {route === "admin" && <AdminDashboard />}
      {isStakingOpen && (
        <StakingModal
          action={action}
          onClose={() => setIsStakingOpen(false)}
          onComplete={handleActionComplete}
        />
      )}
      {isOpenCreatePool && (
        <NewPoolModal
          onClose={() => setIsStakingOpen(false)}
          onComplete={handleActionComplete}
        />
      )}
      <NotificationCenter notification={notification} />
      <Footer />
    </>
  ) : (
    <>
      <UnauthenticatedPage />
      <NotificationCenter notification={notification} />
    </>
  );
}

export default App;
