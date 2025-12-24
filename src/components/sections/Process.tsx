import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { processSteps } from "@/data/process";
import { ArrowRight } from "lucide-react";

export function Process() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax values
  const decorY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const decorOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Parallax Decorative Number */}
      <motion.div
        className="absolute -right-10 top-1/2 -translate-y-1/2 font-syne text-[40vw] font-bold text-foreground/[0.02] select-none pointer-events-none leading-none"
        style={{ y: decorY, opacity: decorOpacity }}
      >
        04
      </motion.div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Left - Title */}
            <div>
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted-foreground">
                  Our Process
                </span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h2
                  className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-[-0.02em] leading-[1.1]"
                  initial={{ y: "100%" }}
                  animate={isHeaderInView ? { y: 0 } : {}}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  How we bring
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-[-0.02em] leading-[1.1]"
                  initial={{ y: "100%" }}
                  animate={isHeaderInView ? { y: 0 } : {}}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  ideas to <span className="text-primary">life</span>
                </motion.h2>
              </div>
            </div>

            {/* Right - Description */}
            <motion.p
              className="text-muted-foreground text-lg max-w-md lg:text-right"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A refined methodology that ensures every project exceeds expectations through collaboration and precision.
            </motion.p>
          </div>
        </div>

        {/* Process Cards - Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {processSteps.map((step, index) => (
            <ProcessCard
              key={step.id}
              step={step}
              index={index}
              isHovered={hoveredStep === index}
              onHover={() => setHoveredStep(index)}
              onLeave={() => setHoveredStep(null)}
              anyHovered={hoveredStep !== null}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 md:mt-24 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href="#contact"
            className="group inline-flex items-center gap-4 px-8 py-4 bg-foreground text-background rounded-full font-syne font-semibold text-base hover:bg-primary transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start your project</span>
            <motion.div
              className="flex items-center justify-center"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

interface ProcessCardProps {
  step: {
    id: string;
    number: string;
    title: string;
    description: string;
  };
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  anyHovered: boolean;
}

function ProcessCard({ step, index, isHovered, onHover, onLeave, anyHovered }: ProcessCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="relative h-full p-8 md:p-10 rounded-3xl border border-border bg-card overflow-hidden cursor-pointer"
        animate={{
          scale: anyHovered ? (isHovered ? 1.02 : 0.98) : 1,
          opacity: anyHovered ? (isHovered ? 1 : 0.6) : 1,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ borderColor: "hsl(var(--primary))" }}
      >
        {/* Hover Background */}
        <motion.div
          className="absolute inset-0 bg-primary/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Number */}
          <motion.div
            className="flex items-center justify-between mb-12"
            animate={{ y: isHovered ? -4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-mono text-5xl md:text-6xl font-bold text-foreground/10 group-hover:text-primary/30 transition-colors duration-300">
              {step.number}
            </span>
            
            {/* Arrow indicator */}
            <motion.div
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center"
              animate={{
                backgroundColor: isHovered ? "hsl(var(--primary))" : "transparent",
                borderColor: isHovered ? "hsl(var(--primary))" : "hsl(var(--border))",
                rotate: isHovered ? 45 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight 
                className={`w-4 h-4 transition-colors duration-300 ${
                  isHovered ? "text-primary-foreground" : "text-muted-foreground"
                }`} 
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="font-syne text-xl md:text-2xl font-bold text-foreground mb-4 leading-tight"
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {step.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-muted-foreground text-sm md:text-base leading-relaxed"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {step.description}
          </motion.p>

          {/* Bottom Line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-primary origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Decorative Corner */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full border border-primary/10"
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 1 : 0.5 
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}
