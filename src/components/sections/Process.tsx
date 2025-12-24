import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { processSteps } from "@/data/process";
import { cn } from "@/lib/utils";

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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="section-padding bg-background overflow-hidden"
    >
      <motion.div
        className="container-wide"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-24">
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
              <span className="uppercase tracking-[0.15em]">Our Process</span>
            </div>
            <h2 className="heading-lg text-foreground">
              How we bring your{" "}
              <span className="text-primary">vision</span> to life
            </h2>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col justify-end"
          >
            <p className="text-muted-foreground leading-relaxed max-w-md lg:ml-auto">
              We follow a proven methodology that ensures every project is delivered with precision, creativity, and measurable results.
            </p>
          </motion.div>
        </div>

        {/* Process Steps */}
        <motion.div variants={itemVariants}>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Step Tabs - Left */}
            <div className="lg:col-span-5 space-y-3">
              {processSteps.map((step, index) => (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ x: 4 }}
                  className={cn(
                    "w-full text-left px-6 py-5 rounded-2xl transition-all duration-300 flex items-center gap-4 group",
                    activeStep === index
                      ? "bg-foreground text-background"
                      : "bg-muted/50 text-foreground/70 hover:bg-muted"
                  )}
                >
                  <span className={cn(
                    "text-sm font-mono transition-colors",
                    activeStep === index ? "text-primary" : "text-muted-foreground"
                  )}>
                    {step.number}
                  </span>
                  <span className="font-syne font-semibold text-lg">
                    {step.title}
                  </span>
                  
                  {/* Arrow indicator */}
                  <motion.svg
                    className={cn(
                      "w-5 h-5 ml-auto transition-colors",
                      activeStep === index ? "text-primary" : "text-transparent group-hover:text-muted-foreground"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.button>
              ))}
            </div>

            {/* Step Content - Right */}
            <div className="lg:col-span-7">
              <div className="bg-foreground rounded-3xl p-8 md:p-12 min-h-[400px] flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.6, 0.01, 0, 0.9] }}
                    className="flex-1 flex flex-col"
                  >
                    {/* Step number - large */}
                    <span className="font-syne text-[8rem] md:text-[10rem] font-bold text-background/[0.06] leading-none tracking-tighter select-none">
                      {processSteps[activeStep].number}
                    </span>

                    {/* Content overlay */}
                    <div className="mt-auto space-y-6">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-primary"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        />
                        <span className="text-sm text-background/60 uppercase tracking-[0.15em]">
                          Step {processSteps[activeStep].number}
                        </span>
                      </div>

                      <h3 className="font-syne text-3xl md:text-4xl font-bold text-background leading-tight">
                        {processSteps[activeStep].title}
                      </h3>

                      <p className="text-background/70 text-lg leading-relaxed max-w-lg">
                        {processSteps[activeStep].description}
                      </p>

                      {/* Progress indicator */}
                      <div className="pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-background/60">Progress</span>
                          <span className="text-background font-medium">
                            {activeStep + 1} of {processSteps.length}
                          </span>
                        </div>
                        <div className="h-1 bg-background/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 md:mt-24 pt-12 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "150+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "4.9", label: "Average Rating" },
            { value: "24h", label: "Response Time" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center md:text-left"
            >
              <span className="font-syne text-3xl md:text-4xl font-bold text-foreground">
                {stat.value}
              </span>
              <p className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Process;
