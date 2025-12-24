import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { processSteps } from "@/data/process";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-28 md:py-40 lg:py-52 bg-background overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-[10%] w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-3xl" />
      </motion.div>

      <div className="container-wide relative z-10">
        {/* Premium Header */}
        <div ref={headerRef} className="mb-20 md:mb-32">
          {/* Eyebrow with animated line */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex items-center justify-center w-8 h-8 rounded-full border border-primary/30"
              initial={{ scale: 0, rotate: -180 }}
              animate={isHeaderInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <motion.div
              className="h-[1px] w-12 bg-primary/50"
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ originX: 0 }}
            />
            <motion.span 
              className="text-xs font-medium tracking-[0.25em] uppercase text-primary"
              initial={{ opacity: 0, x: -10 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Our Process
            </motion.span>
          </motion.div>

          {/* Main Title - Staggered reveal */}
          <div className="max-w-4xl">
            <div className="overflow-hidden">
              <motion.h2
                className="font-syne text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-[-0.03em] leading-[0.95]"
                initial={{ y: "110%" }}
                animate={isHeaderInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Crafting digital
              </motion.h2>
            </div>
            <div className="overflow-hidden mt-1">
              <motion.h2
                className="font-syne text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-[-0.03em] leading-[0.95]"
                initial={{ y: "110%" }}
                animate={isHeaderInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              >
                excellence<span className="text-primary">.</span>
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Process Grid - Bento Style */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Left - Featured Step */}
          <motion.div
            className="col-span-12 lg:col-span-7"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <FeaturedCard 
              step={processSteps[activeIndex]} 
              index={activeIndex}
            />
          </motion.div>

          {/* Right - Step Selector */}
          <motion.div
            className="col-span-12 lg:col-span-5 flex flex-col gap-3"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {processSteps.map((step, index) => (
              <StepSelector
                key={step.id}
                step={step}
                index={index}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Stats Row */}
        <motion.div
          className="mt-16 md:mt-24 pt-12 border-t border-border/50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatItem number="150+" label="Projects Delivered" delay={0} />
            <StatItem number="98%" label="Client Satisfaction" delay={0.1} />
            <StatItem number="12+" label="Years Experience" delay={0.2} />
            <StatItem number="24h" label="Response Time" delay={0.3} />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-syne font-semibold text-base overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="relative z-10">Start a project</span>
            <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          </motion.a>
          
          <motion.a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-4 text-muted-foreground hover:text-foreground font-medium transition-colors"
            whileHover={{ x: 4 }}
          >
            View our work
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-[20%] right-[5%] w-2 h-2 rounded-full bg-primary"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[8%] w-3 h-3 rounded-full border border-primary/50"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}

interface FeaturedCardProps {
  step: {
    id: string;
    number: string;
    title: string;
    description: string;
  };
  index: number;
}

function FeaturedCard({ step, index }: FeaturedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative h-full min-h-[400px] md:min-h-[500px] p-8 md:p-12 rounded-[2rem] bg-foreground overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      {/* Animated Background Circle */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full bg-primary/20"
        animate={{ 
          scale: isHovered ? 1.3 : 1,
          x: isHovered ? -20 : 0,
          y: isHovered ? -20 : 0
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Top Row */}
        <div className="flex items-start justify-between mb-auto">
          <motion.span
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-background/10 text-background font-mono text-xl font-bold"
            key={step.number}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {step.number}
          </motion.span>

          <motion.div
            className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center"
            animate={{ 
              rotate: isHovered ? 45 : 0,
              backgroundColor: isHovered ? "hsl(var(--primary))" : "transparent",
              borderColor: isHovered ? "hsl(var(--primary))" : "hsl(var(--background) / 0.2)"
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-5 h-5 text-background" />
          </motion.div>
        </div>

        {/* Title & Description */}
        <div className="mt-auto">
          <motion.h3
            className="font-syne text-3xl sm:text-4xl md:text-5xl font-bold text-background mb-4 leading-[1.1]"
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {step.title}
          </motion.h3>

          <motion.p
            className="text-background/60 text-base md:text-lg leading-relaxed max-w-md"
            key={step.description}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {step.description}
          </motion.p>

          {/* Animated underline */}
          <motion.div
            className="mt-8 h-[2px] bg-primary"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? 120 : 60 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Corner Decoration */}
      <div className="absolute top-8 right-8 flex gap-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface StepSelectorProps {
  step: {
    id: string;
    number: string;
    title: string;
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
}

function StepSelector({ step, index, isActive, onClick }: StepSelectorProps) {
  return (
    <motion.button
      className={`group relative w-full p-5 md:p-6 rounded-2xl border text-left transition-colors duration-300 ${
        isActive 
          ? "bg-primary/5 border-primary/30" 
          : "bg-card border-border hover:border-primary/20"
      }`}
      onClick={onClick}
      whileHover={{ x: isActive ? 0 : 8 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Progress indicator */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-primary"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
      />

      <div className="flex items-center gap-4">
        {/* Number */}
        <span className={`font-mono text-sm transition-colors duration-300 ${
          isActive ? "text-primary" : "text-muted-foreground"
        }`}>
          {step.number}
        </span>

        {/* Title */}
        <span className={`font-syne text-base md:text-lg font-semibold transition-colors duration-300 ${
          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
        }`}>
          {step.title}
        </span>

        {/* Arrow */}
        <motion.div
          className="ml-auto"
          animate={{ 
            x: isActive ? 0 : -4,
            opacity: isActive ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="w-4 h-4 text-primary" />
        </motion.div>
      </div>
    </motion.button>
  );
}

interface StatItemProps {
  number: string;
  label: string;
  delay: number;
}

function StatItem({ number, label, delay }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="text-center md:text-left"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <motion.span
        className="block font-syne text-3xl md:text-4xl font-bold text-foreground mb-1"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        {number}
      </motion.span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </motion.div>
  );
}
