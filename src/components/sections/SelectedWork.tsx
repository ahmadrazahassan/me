import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Circle, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

// Magnetic wrapper
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

// Text reveal animation
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

// Project card with hover effects
function ProjectCard({ 
  project, 
  index,
  onHover,
  isAnyHovered,
  isHovered
}: { 
  project: typeof projects[0]; 
  index: number;
  onHover: (index: number | null) => void;
  isAnyHovered: boolean;
  isHovered: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const isLarge = index === 0 || index === 3;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className={`group relative ${
        isLarge ? "md:col-span-2" : "md:col-span-1"
      }`}
    >
      <Link to={`/project/${project.id}`}>
        <motion.div
          animate={{ 
            opacity: isAnyHovered && !isHovered ? 0.4 : 1,
            scale: isHovered ? 1.02 : 1
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Image Container */}
          <div className={`relative overflow-hidden rounded-2xl ${
            isLarge ? "aspect-[16/10]" : "aspect-[4/5]"
          }`}>
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Hover Content */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-between p-6 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Top - Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="px-3 py-1.5 rounded-full border border-background/30 text-background text-xs font-medium"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Bottom - CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-background text-sm font-medium">View Project</span>
                <Magnetic strength={0.4}>
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-foreground" />
                  </div>
                </Magnetic>
              </motion.div>
            </motion.div>

            {/* Year Badge */}
            <motion.div
              className="absolute top-4 right-4 bg-background rounded-full px-3 py-1.5"
              animate={{ 
                opacity: isHovered ? 0 : 1,
                y: isHovered ? -10 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs font-mono text-foreground">{project.year}</span>
            </motion.div>
          </div>

          {/* Content Below Image */}
          <div className="mt-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <motion.div
                className="flex items-center gap-3 mb-2"
                animate={{ x: isHovered ? 8 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xs text-muted-foreground font-mono">0{index + 1}</span>
                <h3 className="font-syne text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
              </motion.div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                {project.description}
              </p>
            </div>
            
            <motion.div
              animate={{ 
                x: isHovered ? 5 : 0,
                opacity: isHovered ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
              className="mt-1"
            >
              <MoveRight className="w-5 h-5 text-foreground" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}

// Horizontal scrolling marquee
function Marquee({ children, speed = 25 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0"
        animate={{ x: [0, -1920] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
      <motion.div
        className="flex shrink-0"
        animate={{ x: [0, -1920] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="work" ref={containerRef} className="relative bg-muted/30 overflow-hidden">
      
      {/* Background Number */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: parallaxY }}
      >
        <span className="font-bebas text-[40vw] text-foreground/[0.02] leading-none">
          W
        </span>
      </motion.div>

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
      <div className="container-wide section-padding relative z-10">
        
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-24">
          
          {/* Left - Title */}
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
                Selected Work
              </span>
            </motion.div>

            <h2 className="font-syne text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-foreground">
              <RevealText>Projects that</RevealText>
              <br />
              <span className="text-muted-foreground/40">
                <RevealText delay={0.1}>define our</RevealText>
              </span>
              <br />
              <RevealText delay={0.2}>craft</RevealText>
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

          {/* Right - Description + Stats */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground text-lg leading-relaxed mb-8"
            >
              A curated selection of our most impactful work across branding, 
              web design, and digital experiences.
            </motion.p>

            {/* Mini Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-8"
            >
              <div>
                <p className="font-bebas text-3xl text-foreground">50+</p>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>
              <div className="w-px h-10 bg-foreground/10" />
              <div>
                <p className="font-bebas text-3xl text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Industries</p>
              </div>
              <div className="w-px h-10 bg-foreground/10" />
              <div>
                <p className="font-bebas text-3xl text-foreground">98%</p>
                <p className="text-xs text-muted-foreground">Satisfaction</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Projects Grid - Asymmetric Masonry */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onHover={setHoveredIndex}
              isAnyHovered={hoveredIndex !== null}
              isHovered={hoveredIndex === index}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 md:mt-24 flex justify-center"
        >
          <Magnetic strength={0.2}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-4 px-8 py-4 rounded-full border-2 border-foreground/15 hover:border-foreground hover:bg-foreground text-foreground hover:text-background transition-all duration-300"
            >
              <span className="font-syne font-semibold">View All Projects</span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground/10 group-hover:bg-background/20 transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              </span>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Bottom Marquee */}
      <div className="py-6 border-t border-foreground/5">
        <Marquee speed={40}>
          <div className="flex items-center gap-12 px-6">
            {["Branding", "Web Design", "UI/UX", "E-commerce", "Mobile Apps", "Motion Design"].map((word, i) => (
              <div key={i} className="flex items-center gap-3">
                <Circle className="w-1.5 h-1.5 fill-primary text-primary" />
                <span className="text-sm font-medium text-muted-foreground/50 uppercase tracking-[0.15em] whitespace-nowrap">
                  {word}
                </span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
