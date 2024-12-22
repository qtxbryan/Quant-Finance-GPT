"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ResultsPopoutProps {
  financialInfo: {
    monthlyIncome: string;
    monthlyExpenses: string;
    existingDebts: string;
    currentSavings: string;
    riskTolerance: string;
  };
  onBack: () => void;
  onContinue: () => void;
}

export function FinancialResultPopout({
  financialInfo,
  onBack,
  onContinue,
}: ResultsPopoutProps) {
  const data = [
    { name: "Income", value: parseFloat(financialInfo.monthlyIncome) },
    { name: "Expenses", value: parseFloat(financialInfo.monthlyExpenses) },
    { name: "Debts", value: parseFloat(financialInfo.existingDebts) },
    { name: "Savings", value: parseFloat(financialInfo.currentSavings) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
    >
      <Card className="w-full max-w-3xl bg-zinc-900 text-white border-none shadow-lg">
        <CardHeader className="border-b border-zinc-800 pb-4">
          <CardTitle className="text-2xl font-bold text-purple-400">
            Your Financial Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                <strong>Monthly Income:</strong> ${financialInfo.monthlyIncome}
              </p>
              <p>
                <strong>Monthly Expenses:</strong> $
                {financialInfo.monthlyExpenses}
              </p>
              <p>
                <strong>Existing Debts:</strong> ${financialInfo.existingDebts}
              </p>
              <p>
                <strong>Current Savings:</strong> $
                {financialInfo.currentSavings}
              </p>
              <p>
                <strong>Risk Tolerance:</strong>{" "}
                {financialInfo.riskTolerance.charAt(0).toUpperCase() +
                  financialInfo.riskTolerance.slice(1)}
              </p>
            </motion.div>
            <motion.div
              className="h-64"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ChartContainer
                config={{
                  value: {
                    label: "Amount",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#9D5CFF" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </motion.div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-6 border-t border-zinc-800">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
          >
            Back
          </Button>
          <Button
            onClick={onContinue}
            className="bg-purple-500 hover:bg-purple-600"
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
