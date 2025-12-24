import React, { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

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

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const textRevealVariants = {
  hidden: { opacity: 0, y: 100, skewY: 3 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function ServicesModern() {
  const [expandedId, setExpandedId] = useState<string | null>("web-design");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section 
      ref={sectionRef}
      id="services-modern" 
      className="relative py-24 lg:py-32 bg-[#1a1a1a] overflow-hidden"
    >
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16 lg:mb-24"
        >
          {/* What we do label */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <motion.div 
              className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center"
              whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.6)" }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-3 h-3 text-white/70" />
            </motion.div>
            <span className="text-white/60 text-sm tracking-widest uppercase">What we do</span>
          </motion.div>

          {/* Main heading with reveal animation */}
          <div className="lg:text-center flex-1 overflow-hidden">
            <motion.h2 
              variants={textRevealVariants}
              initial="hidden"
              animate={isHeaderInView ? "visible" : "hidden"}
              className="font-syne text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight"
            >
              Services
              <motion.span 
                className="text-white/40 inline-block"
                initial={{ opacity: 0, scale: 0 }}
                animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.4, ease: "backOut" }}
              >
                .
              </motion.span>
            </motion.h2>
          </div>

          {/* Count with fade in */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:text-right"
          >
            <span className="text-white/40 text-lg font-light">({servicesData.length})</span>
          </motion.div>
        </motion.div>

        {/* Services Accordion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-0"
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Animated border line */}
              <motion.div
                variants={lineVariants}
                className="absolute top-0 left-0 right-0 h-px bg-white/10"
              />
              {index === servicesData.length - 1 && (
                <motion.div
                  variants={lineVariants}
                  className="absolute bottom-0 left-0 right-0 h-px bg-white/10"
                />
              )}

              {/* Hover background effect */}
              <motion.div
                className="absolute inset-0 bg-white/[0.02]"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === service.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div
                className="relative py-6 lg:py-8 cursor-pointer"
                onClick={() => toggleService(service.id)}
              >
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-start">
                  {/* Number with slide animation */}
                  <motion.div 
                    className="col-span-2 lg:col-span-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <motion.span 
                      className="text-white/40 text-sm font-mono"
                      animate={{ 
                        color: expandedId === service.id ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)" 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      ({service.number})
                    </motion.span>
                  </motion.div>

                  {/* Content Area */}
                  <div className="col-span-8 lg:col-span-10">
                    <AnimatePresence mode="wait" initial={false}>
                      {expandedId === service.id ? (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: 1, 
                            height: "auto",
                            transition: {
                              height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.3, delay: 0.1 }
                            }
                          }}
                          exit={{ 
                            opacity: 0, 
                            height: 0,
                            transition: {
                              height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.2 }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="grid lg:grid-cols-3 gap-6 lg:gap-12 pb-2">
                            {/* Images with stagger */}
                            <div className="flex gap-3">
                              {service.images.map((img, imgIndex) => (
                                <motion.div
                                  key={imgIndex}
                                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  transition={{ 
                                    delay: imgIndex * 0.1 + 0.15, 
                                    duration: 0.5,
                                    ease: [0.16, 1, 0.3, 1]
                                  }}
                                  whileHover={{ scale: 1.05, y: -4 }}
                                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden"
                                >
                                  <img
                                    src={img}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </motion.div>
                              ))}
                            </div>

                            {/* Title and Description with slide up */}
                            <motion.div 
                              className="space-y-3"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <div className="flex items-center gap-2">
                                <h3 className="font-syne text-xl lg:text-2xl font-semibold text-white">
                                  {service.title}
                                </h3>
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.4 }}
                                >
                                  <ArrowUpRight className="w-5 h-5 text-white/50" />
                                </motion.div>
                              </div>
                              <p className="text-white/60 text-sm lg:text-base leading-relaxed">
                                {service.description}
                              </p>
                            </motion.div>

                            {/* Categories with stagger */}
                            <motion.div 
                              className="space-y-3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.25 }}
                            >
                              <span className="text-white/40 text-xs uppercase tracking-wider">
                                Categories
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {service.categories.map((cat, catIndex) => (
                                  <motion.span
                                    key={catIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ 
                                      delay: catIndex * 0.04 + 0.3, 
                                      duration: 0.3,
                                      ease: [0.16, 1, 0.3, 1]
                                    }}
                                    whileHover={{ 
                                      scale: 1.05,
                                      backgroundColor: "rgba(255,255,255,0.1)",
                                    }}
                                    className="px-3 py-1.5 rounded-full border border-white/20 text-white/80 text-xs cursor-default transition-colors duration-200"
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
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-4"
                        >
                          <motion.h3
                            className="font-syne text-xl lg:text-2xl xl:text-3xl font-semibold text-white"
                            animate={{ 
                              x: hoveredId === service.id ? 8 : 0,
                              color: hoveredId === service.id ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,1)"
                            }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {service.title}
                          </motion.h3>
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ 
                              opacity: hoveredId === service.id ? 1 : 0,
                              x: hoveredId === service.id ? 0 : -10
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowUpRight className="w-5 h-5 text-white/50" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Toggle Button with rotate animation */}
                  <div className="col-span-2 lg:col-span-1 flex justify-end">
                    <motion.button
                      className={cn(
                        "w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-colors duration-300",
                        expandedId === service.id
                          ? "bg-white text-[#1a1a1a]"
                          : "border border-white/30 text-white/70"
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        rotate: expandedId === service.id ? 180 : 0,
                        borderColor: hoveredId === service.id && expandedId !== service.id 
                          ? "rgba(255,255,255,0.6)" 
                          : "rgba(255,255,255,0.3)"
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <motion.div
                        animate={{ rotate: expandedId === service.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {expandedId === service.id ? (
                          <Minus className="w-4 h-4 lg:w-5 lg:h-5" />
                        ) : (
                          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                        )}
                      </motion.div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
