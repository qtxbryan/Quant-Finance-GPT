"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AreaChart, BarChart } from "@/components/charts";
import { PaymentHistory } from "@/components/payment-history";
import { UsagePlan } from "@/components/usage-plan";
import { ActiveInvestors } from "@/components/active-investor";
import {
  Bitcoin,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <motion.nav
        className="flex items-center justify-between mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <div className="bg-card p-2 rounded-xl">
            <Bitcoin className="w-6 h-6" />
          </div>
          <span className="text-xl font-semibold">QuantFYP</span>
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" className="rounded-full bg-card px-6">
            Dashboard
          </Button>
          <Button variant="ghost" className="rounded-full">
            Goals
          </Button>
          <Button variant="ghost" className="rounded-full">
            Investments
          </Button>
          <Button variant="ghost" className="rounded-full">
            Debt Management
          </Button>
          <Button variant="ghost" className="rounded-full">
            Retirement Planning
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
        </div>
      </motion.nav>

      {/* Welcome Section */}
      <motion.div className="mb-8" {...fadeInUp}>
        <h1 className="text-4xl font-bold">
          Welcome back <span className="gradient-text">Bryan</span>
        </h1>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Active Credit */}
        <motion.div
          className="col-span-3"
          {...fadeInUp}
          transition={{ delay: 0.1 }}
        >
          <div className="card card-hover p-6">
            <div className="text-sm text-muted mb-4 flex items-center justify-between">
              Active credit
              <ChevronRight className="w-5 h-5" />
            </div>
            <div className="text-4xl font-bold mb-1">11.2 BTC</div>
            <div className="text-sm text-muted">$ 28,477.50</div>
          </div>
        </motion.div>

        {/* Payment Goal */}
        <motion.div
          className="col-span-5"
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <div className="card card-hover p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted">Payment goal</div>
              <div className="text-2xl font-bold">34%</div>
            </div>
            <div className="h-[120px]">
              <AreaChart />
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Button variant="secondary" size="sm" className="rounded-full">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Send
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <ArrowDownRight className="w-4 h-4 mr-2" />
                Receive
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Price Analytics */}
        <motion.div
          className="col-span-4"
          {...fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <div className="card card-hover p-6">
            <div className="text-sm text-muted mb-4 flex items-center justify-between">
              Price analytics
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  BTC-ETH
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Monthly
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
            <div className="h-[200px] -mx-6">
              <BarChart />
            </div>
          </div>
        </motion.div>

        {/* Payment History */}
        <motion.div
          className="col-span-8"
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <PaymentHistory />
        </motion.div>

        {/* Amount of Credit & Usage Plan */}
        <motion.div
          className="col-span-4"
          {...fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <div className="space-y-6">
            <div className="card card-hover p-6">
              <div className="text-sm text-muted mb-4">Amount of credit</div>
              <div className="text-4xl font-bold mb-1">15.9 BTC</div>
              <div className="text-sm text-muted mb-4">
                Total refund amount with fee
              </div>
              <ActiveInvestors />
            </div>
            <UsagePlan />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
