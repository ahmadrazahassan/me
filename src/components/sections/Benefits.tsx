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
      let start = 0;
      const duration = 1500;
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
      {displayValue}{suffix}
    </span>
  );
}

// Smooth text reveal with mask
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

// Stats data
const stats = [
  {
    number: 50,
    suffix: "+",
    title: "Successful projects",
    subtitle: "completed",
    description: "We've delivered 50+ projects that help companies generate real results.",
    index: "01"
  },
  {
    number: 95,
    suffix: "%",
    title: "Customer",
    subtitle: "satisfaction rate",
    showBrands: true,
    index: "02"
  }
];

const brands = ["Vercel", "Stripe", "Linear"];

export function Benefits() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="py-32 md:py-40 lg:py-48 bg-background"
    >
      <div className="container-wide">
        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 md:mb-28">
          {/* Eyebrow - Left */}
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

          {/* Heading - Right */}
          <div className="lg:col-span-9">
            <h2 className="font-syne font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em]">
              <TextReveal>
                <span className="text-foreground">Proven results for every project,</span>
              </TextReveal>
              <TextReveal delay={0.08}>
                <span className="text-muted-foreground/60">with a focus on design and</span>
              </TextReveal>
              <TextReveal delay={0.16}>
                <span className="text-muted-foreground/60">functionality.</span>
              </TextReveal>
            </h2>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
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
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              
              {/* Corner badge */}
              <motion.button
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-foreground flex items-center justify-center"
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
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Description Text */}
            <motion.p
              className="text-lg md:text-xl lg:text-2xl leading-relaxed tracking-[-0.01em]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-foreground font-medium">No fluff, just results.</span>{" "}
              <span className="text-muted-foreground">
                Thoughtful design and tools that make your work easier. We focus on smart design and useful features, project after project.
              </span>
            </motion.p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.index}
                  className="group"
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <motion.div
                    className="h-full p-7 md:p-8 rounded-xl border border-border bg-background transition-colors duration-300 hover:bg-muted/30"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Index */}
                    <div className="flex justify-between items-start mb-6">
                      <motion.span 
                        className="font-syne text-5xl md:text-6xl font-bold text-foreground"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      >
                        <AnimatedNumber value={stat.number} suffix={stat.suffix} />
                      </motion.span>
                      <span className="text-xs text-muted-foreground/40 font-medium mt-2">
                        {stat.index}
                      </span>
                    </div>

                    {/* Divider */}
                    <motion.div
                      className="w-full h-px bg-border mb-5"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ originX: 0 }}
                    />

                    {/* Title */}
                    <div className="mb-8">
                      <p className="text-base text-foreground font-medium">{stat.title}</p>
                      <p className="text-base text-muted-foreground">{stat.subtitle}</p>
                    </div>

                    {/* Bottom content */}
                    <div className="min-h-[60px]">
                      {stat.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {stat.description}
                        </p>
                      )}
                      
                      {stat.showBrands && (
                        <div className="flex items-center gap-5">
                          {brands.map((brand, i) => (
                            <motion.span
                              key={brand}
                              className="text-xs text-muted-foreground/50 font-medium tracking-wide uppercase"
                              initial={{ opacity: 0 }}
                              animate={isInView ? { opacity: 1 } : {}}
                              transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
                            >
                              {brand}
                            </motion.span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Stats Strip */}
            <motion.div
              className="flex items-center gap-8 md:gap-12 pt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {[
                { value: "15+", label: "Years Experience" },
                { value: "100%", label: "Dedication" },
                { value: "24/7", label: "Support" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                >
                  <span className="font-syne text-2xl md:text-3xl font-bold text-foreground">
                    {item.value}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
