import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { testimonials } from "@/data/testimonials";

// Single testimonial row with scroll animation
function TestimonialRow({ 
  testimonial, 
  index,
  direction = "left"
}: { 
  testimonial: typeof testimonials[0]; 
  index: number;
  direction?: "left" | "right";
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === "left" ? [100, -100] : [-100, 100]
  );

  return (
    <motion.div
      ref={rowRef}
      className="relative py-12 md:py-16 border-b border-foreground/10"
    >
      <motion.div 
        style={{ x }}
        className="flex items-center gap-6 md:gap-12"
      >
        {/* Number */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:block font-bebas text-8xl lg:text-9xl text-foreground/[0.06] leading-none"
        >
          0{index + 1}
        </motion.span>

        {/* Content */}
        <div className="flex-1">
          <motion.blockquote
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-montserrat text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-muted-foreground leading-[1.4] tracking-tight max-w-4xl">
              "{testimonial.quote}"
            </p>
          </motion.blockquote>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4 mt-8"
          >
            <div className="relative">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary"
                initial={{ scale: 1.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </div>
            <div>
              <p className="font-syne font-bold text-foreground">
                {testimonial.author}
              </p>
              <p className="text-muted-foreground text-sm">
                {testimonial.role} · {testimonial.company}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Company Logo Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center"
        >
          <span className="font-syne font-bold text-foreground/20 text-center text-sm">
            {testimonial.company}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Floating badge - kept for potential future use

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden"
    >
      {/* Background Pattern */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/[0.02] blur-3xl" />
      </motion.div>

      <div className="container-wide relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
                Testimonials
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-syne text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.05]"
            >
              Real stories,
              <br />
              <span className="text-primary">real results</span>
            </motion.h2>
          </div>
        </div>

        {/* Testimonials List */}
        <div className="border-t border-foreground/10">
          {testimonials.map((testimonial, index) => (
            <TestimonialRow
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              direction={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-center md:justify-between gap-8 p-8 md:p-12 rounded-[2rem] bg-foreground"
        >
          <div>
            <h3 className="font-syne text-2xl md:text-3xl font-bold text-background mb-2">
              Ready to be our next success story?
            </h3>
            <p className="text-background/60">
              Let's create something extraordinary together.
            </p>
          </div>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-syne font-semibold whitespace-nowrap"
          >
            Start a Project
            <motion.span
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      {/* Large Background Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.02]">
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(4)].map((_, i) => (
            <span 
              key={i}
              className="font-bebas text-[20vw] leading-none text-foreground uppercase tracking-tight"
            >
              Testimonials · Reviews · Stories · 
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
