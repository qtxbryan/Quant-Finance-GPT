"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GoalCard } from "./GoalCard";
import { AiRecommendations } from "./AiRecommendation";
import { GoalDialog } from "./GoalDialog";

const initialGoals = [
  {
    id: "1",
    title: "Wedding Fund",
    percentage: 92,
    change: 12,
    target: 30000,
    saved: 27600,
    timeRemaining: "8 months",
    analysis: "Excellent progress! You're ahead of schedule.",
    contributors: [
      { name: "John Doe", image: "/placeholder.svg?height=32&width=32" },
      { name: "Jane Smith", image: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "2",
    title: "Emergency Fund",
    percentage: 65,
    change: -3,
    target: 20000,
    saved: 13000,
    timeRemaining: "1 year",
    analysis:
      "Slightly behind schedule. Consider increasing monthly contributions.",
    contributors: [
      { name: "John Doe", image: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "3",
    title: "Home Down Payment",
    percentage: 78,
    change: 5,
    target: 100000,
    saved: 78000,
    timeRemaining: "1.5 years",
    analysis: "On track to meet your target date.",
    contributors: [
      { name: "John Doe", image: "/placeholder.svg?height=32&width=32" },
      { name: "Jane Smith", image: "/placeholder.svg?height=32&width=32" },
    ],
  },
];

export function GoalDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState(initialGoals);
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const handleEdit = (id: string, data: any) => {
    setGoals(
      goals.map((goal) => (goal.id === id ? { ...goal, ...data } : goal))
    );
  };

  const handleAdd = (data: any) => {
    const newGoal = {
      id: String(goals.length + 1),
      percentage: 0,
      change: 0,
      saved: 0,
      analysis: "Just started! Keep up the momentum.",
      contributors: [
        { name: "You", image: "/placeholder.svg?height=32&width=32" },
      ],
      ...data,
    };
    setGoals([...goals, newGoal]);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">
                Financial Goals
              </h2>
              <Button
                onClick={() => setShowAddDialog(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Goal
              </Button>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <Card key={index} className="bg-card">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-8 w-1/4" />
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {goals.map((goal) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                  >
                    <GoalCard
                      {...goal}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              Smart Insights
            </h2>
            {isLoading ? (
              <Card className="bg-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <AiRecommendations />
            )}
          </div>
        </div>
      </div>

      <motion.div
        className="fixed bottom-4 right-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="icon"
          className="rounded-full w-12 h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>

      <GoalDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onSubmit={handleAdd}
        mode="add"
      />
    </div>
  );
}
