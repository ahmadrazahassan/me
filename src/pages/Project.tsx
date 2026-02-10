import { useRef, useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Circle } from "lucide-react";
import { projects } from "@/data/projects";

// Scroll to top on mount
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

// Magnetic button effect
function MagneticButton({ 
  children, 
  className = "",
  as: Component = "button",
  ...props
}: { 
  children: React.ReactNode; 
  className?: string;
  as?: any;
  [key: string]: any;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref as any}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Component className={className} {...props}>
        {children}
      </Component>
    </motion.div>
  );
}

// Character by character text reveal
function SplitText({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: string; 
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = children.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: -80 }}
            animate={isInView ? { y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: delay + wordIndex * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Smooth counter animation
function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {value}{suffix}
    </motion.span>
  );
}

// Horizontal line animation
function AnimatedLine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className="h-px bg-foreground/10 origin-left"
    />
  );
}

// Image with reveal animation
function RevealImage({ 
  src, 
  alt, 
  className = "",
  aspectRatio = "aspect-[16/10]"
}: { 
  src: string; 
  alt: string;
  className?: string;
  aspectRatio?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${aspectRatio} ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Reveal overlay */}
      <motion.div
        className="absolute inset-0 bg-background z-10"
        initial={{ scaleY: 1 }}
        animate={isInView ? { scaleY: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ transformOrigin: "top" }}
      />
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

// Content block with label
function ContentBlock({ 
  label, 
  title, 
  description,
  index = 0
}: { 
  label: string; 
  title: string; 
  description: string;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="py-20 md:py-32">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          {/* Label */}
          <motion.div
            className="col-span-12 md:col-span-3 lg:col-span-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-sm text-muted-foreground font-grotesk">{label}</span>
          </motion.div>

          {/* Content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-8">
            <h3 className="font-syne text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-foreground leading-[1.2] mb-8">
              <SplitText delay={0.2}>{title}</SplitText>
            </h3>
            <motion.p
              className="text-muted-foreground text-lg md:text-xl leading-relaxed font-outfit"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
      <div className="container-wide mt-16">
        <AnimatedLine delay={0.5} />
      </div>
    </div>
  );
}

// Gallery with masonry-like layout
function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="py-8 md:py-16">
      <div className="container-wide">
        {/* First row - full width */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 md:mb-6"
        >
          <RevealImage
            src={images[0]}
            alt={`${title} 1`}
            aspectRatio="aspect-[21/9]"
            className="rounded-2xl"
          />
        </motion.div>

        {/* Second row - two columns */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {images.slice(1, 3).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <RevealImage
                src={image}
                alt={`${title} ${index + 2}`}
                aspectRatio="aspect-[4/5]"
                className="rounded-2xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Next project card
function NextProjectCard({ project }: { project: typeof projects[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/project/${project.id}`} className="group block">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-8">
          <motion.img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
          
          {/* Floating arrow */}
          <motion.div
            className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowUpRight className="w-6 h-6 text-foreground" />
          </motion.div>
        </div>
        
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-primary font-grotesk mb-2">Next Project</p>
            <h3 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-foreground group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground font-grotesk">{project.year}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 150]);

  // Track mouse for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  // Get next project
  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <ScrollToTop />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-[2px] bg-primary z-[60]"
        style={{ width: progressWidth }}
      />

      {/* Fixed Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="container-wide flex items-center justify-between h-20">
          <Link to="/" className="font-grotesk font-bold text-foreground hover:text-primary transition-colors text-lg">
            Ahmed Inc.<sup className="text-[10px] text-primary">®</sup>
          </Link>
          <MagneticButton
            as={Link}
            to="/#work"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/20 text-sm text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-grotesk">Back</span>
          </MagneticButton>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-40 md:pt-48 pb-20">
        <motion.div 
          className="container-wide relative z-10"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <div className="grid grid-cols-12 gap-x-8 gap-y-12">
            {/* Left - Meta Info */}
            <motion.div
              className="col-span-12 md:col-span-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="md:sticky md:top-32">
                {/* Client */}
                <div className="mb-6">
                  <p className="text-muted-foreground/60 text-sm mb-0.5">Client</p>
                  <p className="text-foreground font-medium">{project.client}</p>
                </div>
                
                {/* Duration */}
                <div className="mb-6 pt-6 border-t border-foreground/10">
                  <p className="text-muted-foreground/60 text-sm mb-0.5">Duration</p>
                  <p className="text-foreground font-medium">{project.duration}</p>
                </div>
                
                {/* Date */}
                <div className="pt-6 border-t border-foreground/10">
                  <p className="text-muted-foreground/60 text-sm mb-0.5">Date</p>
                  <p className="text-foreground font-medium">{project.date}</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Title & Description */}
            <div className="col-span-12 md:col-span-10 md:pl-8">
              {/* Category */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-4"
              >
                <span className="text-primary text-sm font-medium">#{project.category}</span>
              </motion.div>

              {/* Title */}
              <h1 className="font-bebas text-[clamp(3.5rem,11vw,10rem)] text-foreground leading-[0.9] tracking-tight mb-8">
                <SplitText delay={0.4}>{project.title}</SplitText>
              </h1>

              {/* Description */}
              <motion.p
                className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {project.description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Hero Image - Full Bleed */}
      <section className="relative">
        <RevealImage
          src={project.heroImage}
          alt={project.title}
          aspectRatio="aspect-[16/9]"
        />
      </section>

      {/* About Section */}
      <ContentBlock
        label="About the project"
        title={project.about.headline}
        description={project.about.description}
        index={0}
      />

      {/* Single Large Image */}
      <div className="container-wide py-8">
        <RevealImage
          src={project.gallery[0]}
          alt={`${project.title} showcase`}
          aspectRatio="aspect-[21/9]"
          className="rounded-2xl"
        />
      </div>

      {/* Challenge Section */}
      <ContentBlock
        label="The Challenge"
        title={project.challenge.headline}
        description={project.challenge.description}
        index={1}
      />

      {/* Gallery */}
      <ProjectGallery images={project.gallery} title={project.title} />

      {/* Summary Section */}
      <ContentBlock
        label="The Result"
        title={project.summary.headline}
        description={project.summary.description}
        index={2}
      />

      {/* Next Project */}
      <section className="py-20 md:py-32">
        <div className="container-wide">
          <NextProjectCard project={nextProject} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 border-t border-foreground/10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-6"
              >
                <Circle className="w-2 h-2 fill-primary text-primary" />
                <span className="text-sm text-muted-foreground font-grotesk">Available for projects</span>
              </motion.div>
              <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-foreground leading-[0.95] mb-6">
                <SplitText>Let's work together</SplitText>
              </h2>
              <motion.p
                className="text-muted-foreground text-lg font-outfit max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Have a project in mind? Let's create something amazing together.
              </motion.p>
            </div>
            <motion.div
              className="flex lg:justify-end"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <MagneticButton
                as={Link}
                to="/#contact"
                className="group inline-flex items-center gap-4 px-10 py-5 rounded-full bg-foreground text-background font-grotesk font-semibold text-lg hover:bg-primary transition-colors duration-300"
              >
                Start a Project
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-foreground/10">
        <div className="container-wide flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-grotesk font-bold text-foreground">
            Ahmed Inc.<sup className="text-[10px] text-primary">®</sup>
          </span>
          <span className="text-sm text-muted-foreground font-outfit">
            © {new Date().getFullYear()} All rights reserved
          </span>
        </div>
      </footer>
    </div>
  );
}
