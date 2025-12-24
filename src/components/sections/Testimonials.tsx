import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Testimonials() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Testimonials"
          title="What our clients say"
          subtitle="Don't just take our word for it—hear from the brands we've helped transform."
          align="center"
          className="mb-12 md:mb-16 max-w-2xl mx-auto"
        />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-3xl p-6 md:p-8 border border-border relative"
            >
              <Quote className="h-8 w-8 text-primary/20 absolute top-6 right-6" />
              
              <blockquote className="space-y-6">
                <p className="text-foreground leading-relaxed relative z-10">
                  "{testimonial.quote}"
                </p>

                <footer className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <cite className="font-syne font-semibold text-foreground not-italic block">
                      {testimonial.author}
                    </cite>
                    <span className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </span>
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}