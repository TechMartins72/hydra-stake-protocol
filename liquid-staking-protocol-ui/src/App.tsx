import { useContext, useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import StakingModal from "./components/StakingModal";
import NotificationCenter from "./components/NotificationCenter";
import { DappContext } from "./contextProviders/DappContextProvider";
import HistoryPage from "./components/History";
import StakeDetailPage from "./components/StakeDetails";
import { MidnightWalletContext } from "./contextProviders/MidnightWalletProvider";
import UnauthenticatedPage from "./components/UnauthenticatedPage";
import { DeployedContractContext } from "./contextProviders/DeployedContractProvider";

function App() {
  const { hasConnected, providers } = useContext(MidnightWalletContext)!;
  const { joinContract } = useContext(DeployedContractContext)!;

  useEffect(() => {
    if (!hasConnected) {
      return;
    }
    console.log("Joining Contract");
    const deploy = async () => {
      await joinContract();
    };

    deploy(); 
  }, [hasConnected, providers]);

  const { notification, setNotification, route } = useContext(DappContext)!;

  const [isStakingOpen, setIsStakingOpen] = useState(false);

  const handleStakeClick = () => setIsStakingOpen(true);

  const handleStakingComplete = (success: boolean, message: string) => {
    setNotification({ type: success ? "success" : "error", message });
    setIsStakingOpen(false);
    setTimeout(() => setNotification(null), 4000);
  };

  return hasConnected ? (
    <>
      <Header />
      {route === "dashboard" && <Dashboard onStakeClick={handleStakeClick} />}
      {route === "history" && <HistoryPage />}
      {route === "stakedetails" && <StakeDetailPage />}
      <StakingModal
        isOpen={isStakingOpen}
        onClose={() => setIsStakingOpen(false)}
        onComplete={handleStakingComplete}
      />
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
