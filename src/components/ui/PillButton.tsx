import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface PillButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  asChild?: boolean;
  href?: string;
}

const variants = {
  primary: "bg-primary text-primary-foreground border border-primary/20 hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80",
  ghost: "bg-transparent text-foreground border border-foreground/20 hover:bg-foreground/5",
  outline: "bg-transparent text-primary border border-primary hover:bg-primary/5",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm md:px-7",
  lg: "px-8 py-3 text-base md:px-10",
};

export function PillButton({
  children,
  variant = "primary",
  size = "md",
  showArrow = false,
  className,
  href,
  ...props
}: PillButtonProps) {
  const buttonClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {children}
      {showArrow && (
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={buttonClasses}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {content}
    </motion.button>
  );
}