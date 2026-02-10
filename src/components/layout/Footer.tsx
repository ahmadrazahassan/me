import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Circle, MoveRight } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

// Magnetic link component
function MagneticLink({ 
  href, 
  children, 
  className = "" 
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// Live clock component
function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-mono tabular-nums">
      {time.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit",
        hour12: false 
      })}
    </span>
  );
}

// Interactive nav item with hover effect
function NavItem({ 
  href, 
  label, 
  index 
}: { 
  href: string; 
  label: string; 
  index: number;
}) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex items-center justify-between py-5 border-b border-foreground/10"
    >
      {/* Content */}
      <div className="relative flex items-center gap-4">
        <span className="text-xs text-muted-foreground group-hover:text-primary font-mono transition-colors duration-300">
          0{index + 1}
        </span>
        <span className="text-lg md:text-xl font-syne font-medium text-foreground group-hover:text-primary transition-colors duration-300">
          {label}
        </span>
        {/* Underline */}
        <motion.span
          className="absolute -bottom-1 left-8 right-0 h-0.5 bg-primary origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      
      <motion.div
        className="relative"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.3 }}
      >
        <MoveRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      </motion.div>
    </motion.a>
  );
}

// Social link pill
function SocialPill({ 
  href, 
  label, 
  delay 
}: { 
  href: string; 
  label: string; 
  delay: number;
}) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/15 hover:border-foreground hover:bg-foreground text-foreground hover:text-background transition-all duration-300"
    >
      <span className="text-sm font-medium">{label}</span>
      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
    </motion.a>
  );
}

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const socialLinks = [
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Dribbble", href: "#" },
  ];

  const navLinks = [
    { label: "Our Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About Studio", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer 
      ref={containerRef} 
      className="relative bg-background text-foreground overflow-hidden"
    >
      {/* Top Divider */}
      <div className="container-wide">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-foreground/10 origin-left"
        />
      </div>

      {/* Main Content */}
      <div className="container-wide pt-16 md:pt-24 pb-8">
        
        {/* Top Section - Two Column */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-16 md:mb-24">
          
          {/* Left - CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <span className="text-sm text-muted-foreground uppercase tracking-widest">
                Available for projects
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] mb-8"
            >
              Have a project in mind?
              <br />
              <span className="text-muted-foreground">Let's talk.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <MagneticLink
                href="mailto:hello@ahmedinc.com"
                className="group inline-flex items-center gap-4"
              >
                <span className="text-xl md:text-2xl font-syne font-medium text-foreground border-b-2 border-foreground/20 group-hover:border-primary pb-1 transition-colors duration-300">
                  hello@ahmedinc.com
                </span>
                <span className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-foreground/20 group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-foreground group-hover:text-background transition-colors duration-300" />
                </span>
              </MagneticLink>
            </motion.div>

            {/* Social Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 mt-10"
            >
              {socialLinks.map((link, index) => (
                <SocialPill 
                  key={link.label} 
                  href={link.href} 
                  label={link.label}
                  delay={0.5 + index * 0.1}
                />
              ))}
            </motion.div>
          </div>

          {/* Right - Navigation */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs text-muted-foreground uppercase tracking-widest mb-6"
            >
              Quick Links
            </motion.p>
            
            <nav>
              {navLinks.map((link, index) => (
                <NavItem 
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  index={index}
                />
              ))}
            </nav>
          </div>
        </div>

        {/* Info Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-foreground/10 mb-10"
        >
          {/* Location */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Location
            </p>
            <p className="text-foreground font-medium">San Francisco</p>
            <p className="text-muted-foreground text-sm">California, USA</p>
          </div>

          {/* Local Time */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Local Time
            </p>
            <p className="text-foreground font-medium">
              <LiveClock />
            </p>
            <p className="text-muted-foreground text-sm">PST Timezone</p>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Availability
            </p>
            <div className="flex items-center gap-2">
              <Circle className="w-2.5 h-2.5 fill-emerald-500 text-emerald-500" />
              <span className="text-foreground font-medium">Open</span>
            </div>
            <p className="text-muted-foreground text-sm">Q1 2025</p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Phone
            </p>
            <a 
              href="tel:+14155551234" 
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              +1 (415) 555-1234
            </a>
            <p className="text-muted-foreground text-sm">Mon - Fri, 9-6</p>
          </div>
        </motion.div>

        {/* Large Brand Typography */}
        <div className="relative -mx-6 md:-mx-8 lg:-mx-12 mb-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex whitespace-nowrap"
          >
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{ 
                duration: 35, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex shrink-0"
            >
              {[...Array(4)].map((_, i) => (
                <span 
                  key={i}
                  className="font-bebas text-[18vw] md:text-[14vw] leading-none text-foreground/[0.04] uppercase tracking-tight px-8"
                >
                  Ahmed Inc.
                </span>
              ))}
            </motion.div>
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{ 
                duration: 35, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex shrink-0"
            >
              {[...Array(4)].map((_, i) => (
                <span 
                  key={i}
                  className="font-bebas text-[18vw] md:text-[14vw] leading-none text-foreground/[0.04] uppercase tracking-tight px-8"
                >
                  Ahmed Inc.
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <span className="font-syne font-bold text-foreground text-lg">
              Ahmed Inc.<sup className="text-xs text-primary ml-0.5">®</sup>
            </span>
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              to="/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-foreground/15 hover:border-foreground hover:bg-foreground text-foreground hover:text-background transition-all duration-300"
            >
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-sm"
              >
                ↑
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
