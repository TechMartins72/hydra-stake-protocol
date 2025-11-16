import { useContext } from "react";
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
  const {
    state: { hasConnected },
    hasJoined,
  } = useContext(MidnightWalletContext)!;

  const handleActionComplete = (success: boolean, message: string) => {
    setNotification({ type: success ? "success" : "error", message });
    setIsStakingOpen(false);
    setTimeout(() => setNotification(null), 4000);
  };

  return hasConnected && hasJoined ? (
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
