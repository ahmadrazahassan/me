import React from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
  separator?: React.ReactNode;
  className?: string;
}

export function Marquee({
  items,
  speed = 20,
  direction = "left",
  separator,
  className = "",
}: MarqueeProps) {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <React.Fragment key={index}>
            <span className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold text-foreground/10 hover:text-primary/30 transition-colors duration-300 cursor-default select-none">
              {item}
            </span>
            {separator || (
              <span className="text-primary text-2xl md:text-3xl">✦</span>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
