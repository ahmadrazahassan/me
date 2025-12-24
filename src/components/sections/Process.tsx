import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const processSteps = [
  {
    number: "1",
    title: "Subscribe",
    description: "Choose a plan and request as many designs as you need.",
  },
  {
    number: "2",
    title: "Request",
    description: "Choose a plan and request as many designs as you need.",
  },
  {
    number: "3",
    title: "Get Your Designs",
    description: "Choose a plan and request as many designs as you need.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for cards
  const card1Y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [150, -80]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  
  const card1Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-12, -8, -4]);
  const card3Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [12, 8, 4]);
  
  // Scale transforms
  const card1Scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const card2Scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1.02]);
  const card3Scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="py-32 md:py-40 bg-muted/50 overflow-hidden relative"
    >
      {/* Animated background elements */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <motion.span 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-px bg-muted-foreground/40 origin-right"
            />
            <span className="text-muted-foreground italic text-sm md:text-base tracking-wide">
              Our Process, Explained
            </span>
            <motion.span 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-px bg-muted-foreground/40 origin-left"
            />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight"
            >
              Here's how it works
            </motion.h2>
          </div>
        </div>

        {/* Cards Container - More spacing */}
        <div className="relative flex items-center justify-center min-h-[550px] md:min-h-[600px]">
          
          {/* Card 1 - Left */}
          <motion.div
            style={{ 
              y: card1Y, 
              rotate: card1Rotate,
              scale: card1Scale,
            }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[2%] md:left-[8%] lg:left-[14%] z-10"
          >
            <motion.div 
              whileHover={{ scale: 1.03, rotate: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-60 md:w-72 lg:w-80 h-[360px] md:h-[400px] bg-background rounded-3xl shadow-xl shadow-foreground/5 p-8 flex flex-col border border-border/50 group cursor-pointer"
            >
              {/* Large Number with gradient */}
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                className="font-light text-7xl md:text-8xl text-foreground/10 leading-none tracking-tighter group-hover:text-primary/20 transition-colors duration-500"
              >
                1
              </motion.span>

              {/* Decorative line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="w-12 h-0.5 bg-primary/30 my-6 origin-left group-hover:w-20 transition-all duration-500"
              />

              {/* Content at bottom */}
              <div className="mt-auto">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300"
                >
                  {processSteps[0].title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {processSteps[0].description}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2 - Center (elevated) */}
          <motion.div
            style={{ 
              y: card2Y,
              scale: card2Scale,
            }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-64 md:w-76 lg:w-84 h-[380px] md:h-[430px] bg-background rounded-3xl shadow-2xl shadow-foreground/15 p-8 flex flex-col border border-primary/20 group cursor-pointer relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Large Number */}
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                className="font-light text-7xl md:text-8xl text-foreground/10 leading-none tracking-tighter group-hover:text-primary/20 transition-colors duration-500 relative z-10"
              >
                2
              </motion.span>

              {/* Decorative line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="w-12 h-0.5 bg-primary my-6 origin-left group-hover:w-20 transition-all duration-500 relative z-10"
              />

              {/* Content at bottom */}
              <div className="mt-auto relative z-10">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300"
                >
                  {processSteps[1].title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {processSteps[1].description}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 3 - Right */}
          <motion.div
            style={{ 
              y: card3Y, 
              rotate: card3Rotate,
              scale: card3Scale,
            }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-[2%] md:right-[8%] lg:right-[14%] z-10"
          >
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-60 md:w-72 lg:w-80 h-[360px] md:h-[400px] bg-background rounded-3xl shadow-xl shadow-foreground/5 p-8 flex flex-col border border-border/50 group cursor-pointer"
            >
              {/* Large Number */}
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
                className="font-light text-7xl md:text-8xl text-foreground/10 leading-none tracking-tighter group-hover:text-primary/20 transition-colors duration-500"
              >
                3
              </motion.span>

              {/* Decorative line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
                className="w-12 h-0.5 bg-primary/30 my-6 origin-left group-hover:w-20 transition-all duration-500"
              />

              {/* Content at bottom */}
              <div className="mt-auto">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300"
                >
                  {processSteps[2].title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {processSteps[2].description}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom decoration with scroll animation */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center mt-16 md:mt-24 gap-3"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
              className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-primary' : 'bg-muted-foreground/30'}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Process;
