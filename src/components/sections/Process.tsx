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
        <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[550px]">
          
          {/* Connecting Arrow from Card 1 to Card 2 - positioned between cards */}
          <svg
            className="absolute z-30 pointer-events-none hidden md:block"
            style={{ 
              left: "calc(50% - 180px)", 
              top: "80px",
              width: "160px",
              height: "200px"
            }}
            viewBox="0 0 160 200"
            fill="none"
          >
            <motion.path
              d="M10 180 C 30 120, 80 80, 150 20"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            {/* Start circle */}
            <motion.circle
              cx="10"
              cy="180"
              r="5"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            />
            {/* End circle */}
            <motion.circle
              cx="150"
              cy="20"
              r="5"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.8 }}
            />
          </svg>

          {/* Card 1 - Left */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-[5%] md:left-[12%] lg:left-[18%] z-10"
          >
            <div className="w-64 md:w-72 lg:w-80 h-[380px] md:h-[420px] bg-background rounded-2xl shadow-xl shadow-foreground/5 p-8 flex flex-col">
              {/* Large Number */}
              <span className="font-light text-7xl md:text-8xl text-foreground leading-none tracking-tighter">
                1
              </span>

              {/* Content at bottom */}
              <div className="mt-auto">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {processSteps[0].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {processSteps[0].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Center */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: -30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-20"
          >
            <div className="w-64 md:w-72 lg:w-80 h-[380px] md:h-[420px] bg-background rounded-2xl shadow-2xl shadow-foreground/10 p-8 flex flex-col">
              {/* Large Number */}
              <span className="font-light text-7xl md:text-8xl text-foreground leading-none tracking-tighter">
                2
              </span>

              {/* Content at bottom */}
              <div className="mt-auto">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {processSteps[1].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {processSteps[1].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Right */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute right-[5%] md:right-[12%] lg:right-[18%] z-10"
          >
            <div className="w-64 md:w-72 lg:w-80 h-[380px] md:h-[420px] bg-background rounded-2xl shadow-xl shadow-foreground/5 p-8 flex flex-col relative">
              {/* Large Number */}
              <span className="font-light text-7xl md:text-8xl text-foreground leading-none tracking-tighter">
                3
              </span>

              {/* Loop Arrow SVG - inside card 3 */}
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-20 md:w-32 md:h-24"
                viewBox="0 0 120 80"
                fill="none"
              >
                {/* Start circle */}
                <motion.circle
                  cx="15"
                  cy="40"
                  r="5"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                />
                {/* Loop path */}
                <motion.path
                  d="M20 40 C 30 40, 40 20, 60 20 C 85 20, 90 50, 70 55 C 55 58, 50 45, 60 40"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 1.2 }}
                />
                {/* End circle */}
                <motion.circle
                  cx="105"
                  cy="45"
                  r="5"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.4 }}
                />
              </svg>

              {/* Content at bottom */}
              <div className="mt-auto">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {processSteps[2].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
