"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  barColor?: string;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  barColor = "#9D5CFF",
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
      <motion.div
        className="h-full"
        style={{ backgroundColor: barColor }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
