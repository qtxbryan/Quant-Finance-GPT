"use client";

import { motion } from "framer-motion";
import {
  Bitcoin,
  EclipseIcon as Ethereum,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const loans = [
  {
    id: 1,
    icon: Bitcoin,
    name: "Loan 1",
    collateral: "2.01",
    remainingLoan: "5,000 USD",
    ltv: "80%",
    maturityDate: "2024-07-20",
    status: "good",
  },
  {
    id: 2,
    icon: Ethereum,
    name: "Loan 2",
    collateral: "2.01",
    remainingLoan: "5,000 USD",
    ltv: "20%",
    maturityDate: "2024-07-20",
    status: "warning",
  },
];

export function LoanTable() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium">History</button>
          <button className="text-sm font-medium">Transactions</button>
          <button className="text-sm font-medium text-primary">Loans</button>
          <button className="text-sm font-medium">Payment</button>
          <button className="text-sm font-medium">Savings</button>
        </div>
        <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {loans.map((loan, index) => (
          <motion.div
            key={loan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="grid grid-cols-6 items-center gap-4 p-4 rounded-lg bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center">
                <loan.icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{loan.name}</span>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">Collateral</div>
              <div>{loan.collateral}</div>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">Remaining Loan</div>
              <div>{loan.remainingLoan}</div>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">LTV</div>
              <div>{loan.ltv}</div>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">Maturity Date</div>
              <div>{loan.maturityDate}</div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <div
                className={cn("status-indicator", `status-${loan.status}`)}
              />
              <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-muted/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Loan Status Overview</h3>
          <div className="text-2xl font-bold">68%</div>
        </div>
        <Progress value={68} className="h-2" />
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Paid</div>
            <div className="font-medium">20,145.28</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Pending</div>
            <div className="font-medium">12,165.42</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Unpaid</div>
            <div className="font-medium">8,165.21</div>
          </div>
        </div>
      </div>
    </div>
  );
}
