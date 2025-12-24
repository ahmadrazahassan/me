import { motion } from "framer-motion";
import { Sparkles, Zap, Users, Rocket } from "lucide-react";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-8">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          
          {/* Large Left Card - Discovery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 md:row-span-2 bg-muted/30 border border-border/40 rounded-2xl p-8 flex flex-col min-h-[500px]"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-tight">
              {processSteps[0].title.split(" ")[0]}{" "}
              <span className="text-muted-foreground">{processSteps[0].title.split(" ").slice(1).join(" ")}</span>
            </h2>
            
            <div className="flex-1 flex items-center justify-center mt-8">
              <div className="w-full h-80 bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center">
                <div className="text-8xl font-bold text-foreground/10">01</div>
              </div>
            </div>
          </motion.div>

          {/* Top Middle Card - Concept */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 bg-muted/30 border border-border/40 rounded-2xl p-6 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">
                {processSteps[1].title}
              </h3>
              <div className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {processSteps[1].description}
            </p>
          </motion.div>

          {/* Top Right Card - Development */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 md:row-span-2 bg-muted/30 border border-border/40 rounded-2xl p-6 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">
                {processSteps[2].title}
              </h3>
              <div className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center">
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {processSteps[2].description}
            </p>
            
            <div className="flex-1 flex items-end justify-center">
              <div className="w-32 h-56 bg-foreground rounded-3xl border-4 border-foreground/80 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-4xl font-bold text-background/20">03</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Middle Center Card - Image with overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-4 bg-gradient-to-br from-muted to-muted/70 rounded-2xl overflow-hidden relative min-h-[200px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl md:text-2xl font-medium text-background">
                Fast & Efficient Turnarounds
              </h3>
            </div>
          </motion.div>

          {/* Bottom Middle Card - Launch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-4 bg-muted/30 border border-border/40 rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">
                {processSteps[3].title}
              </h3>
              <div className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {processSteps[3].description}
            </p>
            
            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-background flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-foreground/60">{i}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-3 h-3 text-primary fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">200+ Satisfied Clients</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom Right Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-3 bg-muted/30 border border-border/40 rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">
                Future-Ready Solutions
              </h3>
              <div className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center">
                <Zap className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our designs grow with your brand, ensuring long-term success and adaptability.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Process;
