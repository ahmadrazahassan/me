import React from "react";
import { motion } from "framer-motion";
import { processSteps } from "@/data/process";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PillButton } from "@/components/ui/PillButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const leftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function Process() {
  return (
    <section id="process" className="section-padding bg-muted/30">
      <motion.div
        className="container-wide"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Header */}
          <motion.div className="space-y-6" variants={leftVariants}>
            <SectionHeader
              eyebrow="Our process"
              title="We believe in a streamlined, collaborative approach"
              subtitle="Our proven methodology brings your vision to life efficiently and effectively, ensuring exceptional results at every stage."
            />

            <motion.div className="pt-4" variants={leftVariants}>
              <PillButton href="#contact" showArrow>
                Let's get started
              </PillButton>
            </motion.div>
          </motion.div>

          {/* Right Column - Process Steps */}
          <div className="space-y-4">
            {processSteps.map((step) => (
              <motion.div
                key={step.id}
                variants={stepVariants}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all cursor-default"
              >
                <div className="flex items-start gap-4">
                  <span className="text-primary font-syne font-bold text-lg shrink-0">
                    {step.number}.
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-syne font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}