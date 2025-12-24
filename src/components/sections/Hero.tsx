import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plus } from "lucide-react";

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
  const studioY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
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
      <div className="container-wide relative z-10 flex-1 flex flex-col pt-16 md:pt-24 lg:pt-32">
        {/* Large Typography with parallax */}
        <motion.div
          className="flex-1 flex flex-col justify-center -mt-8 md:-mt-16"
          style={{ y: textY, opacity, scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main brand name with primary color */}
            <h1 className="font-syne font-bold text-primary leading-[0.9] tracking-[-0.04em]">
              <span className="text-[15vw] md:text-[16vw] lg:text-[18vw] block">
                Ahmed
              </span>
            </h1>

            {/* Studio text - positioned to the left under "Ahmed" */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ y: studioY }}
              className="font-syne font-bold text-background text-4xl md:text-6xl lg:text-7xl mt-6 md:mt-8 ml-12 md:ml-24 lg:ml-32"
            >
              Studio
            </motion.p>
          </motion.div>

          {/* Services list - fixed positioning */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 text-right"
          >
            {services.map((service, index) => (
              <span
                key={index}
                className="text-background/80 text-sm whitespace-nowrap"
              >
                {service}
              </span>
            ))}
          </motion.div>
        </motion.div>

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
                  <a
                    href="#contact"
                    className="bg-foreground text-background text-xs px-3 py-1.5 rounded-full hover:bg-foreground/90 transition-colors"
                  >
                    Let's talk
                  </a>
                  <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                    <Plus className="h-3 w-3 text-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}