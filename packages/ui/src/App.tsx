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
import { Loader2 } from "lucide-react";

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
  // const notificationContext = useContext(DappContext);



  const handleActionComplete = (success: boolean, message: string) => {
    setNotification({ type: success ? "success" : "error", message });
    setIsStakingOpen(false);
    setTimeout(() => setNotification(null), 4000);
  };



  if (deploymentContext?.isJoining) {
    return <div className="w-full h-screen flex justify-center items-center">
      <Loader2 className="fill-[#00d9ff] h-24 w-24 animate-spin delay-1000" />
    </div>
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
  )
}

export default App;
