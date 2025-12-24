import React from "react";
import { motion } from "framer-motion";
import { benefits } from "@/data/benefits";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PillButton } from "@/components/ui/PillButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function Benefits() {
  return (
    <section className="section-padding bg-background">
      <motion.div
        className="container-wide"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
          variants={headerVariants}
        >
          <SectionHeader
            eyebrow="Why choose us"
            title="Why Choose"
            titleHighlight="Ahmed Inc.?"
            subtitle="We create bold digital experiences that elevate brands and deliver measurable results."
          />
          <div className="shrink-0">
            <PillButton href="#contact" showArrow>
              Let's talk
            </PillButton>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`group relative rounded-3xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-shadow ${
                benefit.size === "large" ? "md:row-span-2" : ""
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-syne font-bold text-xl text-background mb-2">
                  {benefit.title}
                </h3>
                <p className="text-background/70 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}