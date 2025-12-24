import React from "react";
import { motion } from "framer-motion";
import { processSteps } from "@/data/process";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PillButton } from "@/components/ui/PillButton";

export function Process() {
  return (
    <section id="process" className="section-padding bg-muted/30">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Header */}
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Our process"
              title="We believe in a streamlined, collaborative approach"
              subtitle="Our proven methodology brings your vision to life efficiently and effectively, ensuring exceptional results at every stage."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <PillButton href="#contact" showArrow>
                Let's get started
              </PillButton>
            </motion.div>
          </div>

          {/* Right Column - Process Steps */}
          <div className="space-y-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
      </div>
    </section>
  );
}