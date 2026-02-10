import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Circle, Plus, Minus } from "lucide-react";
import { processSteps } from "@/data/process";

// Magnetic wrapper
function Magnetic({ children, className = "", strength = 0.3 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text reveal animation
function RevealText({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Horizontal scrolling marquee
function Marquee({ children, speed = 25 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0"
        animate={{ x: [0, -1920] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
      <motion.div
        className="flex shrink-0"
        animate={{ x: [0, -1920] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// Interactive accordion step
function ProcessStep({ 
  step, 
  index, 
  isActive, 
  onClick 
}: { 
  step: typeof processSteps[0]; 
  index: number; 
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <motion.div
        onClick={onClick}
        className={`relative cursor-pointer border-b transition-colors duration-500 ${
          isActive ? "border-primary/30" : "border-foreground/10 hover:border-foreground/20"
        }`}
      >
        {/* Main Row */}
        <div className="py-8 md:py-10">
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Number */}
            <div className="col-span-2 md:col-span-1">
              <motion.span
                animate={{ color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
                transition={{ duration: 0.3 }}
                className="font-mono text-sm"
              >
                {step.number}
              </motion.span>
            </div>

            {/* Title */}
            <div className="col-span-8 md:col-span-9">
              <motion.h3
                animate={{ color: isActive ? "hsl(var(--foreground))" : "hsl(var(--foreground))" }}
                className="font-syne text-xl md:text-2xl lg:text-3xl font-bold tracking-tight"
              >
                {step.title}
              </motion.h3>
            </div>

            {/* Toggle Icon */}
            <div className="col-span-2 flex justify-end">
              <motion.div
                animate={{ 
                  rotate: isActive ? 180 : 0,
                  backgroundColor: isActive ? "hsl(var(--primary))" : "transparent"
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                  isActive ? "border-primary" : "border-foreground/20 group-hover:border-foreground/40"
                }`}
              >
                {isActive ? (
                  <Minus className="w-4 h-4 text-background" />
                ) : (
                  <Plus className="w-4 h-4 text-foreground/60 group-hover:text-foreground" />
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-10 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-1" />
                <div className="col-span-12 md:col-span-6">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5 flex md:justify-end items-end mt-6 md:mt-0">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <span className="font-bebas text-6xl md:text-7xl text-foreground/[0.08]">
                      {step.number}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-primary origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}

// Visual timeline indicator
function TimelineIndicator({ activeIndex, total }: { activeIndex: number; total: number }) {
  return (
    <div className="hidden lg:flex flex-col items-center gap-2 py-4">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            height: activeIndex === i ? 40 : 12,
            backgroundColor: activeIndex === i ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.1)"
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-1 rounded-full"
        />
      ))}
    </div>
  );
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="process" ref={containerRef} className="relative bg-background overflow-hidden">
      
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-foreground/[0.02] blur-3xl" />
      </motion.div>

      {/* Top Divider */}
      <div className="container-wide">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-foreground/10 origin-left"
        />
      </div>

      {/* Main Content */}
      <div className="container-wide section-padding relative z-10">
        
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-24">
          
          {/* Left - Title */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <span className="text-sm text-muted-foreground uppercase tracking-[0.2em]">
                Our Process
              </span>
            </motion.div>

            <h2 className="font-syne text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-foreground">
              <RevealText>How we bring</RevealText>
              <br />
              <span className="text-muted-foreground/40">
                <RevealText delay={0.1}>your vision to</RevealText>
              </span>
              <br />
              <RevealText delay={0.2}>life</RevealText>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="inline-block ml-2 text-primary"
              >
                .
              </motion.span>
            </h2>
          </div>

          {/* Right - Description + CTA */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground text-lg leading-relaxed mb-8"
            >
              A refined approach that transforms ideas into exceptional digital 
              experiences. Every step is intentional, every detail matters.
            </motion.p>

            <Magnetic strength={0.2}>
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="group inline-flex items-center gap-3 text-foreground font-syne font-semibold"
              >
                <span className="border-b-2 border-foreground/20 group-hover:border-primary pb-1 transition-colors duration-300">
                  Start your project
                </span>
                <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-foreground/20 group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-foreground group-hover:text-background transition-colors duration-300" />
                </span>
              </motion.a>
            </Magnetic>
          </div>
        </div>

        {/* Process Steps with Timeline */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Timeline Indicator - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32">
              <TimelineIndicator activeIndex={activeStep} total={processSteps.length} />
            </div>
          </div>

          {/* Steps Accordion */}
          <div className="lg:col-span-11">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={index}
                isActive={activeStep === index}
                onClick={() => setActiveStep(activeStep === index ? -1 : index)}
              />
            ))}
          </div>
        </div>

        {/* Bottom Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 md:mt-28 pt-12 border-t border-foreground/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2-4", label: "Weeks Average", suffix: "" },
              { value: "100", label: "Client Satisfaction", suffix: "%" },
              { value: "24", label: "Hour Response", suffix: "h" },
              { value: "∞", label: "Revisions Included", suffix: "" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-center md:text-left"
              >
                <p className="font-bebas text-4xl md:text-5xl text-foreground mb-1">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Marquee */}
      <div className="py-8 border-t border-foreground/5 bg-muted/20">
        <Marquee speed={35}>
          <div className="flex items-center gap-16 px-8">
            {["Discovery", "Strategy", "Design", "Development", "Launch", "Growth"].map((word, i) => (
              <div key={i} className="flex items-center gap-4">
                <Circle className="w-1.5 h-1.5 fill-primary text-primary" />
                <span className="font-syne text-lg md:text-xl font-medium text-foreground/40 whitespace-nowrap">
                  {word}
                </span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}

export default Process;
