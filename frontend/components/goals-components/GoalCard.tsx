"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoalDialog } from "./GoalDialog";

interface GoalCardProps {
  id: string;
  title: string;
  percentage: number;
  change: number;
  target: number;
  saved: number;
  timeRemaining: string;
  analysis: string;
  contributors?: Array<{ name: string; image?: string }>;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: any) => void;
}

export function GoalCard({
  id,
  title,
  percentage,
  change,
  target,
  saved,
  timeRemaining,
  analysis,
  contributors = [],
  onDelete,
  onEdit,
}: GoalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      onDelete(id);
    }
  };

  const handleEdit = (data: any) => {
    onEdit(id, data);
  };

  return (
    <>
      <motion.div layout>
        <Card className="bg-card hover:bg-card/80 transition-colors border-accent/10">
          <motion.div
            className="p-6 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {title}
                  </h3>
                  <motion.button
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </motion.button>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-card-foreground">
                    {percentage}%
                  </span>
                  <span
                    className={`text-sm ${
                      change >= 0 ? "text-tertiary" : "text-destructive"
                    }`}
                  >
                    {change >= 0 ? "+" : ""}
                    {change}%
                  </span>
                </div>

                <Progress
                  value={percentage}
                  className="h-2 bg-muted"
                  indicatorClassName={`${
                    percentage >= 80
                      ? "bg-tertiary"
                      : percentage >= 40
                      ? "bg-secondary"
                      : "bg-primary"
                  }`}
                />

                <p className="text-sm text-muted-foreground">{analysis}</p>
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Target</p>
                      <p className="font-medium text-card-foreground">
                        SGD {target.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Saved</p>
                      <p className="font-medium text-card-foreground">
                        SGD {saved.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time Remaining</p>
                      <p className="font-medium text-card-foreground">
                        {timeRemaining}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Contributors</p>
                      <div className="flex -space-x-2 mt-1">
                        {contributors.map((contributor, i) => (
                          <Avatar
                            key={i}
                            className="h-6 w-6 border-2 border-background"
                          >
                            <AvatarImage src={contributor.image} />
                            <AvatarFallback>
                              {contributor.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-card-foreground hover:bg-muted"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowEditDialog(true);
                      }}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Goal
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-destructive hover:bg-muted"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Goal
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Card>
      </motion.div>

      <GoalDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSubmit={handleEdit}
        initialData={{ title, target, timeRemaining }}
        mode="edit"
      />
    </>
  );
}
