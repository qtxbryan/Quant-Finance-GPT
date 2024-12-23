import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateCategory(
  deadline: Date
): "shortTerm" | "mediumTerm" | "longTerm" {
  const now = new Date();
  const differenceInYears =
    (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 365);

  if (differenceInYears <= 2) {
    return "shortTerm";
  } else if (differenceInYears <= 5) {
    return "mediumTerm";
  } else {
    return "longTerm";
  }
}
