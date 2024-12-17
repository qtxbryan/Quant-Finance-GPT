"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AnimatedGrid } from "@/components/animated-grid";
import { SignUpForm } from "@/components/sign-up-form";
import { FinancialInfoForm } from "@/components/financial-info-form";

export default function Page() {
  const [step, setStep] = useState<"signup" | "financial-info">("signup");

  // State for sign-up form fields to preserve data
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });

  // Handle changes from SignUpForm
  const handleSignUpChange = (field: string, value: string) => {
    setSignUpData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackToSignUp = () => {
    setStep("signup");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-2">
          <AnimatedGrid />
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              {step === "signup" ? (
                <SignUpForm
                  key="signup"
                  email={signUpData.email}
                  password={signUpData.password}
                  onChange={handleSignUpChange}
                  onSuccess={() => setStep("financial-info")}
                />
              ) : (
                <FinancialInfoForm
                  key="financial-info"
                  onBack={handleBackToSignUp}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
