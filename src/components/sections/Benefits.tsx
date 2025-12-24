import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";

// Character-by-character text reveal
function CharacterReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const characters = text.split("");
  
  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.02,
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

// Word reveal animation
function WordReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");
  
  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Smooth animated number with spring physics
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  const springValue = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

// Magnetic button wrapper
function MagneticWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
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

// Features data
const features = [
  { title: "Cutting-edge design", description: "Modern solutions that stand out" },
  { title: "Fast delivery", description: "On-time, every time" },
  { title: "Seamless process", description: "From concept to launch" },
  { title: "Dedicated support", description: "Always here when you need us" }
];

export function Benefits() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);
  
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isImageInView = useInView(imageRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  return (
    <section ref={sectionRef} className="bg-background overflow-hidden">
      {/* Main Content */}
      <div className="py-32 md:py-40 lg:py-52">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-24 md:mb-32 lg:mb-40">
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <Plus className="w-4 h-4 text-foreground" />
              </motion.div>
              <span className="text-sm font-medium text-foreground uppercase tracking-[0.2em]">
                Why choose us
              </span>
            </motion.div>

            {/* Main Heading */}
            <h2 className="font-syne font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.04em] max-w-5xl">
              <CharacterReveal text="Proven results" delay={0.2} className="text-foreground" />
              <br />
              <CharacterReveal text="for every project." delay={0.4} className="text-muted-foreground/40" />
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left - Image */}
            <div ref={imageRef} className="relative">
              <motion.div
                className="relative overflow-hidden rounded-3xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isImageInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Image container with parallax */}
                <motion.div 
                  className="relative aspect-[4/5] overflow-hidden"
                  style={{ y: imageY }}
                >
                  <motion.img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                    alt="Professional portrait"
                    className="w-full h-full object-cover"
                    style={{ scale: imageScale }}
                  />
                </motion.div>

                {/* Image overlay line */}
                <motion.div
                  className="absolute inset-0 border border-background/20 rounded-3xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={isImageInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </motion.div>

              {/* Floating badge */}
              <MagneticWrapper className="absolute top-6 right-6">
                <motion.div
                  className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center cursor-pointer"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isImageInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-5 h-5 text-background" />
                </motion.div>
              </MagneticWrapper>

              {/* Decorative element */}
              <motion.div
                className="absolute -bottom-8 -left-8 w-32 h-32 border border-border rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={isImageInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Right - Content */}
            <div className="lg:pt-20">
              {/* Description */}
              <motion.div
                className="mb-16"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-2xl md:text-3xl lg:text-4xl leading-[1.3] tracking-[-0.02em]">
                  <WordReveal 
                    text="No fluff, just results." 
                    delay={0.5} 
                    className="text-foreground font-medium"
                  />
                  <br />
                  <WordReveal 
                    text="Thoughtful design and tools that make your work easier." 
                    delay={0.7} 
                    className="text-muted-foreground/50"
                  />
                </p>
              </motion.div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="group relative p-6 rounded-2xl border border-border/50 hover:border-border transition-all duration-500 cursor-pointer overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.8 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Hover background */}
                    <motion.div
                      className="absolute inset-0 bg-muted/50"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-primary mt-2"
                          whileHover={{ scale: 1.5 }}
                        />
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          <ArrowUpRight className="w-4 h-4 text-foreground" />
                        </motion.div>
                      </div>
                      <h4 className="font-syne font-bold text-lg text-foreground mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <MagneticWrapper>
                <motion.a
                  href="#contact"
                  className="group inline-flex items-center gap-3 text-foreground font-medium text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <span className="relative">
                    Start a project
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-px bg-foreground origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                  <motion.span
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-colors duration-300"
                    whileHover={{ rotate: 45 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="w-4 h-4 group-hover:text-background transition-colors" />
                  </motion.span>
                </motion.a>
              </MagneticWrapper>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div ref={statsRef} className="bg-foreground">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                className="relative px-6 md:px-10 py-14 md:py-20"
                initial={{ opacity: 0, y: 50 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {/* Divider */}
                {index > 0 && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-28 bg-background/10"
                    initial={{ scaleY: 0 }}
                    animate={isStatsInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  />
                )}

                {/* Number */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1, type: "spring" }}
                >
                  <span className="font-syne text-5xl md:text-6xl lg:text-7xl font-bold text-background tracking-tight">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </span>
                </motion.div>

                {/* Label */}
                <motion.p
                  className="text-sm md:text-base text-background/50 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  {stat.line1}
                  <br />
                  {stat.line2}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
