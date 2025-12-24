import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

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

// Stats data
const statsData = [
  {
    value: 300,
    suffix: "+",
    line1: "Successful projects",
    line2: "completed"
  },
  {
    value: 10,
    suffix: "+",
    line1: "Years of experience",
    line2: "in creative industry"
  },
  {
    value: 99,
    suffix: "%",
    line1: "Customer",
    line2: "satisfaction rate"
  },
  {
    value: 25,
    suffix: "M",
    line1: "In Client revenue",
    line2: "growth"
  }
];

export function Stats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 lg:py-32 bg-foreground overflow-hidden"
    >
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="relative px-6 md:px-10 py-8 md:py-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* Vertical divider */}
              {index > 0 && (
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-24 bg-background/10"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              )}

              {/* Number */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              >
                <span className="font-syne text-5xl md:text-6xl lg:text-7xl font-bold text-background tracking-tight">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </span>
              </motion.div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <p className="text-sm md:text-base text-background/70 leading-relaxed">
                  {stat.line1}
                  <br />
                  {stat.line2}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
