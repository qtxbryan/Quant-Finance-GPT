"use client";

import { motion } from "framer-motion";

const usageData = [
  { month: "Mar", percentage: 65, label: "BTC" },
  { month: "Apr", percentage: 55, label: "ETH" },
  { month: "May", percentage: 45, label: "ETH" },
];

export function UsagePlan() {
  return (
    <div className="card card-hover p-6">
      <div className="text-sm text-muted mb-6 flex items-center justify-between">
        Usage plan
        <div className="text-xs font-medium">Mar 23 - Jul 12</div>
      </div>
      <div className="space-y-4">
        {usageData.map((data, index) => (
          <motion.div
            key={data.month}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm">{data.month}</div>
              <div className="text-sm">{data.label}</div>
            </div>
            <div className="relative h-3 bg-card rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${data.percentage}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-3xl font-bold">72%</div>
    </div>
  );
}
