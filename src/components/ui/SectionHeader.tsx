import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "space-y-4",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <div className={cn(
          "flex items-center gap-2 text-sm text-muted-foreground",
          align === "center" && "justify-center"
        )}>
          <span className="inline-block w-2 h-2 rounded-full bg-primary" />
          <span className="uppercase tracking-wider">{eyebrow}</span>
        </div>
      )}
      
      <h2 className="heading-lg text-foreground">
        {title}
        {titleHighlight && (
          <>
            {" "}
            <span className="text-primary">{titleHighlight}</span>
          </>
        )}
      </h2>
      
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}