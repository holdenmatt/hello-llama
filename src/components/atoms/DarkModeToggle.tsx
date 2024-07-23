"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DarkModeToggle({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <Button
      className={cn("border-0", className)}
      variant="outline"
      size="icon"
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      <div className="relative">
        <Sun className="flex h-5 w-5 dark:hidden" />
        <Moon className="hidden h-5 w-5 dark:flex" />
      </div>
      {children}
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  );
}
