import React, { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { navigationItems } from "@/data/navigation";

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

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

          {/* Right - Navigation Links */}
          <div className="lg:pl-12">
            <nav className="space-y-0">
              {footerLinks.map((link, index) => (
                <motion.a
                  key={link.number}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center justify-between py-4 border-b border-border/40 group hover:border-foreground/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-mono">
                      {link.number} /
                    </span>
                    <span className="text-base font-medium group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </nav>
          </div>
        </div>

        {/* Large Brand Name */}
        <div className="relative mb-12 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-end justify-between"
          >
            <h2 className="font-syne font-black text-[12vw] md:text-[14vw] lg:text-[16vw] leading-[0.8] tracking-tighter uppercase">
              AHMED
            </h2>
            
            {/* Decorative Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hidden md:block w-48 lg:w-64 h-48 lg:h-64 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4 flex-shrink-0"
            />
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
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 text-sm hover:bg-foreground hover:text-background transition-all"
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