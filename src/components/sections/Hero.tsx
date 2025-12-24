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
            <div className="bg-background rounded-2xl p-3 flex items-center gap-3 shadow-2xl max-w-xs">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
                alt="Team Lead"
                className="w-16 h-20 object-cover rounded-xl"
              />
              <div className="flex-1">
                <p className="text-muted-foreground text-xs">Team Lead</p>
                <p className="text-muted-foreground/60 text-[10px]">at Ahmed Inc.®</p>
                <p className="font-syne font-bold text-foreground text-sm mt-0.5">
                  Lauren Thompson
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <MagneticButton
                    as="a"
                    href="#contact"
                    className="bg-foreground text-background text-xs px-3 py-1.5 rounded-full hover:bg-foreground/90 transition-colors inline-block"
                    strength={0.4}
                  >
                    Let's talk
                  </MagneticButton>
                  <MagneticButton
                    as="button"
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    strength={0.4}
                  >
                    <Plus className="h-3 w-3 text-foreground" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}