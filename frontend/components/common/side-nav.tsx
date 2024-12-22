"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Wallet,
  ShoppingCart,
  Lock,
  History,
  ArrowLeftRight,
  TrendingUp,
  BarChart2,
  Bell,
  MoreHorizontal,
  User,
} from "lucide-react";
import classNames from "classnames";

const cn = classNames;

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Wallet, label: "Portfolio" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: Lock, label: "Unsettled" },
  { icon: History, label: "History" },
  { icon: ArrowLeftRight, label: "Swap" },
  { icon: TrendingUp, label: "Trade" },
  { icon: BarChart2, label: "Stats" },
  { icon: Bell, label: "Notifications", badge: 4 },
];

export function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 border-r border-border p-4 flex flex-col"
    >
      <div className="flex items-center gap-2 px-4 mb-8">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold">C</span>
        </div>
        <span className="font-semibold">CoinVers</span>
      </div>

      <div className="space-y-1 flex-1">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={cn("sidebar-item", item.active && "active")}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-destructive text-xs px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <button className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-muted transition-colors">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs text-muted-foreground">ID: 0x123...789</div>
          </div>
          <MoreHorizontal className="w-5 h-5 ml-auto" />
        </button>
      </div>
    </motion.aside>
  );
}
