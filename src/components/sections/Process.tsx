import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/process";

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

  return (
    <section 
      ref={sectionRef} 
      id="process" 
      className="py-32 md:py-44 bg-background"
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6"
          >
            How we work
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.1]"
          >
            A process built for{" "}
            <span className="text-muted-foreground">results</span>
          </motion.h2>
        </div>

        {/* Progress Line */}
        <div className="hidden md:block relative h-px bg-border/50 mb-16">
          <motion.div 
            style={{ width: lineWidth }}
            className="absolute top-0 left-0 h-full bg-foreground"
          />
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-12">
          {processSteps.map((step, index) => (
            <ProcessCard 
              key={step.id} 
              step={step} 
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-24 md:mt-32 pt-16 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Ready to start your project? Let's create something extraordinary together.
              </p>
            </div>
            <motion.a
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium text-sm tracking-wide hover:bg-foreground/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start a Project
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
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
}

function ProcessCard({ step, index }: ProcessCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="group relative"
    >
      {/* Step Number */}
      <div className="mb-8">
        <motion.span 
          className="inline-block text-7xl md:text-8xl lg:text-9xl font-light text-foreground/[0.08] leading-none tracking-tighter"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {step.number}
        </motion.span>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-2 h-2 rounded-full bg-foreground"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
          />
          <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
            Step {step.number}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-medium text-foreground tracking-tight leading-tight">
          {step.title}
        </h3>
        
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Hover Line */}
      <motion.div 
        className="absolute -bottom-6 left-0 h-px bg-foreground origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ width: "100%" }}
      />
    </motion.div>
  );
}

export default Process;
