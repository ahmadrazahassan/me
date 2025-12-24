import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PillButton } from "@/components/ui/PillButton";

export function Services() {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section id="services" className="section-padding bg-foreground text-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Service Tabs */}
          <div className="space-y-3">
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => setActiveService(service)}
                whileHover={{ x: 4 }}
                className={cn(
                  "w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 flex items-center gap-4",
                  activeService.id === service.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/5 text-background/70 hover:bg-background/10"
                )}
              >
                <span className="text-sm opacity-60">{service.number}.</span>
                <span className="font-syne font-semibold">{service.title}</span>
              </motion.button>
            ))}

            <div className="pt-6">
              <PillButton href="#contact" variant="outline" showArrow className="border-background/30 text-background hover:bg-background/10">
                See pricing
              </PillButton>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-background/60">
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
              <span className="uppercase tracking-wider">What we offer</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="heading-md text-background">
                  {activeService.title}
                </h3>
                <p className="text-background/70 leading-relaxed">
                  {activeService.description}
                </p>

                {/* Timeline */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-background/60">Timeline</span>
                    <span className="text-background font-medium">
                      {activeService.timeline}
                    </span>
                  </div>
                  <div className="h-1 bg-background/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Service Image */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="aspect-[4/5] rounded-3xl overflow-hidden"
              >
                <img
                  src={activeService.image}
                  alt={`${activeService.title} service illustration`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}