import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
}

const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  ghost: "bg-transparent text-foreground hover:bg-foreground/5",
  outline: "bg-transparent text-foreground border border-border hover:bg-muted",
};

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export function IconButton({
  variant = "default",
  size = "md",
  className,
  children,
  onClick,
  disabled,
  "aria-label": ariaLabel,
}: IconButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </motion.button>
  );
}