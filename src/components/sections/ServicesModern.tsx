import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
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

// Stagger animation for container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Item reveal animation
const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// Text character reveal component
function TextReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span className={cn("inline-block overflow-hidden", className)}>
      <motion.span
        className="inline-block"
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.6, 
          ease: [0.22, 1, 0.36, 1],
          delay 
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}

// Animated line component
function AnimatedLine({ isVisible }: { isVisible: boolean }) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-primary via-white/50 to-transparent"
      initial={{ width: "0%" }}
      animate={{ width: isVisible ? "100%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

// Service item component
function ServiceItem({ 
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="relative border-t border-white/[0.08] last:border-b group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-white/[0.04] to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered || isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated accent line */}
      <AnimatedLine isVisible={isExpanded} />

      <div
        className="relative py-8 lg:py-10 cursor-pointer"
        onClick={onToggle}
      >
        <div className="grid grid-cols-12 gap-4 lg:gap-8 items-start">
          {/* Number with hover animation */}
          <motion.div 
            className="col-span-2 lg:col-span-1"
            animate={{ 
              x: isHovered ? 4 : 0,
              opacity: isHovered ? 0.8 : 0.4
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="text-white text-sm font-light tracking-wide">
              ({service.number})
            </span>
          </motion.div>

          {/* Content Area */}
          <div className="col-span-8 lg:col-span-10">
            <AnimatePresence mode="wait" initial={false}>
              {isExpanded ? (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: 1, 
                    height: "auto",
                    transition: {
                      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.3, delay: 0.1 }
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    height: 0,
                    transition: {
                      height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.15 }
                    }
                  }}
                  className="overflow-hidden"
                >
                  <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 pb-2">
                    {/* Images with staggered 3D reveal */}
                    <div className="flex gap-4">
                      {service.images.map((img, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                          transition={{ 
                            delay: imgIndex * 0.1 + 0.15,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          whileHover={{ 
                            scale: 1.08,
                            rotateY: 8,
                            transition: { duration: 0.25 }
                          }}
                          className="w-16 h-16 lg:w-24 lg:h-24 rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
                          style={{ perspective: 800 }}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Title and Description with slide-in */}
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h3 className="font-syne text-xl lg:text-2xl font-semibold text-white leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-white/50 text-sm lg:text-base leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* Learn more link */}
                      <motion.a
                        href="#"
                        className="inline-flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors group/link"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>Learn more</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </motion.a>
                    </motion.div>

                    {/* Categories with cascade reveal */}
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                    >
                      <span className="text-white/30 text-xs uppercase tracking-[0.2em] font-medium">
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
                              ease: "easeOut"
                            }}
                            whileHover={{ 
                              scale: 1.05,
                              backgroundColor: "rgba(255,255,255,0.12)"
                            }}
                            className="px-4 py-2 rounded-full border border-white/15 text-white/70 text-xs font-medium backdrop-blur-sm transition-colors cursor-default"
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
                    animate={{ x: isHovered ? 8 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <span className="group-hover:text-white/80 transition-colors duration-300">
                      {service.title}
                    </span>
                  </motion.h3>
                  
                  {/* Hover indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : -10
                    }}
                    transition={{ duration: 0.2 }}
                    className="hidden lg:flex items-center gap-2 text-white/40 text-sm"
                  >
                    <span>View details</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Toggle Button with rotation animation */}
          <div className="col-span-2 lg:col-span-1 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative w-11 h-11 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden",
                isExpanded
                  ? "bg-white text-[#1a1a1a]"
                  : "border border-white/20 text-white/60 hover:border-white/40"
              )}
            >
              {/* Button glow effect */}
              {isExpanded && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-white via-white to-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              <motion.div
                className="relative z-10"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
      </div>
    </motion.div>
  );
}

export function ServicesModern() {
  const [expandedId, setExpandedId] = useState<string | null>("web-design");

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section 
      id="services-modern" 
      className="relative py-28 lg:py-36 bg-[#141414] overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        className="container-wide relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-20 lg:mb-28"
          variants={itemVariants}
        >
          {/* What we do label */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center"
              whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.4)" }}
            >
              <Plus className="w-3 h-3 text-white/60" />
            </motion.div>
            <span className="text-white/50 text-sm tracking-[0.2em] uppercase font-medium">What we do</span>
          </motion.div>

          {/* Main heading with reveal animation */}
          <div className="lg:text-center flex-1 overflow-hidden">
            <motion.h2 
              className="font-syne text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Services
              <motion.span 
                className="text-primary inline-block"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4, ease: "backOut" }}
              >
                .
              </motion.span>
            </motion.h2>
          </div>

          {/* Count */}
          <motion.div 
            className="lg:text-right"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-white/30 text-lg font-light">({servicesData.length})</span>
          </motion.div>
        </motion.div>

        {/* Services Accordion */}
        <motion.div variants={containerVariants}>
          {servicesData.map((service, index) => (
            <ServiceItem
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
