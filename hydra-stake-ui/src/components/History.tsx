"use client";

import { useContext, useState } from "react";
import { ChevronRight, Filter } from "lucide-react";
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
    completionDate: undefined,
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

export default function HistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "active" | "unstaking" | "completed"
  >("all");
  const { setRoute } = useContext(DappContext)!;

  const filteredStakes =
    selectedFilter === "all"
      ? mockStakes
      : mockStakes.filter((stake) => stake.status === selectedFilter);

  const totalRewards = mockStakes.reduce(
    (sum, stake) => sum + stake.rewards,
    0
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-4 py-8 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="glass glass-hover rounded-2xl p-8 border border-border/50">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  Staking History
                </h1>
                <p className="text-muted-foreground text-lg">
                  View and manage all your staking transactions
                </p>
              </div>
              <div className="glass rounded-xl p-6 border border-border/50">
                <p className="text-muted-foreground text-sm mb-1">
                  Total Rewards Earned
                </p>
                <p className="text-3xl font-bold text-accent">
                  {totalRewards.toFixed(2)} ETH
                </p>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {(["all", "active", "unstaking", "completed"] as const).map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize flex items-center gap-2 ${
                    selectedFilter === filter
                      ? "bg-accent text-accent-foreground"
                      : "bg-card text-foreground hover:bg-card/80 border border-border/50"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  {filter === "all" ? "All Stakes" : filter}
                </button>
              )
            )}
          </div>

          {/* Stakes List */}
          <div className="space-y-3 space-x-3">
            {filteredStakes.length > 0 ? (
              filteredStakes.map((stake) => (
                <button onClick={() => setRoute("stakedetails")} key={stake.id}>
                  <div className="glass glass-hover rounded-xl p-6 border border-border/50 cursor-pointer group">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            {stake.amount} {stake.token}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                              stake.status === "active"
                                ? "bg-green-500/20 text-green-400"
                                : stake.status === "unstaking"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {stake.status.charAt(0).toUpperCase() +
                              stake.status.slice(1)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div>
                            <p className="text-xs mb-1">Date</p>
                            <p className="text-foreground">
                              {new Date(stake.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs mb-1">APY</p>
                            <p className="text-accent font-semibold">
                              {stake.apy.toFixed(2)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs mb-1">Rewards</p>
                            <p className="text-accent font-semibold">
                              {stake.rewards.toFixed(2)} ETH
                            </p>
                          </div>
                          <div>
                            <p className="text-xs mb-1">Validator</p>
                            <p className="text-foreground">{stake.validator}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="glass rounded-xl p-12 border border-border/50 text-center">
                <p className="text-muted-foreground">
                  No stakes found with this filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
