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

// Text reveal animation variants
const letterVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const wordVariants = {
  hidden: { y: 50, opacity: 0, rotateX: 45 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

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

  // Dotted line progress
  const lineProgress1 = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const lineProgress2 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  const headingWords = "Here's how it works".split(" ");
  const subHeadingText = "Simple, Fast & Effective";

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="py-32 md:py-44 bg-muted/50 overflow-hidden relative"
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
        {/* Enhanced Header */}
        <div className="text-center mb-20 md:mb-32">
          {/* Top tag with line animation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <motion.span 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-px bg-gradient-to-r from-transparent to-muted-foreground/50 origin-right"
            />
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground italic text-sm md:text-base tracking-widest uppercase"
            >
              Our Process
            </motion.span>
            <motion.span 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-px bg-gradient-to-l from-transparent to-muted-foreground/50 origin-left"
            />
          </motion.div>

          {/* Main heading with word-by-word reveal */}
          <div className="overflow-hidden mb-6">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight flex flex-wrap justify-center gap-x-4"
            >
              {headingWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  className="inline-block"
                  style={{ perspective: "1000px" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
          </div>

          {/* Sub-heading with character reveal */}
          <div className="overflow-hidden mb-8">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-primary font-medium flex justify-center"
            >
              {subHeadingText.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.p>
          </div>

          {/* Description with fade-up */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            We've streamlined our design process to deliver exceptional results with speed and precision.
          </motion.p>

          {/* Animated decorative element */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center mt-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border border-dashed border-primary/30 flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-primary rounded-full" />
            </motion.div>
          </motion.div>
        </div>

        {/* Cards Container */}
        <div className="relative flex items-center justify-center min-h-[550px] md:min-h-[600px]">
          
          {/* Dotted connecting line 1 (Card 1 to Card 2) */}
          <svg
            className="absolute z-15 pointer-events-none hidden md:block"
            style={{ 
              left: "calc(50% - 220px)", 
              top: "50%",
              transform: "translateY(-50%)",
              width: "200px",
              height: "100px"
            }}
            viewBox="0 0 200 100"
            fill="none"
          >
            <motion.path
              d="M0 80 Q 50 80, 100 50 T 200 20"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 8"
              fill="none"
              style={{
                pathLength: lineProgress1,
                opacity: lineProgress1,
              }}
            />
            <motion.circle
              cx="0"
              cy="80"
              r="4"
              fill="hsl(var(--primary))"
              style={{ opacity: lineProgress1 }}
            />
            <motion.circle
              cx="200"
              cy="20"
              r="4"
              fill="hsl(var(--primary))"
              style={{ opacity: lineProgress1 }}
            />
          </svg>

          {/* Dotted connecting line 2 (Card 2 to Card 3) */}
          <svg
            className="absolute z-15 pointer-events-none hidden md:block"
            style={{ 
              left: "calc(50% + 20px)", 
              top: "50%",
              transform: "translateY(-50%)",
              width: "200px",
              height: "100px"
            }}
            viewBox="0 0 200 100"
            fill="none"
          >
            <motion.path
              d="M0 20 Q 50 20, 100 50 T 200 80"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 8"
              fill="none"
              style={{
                pathLength: lineProgress2,
                opacity: lineProgress2,
              }}
            />
            <motion.circle
              cx="0"
              cy="20"
              r="4"
              fill="hsl(var(--primary))"
              style={{ opacity: lineProgress2 }}
            />
            <motion.circle
              cx="200"
              cy="80"
              r="4"
              fill="hsl(var(--primary))"
              style={{ opacity: lineProgress2 }}
            />
          </svg>
          
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
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[2%] md:left-[8%] lg:left-[14%] z-10"
          >
            <motion.div 
              whileHover={{ scale: 1.03, rotate: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-60 md:w-72 lg:w-80 h-[360px] md:h-[400px] bg-background rounded-3xl shadow-xl shadow-foreground/5 p-8 flex flex-col border border-border/50 group cursor-pointer"
            >
              {/* Large Number */}
              <span className="font-light text-7xl md:text-8xl text-foreground/10 leading-none tracking-tighter group-hover:text-primary/20 transition-colors duration-500">
                1
              </span>

              {/* Content at bottom */}
              <div className="mt-auto">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {processSteps[0].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {processSteps[0].description}
                </p>
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
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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
              <span className="font-light text-7xl md:text-8xl text-foreground/10 leading-none tracking-tighter group-hover:text-primary/20 transition-colors duration-500 relative z-10">
                2
              </span>

              {/* Content at bottom */}
              <div className="mt-auto relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {processSteps[1].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {processSteps[1].description}
                </p>
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
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-[2%] md:right-[8%] lg:right-[14%] z-10"
          >
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-60 md:w-72 lg:w-80 h-[360px] md:h-[400px] bg-background rounded-3xl shadow-xl shadow-foreground/5 p-8 flex flex-col border border-border/50 group cursor-pointer"
            >
              {/* Large Number */}
              <span className="font-light text-7xl md:text-8xl text-foreground/10 leading-none tracking-tighter group-hover:text-primary/20 transition-colors duration-500">
                3
              </span>

              {/* Content at bottom */}
              <div className="mt-auto">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {processSteps[2].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {processSteps[2].description}
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom section with animated text */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20 md:mt-32"
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-primary rounded-full"
            />
            <span className="text-sm text-primary font-medium">Ready to get started?</span>
          </motion.div>

          {/* Bottom heading */}
          <div className="overflow-hidden">
            <motion.h3
              initial={{ y: 60 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-3xl font-bold text-foreground mb-4"
            >
              It's that simple.
            </motion.h3>
          </div>

          {/* Dots decoration */}
          <div className="flex justify-center gap-3 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-primary' : 'bg-muted-foreground/30'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Process;
