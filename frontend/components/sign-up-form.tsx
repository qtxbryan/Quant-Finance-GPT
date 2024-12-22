"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SignUpFormProps {
  email: string;
  password: string;
  onChange: (field: string, value: string) => void;
  onSuccess: () => void;
}

export function SignUpForm({
  email,
  password,
  onChange,
  onSuccess,
}: SignUpFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("http://127.0.0.1:5000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (response.ok) {
      const { access_token } = await response.json();
      document.cookie = `token=${access_token}; path=/`;
      onSuccess(); // Move to financial-info step
    } else {
      const errorData = await response.json();
      console.log("Server message:", errorData.message);
      alert(`Registration failed: ${errorData.message}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md space-y-8 p-8"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Register</h1>
        <p className="text-sm text-gray-400">Create your new account</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            className="bg-zinc-900 border-zinc-800"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Input
            className="bg-zinc-900 border-zinc-800"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => onChange("password", e.target.value)}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            className="w-full bg-white text-black hover:bg-gray-100"
            size="lg"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </Button>
        </motion.div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-800"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-gray-400">Or</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="bg-zinc-900 border-zinc-800">
          Google
        </Button>
        <Button variant="outline" className="bg-zinc-900 border-zinc-800">
          Facebook
        </Button>
      </div>
    </motion.div>
  );
}
