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
import { Zap, Lock } from "lucide-react";
import PoolCard from "./PoolCard";
import { useContext, useEffect, useState } from "react";
import { DappContext } from "../contextProviders/DappContextProvider";
import { MidnightWalletContext } from "@/contextProviders/MidnightWalletProvider";
import { DeployedContractContext } from "@/contextProviders/DeployedContractProvider";
import type { ContractAddress } from "@midnight-ntwrk/zswap";
import type { LedgerInfo } from "@/api";

interface DashboardProps {
  onStakeClick: () => void;
}

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

const Dashboard = ({ onStakeClick }: DashboardProps) => {
  const { providers, hasConnected } = useContext(MidnightWalletContext)!;
  const { joinPool, deployedHydraStakeApi, hasJoined } = useContext(
    DeployedContractContext
  )!;
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
  const [ledgerState, setLedgerState] = useState<LedgerInfo | null>(null);
  const { setNotification } = useContext(DappContext)!;

  const handleJoinPool = async () => {
    try {
      if (!providers) {
        return;
      }
      await joinPool(
        import.meta.env.VITE_CONTRACT_ADDRESS as ContractAddress,
        providers
      );
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    handleJoinPool();
  }, [deployedHydraStakeApi, hasConnected]);

  useEffect(() => {
    if (!deployedHydraStakeApi) return;

    setIsLoadingState(true);
    const stateSubscription = deployedHydraStakeApi.state$.subscribe(
      (state: LedgerInfo) => {
        setIsLoadingState(true);
        setLedgerState(state);
        console.log({ state });
        setIsLoadingState(false);
      }
    );

    return () => {
      stateSubscription.unsubscribe();
    };
  }, [deployedHydraStakeApi]);

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
                    ? onStakeClick()
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
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-foreground to-accent bg-clip-text text-transparent mb-6">
            Pools
          </h1>
          {/* Stats Grid */}
          <div className="flex flex-col justify-center items-center w-full gap-4">
            <PoolCard
              token="tDUST/sttDUST"
              title="tDUST Pool"
              icon={<Lock className="w-5 h-5 text-accent" />}
            />
            <PoolCard
              token="NIGHT/stNIGHT"
              title="NIGHT Pool"
              icon={<Lock className="w-5 h-5 text-accent" />}
              disabled
            />
            <PoolCard
              token="ADA/stADA"
              title="ADA Pool"
              icon={<Lock className="w-5 h-5 text-accent" />}
              disabled
            />
          </div>

          {/* User Stats Grid */}
          {hasJoined && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass glass-hover rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-5 h-5 text-accent" />
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Pool Status
                  </h3>
                </div>
                {isLoadingState ? (
                  <div className="h-9 w-32 bg-accent/10 animate-pulse rounded" />
                ) : (
                  <p className="text-3xl font-bold text-foreground capitalize">
                    Available
                  </p>
                )}
              </div>

              <div className="glass glass-hover rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-5 h-5 text-accent" />
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Total stAsset Minted
                  </h3>
                </div>
                {isLoadingState ? (
                  <div className="h-9 w-20 bg-accent/10 animate-pulse rounded" />
                ) : (
                  <p className="text-3xl font-bold text-foreground">
                    {ledgerState?.total_stAsset_Minted}
                  </p>
                )}
              </div>

              <div className="glass glass-hover rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-5 h-5 text-accent" />
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Total Stake Withdrawn
                  </h3>
                </div>
                {isLoadingState ? (
                  <div className="h-9 w-20 bg-accent/10 animate-pulse rounded" />
                ) : (
                  <p className="text-3xl font-bold text-foreground">
                    {ledgerState?.total_stake_withdrawn}
                  </p>
                )}
              </div>

              <div className="glass glass-hover rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-5 h-5 text-accent" />
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Protocol TVL
                  </h3>
                </div>
                {isLoadingState ? (
                  <div className="h-9 w-24 bg-accent/10 animate-pulse rounded" />
                ) : (
                  <p className="text-3xl font-bold text-foreground">
                    {ledgerState?.protocolTVL}
                  </p>
                )}
              </div>
            </div>
          )}
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

            {/* Rewards Over Time */}
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
