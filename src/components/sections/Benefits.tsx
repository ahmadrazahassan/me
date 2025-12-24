import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Plus, Circle } from "lucide-react";

// Animated number counter
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

// Text reveal animation
function RevealText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.6, 0.01, 0, 0.9] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Stats data
const stats = [
  {
    number: 50,
    suffix: "+",
    label: "Successful projects",
    sublabel: "completed",
    description: "We've delivered 50+ projects that help companies generate real results.",
    index: "01"
  },
  {
    number: 95,
    suffix: "%",
    label: "Customer",
    sublabel: "satisfaction rate",
    description: "Our clients love working with us, and the numbers prove it.",
    index: "02"
  }
];

// Trusted brands
const brands = [
  { name: "Vercel", icon: "▲" },
  { name: "Stripe", icon: "◆" },
  { name: "Linear", icon: "◯" },
];

export function Benefits() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 bg-background overflow-hidden"
    >
      <div className="container-wide">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 md:mb-24">
          {/* Left - Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-start"
          >
            <div className="inline-flex items-center gap-2">
              <motion.div
                className="w-5 h-5 rounded-full border border-foreground/20 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <Plus className="w-3 h-3 text-foreground" />
              </motion.div>
              <span className="text-sm font-medium text-foreground">Why choose us</span>
            </div>
          </motion.div>

          {/* Right - Main Heading */}
          <div>
            <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              <RevealText>Proven results for every project,</RevealText>
              <br />
              <span className="text-muted-foreground">
                <RevealText delay={0.1}>with a focus on design and</RevealText>
                <br />
                <RevealText delay={0.2}>functionality.</RevealText>
              </span>
            </h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left - Portrait Image */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <motion.div
                className="relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[3/4] md:aspect-[4/5]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                  alt="Professional portrait"
                  className="w-full h-full object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />
              </motion.div>
              
              {/* Floating badge */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-foreground flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 90 }}
              >
                <Plus className="w-4 h-4 text-background" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Description */}
            <motion.div
              className="mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg md:text-xl leading-relaxed max-w-xl">
                <span className="text-foreground font-semibold">No fluff, just results.</span>{" "}
                <span className="text-muted-foreground">
                  Thoughtful design and tools that make your work easier. We focus on smart design and useful features, project after project.
                </span>
              </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.index}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <motion.div
                    className="relative h-full p-6 md:p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden"
                    whileHover={{ y: -4, borderColor: "hsl(var(--border))" }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Index number */}
                    <span className="absolute top-6 right-6 text-xs text-muted-foreground/50 font-medium">
                      {stat.index}
                    </span>

                    {/* Number */}
                    <div className="mb-4">
                      <span className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                        <AnimatedNumber value={stat.number} suffix={stat.suffix} />
                      </span>
                    </div>

                    {/* Divider */}
                    <motion.div
                      className="w-full h-px bg-border/50 mb-4"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                      style={{ originX: 0 }}
                    />

                    {/* Label */}
                    <div className="mb-6">
                      <p className="text-sm md:text-base text-foreground font-medium">{stat.label}</p>
                      <p className="text-sm md:text-base text-muted-foreground">{stat.sublabel}</p>
                    </div>

                    {/* Description (shown on first card) */}
                    {index === 0 && (
                      <motion.p
                        className="text-sm text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.9 }}
                      >
                        {stat.description}
                      </motion.p>
                    )}

                    {/* Brands (shown on second card) */}
                    {index === 1 && (
                      <motion.div
                        className="flex items-center gap-4 mt-auto pt-4"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.9 }}
                      >
                        {brands.map((brand, i) => (
                          <motion.div
                            key={brand.name}
                            className="flex items-center gap-1.5 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
                          >
                            <span className="text-sm">{brand.icon}</span>
                            <span className="text-xs font-medium">{brand.name}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Additional Stats Row */}
            <motion.div
              className="grid grid-cols-3 gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {[
                { value: 15, suffix: "+", label: "Years" },
                { value: 100, suffix: "%", label: "Dedication" },
                { value: 24, suffix: "/7", label: "Support" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="text-center p-4 rounded-xl border border-border/30 bg-muted/20"
                  whileHover={{ y: -2, backgroundColor: "hsl(var(--muted) / 0.4)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="font-syne text-2xl md:text-3xl font-bold text-foreground mb-1">
                    <AnimatedNumber value={item.value} suffix={item.suffix} />
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
