import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  categories: string[];
  images: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: "web-design",
    number: "001",
    title: "Web design and development",
    description: "Modern, responsive, and user-friendly websites designed to engage visitors and drive conversions.",
    categories: ["Packaging design", "Logo design", "Rebranding", "Typography", "Guidelines", "Visual identity"],
    images: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&q=80",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&q=80",
    ],
  },
  {
    id: "social-media",
    number: "002",
    title: "Social media marketing",
    description: "Strategic social media campaigns that build brand awareness and drive meaningful engagement with your audience.",
    categories: ["Content strategy", "Campaign management", "Analytics", "Community building"],
    images: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&q=80",
    ],
  },
  {
    id: "seo",
    number: "003",
    title: "SEO and content marketing",
    description: "Data-driven SEO strategies and compelling content that improves your visibility and attracts qualified leads.",
    categories: ["Keyword research", "On-page SEO", "Content creation", "Link building"],
    images: [
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80",
    ],
  },
  {
    id: "branding",
    number: "004",
    title: "Branding and identity",
    description: "Distinctive brand identities that resonate with your audience and establish lasting market presence.",
    categories: ["Brand strategy", "Visual identity", "Brand guidelines", "Positioning"],
    images: [
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=200&q=80",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&q=80",
    ],
  },
];

// Smooth spring config
const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

// Service accordion item component for smoother animations
function ServiceAccordionItem({ 
  service, 
  isExpanded, 
  onToggle,
  index 
}: { 
  service: ServiceItem; 
  isExpanded: boolean; 
  onToggle: () => void;
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={itemRef}
      variants={itemVariants}
      layout
      className="border-t border-background/10 last:border-b overflow-hidden"
    >
      <motion.div
        className="py-8 lg:py-10 cursor-pointer group"
        onClick={onToggle}
        layout
      >
        <div className="grid grid-cols-12 gap-4 lg:gap-8 items-start">
          {/* Number with smooth animation */}
          <motion.div 
            className="col-span-2 lg:col-span-1"
            animate={{ 
              opacity: isExpanded ? 0.6 : 0.4,
              x: isExpanded ? 4 : 0 
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="text-background text-sm font-light tracking-wide">
              ({service.number})
            </span>
          </motion.div>

          {/* Content Area */}
          <div className="col-span-8 lg:col-span-10">
            <AnimatePresence mode="wait" initial={false}>
              {isExpanded ? (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    height: "auto", 
                    y: 0,
                    transition: {
                      height: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
                      opacity: { duration: 0.4, delay: 0.1 },
                      y: { duration: 0.5, ease: "easeOut" }
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    height: 0,
                    y: -10,
                    transition: {
                      height: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                      opacity: { duration: 0.2 },
                      y: { duration: 0.3 }
                    }
                  }}
                  className="overflow-hidden"
                >
                  <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Images with staggered reveal */}
                    <div className="flex gap-4">
                      {service.images.map((img, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            rotateY: 0,
                            transition: { 
                              delay: imgIndex * 0.15 + 0.2,
                              duration: 0.6,
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            rotateY: 5,
                            transition: { duration: 0.3 }
                          }}
                          className="w-16 h-16 lg:w-24 lg:h-24 rounded-2xl overflow-hidden shadow-lg"
                          style={{ perspective: 1000 }}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Title and Description with smooth reveal */}
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: 0.25, duration: 0.5 }
                      }}
                    >
                      <h3 className="font-syne text-2xl lg:text-3xl font-semibold text-background leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-background/60 text-sm lg:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </motion.div>

                    {/* Categories with cascade animation */}
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        transition: { delay: 0.3, duration: 0.4 }
                      }}
                    >
                      <span className="text-background/40 text-xs uppercase tracking-widest font-medium">
                        Categories
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {service.categories.map((cat, catIndex) => (
                          <motion.span
                            key={catIndex}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1, 
                              y: 0,
                              transition: { 
                                delay: catIndex * 0.06 + 0.35,
                                duration: 0.4,
                                ease: "easeOut"
                              }
                            }}
                            whileHover={{ 
                              scale: 1.05,
                              backgroundColor: "rgba(255,255,255,0.15)",
                              transition: { duration: 0.2 }
                            }}
                            className="px-4 py-2 rounded-full border border-background/20 text-background/80 text-xs font-medium cursor-default transition-colors"
                          >
                            {cat}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: 10,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-center"
                >
                  <motion.h3
                    className="font-syne text-2xl lg:text-3xl xl:text-4xl font-semibold text-background transition-colors duration-300"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <span className="group-hover:text-background/70 transition-colors duration-300">
                      {service.title}
                    </span>
                  </motion.h3>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Toggle Button with smooth rotation */}
          <div className="col-span-2 lg:col-span-1 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                rotate: isExpanded ? 180 : 0,
                backgroundColor: isExpanded ? "hsl(var(--background))" : "transparent"
              }}
              transition={{ 
                rotate: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                backgroundColor: { duration: 0.3 }
              }}
              className={cn(
                "w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300",
                isExpanded
                  ? "text-foreground shadow-lg"
                  : "border border-background/30 text-background/70 hover:border-background/60"
              )}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {isExpanded ? (
                  <Minus className="w-5 h-5 lg:w-6 lg:h-6" />
                ) : (
                  <Plus className="w-5 h-5 lg:w-6 lg:h-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ServicesModern() {
  const [expandedId, setExpandedId] = useState<string | null>("web-design");
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, springConfig);
  const headerY = useTransform(smoothProgress, [0, 1], [60, -60]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section 
      ref={sectionRef}
      id="services-modern" 
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, hsl(var(--foreground)) 0%, hsl(var(--foreground) / 0.97) 50%, hsl(var(--foreground)) 100%)
        `,
      }}
    >
      {/* Animated grain texture */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />

      {/* Gradient orbs for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />

      <motion.div
        className="container-wide relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Header with parallax */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-20 lg:mb-28"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          {/* What we do label */}
          <motion.div 
            className="flex items-center gap-3"
            variants={itemVariants}
          >
            <motion.div 
              className="w-7 h-7 rounded-full border border-background/30 flex items-center justify-center"
              whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.5)" }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-3.5 h-3.5 text-background/70" />
            </motion.div>
            <span className="text-background/70 text-sm tracking-widest uppercase font-medium">What we do</span>
          </motion.div>

          {/* Main heading with character animation */}
          <motion.div 
            className="lg:text-center flex-1"
            variants={itemVariants}
          >
            <motion.h2 
              className="font-syne text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-background tracking-tighter leading-none"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              Services
              <motion.span 
                className="text-primary"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                .
              </motion.span>
            </motion.h2>
          </motion.div>

          {/* Count with animated number */}
          <motion.div 
            className="lg:text-right"
            variants={itemVariants}
          >
            <motion.span 
              className="text-background/40 text-xl font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              ({servicesData.length})
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Services Accordion with layout animation */}
        <motion.div 
          className="space-y-0"
          layout
        >
          {servicesData.map((service, index) => (
            <ServiceAccordionItem
              key={service.id}
              service={service}
              isExpanded={expandedId === service.id}
              onToggle={() => toggleService(service.id)}
              index={index}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
