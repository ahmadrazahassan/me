import React from "react";
import { motion } from "framer-motion";
import { stats } from "@/data/stats";
import { PillButton } from "@/components/ui/PillButton";

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

const statVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, x: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function Stats() {
  return (
    <section className="section-padding bg-background">
      <motion.div
        className="container-wide"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={statVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-card rounded-3xl p-6 md:p-8 border border-border"
              >
                <h3 className="font-syne font-bold text-4xl md:text-5xl text-primary mb-2">
                  {stat.value}
                </h3>
                <p className="font-semibold text-foreground mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </motion.div>
            ))}

            <motion.div variants={statVariants} className="col-span-2 pt-4">
              <PillButton href="#about" variant="ghost" showArrow>
                More about us
              </PillButton>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            variants={imageVariants}
            className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
              alt="Professional team member representing Ahmed Inc.'s expertise"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}