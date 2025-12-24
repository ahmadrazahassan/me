import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { projects } from "@/data/projects";
import { Eye, ArrowUpRight } from "lucide-react";

// Custom Eye Cursor for project hover
function EyeCursor({ isVisible, mouseX, mouseY }: { isVisible: boolean; mouseX: number; mouseY: number }) {
  const x = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const y = useSpring(mouseY, { stiffness: 500, damping: 28 });
  const scale = useSpring(isVisible ? 1 : 0, { stiffness: 400, damping: 25 });

  useEffect(() => {
    x.set(mouseX);
    y.set(mouseY);
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-[100] flex items-center justify-center"
      style={{
        x,
        y,
        scale,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div 
        className="w-20 h-20 rounded-full bg-primary flex items-center justify-center"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Eye className="w-6 h-6 text-primary-foreground" />
      </motion.div>
    </motion.div>
  );
}

// Individual Project Card with Sticky Scroll Stack Effect
function ProjectCard({ 
  project, 
  index, 
  totalProjects,
  onHover,
  onLeave,
}: { 
  project: typeof projects[0]; 
  index: number;
  totalProjects: number;
  onHover: (e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax for image
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  
  // Calculate stack position - cards stack from bottom
  const stackOffset = (totalProjects - index - 1) * 40;
  const zIndex = index + 1;

  return (
    <motion.div
      ref={cardRef}
      className="sticky w-full"
      style={{ 
        top: `${100 + index * 40}px`,
        zIndex,
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <motion.article 
        className="group relative bg-background rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-border/10"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Main Layout - Horizontal on desktop */}
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div 
            className="relative w-full lg:w-3/5 aspect-[16/10] lg:aspect-auto lg:min-h-[500px] overflow-hidden cursor-none"
            onMouseMove={onHover}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
          >
            <motion.div
              className="absolute inset-0"
              style={{ y: imageY, scale: imageScale }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 via-transparent to-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Project number - large */}
            <motion.div 
              className="absolute top-6 left-6 md:top-8 md:left-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <span className="text-7xl md:text-8xl lg:text-9xl font-bold text-background/10 leading-none select-none">
                {String(index + 1).padStart(2, '0')}
              </span>
            </motion.div>

            {/* Year badge */}
            <motion.div 
              className="absolute bottom-6 left-6 md:bottom-8 md:left-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-xs font-mono text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {project.year}
              </span>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-2/5 p-6 md:p-10 lg:p-12 flex flex-col justify-center">
            {/* Category */}
            <motion.span 
              className="text-xs tracking-[0.25em] uppercase text-primary font-medium mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {project.tags[0]}
            </motion.span>

            {/* Title */}
            <motion.h3 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {project.title}
            </motion.h3>

            {/* Description */}
            <motion.p 
              className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {project.description}
            </motion.p>

            {/* Tags */}
            <motion.div 
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {project.tags.slice(1).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium text-muted-foreground bg-muted/50 rounded-full border border-border/30"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button
                className="group/btn inline-flex items-center gap-3 text-foreground font-medium"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="relative">
                  View Project
                  <span className="absolute left-0 -bottom-0.5 w-full h-px bg-foreground/20" />
                  <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-primary group-hover/btn:w-full transition-all duration-300" />
                </span>
                <span className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover/btn:border-primary group-hover/btn:bg-primary transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:text-primary-foreground transition-colors duration-300" />
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Bottom progress line */}
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-primary origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.article>
    </motion.div>
  );
}

export function SelectedWork() {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setCursorVisible(true);
  };

  const handleMouseLeave = () => {
    setCursorVisible(false);
  };

  // Title animation
  const titleWords = ["Selected", "Works"];

  return (
    <>
      <EyeCursor isVisible={cursorVisible} mouseX={mousePos.x} mouseY={mousePos.y} />
      
      <section 
        ref={sectionRef}
        id="work" 
        className="relative bg-background"
      >
        {/* Fixed progress indicator */}
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-border/20 z-50">
          <motion.div 
            className="h-full bg-primary"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Header Section */}
        <div className="sticky top-0 z-10 bg-background pt-24 md:pt-32 pb-12 md:pb-20">
          <div className="container mx-auto px-6 md:px-8">
            <div ref={headerRef} className="max-w-4xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium">
                  Featured Work
                </span>
                <span className="text-muted-foreground/40 text-sm">
                  ({String(projects.length).padStart(2, '0')})
                </span>
              </motion.div>

              {/* Main Title */}
              <div className="overflow-hidden mb-6">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {titleWords.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.8, 
                        delay: i * 0.15,
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                      className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tighter leading-none"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed"
              >
                Explore our curated collection of award-winning digital experiences
              </motion.p>
            </div>
          </div>
        </div>

        {/* Stacked Projects Container */}
        <div className="relative pb-[100vh]">
          <div className="container mx-auto px-6 md:px-8">
            <div className="space-y-8 md:space-y-12">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  totalProjects={projects.length}
                  onHover={handleMouseMove}
                  onLeave={handleMouseLeave}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="sticky bottom-0 z-20 bg-gradient-to-t from-background via-background to-transparent pt-20 pb-12">
          <div className="container mx-auto px-6 md:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12 bg-muted/30 backdrop-blur-sm rounded-2xl border border-border/20"
            >
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  Have a project in mind?
                </h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  Let's work together to bring your vision to life
                </p>
              </div>
              
              <motion.a
                href="#contact"
                className="group inline-flex items-center gap-4 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span>Start a Project</span>
                <span className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center group-hover:bg-primary-foreground/30 transition-colors">
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
