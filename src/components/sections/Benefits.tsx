import React from "react";
import { motion } from "framer-motion";
import { benefits } from "@/data/benefits";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PillButton } from "@/components/ui/PillButton";

export function Benefits() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
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
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
      </div>
    </section>
  );
}