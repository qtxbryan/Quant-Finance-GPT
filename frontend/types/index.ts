// GOALS TYPES
export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  description: string;
  priority: "Low" | "Medium" | "High";
}

export type Goals = {
  shortTerm: Goal[];
  mediumTerm: Goal[];
  longTerm: Goal[];
};

export interface GoalsCientProps {
  initialGoals: Goals;
}
