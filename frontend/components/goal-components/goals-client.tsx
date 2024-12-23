"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Goal, Goals, GoalsCientProps } from "@/types";
import { calculateCategory } from "@/lib/utils";
import { Button } from "../ui/button";
import { GoalSection } from "./goal-section";
import { AddGoalDialog } from "./add-goal-dialog";

const GoalsClient = ({ initialGoals }: GoalsCientProps) => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [goals, setGoals] = useState<Goals>(initialGoals);

  const addGoal = (newGoal: Goal) => {
    const category = calculateCategory(new Date(newGoal.deadline));
    setGoals((prev) => ({
      ...prev,
      [category]: [...prev[category], newGoal],
    }));
  };

  const deleteGoal = (
    id: string,
    category: "shortTerm" | "mediumTerm" | "longTerm"
  ) => {
    setGoals((prev) => ({
      ...prev,
      [category]: prev[category].filter((goal) => goal.id !== id),
    }));
  };

  const editGoal = (
    id: string,
    updatedGoal: Partial<Goal>,
    oldCategory: "shortTerm" | "mediumTerm" | "longTerm"
  ) => {
    const newCategory = calculateCategory(new Date(updatedGoal.deadline || ""));
    setGoals((prev) => {
      const updatedGoals = { ...prev };

      updatedGoals[oldCategory] = updatedGoals[oldCategory].filter(
        (goal) => goal.id !== id
      );

      const existingGoal = prev[oldCategory].find((goal) => goal.id === id);

      if (existingGoal) {
        updatedGoals[newCategory] = [
          ...updatedGoals[newCategory],
          { ...existingGoal, ...updatedGoal },
        ];
      }

      return updatedGoals;
    });
  };

  return (
    <div className="min-h-screen bg-background p-8 animated-bg">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <header className="mb-8 flex justify-between items-center">
            <div>
              <motion.h1
                className="text-4xl font-bold mb-2 gradient-text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Financial Goals
              </motion.h1>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Track and manage your financial goals across different time
                horizons
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                onClick={() => setShowAddGoal(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
              >
                <Plus className="mr-2 h-4 w-4" /> Set a Goal
              </Button>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GoalSection
              title="Short Term Goals"
              description="0-2 years horizon"
              goals={goals.shortTerm}
              onAddGoal={() => setShowAddGoal(true)}
              onDeleteGoal={(id) => deleteGoal(id, "shortTerm")}
              onEditGoal={(id, updatedGoal) =>
                editGoal(id, updatedGoal, "shortTerm")
              }
              color="primary"
            />
            <GoalSection
              title="Medium Term Goals"
              description="2-5 years horizon"
              goals={goals.mediumTerm}
              onAddGoal={() => setShowAddGoal(true)}
              onDeleteGoal={(id) => deleteGoal(id, "mediumTerm")}
              onEditGoal={(id, updatedGoal) =>
                editGoal(id, updatedGoal, "mediumTerm")
              }
              color="secondary"
            />
            <GoalSection
              title="Long Term Goals"
              description="5+ years horizon"
              goals={goals.longTerm}
              onAddGoal={() => setShowAddGoal(true)}
              onDeleteGoal={(id) => deleteGoal(id, "longTerm")}
              onEditGoal={(id, updatedGoal) =>
                editGoal(id, updatedGoal, "longTerm")
              }
              color="tertiary"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <AddGoalDialog
        open={showAddGoal}
        onOpenChange={setShowAddGoal}
        onAddGoal={addGoal}
      />
    </div>
  );
};

export default GoalsClient;
