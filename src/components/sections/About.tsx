import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const values = [
  { id: "clarity", title: "Clarity", description: "Clear communication and transparent processes." },
  { id: "craft", title: "Craft", description: "Meticulous attention to every detail." },
  { id: "curiosity", title: "Curiosity", description: "Constantly exploring new possibilities." },
  { id: "consistency", title: "Consistency", description: "Reliable excellence, every time." },
];

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

const imageVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const valueVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function About() {
  return (
    <section id="about" className="section-padding bg-background">
      <motion.div
        className="container-wide"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div className="relative" variants={imageVariants}>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Ahmed Inc. team collaborating on creative projects"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-3xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div className="space-y-8" variants={contentVariants}>
            <SectionHeader
              eyebrow="About the studio"
              title="We're more than a design studio"
              subtitle="We're your strategic partner in building digital experiences that matter."
            />

            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Founded in 2010, Ahmed Inc. has grown from a small creative team to a 
                full-service digital design studio. We've partnered with startups, 
                enterprises, and everything in between to create meaningful digital experiences.
              </p>
              <p className="leading-relaxed">
                Our approach combines strategic thinking with creative excellence. We believe 
                that great design isn't just about aesthetics—it's about solving problems 
                and creating value for our clients and their users.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value) => (
                <motion.div
                  key={value.id}
                  variants={valueVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-muted/50 rounded-2xl p-4"
                >
                  <h4 className="font-syne font-bold text-foreground mb-1">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}