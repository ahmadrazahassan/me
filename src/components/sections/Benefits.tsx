import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Plus } from "lucide-react";

// Smooth animated number counter
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = Date.now();
      
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        
        setDisplayValue(Math.floor(easedProgress * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

// Text reveal animation
function TextReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 1,
          delay, 
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Stats data for the dark bar
const statsData = [
  { value: 300, suffix: "+", line1: "Successful projects", line2: "completed" },
  { value: 10, suffix: "+", line1: "Years of experience", line2: "in creative industry" },
  { value: 99, suffix: "%", line1: "Customer", line2: "satisfaction rate" },
  { value: 25, suffix: "M", line1: "In Client revenue", line2: "growth" }
];

export function Benefits() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <section ref={sectionRef} className="bg-background overflow-hidden">
      {/* Top Content Area */}
      <div className="py-32 md:py-40 lg:py-48">
        <div className="container-wide">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 mb-24 md:mb-32">
            {/* Eyebrow */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center">
                  <Plus className="w-3 h-3 text-foreground" />
                </div>
                <span className="text-sm text-foreground tracking-wide">Why choose us</span>
              </div>
            </motion.div>

            {/* Heading */}
            <div className="lg:col-span-9">
              <h2 className="font-syne font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em]">
                <TextReveal>
                  <span className="text-foreground">Proven results for every project,</span>
                </TextReveal>
                <TextReveal delay={0.08}>
                  <span className="text-muted-foreground/50">with a focus on design and</span>
                </TextReveal>
                <TextReveal delay={0.16}>
                  <span className="text-muted-foreground/50">functionality.</span>
                </TextReveal>
              </h2>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Portrait Image */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="overflow-hidden rounded-2xl">
                  <motion.img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                    alt="Professional portrait"
                    className="w-full aspect-[3/4] object-cover"
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                
                {/* Corner badge */}
                <motion.button
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-foreground flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4 text-background" />
                </motion.button>
              </div>
            </motion.div>

            {/* Right Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Description */}
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl leading-[1.4] tracking-[-0.01em] mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-foreground font-medium">No fluff, just results.</span>{" "}
                <span className="text-muted-foreground/60">
                  Thoughtful design and tools that make your work easier. We focus on smart design and useful features, project after project.
                </span>
              </motion.p>

              {/* Features List */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {[
                  "Cutting-edge design solutions",
                  "Fast & efficient delivery",
                  "Seamless collaboration",
                  "24/7 dedicated support"
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.6 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-lg text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar - Dark Section */}
      <div 
        ref={statsRef}
        className="bg-foreground py-16 md:py-20 lg:py-24"
      >
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                className="relative px-4 md:px-8 lg:px-10 py-6 md:py-8"
                initial={{ opacity: 0, y: 40 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {/* Vertical divider */}
                {index > 0 && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-20 md:h-24 bg-background/10"
                    initial={{ scaleY: 0 }}
                    animate={isStatsInView ? { scaleY: 1 } : {}}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.4 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  />
                )}

                {/* Number */}
                <motion.div
                  className="mb-4 md:mb-6"
                  initial={{ opacity: 0 }}
                  animate={isStatsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.12 }}
                >
                  <span className="font-syne text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-background tracking-tight">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </span>
                </motion.div>

                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <p className="text-sm md:text-base text-background/60 leading-relaxed">
                    {stat.line1}
                    <br />
                    {stat.line2}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
