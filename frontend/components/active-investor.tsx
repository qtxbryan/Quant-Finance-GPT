"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const investors = [
  { id: 1, image: "/placeholder.svg", initials: "JD" },
  { id: 2, image: "/placeholder.svg", initials: "AB" },
  { id: 3, image: "/placeholder.svg", initials: "YZ" },
];

export function ActiveInvestors() {
  return (
    <div>
      <div className="text-sm text-muted mb-2">Active investors</div>
      <div className="text-xs text-muted mb-4">Mandatory payment</div>
      <div className="flex items-center">
        <div className="flex -space-x-2">
          {investors.map((investor, index) => (
            <motion.div
              key={investor.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Avatar className="w-8 h-8 border-2 border-background">
                <AvatarImage src={investor.image} />
                <AvatarFallback>{investor.initials}</AvatarFallback>
              </Avatar>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-xs border-2 border-background"
          >
            +3
          </motion.div>
        </div>
      </div>
    </div>
  );
}
