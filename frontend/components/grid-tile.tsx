"use client";

import { motion } from "framer-motion";

interface GridTileProps {
  color?: "purple" | "yellow";
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GridTile({
  color,
  children,
  className = "",
  delay = 0,
}: GridTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className={`rounded-3xl p-6 ${
        color === "purple"
          ? "bg-[#9D5CFF]"
          : color === "yellow"
          ? "bg-[#FFEB82] text-black"
          : "bg-black/20 backdrop-blur-xl"
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
