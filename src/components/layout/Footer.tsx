import React, { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: brandRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  const footerLinks = [
    { number: "01", label: "Home", href: "#home" },
    { number: "02", label: "About", href: "#about" },
    { number: "03", label: "Work", href: "#work" },
    { number: "04", label: "Services", href: "#services" },
    { number: "05", label: "Contact", href: "#contact" },
  ];

  return (
    <footer ref={containerRef} className="bg-background text-foreground pt-24 pb-8">
      <div className="container-wide">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left - Contact Info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-muted-foreground text-lg mb-2 font-syne"
            >
              Stay connected<span className="text-xs align-super">®</span>
            </motion.p>
            
            <motion.a
              href="mailto:hello@ahmedinc.com"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-syne font-bold underline underline-offset-8 decoration-2 hover:text-primary transition-colors block mb-6"
            >
              hello@ahmedinc.com
            </motion.a>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-sm mb-8 leading-relaxed"
            >
              Crafted with <span className="text-foreground">creativity</span> and{" "}
              <span className="text-foreground">passion</span>. Let's stay connected
              reach out anytime!
            </motion.p>
            
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-3 group"
            >
              <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-4 h-4 text-primary-foreground" />
              </span>
              <span className="text-sm font-medium">Contact Now</span>
            </motion.a>
          </div>

          {/* Right - Navigation Links with Underline Effects */}
          <div className="lg:pl-12">
            <nav className="space-y-0">
              {footerLinks.map((link, index) => (
                <motion.a
                  key={link.number}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center justify-between py-4 border-b border-border/40 group relative overflow-hidden"
                >
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-foreground"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                  
                  <div className="flex items-center gap-3">
                    <motion.span 
                      className="text-xs text-muted-foreground font-mono transition-colors duration-300 group-hover:text-primary"
                    >
                      {link.number} /
                    </motion.span>
                    <span className="text-base font-medium relative">
                      <span className="relative z-10 transition-transform duration-300 inline-block group-hover:translate-x-2">
                        {link.label}
                      </span>
                    </span>
                  </div>
                  
                  <motion.div
                    className="transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                  </motion.div>
                </motion.a>
              ))}
            </nav>
          </div>
        </div>

        {/* Large Brand Name - Centered, Semi-transparent, Gray */}
        <div ref={brandRef} className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <h2 className="font-bebas text-[18vw] md:text-[16vw] lg:text-[14vw] leading-[0.85] tracking-wide uppercase text-muted-foreground/30">
              AHMED
            </h2>
          </motion.div>
          
          {/* Floating Parallax Image */}
          <motion.div
            style={{ y: imageY, rotate: imageRotate }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hidden md:block absolute right-[10%] top-1/2 -translate-y-1/2 w-40 lg:w-56 h-40 lg:h-56 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/30 via-primary/10 to-background relative">
              {/* Decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-primary/20 blur-xl" />
              </div>
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="absolute bottom-8 left-8 w-16 h-1 bg-foreground/20 rounded-full" />
              <div className="absolute bottom-12 left-8 w-10 h-1 bg-foreground/10 rounded-full" />
              
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), 
                                    linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            Copyright © Ahmed Inc. 2025
          </p>
          
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              <span>Privacy Policy</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              <span>Terms of Service</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 text-sm hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <ArrowUpRight className="w-3 h-3" />
              Design Expert
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}