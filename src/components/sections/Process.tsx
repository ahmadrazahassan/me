import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { processSteps } from "@/data/process";
import { cn } from "@/lib/utils";

// Split text animation component
function SplitText({ 
  text, 
  className = "", 
  delay = 0,
  staggerDelay = 0.03 
}: { 
  text: string; 
  className?: string; 
  delay?: number;
  staggerDelay?: number;
}) {
  const words = text.split(" ");
  
  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: delay + wordIndex * staggerDelay,
              ease: [0.6, 0.01, 0, 0.9],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Character reveal animation
function CharacterReveal({ 
  text, 
  className = "",
  delay = 0 
}: { 
  text: string; 
  className?: string;
  delay?: number;
}) {
  const chars = text.split("");
  
  return (
    <span className={className}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 20, rotateX: 90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + index * 0.02,
            ease: [0.6, 0.01, 0, 0.9],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// Magnetic hover text
function MagneticText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      className={cn("inline-block cursor-default", className)}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.span>
  );
}

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="section-padding bg-background overflow-hidden"
    >
      <div className="container-wide">
        {/* Header with animated text */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20 md:mb-32">
          <div>
            {/* Animated badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <motion.span 
                className="inline-block w-12 h-px bg-primary"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground">
                Our Process
              </span>
            </motion.div>

            {/* Main heading with split animation */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              <SplitText 
                text="How we bring" 
                className="text-foreground block"
                delay={0.1}
              />
              <SplitText 
                text="your vision" 
                className="text-primary block"
                delay={0.3}
              />
              <SplitText 
                text="to life" 
                className="text-foreground block"
                delay={0.5}
              />
            </h2>
          </div>

          {/* Right side with character animation */}
          <motion.div 
            className="flex flex-col justify-end"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md lg:ml-auto">
              <CharacterReveal 
                text="We follow a proven methodology that ensures every project is delivered with precision and creativity."
                delay={0.6}
              />
            </p>
          </motion.div>
        </div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Step Tabs - Left */}
          <div className="lg:col-span-5 space-y-4">
            {processSteps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(index)}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ x: 8 }}
                className={cn(
                  "w-full text-left px-8 py-6 rounded-2xl transition-all duration-500 flex items-center gap-6 group relative overflow-hidden",
                  activeStep === index
                    ? "bg-foreground"
                    : "bg-muted/30 hover:bg-muted/50"
                )}
              >
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 bg-foreground origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeStep === index ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.6, 0.01, 0, 0.9] }}
                />

                {/* Number with special font */}
                <span className={cn(
                  "relative z-10 font-mono text-2xl font-light tracking-tighter transition-colors duration-300",
                  activeStep === index ? "text-primary" : "text-muted-foreground"
                )}>
                  {step.number}
                </span>

                {/* Title */}
                <span className={cn(
                  "relative z-10 font-syne font-bold text-xl transition-colors duration-300",
                  activeStep === index ? "text-background" : "text-foreground"
                )}>
                  {step.title}
                </span>
                
                {/* Animated arrow */}
                <motion.div
                  className={cn(
                    "relative z-10 ml-auto transition-colors duration-300",
                    activeStep === index ? "text-primary" : "text-transparent group-hover:text-muted-foreground"
                  )}
                  animate={{ x: activeStep === index ? [0, 5, 0] : 0 }}
                  transition={{ duration: 1.5, repeat: activeStep === index ? Infinity : 0, ease: "easeInOut" }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </motion.button>
            ))}

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-3 pt-8">
              {processSteps.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "transition-all duration-300",
                    activeStep === index 
                      ? "w-8 h-2 rounded-full bg-primary" 
                      : "w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          {/* Step Content - Right */}
          <div className="lg:col-span-7">
            <motion.div 
              className="bg-foreground rounded-[2rem] p-10 md:p-14 min-h-[500px] flex flex-col relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Decorative grid */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                backgroundSize: "40px 40px"
              }} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.6, 0.01, 0, 0.9] }}
                  className="flex-1 flex flex-col relative z-10"
                >
                  {/* Large decorative number */}
                  <motion.span 
                    className="absolute -top-8 -right-4 font-mono text-[12rem] md:text-[16rem] font-bold text-background/[0.04] leading-none tracking-tighter select-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {processSteps[activeStep].number}
                  </motion.span>

                  {/* Step indicator */}
                  <motion.div 
                    className="flex items-center gap-4 mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-primary"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="font-mono text-xs tracking-[0.3em] uppercase text-background/50">
                      Step {processSteps[activeStep].number} of {String(processSteps.length).padStart(2, "0")}
                    </span>
                  </motion.div>

                  {/* Title with gradient */}
                  <motion.h3 
                    className="font-syne text-4xl md:text-5xl font-bold text-background leading-[1.1] mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <MagneticText>
                      {processSteps[activeStep].title.split(" ")[0]}
                    </MagneticText>{" "}
                    <span className="text-primary">
                      {processSteps[activeStep].title.split(" ").slice(1).join(" ")}
                    </span>
                  </motion.h3>

                  {/* Description */}
                  <motion.p 
                    className="text-background/60 text-lg md:text-xl leading-relaxed max-w-lg mb-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {processSteps[activeStep].description}
                  </motion.p>

                  {/* Bottom section */}
                  <motion.div 
                    className="mt-10 pt-8 border-t border-background/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-end justify-between">
                      {/* Timeline bar */}
                      <div className="flex-1 max-w-xs">
                        <div className="flex justify-between text-xs mb-2">
                          <span className="font-mono text-background/40 tracking-wider">PROGRESS</span>
                          <span className="font-mono text-background/60">
                            {Math.round(((activeStep + 1) / processSteps.length) * 100)}%
                          </span>
                        </div>
                        <div className="h-1 bg-background/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      {/* Navigation arrows */}
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                          className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/40 transition-colors disabled:opacity-30"
                          disabled={activeStep === 0}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </motion.button>
                        <motion.button
                          onClick={() => setActiveStep(prev => Math.min(processSteps.length - 1, prev + 1))}
                          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-30"
                          disabled={activeStep === processSteps.length - 1}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Bottom marquee text */}
        <motion.div 
          className="mt-24 md:mt-32 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-syne text-7xl md:text-8xl lg:text-9xl font-bold text-foreground/[0.04] tracking-tight mx-8">
                DISCOVER • DESIGN • DEVELOP • DELIVER •
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Process;
