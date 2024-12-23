import React from "react";
import GoalsClient from "@/components/goal-components/goals-client";
import { Goal } from "@/types";

export default async function GoalsPage() {
  // Methods to fetch goals from flask server
  // empty structure for test for now
  const goalsFromServer: {
    shortTerm: Goal[];
    mediumTerm: Goal[];
    longTerm: Goal[];
  } = {
    shortTerm: [],
    mediumTerm: [],
    longTerm: [],
  };
  return <GoalsClient initialGoals={goalsFromServer} />;
}
