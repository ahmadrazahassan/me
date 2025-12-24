import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export function ServicesModern() {
  const [expandedId, setExpandedId] = useState<string | null>("web-design");

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section 
      id="services-modern" 
      className="relative py-24 lg:py-32 bg-[#1a1a1a]"
    >
      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16 lg:mb-24">
          {/* What we do label */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
              <Plus className="w-3 h-3 text-white/70" />
            </div>
            <span className="text-white/60 text-sm tracking-widest uppercase">What we do</span>
          </div>

          {/* Main heading */}
          <div className="lg:text-center flex-1">
            <h2 className="font-syne text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight">
              Services
              <span className="text-white/40">.</span>
            </h2>
          </div>

          {/* Count */}
          <div className="lg:text-right">
            <span className="text-white/40 text-lg">({servicesData.length})</span>
          </div>
        </div>

        {/* Services Accordion */}
        <div className="space-y-0">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="border-t border-white/10 last:border-b"
            >
              <div
                className="py-6 lg:py-8 cursor-pointer group"
                onClick={() => toggleService(service.id)}
              >
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-start">
                  {/* Number */}
                  <div className="col-span-2 lg:col-span-1">
                    <span className="text-white/40 text-sm">
                      ({service.number})
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="col-span-8 lg:col-span-10">
                    <AnimatePresence mode="wait" initial={false}>
                      {expandedId === service.id ? (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="grid lg:grid-cols-3 gap-6 lg:gap-12">
                            {/* Images */}
                            <div className="flex gap-3">
                              {service.images.map((img, imgIndex) => (
                                <motion.div
                                  key={imgIndex}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: imgIndex * 0.1, duration: 0.3 }}
                                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden"
                                >
                                  <img
                                    src={img}
                                    alt=""
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                  />
                                </motion.div>
                              ))}
                            </div>

                            {/* Title and Description */}
                            <div className="space-y-3">
                              <h3 className="font-syne text-xl lg:text-2xl font-semibold text-white">
                                {service.title}
                              </h3>
                              <p className="text-white/60 text-sm lg:text-base leading-relaxed">
                                {service.description}
                              </p>
                            </div>

                            {/* Categories */}
                            <div className="space-y-3">
                              <span className="text-white/40 text-xs uppercase tracking-wider">
                                Categories
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {service.categories.map((cat, catIndex) => (
                                  <motion.span
                                    key={catIndex}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: catIndex * 0.05 + 0.15, duration: 0.25 }}
                                    className="px-3 py-1.5 rounded-full border border-white/20 text-white/80 text-xs hover:bg-white/10 transition-colors"
                                  >
                                    {cat}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key="collapsed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="font-syne text-xl lg:text-2xl xl:text-3xl font-semibold text-white group-hover:text-white/70 transition-colors duration-200"
                        >
                          {service.title}
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Toggle Button */}
                  <div className="col-span-2 lg:col-span-1 flex justify-end">
                    <button
                      className={cn(
                        "w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-200",
                        expandedId === service.id
                          ? "bg-white text-[#1a1a1a]"
                          : "border border-white/30 text-white/70 hover:border-white/50 hover:scale-105"
                      )}
                    >
                      {expandedId === service.id ? (
                        <Minus className="w-4 h-4 lg:w-5 lg:h-5" />
                      ) : (
                        <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
