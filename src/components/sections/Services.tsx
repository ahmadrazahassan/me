import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Plus, Minus, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";

// Character reveal animation component
function CharacterReveal({ 
  text, 
  className,
  delay = 0 
}: { 
  text: string; 
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// Service categories for each service
const serviceCategories: Record<string, string[]> = {
  "branding": ["Logo design", "Brand strategy", "Visual identity", "Guidelines", "Packaging", "6+"],
  "web-design": ["Responsive design", "UI/UX", "Development", "CMS", "E-commerce", "4+"],
  "ui-ux": ["User research", "Wireframing", "Prototyping", "Testing", "Design systems", "5+"],
  "motion": ["Animation", "Video editing", "Motion graphics", "Social content", "3D", "4+"],
};

interface ServiceItemProps {
  service: typeof services[0];
  isActive: boolean;
  onToggle: () => void;
  index: number;
}

function ServiceItem({ service, isActive, onToggle, index }: ServiceItemProps) {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });
  const categories = serviceCategories[service.id] || [];

  return (
    <motion.div
      ref={itemRef}
      className="border-t border-muted-foreground/20"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.button
        onClick={onToggle}
        className="w-full py-8 md:py-10 flex items-center justify-between group cursor-pointer"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-8 md:gap-16 lg:gap-24">
          {/* Number */}
          <span className="text-sm text-muted-foreground font-mono">
            ({service.number})
          </span>

          {/* Image thumbnails - only show when active */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: "auto" }}
                exit={{ opacity: 0, scale: 0.8, width: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hidden md:flex items-center gap-2 overflow-hidden"
              >
                <motion.div
                  className="w-16 h-12 rounded-lg overflow-hidden"
                  initial={{ rotate: -8 }}
                  animate={{ rotate: -8 }}
                  whileHover={{ rotate: 0, scale: 1.1 }}
                >
                  <img
                    src={service.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg"
                  initial={{ rotate: 8 }}
                  animate={{ rotate: 8 }}
                  whileHover={{ rotate: 0, scale: 1.1 }}
                >
                  {service.title.charAt(0)}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Title */}
          <div className="text-left">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-syne font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {service.title}
            </h3>
            
            {/* Description - only show when active */}
            <AnimatePresence>
              {isActive && (
                <motion.p
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed overflow-hidden"
                >
                  {service.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-12">
          {/* Categories - only show when active */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="hidden lg:block"
              >
                <span className="text-xs text-muted-foreground mb-3 block">Categories</span>
                <div className="flex flex-wrap gap-2 max-w-xs">
                  {categories.map((cat, i) => (
                    <motion.span
                      key={cat}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="px-3 py-1.5 text-xs rounded-full border border-muted-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
                    >
                      {cat}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <motion.div
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300",
              isActive
                ? "bg-foreground border-foreground"
                : "border-muted-foreground/30 group-hover:border-foreground"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isActive ? (
                <Minus className={cn("w-5 h-5", isActive ? "text-background" : "text-foreground")} />
              ) : (
                <Plus className="w-5 h-5 text-foreground" />
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  );
}

export function Services() {
  const [activeId, setActiveId] = useState<string | null>(services[0].id);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleToggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, hsl(var(--foreground)) 0%, hsl(var(--foreground) / 0.95) 100%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
        `,
      }}
    >
      {/* Subtle gradient overlays */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-50" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-muted/10 to-transparent opacity-30" />
      </motion.div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-24">
          {/* What we do label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-8 h-8 rounded-full border border-background/30 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Play className="w-3 h-3 text-background fill-background" />
            </motion.div>
            <span className="text-sm text-background/70 tracking-wide">What we do</span>
          </motion.div>

          {/* Main title */}
          <div className="flex items-end gap-4">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-syne font-bold text-background tracking-tight">
              <CharacterReveal text="Services." delay={0.2} />
            </h2>
            <motion.span
              className="text-xl md:text-2xl text-background/50 font-light mb-2 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              ({services.length})
            </motion.span>
          </div>
        </div>

        {/* Service list */}
        <div className="text-background">
          {services.map((service, index) => (
            <ServiceItem
              key={service.id}
              service={service}
              isActive={activeId === service.id}
              onToggle={() => handleToggle(service.id)}
              index={index}
            />
          ))}
          
          {/* Bottom border */}
          <motion.div
            className="border-t border-muted-foreground/20"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}
