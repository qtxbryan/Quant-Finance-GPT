"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProgressBar } from "./progress-bar";
import { FormStep } from "./form-step";
import { FinancialResultPopout } from "./financial-result";
import { redirect } from "next/navigation";

interface FinancialInfo {
  name: string;
  age: string;
  monthlyIncome: string;
  monthlyExpenses: string;
  existingDebts: string;
  currentSavings: string;
  riskTolerance: string;
}

const initialState: FinancialInfo = {
  name: "",
  age: "",
  monthlyIncome: "",
  monthlyExpenses: "",
  existingDebts: "",
  currentSavings: "",
  riskTolerance: "",
};

export function FinancialInfoForm({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [financialInfo, setFinancialInfo] =
    useState<FinancialInfo>(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 4;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinancialInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFinancialInfo((prev) => ({ ...prev, riskTolerance: value }));
  };

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      // At final step, submit data to backend
      setLoading(true);
      const token = document.cookie
        .split(";")
        .find((item) => item.trim().startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        setMessage("No token found. Please log in or sign up first.");
        setLoading(false);
        return;
      }

      const payload = {
        name: financialInfo.name,
        age: parseInt(financialInfo.age, 10),
        income: parseFloat(financialInfo.monthlyIncome),
        savings: parseFloat(financialInfo.currentSavings),
        expenses: parseFloat(financialInfo.monthlyExpenses),
        debt: parseFloat(financialInfo.existingDebts),
        risk_tolerance: financialInfo.riskTolerance,
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/v1/user/onboard",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );

        setLoading(false);

        if (response.ok) {
          const result = await response.json();
          // result includes { financial_snapshot: {...}, message: "...", status_code: 200 }
          setMessage(result.message);
          // You can also display or use financial_snapshot data if needed
        } else {
          const errorData = await response.json();
          setMessage(errorData.message || "Failed to submit data.");
        }
      } catch (error) {
        console.error("Error submitting onboarding data:", error);
        setMessage(
          "An error occurred while submitting your data. Please try again."
        );
        setLoading(false);
      }

      setShowResults(true);
    }
  };

  const handleBackButton = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      onBack(); // Back to SignUpForm
    }
  };

  const handleResultsBack = () => {
    setShowResults(false);
  };

  const handleResultsContinue = () => {
    console.log("Form submitted: ", financialInfo);
    // NEED TO MIGRATE THE FORM SUBMISSION LOGIC TO HERE
    redirect("/onboarding");
  };

  return (
    <div className="w-full max-w-md space-y-8 p-8">
      <ProgressBar currentStep={step} totalSteps={totalSteps} />
      <AnimatePresence mode="wait">
        {step === 1 && (
          <FormStep key="step1" title="Personal Information">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={financialInfo.name}
                  onChange={handleInputChange}
                  className="bg-zinc-900 border-zinc-800"
                  required
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={financialInfo.age}
                  onChange={handleInputChange}
                  className="bg-zinc-900 border-zinc-800"
                  required
                />
              </div>
            </div>
          </FormStep>
        )}
        {step === 2 && (
          <FormStep key="step2" title="Income & Expenses">
            <div className="space-y-4">
              <div>
                <Label htmlFor="monthlyIncome">Monthly Income</Label>
                <Input
                  id="monthlyIncome"
                  name="monthlyIncome"
                  type="number"
                  value={financialInfo.monthlyIncome}
                  onChange={handleInputChange}
                  className="bg-zinc-900 border-zinc-800"
                  required
                />
              </div>
              <div>
                <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
                <Input
                  id="monthlyExpenses"
                  name="monthlyExpenses"
                  type="number"
                  value={financialInfo.monthlyExpenses}
                  onChange={handleInputChange}
                  className="bg-zinc-900 border-zinc-800"
                  required
                />
              </div>
            </div>
          </FormStep>
        )}
        {step === 3 && (
          <FormStep key="step3" title="Debts & Savings">
            <div className="space-y-4">
              <div>
                <Label htmlFor="existingDebts">Existing Debts</Label>
                <Input
                  id="existingDebts"
                  name="existingDebts"
                  type="number"
                  value={financialInfo.existingDebts}
                  onChange={handleInputChange}
                  className="bg-zinc-900 border-zinc-800"
                  required
                />
              </div>
              <div>
                <Label htmlFor="currentSavings">Current Savings</Label>
                <Input
                  id="currentSavings"
                  name="currentSavings"
                  type="number"
                  value={financialInfo.currentSavings}
                  onChange={handleInputChange}
                  className="bg-zinc-900 border-zinc-800"
                  required
                />
              </div>
            </div>
          </FormStep>
        )}
        {step === 4 && (
          <FormStep key="step4" title="Risk Tolerance">
            <div className="space-y-4">
              <Label htmlFor="riskTolerance">Risk Tolerance</Label>
              <Select
                onValueChange={handleSelectChange}
                value={financialInfo.riskTolerance}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                  <SelectValue placeholder="Select your risk tolerance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormStep>
        )}
      </AnimatePresence>
      <div className="flex justify-between mt-8">
        <Button
          onClick={handleBackButton}
          variant="outline"
          className="bg-zinc-900 border-zinc-800"
          disabled={loading}
        >
          {step === 1 ? "Back to Sign Up" : "Back"}
        </Button>
        <Button
          onClick={handleNext}
          className="bg-purple-500 hover:bg-purple-600"
          disabled={loading}
        >
          {step === totalSteps
            ? loading
              ? "Submitting..."
              : "Submit"
            : "Next"}
        </Button>
      </div>
      <AnimatePresence>
        {showResults && (
          <FinancialResultPopout
            financialInfo={financialInfo}
            onBack={handleResultsBack}
            onContinue={handleResultsContinue}
          />
        )}
      </AnimatePresence>
      {message && (
        <p className="text-center mt-4 text-sm text-green-400">{message}</p>
      )}
    </div>
  );
}
