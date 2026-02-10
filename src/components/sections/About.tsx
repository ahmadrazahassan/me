import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Circle } from "lucide-react";

// Magnetic wrapper for interactive elements
function Magnetic({ children, className = "", strength = 0.3 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text reveal animation component
function RevealText({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Animated counter
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Horizontal scrolling marquee
function Marquee({ children, direction = "left", speed = 25 }: { children: React.ReactNode; direction?: "left" | "right"; speed?: number }) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0"
        animate={{ x: direction === "left" ? [0, -1920] : [-1920, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
      <motion.div
        className="flex shrink-0"
        animate={{ x: direction === "left" ? [0, -1920] : [-1920, 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// Capability item with hover effect
function CapabilityItem({ label, index }: { label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="flex items-center justify-between py-5 border-b border-foreground/10 cursor-default">
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground font-mono">0{index + 1}</span>
          <span className="text-lg md:text-xl font-syne font-medium text-foreground group-hover:text-primary transition-colors duration-300">
            {label}
          </span>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Circle className="w-2 h-2 fill-primary text-primary" />
        </motion.div>
      </div>
    </motion.div>
  );
}

const capabilities = [
  "Brand Strategy",
  "Visual Identity",
  "Web Development",
  "Motion Design",
  "UI/UX Design",
  "Digital Marketing",
];

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 12, suffix: "", label: "Team Members" },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" ref={containerRef} className="relative bg-background overflow-hidden">

      {/* Main Content */}
      <div className="container-wide section-padding">
        
        {/* Header Row */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-20 md:mb-28">
          
          {/* Left - Eyebrow & Title */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <span className="text-sm text-muted-foreground uppercase tracking-[0.2em]">
                About the studio
              </span>
            </motion.div>

            <h2 className="font-syne text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-foreground">
              <RevealText>We craft digital</RevealText>
              <br />
              <span className="text-muted-foreground/40">
                <RevealText delay={0.1}>experiences that</RevealText>
              </span>
              <br />
              <RevealText delay={0.2}>resonate</RevealText>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="inline-block ml-2 text-primary"
              >
                .
              </motion.span>
            </h2>
          </div>

          {/* Right - Description */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-end"
            style={{ y: textY }}
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground text-lg leading-relaxed mb-8"
            >
              Founded with a vision to bridge the gap between aesthetics and functionality, 
              we've spent over a decade helping brands tell their stories through thoughtful 
              design and strategic thinking.
            </motion.p>

            <Magnetic strength={0.2}>
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="group inline-flex items-center gap-3 text-foreground font-syne font-semibold"
              >
                <span className="border-b-2 border-foreground/20 group-hover:border-primary pb-1 transition-colors duration-300">
                  Start a project
                </span>
                <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-foreground/20 group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-foreground group-hover:text-background transition-colors duration-300" />
                </span>
              </motion.a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Visual + Stats Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-20 md:mb-28">
          
          {/* Left - Image with Parallax */}
          <motion.div 
            className="lg:col-span-5 relative"
            style={{ y: imageY }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <motion.img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Ahmed Inc. studio workspace"
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-foreground/5" />
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 md:right-8 bg-foreground text-background px-6 py-4 rounded-xl shadow-2xl"
            >
              <p className="text-xs text-background/50 uppercase tracking-wider mb-1">Since</p>
              <p className="font-bebas text-4xl">2010</p>
            </motion.div>
          </motion.div>

          {/* Right - Stats + Capabilities */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-8 border-y border-foreground/10"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center md:text-left">
                  <p className="font-bebas text-4xl md:text-5xl text-foreground mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Capabilities List */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xs text-muted-foreground uppercase tracking-[0.15em] mb-4"
              >
                What we do
              </motion.p>
              
              <div className="grid md:grid-cols-2 gap-x-8">
                {capabilities.map((capability, index) => (
                  <CapabilityItem key={capability} label={capability} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-foreground/10 origin-left mb-16"
          />
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xs text-muted-foreground uppercase tracking-[0.15em] mb-4"
              >
                Our philosophy
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-syne text-2xl md:text-3xl font-bold text-foreground"
              >
                Design with purpose,
                <br />
                <span className="text-muted-foreground/50">build with precision.</span>
              </motion.h3>
            </div>
            
            <motion.div
              className="lg:col-span-8 lg:pl-8 lg:border-l border-foreground/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We believe great design isn't just about making things look beautiful—it's about 
                solving real problems and creating meaningful connections between brands and their 
                audiences. Every pixel, every interaction, every line of code serves a purpose.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team brings together diverse perspectives and deep expertise to deliver work 
                that not only meets expectations but exceeds them. We're not just designers and 
                developers—we're strategic partners invested in your success.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Large Typography */}
      <div className="relative overflow-hidden py-8 border-t border-foreground/5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Marquee direction="right" speed={50}>
            <div className="flex items-center gap-16 px-8">
              {["Strategy", "Design", "Development", "Growth"].map((word, i) => (
                <span key={i} className="font-bebas text-[12vw] md:text-[8vw] text-foreground/[0.03] uppercase whitespace-nowrap">
                  {word}
                </span>
              ))}
            </div>
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}
