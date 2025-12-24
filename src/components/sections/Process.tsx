import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Lightbulb, Target, ArrowUpRight } from "lucide-react";
import { processSteps } from "@/data/process";
import { useRef } from "react";

import processDiscovery from "@/assets/process-discovery.jpg";
import processSpeed from "@/assets/process-speed.jpg";
import processCollab from "@/assets/process-collab.jpg";

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={sectionRef} id="process" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-8">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          
          {/* Large Left Card - Discovery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 md:row-span-2 bg-muted/30 border border-border/40 rounded-2xl p-8 flex flex-col min-h-[520px] overflow-hidden"
          >
            <motion.h2 
              style={{ y: y2 }}
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-foreground leading-[1.1]"
            >
              Cutting-Edge{" "}
              <span className="text-muted-foreground">Creativity</span>
            </motion.h2>
            
            <motion.div 
              style={{ y: y1 }}
              className="flex-1 flex items-center justify-center mt-8"
            >
              <div className="w-full h-[380px] rounded-xl overflow-hidden">
                <img 
                  src={processDiscovery} 
                  alt="Creative professional" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Top Middle Card - Email Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 bg-muted/30 border border-border/40 rounded-2xl p-6 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">
                24/7 Email Support
              </h3>
              <div className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Need assistance? Our team is always available to ensure a smooth and hassle-free experience. 24 hours response time.
            </p>
          </motion.div>

          {/* Top Right Card - Seamless Collaboration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 md:row-span-2 bg-muted/30 border border-border/40 rounded-2xl p-6 flex flex-col overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">
                Seamless Collaboration
              </h3>
              <div className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              We work closely with you, keeping communication transparent and revisions efficient to bring your vision to life.
            </p>
            
            <motion.div 
              style={{ y: y3 }}
              className="flex-1 flex items-end justify-center"
            >
              <div className="w-36 h-64 bg-foreground rounded-[2rem] border-[6px] border-foreground/90 overflow-hidden shadow-2xl">
                <img 
                  src={processCollab} 
                  alt="Collaboration" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Middle Center Card - Fast Turnarounds */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-4 rounded-2xl overflow-hidden relative min-h-[220px]"
          >
            <motion.img 
              style={{ scale: useTransform(scrollYProgress, [0, 1], [1.1, 1]) }}
              src={processSpeed} 
              alt="Fast turnarounds" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl md:text-2xl font-medium text-background">
                Fast & Efficient Turnarounds
              </h3>
            </div>
          </motion.div>

          {/* Bottom Middle Card - Proven Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-4 bg-muted/30 border border-border/40 rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">
                Proven Expertise
              </h3>
              <div className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center">
                <Target className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              We've helped multiple brands and businesses create stunning, high-impact designs that drive results.
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

          {/* Bottom Right Card - Future Ready */}
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
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
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
