import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plus } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const services = [
  "Branding and Identity",
  "Social Media Marketing",
  "Web Design and Development",
  "SEO Optimization",
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden pt-14 md:pt-16 bg-background"
    >
      {/* Dark background with rounded top corners - sits on white background */}
      <div className="absolute inset-x-0 top-14 md:top-16 bottom-0 bg-foreground rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden">
        {/* Background smoke/blur effect with parallax - contained within rounded div */}
        <motion.div
          className="absolute inset-0"
          style={{ y: backgroundY }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-110"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80')",
              filter: "blur(60px) brightness(0.3)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/80 to-foreground" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container-wide relative z-10 flex-1 flex flex-col">
        {/* Hero content area */}
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left - Main Typography */}
            <motion.div
              className="lg:col-span-8"
              style={{ y: textY, opacity, scale }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="font-syne font-bold text-primary leading-[0.9] tracking-[-0.04em]">
                  <span className="text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[12vw] block">
                    Ahmed
                  </span>
                </h1>
              </motion.div>
            </motion.div>

            {/* Right - Services list */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-4 hidden lg:flex flex-col gap-2 text-right self-end pb-4"
            >
              {services.map((service, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-background/60 text-sm font-medium"
                >
                  {service}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Decorative Plus Signs */}
        <motion.div
          className="absolute bottom-32 left-0 right-0 hidden md:flex justify-between px-8"
          style={{ opacity }}
        >
          {[...Array(4)].map((_, i) => (
            <Plus key={i} className="h-4 w-4 text-background/30" />
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="pb-8 md:pb-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-end"
        >
          {/* Left - Mission statement */}
          <div className="md:col-span-1">
            <p className="text-background/90 text-sm md:text-base max-w-xs leading-relaxed">
              <span className="font-semibold">No generic websites. No empty marketing promises.</span>{" "}
              <span className="text-background/60">
                Just tools and strategies that help your business grow and your brand shine.
              </span>
            </p>
          </div>

          {/* Center - Copyright */}
          <div className="hidden md:flex justify-center">
            <p className="text-background/50 text-sm">
              © 2025 Ahmed Inc.<span className="text-background/30">®</span> Studio
            </p>
          </div>

          {/* Right - Team Lead Card */}
          <div className="md:col-span-1 flex justify-end">
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-background/95 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.16)] transition-shadow duration-300 max-w-xs border border-border/10"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-background via-background to-muted/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Image with hover effect */}
              <div className="relative overflow-hidden rounded-xl">
                <motion.img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
                  alt="Lauren Thompson - Team Lead"
                  className="w-16 h-20 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                {/* Image overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>

              {/* Content */}
              <div className="relative flex-1 min-w-0">
                <p className="text-muted-foreground text-xs font-medium tracking-wide">Team Lead</p>
                <p className="text-muted-foreground/50 text-[10px] mt-0.5">at Ahmed Inc.<sup className="text-[8px]">®</sup></p>
                <p className="font-syne font-bold text-foreground text-sm mt-1 truncate">
                  Lauren Thompson
                </p>
                
                {/* Action buttons */}
                <div className="flex items-center gap-2 mt-3">
                  <MagneticButton
                    as="a"
                    href="#contact"
                    className="relative overflow-hidden bg-foreground text-background text-xs font-medium px-4 py-2 rounded-full hover:bg-foreground/90 transition-all duration-300 inline-flex items-center gap-1.5 group/btn"
                    strength={0.3}
                  >
                    <span className="relative z-10">Let's talk</span>
                    <motion.span
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 2 }}
                    >
                      →
                    </motion.span>
                  </MagneticButton>
                  <MagneticButton
                    as="button"
                    className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center hover:bg-muted hover:border-border transition-all duration-300 group/plus"
                    strength={0.3}
                  >
                    <Plus className="h-3.5 w-3.5 text-foreground/70 group-hover/plus:text-foreground group-hover/plus:rotate-90 transition-all duration-300" />
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}