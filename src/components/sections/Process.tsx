import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { processSteps } from "@/data/process";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

export function Process() {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const toggleStep = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section id="process" className="relative py-28 md:py-40 bg-background overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div ref={headerRef} className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 md:mb-24">
          {/* Left - Title */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
                Our Process
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                className="font-syne text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-[-0.02em] leading-[1.1]"
                initial={{ y: "100%" }}
                animate={isHeaderInView ? { y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                Four simple steps
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-syne text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-[-0.02em] leading-[1.1]"
                initial={{ y: "100%" }}
                animate={isHeaderInView ? { y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              >
                to <span className="text-primary">success</span>
              </motion.h2>
            </div>
          </div>

          {/* Right - Description + CTA */}
          <div className="flex flex-col justify-end">
            <motion.p
              className="text-muted-foreground text-lg mb-8 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We follow a proven methodology that ensures every project is delivered with precision, creativity, and measurable results.
            </motion.p>

            <motion.a
              href="#contact"
              className="group inline-flex items-center gap-2 text-foreground font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ x: 4 }}
            >
              <span className="border-b border-foreground pb-0.5">Start a project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>
        </div>

        {/* Accordion Steps */}
        <div className="border-t border-border">
          {processSteps.map((step, index) => (
            <AccordionStep
              key={step.id}
              step={step}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => toggleStep(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface AccordionStepProps {
  step: {
    id: string;
    number: string;
    title: string;
    description: string;
  };
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function AccordionStep({ step, index, isExpanded, onToggle }: AccordionStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="border-b border-border"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Header - Clickable */}
      <button
        onClick={onToggle}
        className="w-full py-8 md:py-10 flex items-center gap-6 md:gap-12 text-left group"
      >
        {/* Number */}
        <motion.span
          className="font-mono text-sm text-muted-foreground w-8 shrink-0"
          animate={{ color: isExpanded ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
          transition={{ duration: 0.3 }}
        >
          {step.number}
        </motion.span>

        {/* Title */}
        <motion.h3
          className="font-syne text-2xl sm:text-3xl md:text-4xl font-bold text-foreground flex-1"
          animate={{ 
            x: isExpanded ? 8 : 0,
            color: isExpanded ? "hsl(var(--primary))" : "hsl(var(--foreground))"
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {step.title}
        </motion.h3>

        {/* Toggle Icon */}
        <motion.div
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center shrink-0"
          animate={{
            backgroundColor: isExpanded ? "hsl(var(--primary))" : "transparent",
            borderColor: isExpanded ? "hsl(var(--primary))" : "hsl(var(--border))"
          }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="minus"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Minus className="w-5 h-5 text-primary-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </button>

      {/* Content - Expandable */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 md:pb-12 pl-14 md:pl-20">
              <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                {/* Description */}
                <motion.p
                  className="text-muted-foreground text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {step.description}
                </motion.p>

                {/* Visual/Stats */}
                <motion.div
                  className="flex items-center gap-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {/* Decorative Number */}
                  <span className="font-syne text-8xl md:text-9xl font-bold text-foreground/5">
                    {step.number}
                  </span>
                </motion.div>
              </div>

              {/* Progress Line */}
              <motion.div
                className="mt-8 h-[2px] bg-primary/20 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
