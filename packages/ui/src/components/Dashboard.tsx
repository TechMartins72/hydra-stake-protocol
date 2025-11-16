import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Zap, Lock, Wallet, TrendingUp, DollarSign, Award } from "lucide-react";
import PoolCard from "./PoolCard";
import { useContext, useState } from "react";
import { DappContext } from "../contextProviders/DappContextProvider";
import { MidnightWalletContext } from "@/contextProviders/MidnightWalletProvider";

const stakingData = [
  { month: "Jan", amount: 4000 },
  { month: "Feb", amount: 5200 },
  { month: "Mar", amount: 6800 },
  { month: "Apr", amount: 7400 },
  { month: "May", amount: 8900 },
  { month: "Jun", amount: 9800 },
];

const rewardsData = [
  { day: "Mon", rewards: 120 },
  { day: "Tue", rewards: 150 },
  { day: "Wed", rewards: 140 },
  { day: "Thu", rewards: 180 },
  { day: "Fri", rewards: 200 },
  { day: "Sat", rewards: 190 },
  { day: "Sun", rewards: 220 },
];

const Dashboard = () => {
  const {
    hasConnected,
    contractState,
    privateState,
    isLoadingState,
    deployedHydraAPI,
  } = useContext(MidnightWalletContext)!;
  const { setNotification, setIsStakingOpen } = useContext(DappContext)!;
  const [isRedeeming, setIsRedeeming] = useState<boolean>(false);

  // Mock user data - replace with actual data from your context/API
  const [userStats] = useState({
    assetBalance: 0, // User's tDUST balance
    stAssetBalance: 0, // User's sttDUST balance
    totalStaked: 0, // Total amount user has staked
    totalRewards: 0, // Total rewards earned
  });

  // Redeem handler
  const handleRedeemStake = async () => {
    try {
      if (!deployedHydraAPI) {
        return;
      }

      setIsRedeeming(true);
      await deployedHydraAPI.redeem(
        Number(privateState?.stakeMetadata.stAssets_minted)
      );
    } catch (error) {
      console.log({ error });
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-4 py-8 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="glass glass-hover rounded-2xl p-8 border border-border/50">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-foreground to-accent bg-clip-text text-transparent mb-2">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground text-lg">
                  Maximize your crypto returns with our liquid staking protocol
                </p>
              </div>
              <button
                onClick={() => {
                  hasConnected
                    ? setIsStakingOpen(true)
                    : setNotification({
                        type: "error",
                        message: "Connect wallet to stake",
                      });
                }}
                className="px-8 py-3 bg-accent text-accent-foreground rounded-xl font-semibold hover:shadow-lg hover:glow-accent-hover transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Zap className="w-5 h-5" />
                Start Staking
              </button>
            </div>
          </div>

          {/* User Personal Stats */}
          {hasConnected && (
            <div className="glass rounded-3xl p-8 border border-cyan-500/20 bg-linear-to-br from-cyan-950/40 via-blue-950/20 to-transparent">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <Wallet className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Your Portfolio
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="glass glass-hover rounded-2xl p-6 border border-purple-500/30 bg-linear-to-br from-purple-500/5 to-transparent">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-300">
                      stAsset Minted
                    </h3>
                  </div>
                  {isLoadingState ? (
                    <div className="h-9 w-32 bg-purple-500/10 animate-pulse rounded" />
                  ) : (
                    <p className="text-3xl font-bold text-white mb-1">
                      {privateState?.stakeMetadata.stAssets_minted} sttDUST
                    </p>
                  )}
                </div>

                <div className="glass glass-hover rounded-2xl p-6 border border-emerald-500/30 bg-linear-to-br from-emerald-500/5 to-transparent">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-300">
                      {privateState?.stakeMetadata.deposit_amount}
                    </h3>
                  </div>
                  {isLoadingState ? (
                    <div className="h-9 w-32 bg-emerald-500/10 animate-pulse rounded" />
                  ) : (
                    <p className="text-3xl font-bold text-white mb-1">
                      {privateState?.stakeMetadata.redeemable! -
                        privateState?.stakeMetadata.deposit_amount!}{" "}
                      tDUST
                    </p>
                  )}
                </div>

                <div className="glass glass-hover rounded-2xl p-6 border border-amber-500/30 bg-linear-to-br from-amber-500/5 to-transparent">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Award className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-300">
                      Total Rewards
                    </h3>
                  </div>
                  {isLoadingState ? (
                    <div className="h-9 w-32 bg-amber-500/10 animate-pulse rounded" />
                  ) : (
                    <p className="text-3xl font-bold text-white mb-1">
                      {userStats.totalRewards.toLocaleString()} tDUST
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Pools Section */}
          <div className="glass rounded-3xl p-8 border border-blue-500/20 bg-linear-to-br from-blue-950/40 via-indigo-950/20 to-transparent">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Lock className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pools
              </h2>
            </div>
            <div className="flex flex-col justify-center items-center w-full gap-4">
              <PoolCard
                token="tDUST/sttDUST"
                title="tDUST Pool"
                icon={<Lock className="w-5 h-5 text-blue-400" />}
              />
            </div>
          </div>

          {/* Protocol Stats Grid */}
          <div className="glass rounded-3xl p-8 border border-indigo-500/20 bg-linear-to-br from-indigo-950/40 via-slate-950/20 to-transparent">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-indigo-500/20">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Protocol Statistics
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass glass-hover rounded-2xl p-6 border border-green-500/30 bg-linear-to-br from-green-500/5 to-transparent">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Lock className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-300">
                    Pool Status
                  </h3>
                </div>
                {isLoadingState ? (
                  <div className="h-9 w-32 bg-green-500/10 animate-pulse rounded" />
                ) : (
                  <>
                    <p className="text-3xl font-bold text-white capitalize mb-1">
                      {contractState?.stakePoolStatus === 0
                        ? "Available"
                        : "Delegated"}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-sm text-green-400">Active</p>
                    </div>
                  </>
                )}
              </div>

              <div className="glass glass-hover rounded-2xl p-6 border border-blue-500/30 bg-linear-to-br from-blue-500/5 to-transparent">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-300">
                    Total stAsset Minted
                  </h3>
                </div>
                {isLoadingState ? (
                  <div className="h-9 w-20 bg-blue-500/10 animate-pulse rounded" />
                ) : (
                  <>
                    <p className="text-3xl font-bold text-white mb-1">
                      {String(contractState?.totalMint) ?? 0}
                    </p>
                    <p className="text-sm text-blue-400">sttDUST</p>
                  </>
                )}
              </div>

              <div className="glass glass-hover rounded-2xl p-6 border border-violet-500/30 bg-linear-to-br from-violet-500/5 to-transparent">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-violet-500/10">
                    <Wallet className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-300">
                    Protocol TVL
                  </h3>
                </div>
                {isLoadingState ? (
                  <div className="h-9 w-24 bg-violet-500/10 animate-pulse rounded" />
                ) : (
                  <>
                    <p className="text-3xl font-bold text-white mb-1">
                      {String(contractState?.protocolTVL.value) ?? 0}
                    </p>
                    <p className="text-sm text-violet-400">tDUST</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass glass-hover rounded-2xl p-6 border border-border/50">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent glow-accent" />
                Staking Growth
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stakingData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(0, 217, 255, 0.1)"
                  />
                  <XAxis stroke="rgba(232, 232, 255, 0.5)" />
                  <YAxis stroke="rgba(232, 232, 255, 0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0A0A4D",
                      border: "1px solid rgba(0, 217, 255, 0.3)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#E8E8FF" }}
                  />
                  <Bar dataKey="amount" fill="#00D9FF" radius={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass glass-hover rounded-2xl p-6 border border-border/50">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent glow-accent" />
                Weekly Rewards
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={rewardsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(0, 217, 255, 0.1)"
                  />
                  <XAxis stroke="rgba(232, 232, 255, 0.5)" />
                  <YAxis stroke="rgba(232, 232, 255, 0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0A0A4D",
                      border: "1px solid rgba(0, 217, 255, 0.3)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#E8E8FF" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rewards"
                    stroke="#00D9FF"
                    dot={{ fill: "#00D9FF", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
