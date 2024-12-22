import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Bitcoin } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const NavigationBar = () => {
  return (
    <nav className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <Bitcoin className="w-8 h-8 text-primary" />
        <span className="text-xl font-semibold">QuantFYP</span>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost">Dashboard</Button>
        <Button variant="ghost">Goals</Button>
        <Button variant="ghost">Investments</Button>
        <Button variant="ghost">Debt Management</Button>
        <Button variant="ghost">Retirement Planning</Button>
      </div>
      <Avatar>
        <AvatarImage src="/placeholder.svg" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default NavigationBar;
