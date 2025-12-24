import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const values = [
  { id: "clarity", title: "Clarity", description: "Clear communication and transparent processes." },
  { id: "craft", title: "Craft", description: "Meticulous attention to every detail." },
  { id: "curiosity", title: "Curiosity", description: "Constantly exploring new possibilities." },
  { id: "consistency", title: "Consistency", description: "Reliable excellence, every time." },
];

export function About() {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
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
          <div className="space-y-8">
            <SectionHeader
              eyebrow="About the studio"
              title="We're more than a design studio"
              subtitle="We're your strategic partner in building digital experiences that matter."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-muted-foreground"
            >
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
            </motion.div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
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
          </div>
        </div>
      </div>
    </section>
  );
}