"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Recommendation {
  id: number;
  text: string;
  impact: "high" | "medium" | "low";
}

const recommendations: Recommendation[] = [
  {
    id: 1,
    text: "Increasing your monthly savings by SGD 200 could help you reach your Wedding Fund goal 3 months earlier.",
    impact: "high",
  },
  {
    id: 2,
    text: "Consider allocating year-end bonus to Emergency Fund to reach your target faster.",
    impact: "medium",
  },
  {
    id: 3,
    text: "Based on your spending patterns, you could save an additional SGD 150 monthly by optimizing food expenses.",
    impact: "high",
  },
];

const impactColors = {
  high: "text-tertiary",
  medium: "text-secondary",
  low: "text-primary",
};

export function AiRecommendations() {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center gap-2">
        <Lightbulb className="h-5 w-5 text-secondary" />
        <CardTitle className="text-xl text-card-foreground">
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={recommendation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 items-start"
          >
            <div
              className={`w-2 h-2 rounded-full mt-2 ${
                impactColors[recommendation.impact]
              }`}
            />
            <p className="text-card-foreground text-sm">
              {recommendation.text}
            </p>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
