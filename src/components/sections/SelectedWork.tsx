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
  const horizontalRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  
  // Horizontal scroll logic
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 100}%`]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <EyeCursor isVisible={cursorVisible} mouseX={mousePos.x} mouseY={mousePos.y} />
      
      <section 
        ref={sectionRef}
        id="work" 
        className="relative bg-background"
        style={{ height: `${projects.length * 100}vh` }}
        onMouseMove={handleMouseMove}
      >
        {/* Sticky container for horizontal scroll */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Header - Fixed on left */}
          <div className="absolute top-0 left-0 z-20 h-full flex items-center pl-6 md:pl-12 lg:pl-20 pointer-events-none">
            <div ref={headerRef} className="max-w-xs">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={isHeaderInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="w-12 h-px bg-foreground/30 origin-left"
                />
                <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-medium">
                  Portfolio
                </span>
              </motion.div>

              {/* Vertical title */}
              <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: 100, opacity: 0 }}
                  animate={isHeaderInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tighter leading-[0.95] writing-mode-vertical md:writing-mode-horizontal"
                >
                  Selected
                  <br />
                  <span className="text-primary">Works</span>
                </motion.h2>
              </div>

              {/* Counter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isHeaderInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8"
              >
                <span className="text-5xl font-bold text-foreground/10">
                  {String(projects.length).padStart(2, '0')}
                </span>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-12 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-muted-foreground"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                  <span className="text-muted-foreground/60 text-xs tracking-wider uppercase">
                    Scroll to explore
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-8 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 h-px bg-foreground/10 z-20"
          >
            <motion.div
              className="h-full bg-primary origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </motion.div>

          {/* Project counter */}
          <motion.div
            className="absolute bottom-12 right-6 md:right-12 lg:right-20 z-20"
          >
            <div className="flex items-baseline gap-1">
              <motion.span 
                className="text-2xl font-bold text-foreground"
                style={{ 
                  opacity: useTransform(scrollYProgress, [0, 0.1], [1, 1])
                }}
              >
                {String(Math.min(Math.ceil(scrollYProgress.get() * projects.length) + 1, projects.length)).padStart(2, '0')}
              </motion.span>
              <span className="text-muted-foreground/50 text-sm">/</span>
              <span className="text-muted-foreground/50 text-sm">{String(projects.length).padStart(2, '0')}</span>
            </div>
          </motion.div>

          {/* Horizontal scrolling projects */}
          <motion.div 
            ref={horizontalRef}
            className="flex h-full items-center pl-[40%] md:pl-[35%] lg:pl-[30%]"
            style={{ x }}
          >
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] h-[70vh] md:h-[75vh] px-4 md:px-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => {
                  setHoveredProject(project.id);
                  setCursorVisible(true);
                }}
                onMouseLeave={() => {
                  setHoveredProject(null);
                  setCursorVisible(false);
                }}
              >
                <div className="relative h-full rounded-3xl overflow-hidden group cursor-none">
                  {/* Image */}
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                  {/* Hover overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-primary/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Corner accents */}
                  <motion.div
                    className="absolute top-6 left-6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0,
                      scale: hoveredProject === project.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-8 h-8 border-t-2 border-l-2 border-background/50" />
                  </motion.div>
                  <motion.div
                    className="absolute top-6 right-6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0,
                      scale: hoveredProject === project.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    <div className="w-8 h-8 border-t-2 border-r-2 border-background/50" />
                  </motion.div>

                  {/* Project number */}
                  <div className="absolute top-6 right-8">
                    <span className="text-background/30 text-8xl md:text-9xl font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    {/* Year */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="mb-4"
                    >
                      <span className="text-background/60 text-sm font-mono">
                        {project.year}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3 
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-4 tracking-tight"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {project.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      className="text-background/70 text-sm md:text-base leading-relaxed max-w-md mb-6"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.2 + tagIndex * 0.05 }}
                          className="px-3 py-1.5 text-xs font-medium text-background/80 border border-background/30 rounded-full backdrop-blur-sm hover:bg-background/10 transition-colors duration-300"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* End CTA card */}
            <motion.div
              className="flex-shrink-0 w-[60vw] md:w-[40vw] lg:w-[30vw] h-[70vh] md:h-[75vh] px-4 md:px-8 flex items-center justify-center"
            >
              <motion.a
                href="#contact"
                className="group relative flex flex-col items-center justify-center text-center p-12 rounded-3xl border border-foreground/10 hover:border-primary/30 transition-colors duration-500 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="relative z-10 w-20 h-20 rounded-full border border-foreground/20 group-hover:border-primary flex items-center justify-center mb-8 transition-colors duration-300"
                >
                  <svg 
                    width="24" 
                    height="24" 
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
                </motion.div>

                <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  Start a Project
                </h3>
                <p className="relative z-10 text-muted-foreground text-sm max-w-xs">
                  Let's create something amazing together
                </p>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
