import { motion } from "framer-motion";

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
  return (
    <section id="process" className="py-24 md:py-32 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-12 h-px bg-muted-foreground/30" />
            <span className="text-muted-foreground italic text-sm md:text-base">
              Our Process, Explained
            </span>
            <span className="w-12 h-px bg-muted-foreground/30" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight"
          >
            Here's how it works
          </motion.h2>
        </div>

        {/* Cards Container */}
        <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[600px]">
          {/* Card 1 - Left */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-[5%] md:left-[10%] lg:left-[15%] z-10"
          >
            <div className="w-72 md:w-80 lg:w-96 h-[420px] md:h-[480px] bg-background rounded-3xl shadow-2xl shadow-foreground/10 p-8 md:p-10 flex flex-col relative overflow-hidden">
              {/* Large Number */}
              <span className="font-light text-8xl md:text-9xl text-foreground/90 leading-none tracking-tighter">
                1
              </span>

              {/* Curved Arrow SVG */}
              <svg
                className="absolute top-24 right-8 w-24 h-24 md:w-32 md:h-32"
                viewBox="0 0 100 100"
                fill="none"
              >
                <motion.path
                  d="M20 80 Q 60 80, 70 40 Q 75 20, 85 15"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.circle
                  cx="20"
                  cy="80"
                  r="4"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                />
                <motion.circle
                  cx="85"
                  cy="15"
                  r="4"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                />
              </svg>

              {/* Content at bottom */}
              <div className="mt-auto">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {processSteps[0].title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {processSteps[0].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Center */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            whileInView={{ opacity: 1, y: -20, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-20"
          >
            <div className="w-72 md:w-80 lg:w-96 h-[420px] md:h-[480px] bg-background rounded-3xl shadow-2xl shadow-foreground/15 p-8 md:p-10 flex flex-col relative overflow-hidden">
              {/* Large Number */}
              <span className="font-light text-8xl md:text-9xl text-foreground/90 leading-none tracking-tighter">
                2
              </span>

              {/* Curved Arrow SVG */}
              <svg
                className="absolute top-8 right-4 w-20 h-20 md:w-24 md:h-24"
                viewBox="0 0 80 80"
                fill="none"
              >
                <motion.circle
                  cx="70"
                  cy="12"
                  r="4"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                />
              </svg>

              {/* Content at bottom */}
              <div className="mt-auto">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {processSteps[1].title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {processSteps[1].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Right */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute right-[5%] md:right-[10%] lg:right-[15%] z-10"
          >
            <div className="w-72 md:w-80 lg:w-96 h-[420px] md:h-[480px] bg-background rounded-3xl shadow-2xl shadow-foreground/10 p-8 md:p-10 flex flex-col relative overflow-hidden">
              {/* Large Number */}
              <span className="font-light text-8xl md:text-9xl text-foreground/90 leading-none tracking-tighter">
                3
              </span>

              {/* Curved Arrow SVG - Loop */}
              <svg
                className="absolute top-32 left-1/2 -translate-x-1/2 w-32 h-24 md:w-40 md:h-28"
                viewBox="0 0 120 80"
                fill="none"
              >
                <motion.path
                  d="M20 30 Q 20 60, 50 60 Q 80 60, 80 30 Q 80 10, 60 10 Q 40 10, 50 30"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                />
                <motion.circle
                  cx="20"
                  cy="30"
                  r="4"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                />
                <motion.circle
                  cx="100"
                  cy="40"
                  r="4"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2 }}
                />
              </svg>

              {/* Content at bottom */}
              <div className="mt-auto">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {processSteps[2].title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {processSteps[2].description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Process;
