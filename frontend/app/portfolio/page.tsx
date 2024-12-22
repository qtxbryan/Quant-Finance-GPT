"use client";

import { useState } from "react";
import { Sidebar } from "@/components/common/side-nav";
import { PortfolioChart } from "@/components/portfolio-chart";
import { PortfolioAssets } from "@/components/portfolio-assets";
import { LoanTable } from "@/components/loan-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, BarChart2 } from "lucide-react";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("Assets");

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Header Section */}
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Estimated Balance</h1>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">278,165.21 USD</span>
                <span className="text-destructive text-sm">
                  -$1200.78 (-1.89%)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-lg">
                <span className="text-sm">Monthly</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <Button variant="outline" size="icon">
                <BarChart2 className="w-4 h-4" />
              </Button>
            </div>
          </header>

          {/* Chart Tabs */}
          <div className="card p-6">
            <div className="flex items-center gap-4 mb-6">
              {["Assets", "Profits", "Deposits"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={cn(
                    "text-sm font-medium px-3 py-1 rounded-lg transition-colors",
                    selectedTab === tab
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <PortfolioChart selectedTab={selectedTab} />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <LoanTable />
            </div>
            <div>
              <PortfolioAssets />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
