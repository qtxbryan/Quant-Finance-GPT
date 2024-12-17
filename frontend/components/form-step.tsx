"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FormStepProps {
  children: ReactNode;
  title: string;
}

export function FormStep({ children, title }: FormStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      {children}
    </motion.div>
  );
}
