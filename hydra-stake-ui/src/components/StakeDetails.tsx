import { useContext, useState } from "react";
import { ArrowLeft, Copy, ExternalLink } from "lucide-react";
import type { Stake } from "../lib/types";
import { DappContext } from "@/contextProviders/DappContextProvider";

// Mock data - in production, this would come from an API
const mockStakes: Stake[] = [
  {
    id: "1",
    amount: 50,
    token: "ETH",
    date: "2024-11-01",
    status: "active",
    apy: 18.4,
    rewards: 2.5,
    validator: "Validator 001",
    transactionHash: "0x1234567890abcdef",
  },
  {
    id: "2",
    amount: 75.5,
    token: "ETH",
    date: "2024-10-15",
    status: "active",
    apy: 18.2,
    rewards: 5.8,
    validator: "Validator 002",
    transactionHash: "0xabcdefg1234567890",
  },
  {
    id: "3",
    amount: 32.25,
    token: "ETH",
    date: "2024-09-20",
    status: "completed",
    apy: 17.9,
    rewards: 4.2,
    validator: "Validator 001",
    transactionHash: "0xfedcba0987654321",
    completionDate: "2024-10-20",
  },
  {
    id: "4",
    amount: 100,
    token: "ETH",
    date: "2024-08-10",
    status: "completed",
    apy: 17.5,
    rewards: 8.1,
    validator: "Validator 003",
    transactionHash: "0x9876543210fedcba",
    completionDate: "2024-09-10",
  },
  {
    id: "5",
    amount: 45,
    token: "ETH",
    date: "2024-07-05",
    status: "unstaking",
    apy: 17.2,
    rewards: 3.6,
    validator: "Validator 002",
    transactionHash: "0x5555555555555555",
    completionDate: "2024-12-02",
  },
];

interface DetailCardProps {
  label: string;
  value: string | number;
  isHash?: boolean;
}

function DetailCard({ label, value, isHash }: DetailCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass rounded-xl p-6 border border-border/50">
      <p className="text-muted-foreground text-sm mb-2">{label}</p>
      <div className="flex items-center justify-between gap-3">
        <p className="text-foreground font-semibold text-lg break-all">
          {isHash
            ? `${String(value).slice(0, 10)}...${String(value).slice(-8)}`
            : value}
        </p>
        {isHash && (
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-card transition-all shrink-0"
            title={copied ? "Copied!" : "Copy"}
          >
            <Copy
              className={`w-4 h-4 ${
                copied ? "text-accent" : "text-muted-foreground"
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default function StakeDetailPage() {
  const { setRoute } = useContext(DappContext)!;
  const stakeId = "stake order id";

  const stake = mockStakes.find((s) => s.id === stakeId);

  if (!stake) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 px-4 py-8 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-12 border border-border/50 text-center">
              <p className="text-muted-foreground mb-4">Stake not found</p>
              <button
                onClick={() => setRoute("history")}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:shadow-lg transition-all"
              >
                Back to History
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const daysStaked = stake.completionDate
    ? Math.floor(
        (new Date(stake.completionDate).getTime() -
          new Date(stake.date).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : Math.floor(
        (new Date().getTime() - new Date(stake.date).getTime()) /
          (1000 * 60 * 60 * 24)
      );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-4 py-8 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <button
            onClick={() => {}}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-all font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to History
          </button>

          {/* Main Details */}
          <div className="glass glass-hover rounded-2xl p-8 border border-border/50">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {stake.amount} {stake.token} Staked
                </h1>
                <p className="text-muted-foreground">
                  Staking Status:{" "}
                  <span
                    className={`font-semibold ml-2 ${
                      stake.status === "active"
                        ? "text-green-400"
                        : stake.status === "unstaking"
                          ? "text-yellow-400"
                          : "text-blue-400"
                    }`}
                  >
                    {stake.status.charAt(0).toUpperCase() +
                      stake.status.slice(1)}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground text-sm mb-1">
                  Total Rewards
                </p>
                <p className="text-4xl font-bold text-accent">
                  {stake.rewards.toFixed(2)} ETH
                </p>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-background/50 rounded-xl p-4 border border-border/50">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Started</p>
                  <p className="text-foreground font-semibold">
                    {new Date(stake.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="hidden md:block flex-1 h-px bg-linear-to-r from-accent/50 to-transparent" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="text-foreground font-semibold">
                    {daysStaked} days
                  </p>
                </div>
                <div className="hidden md:block flex-1 h-px bg-linear-to-l from-accent/50 to-transparent" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {stake.completionDate ? "Completed" : "Current Status"}
                  </p>
                  <p className="text-foreground font-semibold">
                    {stake.completionDate
                      ? new Date(stake.completionDate).toLocaleDateString()
                      : "Ongoing"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailCard
              label="Annual Percentage Yield (APY)"
              value={`${stake.apy.toFixed(2)}%`}
            />
            <DetailCard label="Validator" value={stake.validator} />
            <DetailCard label="Days Staked" value={daysStaked} />
            <DetailCard
              label="Rewards Earned"
              value={`${stake.rewards.toFixed(2)} ETH`}
            />
          </div>

          {/* Transaction Details */}
          <div className="glass rounded-2xl p-8 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Transaction Details
            </h2>
            <div className="space-y-4">
              <DetailCard
                label="Transaction Hash"
                value={stake.transactionHash}
                isHash
              />
              <div className="flex items-center gap-2 text-accent hover:text-accent/80 cursor-pointer">
                <ExternalLink className="w-4 h-4" />
                <a
                  href={`https://etherscan.io/tx/${stake.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold"
                >
                  View on Etherscan
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {stake.status === "active" && (
            <div className="glass rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Actions
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:glow-accent-hover transition-all">
                  Request Unstaking
                </button>
                <button className="px-6 py-3 bg-card text-foreground border border-border/50 rounded-lg font-semibold hover:bg-card/80 transition-all">
                  View Rewards Details
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
