"use client";

import { motion } from "framer-motion";
import { Bitcoin, ChevronRight, EclipseIcon as Ethereum } from "lucide-react";

const transactions = [
  {
    id: 1,
    icon: Bitcoin,
    name: "Bitcoin",
    date: "15 Jan, 2023",
    price: "$ 28.165",
    status: "Successfully",
    amount: "2.3 BTC",
    change: "+0.83%",
  },
  {
    id: 2,
    icon: Ethereum,
    name: "Ethereum",
    date: "11 Feb, 2023",
    price: "$ 27.554",
    status: "Successfully",
    amount: "1.2 BTC",
    change: "+0.83%",
  },
  {
    id: 3,
    icon: Bitcoin,
    name: "Bitcoin",
    date: "18 Mar, 2023",
    price: "$ 26.165",
    status: "Successfully",
    amount: "3.6 BTC",
    change: "+0.83%",
  },
];

export function PaymentHistory() {
  return (
    <div className="card card-hover p-6">
      <div className="text-sm text-muted mb-6 flex items-center justify-between">
        Payment history
        <ChevronRight className="w-5 h-5" />
      </div>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-card p-2 rounded-full">
                <transaction.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">{transaction.name}</div>
                <div className="text-sm text-muted">{transaction.change}</div>
              </div>
            </div>
            <div className="text-sm text-muted">{transaction.date}</div>
            <div>{transaction.price}</div>
            <div className="status-badge success">{transaction.status}</div>
            <div className="font-medium">{transaction.amount}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
