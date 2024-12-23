"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditGoalDialog } from "./edit-goal-dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  description: string;
  priority: "Low" | "Medium" | "High";
}

interface GoalSectionProps {
  title: string;
  description: string;
  goals: Goal[];
  onAddGoal: () => void;
  onDeleteGoal: (id: string) => void;
  onEditGoal: (id: string, updatedGoal: Partial<Goal>) => void;
  color: "primary" | "secondary" | "tertiary";
}

export function GoalSection({
  title,
  description,
  goals,
  onAddGoal,
  onDeleteGoal,
  onEditGoal,
  color,
}: GoalSectionProps) {
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="card glass-effect p-6"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-semibold text-${color}`}>{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <AnimatePresence>
        {goals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-${color}`}
            >
              <Plus className="w-8 h-8 text-background" />
            </div>
            <h3 className="text-lg font-medium mb-2">No goals yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start by adding your first goal
            </p>
            <Button
              onClick={onAddGoal}
              className={`bg-${color} text-${color}-foreground hover:bg-${color}/90 transition-colors duration-300`}
            >
              Add Goal
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`goal-card p-4 rounded-lg bg-${color}/10 hover:bg-${color}/20 transition-colors duration-300`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {goal.description}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-full text-${color} hover:bg-${color}/20 transition-colors duration-300`}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setEditingGoal(goal)}
                        className={`text-${color} hover:bg-${color}/20 transition-colors duration-300`}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteGoal(goal.id)}
                        className="text-destructive hover:bg-destructive/20 transition-colors duration-300"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className={`text-${color}`}>
                      ${goal.currentAmount.toLocaleString()} / $
                      {goal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="goal-progress-bar">
                    <motion.div
                      className={`goal-progress-bar-fill bg-${color}`}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (goal.currentAmount / goal.targetAmount) * 100
                        }%`,
                      }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Deadline</span>
                    <span className={`text-${color}`}>
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Priority</span>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        goal.priority === "High"
                          ? "bg-destructive text-destructive-foreground"
                          : goal.priority === "Medium"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {goal.priority}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {editingGoal && (
        <EditGoalDialog
          goal={editingGoal}
          open={!!editingGoal}
          onOpenChange={(open) => !open && setEditingGoal(null)}
          onSave={(updatedGoal) => {
            onEditGoal(editingGoal.id, updatedGoal);
            setEditingGoal(null);
          }}
          color={color}
        />
      )}
    </motion.div>
  );
}
