import React from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "muted";
  size?: "sm" | "md";
  className?: string;
}

const variants = {
  default: "bg-primary/10 text-primary border-primary/20",
  outline: "bg-transparent text-foreground border-foreground/20",
  muted: "bg-muted text-muted-foreground border-muted",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Tag({
  children,
  variant = "default",
  size = "sm",
  className,
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}