import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { projects } from "@/data/projects";
import { Eye } from "lucide-react";

// Eye Cursor Component
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
      className="fixed pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
      style={{
        x,
        y,
        scale,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center">
        <Eye className="w-8 h-8 text-foreground" />
      </div>
    </motion.div>
  );
}

// Animated text reveal
const titleChars = "Selected Works".split("");

export function SelectedWork() {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <EyeCursor isVisible={cursorVisible} mouseX={mousePos.x} mouseY={mousePos.y} />
      
      <section 
        ref={sectionRef}
        id="work" 
        className="py-32 md:py-44 bg-background overflow-hidden relative"
        onMouseMove={handleMouseMove}
      >
        {/* Subtle grid pattern */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </motion.div>

        <div className="container mx-auto px-6 md:px-8 relative z-10">
          {/* Header */}
          <div ref={headerRef} className="mb-20 md:mb-32">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={isHeaderInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-16 h-px bg-foreground/20 origin-left"
              />
              <span className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-medium">
                Portfolio
              </span>
            </motion.div>

            {/* Main title with character animation */}
            <div className="overflow-hidden mb-6">
              <motion.h2 
                className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground tracking-tighter leading-[0.9]"
              >
                {titleChars.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 120, opacity: 0 }}
                    animate={isHeaderInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.03,
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h2>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed"
            >
              A curated collection of projects that showcase our expertise in design, development, and digital innovation.
            </motion.p>

            {/* Project count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 flex items-center gap-2"
            >
              <span className="text-6xl md:text-7xl font-bold text-foreground/5">
                {String(projects.length).padStart(2, '0')}
              </span>
              <span className="text-muted-foreground/50 text-sm -ml-2">projects</span>
            </motion.div>
          </div>

          {/* Projects Grid - Masonry-like layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className={`group ${index % 3 === 1 ? 'md:mt-24' : ''}`}
                onMouseEnter={() => {
                  setHoveredProject(project.id);
                  setCursorVisible(true);
                }}
                onMouseLeave={() => {
                  setHoveredProject(null);
                  setCursorVisible(false);
                }}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 cursor-none">
                  {/* Image with parallax */}
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Corner accent */}
                  <motion.div
                    className="absolute top-0 left-0 w-16 h-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="absolute top-4 left-4 w-8 h-px bg-background" />
                    <div className="absolute top-4 left-4 w-px h-8 bg-background" />
                  </motion.div>

                  {/* Year badge */}
                  <motion.div 
                    className="absolute bottom-4 left-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0,
                      x: hoveredProject === project.id ? 0 : -10 
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <span className="text-background/80 text-sm font-mono">
                      © {project.year}
                    </span>
                  </motion.div>

                  {/* Index number */}
                  <motion.div 
                    className="absolute bottom-4 right-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0,
                      y: hoveredProject === project.id ? 0 : 10 
                    }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  >
                    <span className="text-background/40 text-5xl font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Title with animated underline */}
                  <div className="relative inline-block">
                    <motion.h3 
                      className="font-bold text-2xl md:text-3xl text-foreground tracking-tight"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.span 
                      className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredProject === project.id ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ width: "100%", originX: 0 }}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + tagIndex * 0.05 }}
                        className="px-3 py-1 text-xs font-medium text-muted-foreground border border-border/50 rounded-full hover:border-primary/50 hover:text-primary transition-colors duration-300"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-24 md:mt-32"
          >
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center gap-4 cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <span className="relative text-lg md:text-xl text-foreground font-medium">
                View all projects
                <span className="absolute left-0 -bottom-1 w-full h-px bg-foreground/20" />
                <span className="absolute left-0 -bottom-1 w-full h-px bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
              </span>
              
              <motion.span 
                className="flex items-center justify-center w-10 h-10 rounded-full border border-foreground/20 group-hover:border-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="text-foreground group-hover:text-primary transition-colors duration-300"
                >
                  <path 
                    d="M7 17L17 7M7 7h10v10" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
