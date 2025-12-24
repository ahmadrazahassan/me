import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { processSteps } from "@/data/process";
import { ArrowUpRight } from "lucide-react";

export function Process() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-32 md:py-48 lg:py-56 bg-foreground overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor Follower */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="fixed pointer-events-none z-50 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: cursorPosition.x - 40,
              y: cursorPosition.y - 40,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-primary-foreground" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-wide relative">
        {/* Header Section */}
        <div ref={titleRef} className="mb-24 md:mb-32 lg:mb-40">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.div
              className="w-12 h-[1px] bg-primary"
              initial={{ scaleX: 0 }}
              animate={isTitleInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ originX: 0 }}
            />
            <span className="text-primary font-mono text-sm tracking-[0.3em] uppercase">
              How we work
            </span>
          </motion.div>

          {/* Main Title - Split text animation */}
          <div className="overflow-hidden">
            <motion.h2
              className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-background leading-[0.95] tracking-[-0.03em]"
              initial={{ y: "100%" }}
              animate={isTitleInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Our creative
            </motion.h2>
          </div>
          <div className="overflow-hidden mt-2">
            <motion.h2
              className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-background leading-[0.95] tracking-[-0.03em]"
              initial={{ y: "100%" }}
              animate={isTitleInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              process<span className="text-primary">.</span>
            </motion.h2>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-muted-foreground/60 text-lg md:text-xl max-w-lg mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A streamlined approach that transforms your vision into exceptional digital experiences.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-border/20 md:-translate-x-1/2">
            <motion.div
              className="w-full bg-primary origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-0">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={index}
                isActive={activeStep === step.id}
                onHover={() => {
                  setActiveStep(step.id);
                  setIsHovering(true);
                }}
                onLeave={() => {
                  setActiveStep(null);
                  setIsHovering(false);
                }}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-24 md:mt-32 flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center gap-3 text-background font-syne font-semibold text-lg"
            whileHover={{ x: 10 }}
          >
            <span>Start your project</span>
            <motion.div
              className="w-12 h-12 rounded-full border border-border/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight className="w-5 h-5 text-background group-hover:text-primary-foreground transition-colors" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-20 text-[15vw] font-bold text-border/5 font-syne select-none pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
      >
        PROCESS
      </motion.div>
    </section>
  );
}

interface ProcessStepProps {
  step: {
    id: string;
    number: string;
    title: string;
    description: string;
  };
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  isEven: boolean;
}

function ProcessStep({ step, index, isActive, onHover, onLeave, isEven }: ProcessStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`relative grid md:grid-cols-2 gap-8 md:gap-16 py-16 md:py-24 cursor-pointer ${
        isEven ? "" : "md:direction-rtl"
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Number Indicator */}
      <motion.div
        className="absolute left-0 md:left-1/2 top-16 md:top-24 w-4 h-4 rounded-full bg-foreground border-4 border-primary z-10 md:-translate-x-1/2"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.1, type: "spring" }}
      />

      {/* Content */}
      <div className={`pl-10 md:pl-0 ${isEven ? "md:pr-20 md:text-right" : "md:pl-20 md:col-start-2"}`}>
        {/* Step Number */}
        <motion.div
          className="overflow-hidden mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
        >
          <motion.span
            className="inline-block font-mono text-primary text-sm tracking-[0.2em]"
            animate={{ y: isActive ? -4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {step.number}
          </motion.span>
        </motion.div>

        {/* Title */}
        <div className="overflow-hidden mb-6">
          <motion.h3
            className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-background tracking-[-0.02em]"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 + index * 0.1 }}
          >
            <motion.span
              className="inline-block"
              animate={{ 
                x: isActive ? (isEven ? -20 : 20) : 0,
                color: isActive ? "hsl(var(--primary))" : "hsl(var(--background))"
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {step.title}
            </motion.span>
          </motion.h3>
        </div>

        {/* Description */}
        <motion.p
          className="text-muted-foreground/50 text-base md:text-lg leading-relaxed max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
          style={{ marginLeft: isEven ? "auto" : 0, marginRight: isEven ? 0 : "auto" }}
        >
          <motion.span
            animate={{ opacity: isActive ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          >
            {step.description}
          </motion.span>
        </motion.p>

        {/* Hover Line */}
        <motion.div
          className={`h-[2px] bg-primary mt-8 ${isEven ? "ml-auto" : "mr-auto"}`}
          initial={{ width: 0 }}
          animate={{ width: isActive ? 80 : 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Empty column for alternating layout */}
      {!isEven && <div className="hidden md:block md:col-start-1 md:row-start-1" />}
    </motion.div>
  );
}
