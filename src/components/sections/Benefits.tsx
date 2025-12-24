import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";

// Character reveal with parallax
function CharacterReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const characters = text.split("");
  
  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 80, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.025,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// Animated counter with spring
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
  const springValue = useSpring(0, { stiffness: 40, damping: 25 });

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (v) => setDisplayValue(Math.floor(v)));
  }, [springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}<span className="text-primary">{suffix}</span>
    </span>
  );
}

// Floating parallax element
function FloatingElement({ children, speed = 1, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// Mouse parallax wrapper
function MouseParallax({ children, strength = 20, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / strength);
    y.set((e.clientY - centerY) / strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

// Stats data
const statsData = [
  { value: 300, suffix: "+", line1: "Successful projects", line2: "completed" },
  { value: 10, suffix: "+", line1: "Years of experience", line2: "in creative industry" },
  { value: 99, suffix: "%", line1: "Customer", line2: "satisfaction rate" },
  { value: 25, suffix: "M", line1: "In Client revenue", line2: "growth" }
];

// Features
const features = [
  { title: "Cutting-edge design", description: "Modern solutions that stand out" },
  { title: "Fast delivery", description: "On-time, every time" },
  { title: "Seamless process", description: "From concept to launch" },
  { title: "Dedicated support", description: "Always here for you" }
];

export function Benefits() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);
  
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isImageInView = useInView(imageRef, { once: true, margin: "-50px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" });

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Multiple parallax layers
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const decorY = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const decorRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const featuresY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // Smooth spring animations
  const smoothImageY = useSpring(imageY, { stiffness: 50, damping: 20 });
  const smoothTextY = useSpring(textY, { stiffness: 50, damping: 20 });

  return (
    <section ref={sectionRef} className="relative bg-background overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full border border-border/20"
          style={{ y: decorY, rotate: decorRotate }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full border border-border/10"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative py-32 md:py-44 lg:py-56">
        <div className="container-wide">
          {/* Header with parallax */}
          <motion.div className="mb-28 md:mb-36 lg:mb-44" style={{ y: smoothTextY }}>
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center"
                whileHover={{ scale: 1.2, rotate: 180, borderColor: "hsl(var(--primary))" }}
                transition={{ duration: 0.4 }}
              >
                <Plus className="w-4 h-4 text-foreground" />
              </motion.div>
              <motion.span 
                className="text-sm font-medium text-foreground uppercase tracking-[0.25em]"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Why choose us
              </motion.span>
            </motion.div>

            {/* Main Heading with character animation */}
            <h2 className="font-syne font-bold text-[clamp(2.8rem,7vw,6rem)] leading-[0.9] tracking-[-0.04em] max-w-5xl">
              <CharacterReveal text="Proven results" delay={0.1} className="text-foreground block" />
              <CharacterReveal text="for every project." delay={0.5} className="text-muted-foreground/30 block" />
            </h2>
          </motion.div>

          {/* Content Grid */}
          <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Left - Image with parallax */}
            <div ref={imageRef} className="lg:col-span-5 relative">
              <MouseParallax strength={40} className="relative">
                <motion.div
                  className="relative overflow-hidden rounded-[2rem]"
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  animate={isImageInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ y: smoothImageY, rotateZ: imageRotate }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <motion.img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                      alt="Professional portrait"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.3 }}
                      animate={isImageInView ? { scale: 1 } : {}}
                      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                    
                    {/* Animated overlay lines */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={isImageInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div
                        className="absolute top-0 left-0 w-full h-px bg-background/30"
                        initial={{ scaleX: 0 }}
                        animate={isImageInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-px bg-background/30"
                        initial={{ scaleX: 0 }}
                        animate={isImageInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                        style={{ originX: 1 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </MouseParallax>

              {/* Floating badge with parallax */}
              <FloatingElement speed={0.5} className="absolute top-8 right-8 z-10">
                <motion.div
                  className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center cursor-pointer shadow-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isImageInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 150 }}
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className="w-6 h-6 text-background" />
                </motion.div>
              </FloatingElement>

              {/* Decorative circles with parallax */}
              <FloatingElement speed={-0.3} className="absolute -bottom-12 -left-12">
                <motion.div
                  className="w-40 h-40 rounded-full border border-border"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isImageInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.9 }}
                />
              </FloatingElement>
              
              <FloatingElement speed={0.8} className="absolute -top-8 -right-16">
                <motion.div
                  className="w-24 h-24 rounded-full border border-primary/20"
                  initial={{ scale: 0 }}
                  animate={isImageInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.1 }}
                />
              </FloatingElement>
            </div>

            {/* Right - Content with staggered parallax */}
            <motion.div 
              className="lg:col-span-7 lg:pt-16"
              style={{ y: featuresY }}
            >
              {/* Description with word reveal */}
              <motion.div className="mb-20">
                <motion.p
                  className="text-2xl md:text-3xl lg:text-4xl leading-[1.25] tracking-[-0.02em]"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {["No", "fluff,", "just", "results."].map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.3em] text-foreground font-medium"
                      initial={{ opacity: 0, y: 40, rotateX: -45 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {word}
                    </motion.span>
                  ))}
                  <br />
                  {["Thoughtful", "design", "and", "tools", "that", "make", "your", "work", "easier."].map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.3em] text-muted-foreground/50"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>

              {/* Features with staggered animation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="group relative p-7 rounded-2xl border border-border/40 cursor-pointer overflow-hidden"
                    initial={{ opacity: 0, y: 50, rotateX: -10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.2 + index * 0.12,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ y: -8, borderColor: "hsl(var(--border))" }}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-muted/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div 
                          className="w-2.5 h-2.5 rounded-full bg-primary"
                          whileHover={{ scale: 2 }}
                          transition={{ duration: 0.2 }}
                        />
                        <motion.div
                          className="opacity-0 group-hover:opacity-100"
                          initial={{ x: -10, rotate: -45 }}
                          whileHover={{ x: 0, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowUpRight className="w-5 h-5 text-foreground" />
                        </motion.div>
                      </div>
                      <h4 className="font-syne font-bold text-xl text-foreground mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA with magnetic effect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <MouseParallax strength={30}>
                  <motion.a
                    href="#contact"
                    className="group inline-flex items-center gap-4"
                    whileHover="hover"
                  >
                    <span className="relative text-xl font-medium text-foreground">
                      Start a project
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-px bg-foreground"
                        initial={{ scaleX: 0 }}
                        variants={{ hover: { scaleX: 1 } }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ originX: 0 }}
                      />
                    </span>
                    <motion.span
                      className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-colors duration-400"
                      variants={{ hover: { rotate: 45, scale: 1.1 } }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className="w-5 h-5 group-hover:text-background transition-colors" />
                    </motion.span>
                  </motion.a>
                </MouseParallax>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Bar with parallax entrance */}
      <div ref={statsRef} className="relative bg-foreground overflow-hidden">
        {/* Subtle animated background */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 50%)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container-wide relative">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                className="relative px-6 md:px-12 py-16 md:py-24"
                initial={{ opacity: 0, y: 60 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.9, 
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {/* Divider with animation */}
                {index > 0 && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-32 bg-background/10"
                    initial={{ scaleY: 0 }}
                    animate={isStatsInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}

                {/* Number with scale animation */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.12, type: "spring", stiffness: 100 }}
                >
                  <span className="font-syne text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-background tracking-tighter">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </span>
                </motion.div>

                {/* Label */}
                <motion.p
                  className="text-sm md:text-base text-background/50 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {stat.line1}<br />{stat.line2}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
