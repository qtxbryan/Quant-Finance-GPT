"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bitcoin, EclipseIcon as Ethereum } from "lucide-react";

const assets = [
  {
    icon: Bitcoin,
    name: "BTC",
    amount: "0.58940",
    value: "37,983.64",
    change: "-1.81%",
    percentage: 55,
  },
  {
    icon: Ethereum,
    name: "ETH",
    amount: "0.58940",
    value: "9,942.86",
    change: "+3.42%",
    percentage: 29,
  },
];

export function PortfolioAssets() {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-6">Portfolio Assets</h2>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {assets.map((asset, index) => (
          <motion.div
            key={asset.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative aspect-square"
          >
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                backgroundColor: `hsl(var(--${
                  index === 0 ? "primary" : "secondary"
                }))`,
                opacity: 0.2,
              }}
            />
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <asset.icon className="w-6 h-6" />
              <div>
                <div className="text-sm font-medium">{asset.name}</div>
                <div className="text-xs text-muted-foreground">
                  {asset.percentage}%
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 rounded-lg bg-muted" />
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <span className="text-2xl">•••</span>
            <div>
              <div className="text-sm font-medium">Other</div>
              <div className="text-xs text-muted-foreground">16%</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="space-y-4">
        {assets.map((asset, index) => (
          <motion.div
            key={asset.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <asset.icon className="w-8 h-8" />
              <div>
                <div className="font-medium">
                  {asset.amount} {asset.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  ${asset.value} USD
                </div>
              </div>
            </div>
            <div
              className={cn(
                "text-sm",
                asset.change.startsWith("+")
                  ? "text-tertiary"
                  : "text-destructive"
              )}
            >
              {asset.change}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
