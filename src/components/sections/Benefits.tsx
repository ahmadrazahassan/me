import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { benefits } from "@/data/benefits";
import { ArrowUpRight, Sparkles } from "lucide-react";

// Staggered text reveal component
function AnimatedText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: i * 0.05,
              ease: [0.6, 0.01, 0, 0.9]
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Animated counter
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.span
      ref={ref}
      className="tabular-nums"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {isInView ? value : 0}{suffix}
      </motion.span>
    </motion.span>
  );
}

// Benefit card component
function BenefitCard({ 
  benefit, 
  index 
}: { 
  benefit: typeof benefits[0]; 
  index: number;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.6, 0.01, 0, 0.9]
      }}
      className="group relative"
    >
      <motion.div
        className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden bg-muted/30 border border-border/50 backdrop-blur-sm"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        />
        
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={benefit.image}
            alt={benefit.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
          
          {/* Floating index number */}
          <motion.div
            className="absolute top-4 left-4 w-8 h-8 rounded-full bg-background/10 backdrop-blur-md border border-background/20 flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            <span className="text-background text-xs font-medium">0{index + 1}</span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <motion.h3 
                className="font-syne font-bold text-lg md:text-xl text-background mb-2 leading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                {benefit.title}
              </motion.h3>
              <motion.p 
                className="text-background/60 text-sm leading-relaxed line-clamp-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                {benefit.description}
              </motion.p>
            </div>
            
            {/* Arrow button */}
            <motion.div
              className="shrink-0 w-10 h-10 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 flex items-center justify-center group-hover:bg-background group-hover:border-background transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-4 h-4 text-background group-hover:text-foreground transition-colors" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Benefits() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden"
    >
      {/* Subtle background gradient */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </motion.div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-4xl mb-16 md:mb-24">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Why choose us
            </span>
          </motion.div>

          {/* Main heading */}
          <h2 className="font-syne font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-6">
            <AnimatedText text="We create experiences" />
            <br />
            <span className="text-primary">
              <AnimatedText text="that matter." />
            </span>
          </h2>

          {/* Subtitle with stats */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
              Bold digital solutions that elevate brands and deliver measurable, lasting results.
            </p>
            
            {/* Stats */}
            <div className="flex gap-8 md:gap-12">
              <div className="text-center md:text-left">
                <div className="font-syne font-bold text-3xl md:text-4xl text-foreground">
                  <AnimatedCounter value={15} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
              </div>
              <div className="text-center md:text-left">
                <div className="font-syne font-bold text-3xl md:text-4xl text-foreground">
                  <AnimatedCounter value={100} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Projects Done</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Benefits Grid - Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* First row - 2 cards + 1 large */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <BenefitCard benefit={benefits[0]} index={0} />
            <BenefitCard benefit={benefits[1]} index={1} />
          </div>
          <div className="lg:row-span-2">
            <div className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.6, 0.01, 0, 0.9] }}
                className="group relative h-full"
              >
                <motion.div
                  className="relative h-full min-h-[400px] lg:min-h-full rounded-2xl md:rounded-3xl overflow-hidden bg-foreground"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.img
                    src={benefits[2].image}
                    alt={benefits[2].title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-transparent" />
                  
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-6"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                    </motion.div>
                    <h3 className="font-syne font-bold text-2xl md:text-3xl text-background mb-3">
                      {benefits[2].title}
                    </h3>
                    <p className="text-background/70 text-base leading-relaxed">
                      {benefits[2].description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Second row - 3 smaller cards */}
          <BenefitCard benefit={benefits[3]} index={3} />
          <BenefitCard benefit={benefits[4]} index={4} />
        </div>

        {/* CTA Row */}
        <motion.div
          className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 rounded-2xl md:rounded-3xl bg-muted/50 border border-border/50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center md:text-left">
            <h3 className="font-syne font-bold text-2xl md:text-3xl text-foreground mb-2">
              Ready to start your project?
            </h3>
            <p className="text-muted-foreground">
              Let's create something extraordinary together.
            </p>
          </div>
          
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-medium overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get in touch</span>
            <motion.span
              className="relative z-10"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
