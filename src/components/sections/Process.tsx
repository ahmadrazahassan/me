import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { processSteps } from "@/data/process";
import { ArrowRight } from "lucide-react";

export function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  // Auto-rotate through steps
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % processSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-28 md:py-40 lg:py-48 bg-background overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Large Number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            className="font-syne text-[40vw] md:text-[35vw] font-bold text-foreground/[0.02] select-none leading-none"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {processSteps[activeIndex].number}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="container-wide relative z-10">
        {/* Compact Header */}
        <div ref={headerRef} className="mb-20 md:mb-28">
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-8 h-[1px] bg-primary"
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ originX: 0 }}
            />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
              Process
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              className="font-syne text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-[-0.02em]"
              initial={{ y: "100%" }}
              animate={isHeaderInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              How it works
            </motion.h2>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left - Step Navigation */}
          <div className="lg:col-span-4">
            <div className="space-y-2">
              {processSteps.map((step, index) => (
                <StepTab
                  key={step.id}
                  step={step}
                  index={index}
                  isActive={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-8 h-[2px] bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${((activeIndex + 1) / processSteps.length) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Step Counter */}
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>Step {activeIndex + 1} of {processSteps.length}</span>
              <div className="flex gap-1">
                {processSteps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-6 h-1 rounded-full transition-colors duration-300 ${
                      i === activeIndex ? "bg-primary" : "bg-border hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Content Display */}
          <div className="lg:col-span-8">
            <div className="relative min-h-[400px] md:min-h-[450px]">
              <AnimatePresence mode="wait">
                <StepContent
                  key={activeIndex}
                  step={processSteps[activeIndex]}
                  index={activeIndex}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 md:mt-28 pt-12 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-muted-foreground text-center sm:text-left">
            Ready to transform your ideas into reality?
          </p>

          <motion.a
            href="#contact"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-primary transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start your project
            <motion.div
              className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center"
              whileHover={{ x: 2 }}
            >
              <ArrowRight className="w-3 h-3" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

interface StepTabProps {
  step: {
    id: string;
    number: string;
    title: string;
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
}

function StepTab({ step, index, isActive, onClick }: StepTabProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className="group relative w-full text-left"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className={`relative px-5 py-4 rounded-xl transition-colors duration-300 ${
          isActive ? "bg-foreground" : "hover:bg-muted/50"
        }`}
        whileHover={{ x: isActive ? 0 : 4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-4">
          {/* Number */}
          <span
            className={`font-mono text-xs transition-colors duration-300 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {step.number}
          </span>

          {/* Title */}
          <span
            className={`font-syne text-base font-semibold transition-colors duration-300 ${
              isActive ? "text-background" : "text-foreground"
            }`}
          >
            {step.title}
          </span>

          {/* Arrow */}
          <motion.div
            className="ml-auto"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
          </motion.div>
        </div>
      </motion.div>
    </motion.button>
  );
}

interface StepContentProps {
  step: {
    id: string;
    number: string;
    title: string;
    description: string;
  };
  index: number;
}

function StepContent({ step, index }: StepContentProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="relative h-full p-8 md:p-12 rounded-3xl bg-muted/30 border border-border overflow-hidden"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {/* Floating Elements */}
      <motion.div
        className="absolute top-6 right-6 w-20 h-20 rounded-full border border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-12 right-12 w-3 h-3 rounded-full bg-primary"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Top - Number & Badge */}
        <div className="flex items-start justify-between mb-auto">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="font-mono text-7xl md:text-8xl font-bold text-primary/20">
              {step.number}
            </span>
          </motion.div>

          <motion.span
            className="px-3 py-1.5 text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Phase {index + 1}
          </motion.span>
        </div>

        {/* Bottom - Title & Description */}
        <div className="mt-auto">
          <motion.h3
            className="font-syne text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {step.title}
          </motion.h3>

          <motion.p
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {step.description}
          </motion.p>

          {/* Animated Line */}
          <motion.div
            className="mt-8 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <motion.div
              className="h-[2px] bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {String(index + 1).padStart(2, "0")} / {String(processSteps.length).padStart(2, "0")}
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Corner Decoration */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border border-border/50" />
    </motion.div>
  );
}
