import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { processSteps } from "@/data/process";
import { ArrowUpRight } from "lucide-react";

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-background"
    >
      {/* Header Section */}
      <div className="container-wide pt-28 md:pt-40 pb-16 md:pb-24">
        <div ref={headerRef} className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
              Process
            </span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden">
            <motion.h2
              className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-[-0.02em] leading-[1.05]"
              initial={{ y: "100%" }}
              animate={isHeaderInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              How we work
            </motion.h2>
          </div>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A clear, proven approach that transforms ideas into exceptional digital products.
          </motion.p>
        </div>
      </div>

      {/* Stacking Cards */}
      <div className="relative">
        {processSteps.map((step, index) => (
          <StackCard
            key={step.id}
            step={step}
            index={index}
            totalSteps={processSteps.length}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="container-wide py-20 md:py-28">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-8 p-8 md:p-12 rounded-3xl border border-border bg-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h3 className="font-syne text-2xl md:text-3xl font-bold text-foreground mb-2">
              Ready to start?
            </h3>
            <p className="text-muted-foreground">
              Let's bring your vision to life together.
            </p>
          </div>

          <motion.a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-syne font-semibold whitespace-nowrap hover:bg-primary transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in touch
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

interface StackCardProps {
  step: {
    id: string;
    number: string;
    title: string;
    description: string;
  };
  index: number;
  totalSteps: number;
}

function StackCard({ step, index, totalSteps }: StackCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Calculate sticky position based on index
  const topOffset = 100 + index * 20;
  
  // Scale down slightly as cards stack
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 1 - (totalSteps - index - 1) * 0.02]
  );

  // Opacity fade as card scrolls away
  const opacity = useTransform(
    scrollYProgress,
    [0.7, 1],
    [1, 0.6]
  );

  // Background colors for variety
  const bgColors = [
    "bg-foreground",
    "bg-foreground",
    "bg-foreground", 
    "bg-foreground",
  ];

  return (
    <div
      ref={cardRef}
      className="h-[80vh] md:h-[90vh]"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        className={`sticky px-4 md:px-8`}
        style={{ 
          top: topOffset,
          scale,
          opacity: index === totalSteps - 1 ? 1 : opacity,
        }}
      >
        <div
          className={`relative max-w-6xl mx-auto rounded-3xl ${bgColors[index]} overflow-hidden`}
        >
          {/* Card Content */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[400px] md:min-h-[500px] flex flex-col">
            {/* Top Row */}
            <div className="flex items-start justify-between mb-auto">
              {/* Step Number */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-6xl md:text-8xl lg:text-9xl font-bold text-background/10">
                  {step.number}
                </span>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center gap-2">
                {processSteps.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      i === index ? "bg-primary" : "bg-background/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="mt-auto max-w-2xl">
              <motion.span
                className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase text-primary bg-primary/10 rounded-full"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                Step {step.number}
              </motion.span>

              <motion.h3
                className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-[1.1] mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {step.title}
              </motion.h3>

              <motion.p
                className="text-background/60 text-lg md:text-xl leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {step.description}
              </motion.p>

              {/* Decorative Line */}
              <motion.div
                className="mt-8 w-16 h-1 bg-primary rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ originX: 0 }}
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-8 right-8 md:top-12 md:right-12">
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-background/10 flex items-center justify-center"
              whileHover={{ scale: 1.1, borderColor: "hsl(var(--primary))" }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-background/40" />
            </motion.div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--background)) 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }}
            />
          </div>

          {/* Corner Accent */}
          <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48">
            <div className="absolute bottom-0 right-0 w-full h-full bg-primary/10 rounded-tl-[100px]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
