import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { navigationItems } from "@/data/navigation";

// Animated nav link component
function NavLink({ href, children, superscript }: { href: string; children: React.ReactNode; superscript?: string }) {
  return (
    <motion.a
      href={href}
      className="relative text-sm text-muted-foreground hover:text-foreground transition-colors group py-1"
      whileHover="hover"
    >
      <span className="relative inline-block overflow-hidden">
        {/* Default text */}
        <motion.span
          className="inline-block"
          variants={{
            hover: { y: "-100%", transition: { duration: 0.3, ease: [0.6, 0.01, 0, 0.9] } }
          }}
        >
          {children}
        </motion.span>
        {/* Hover text (duplicate) */}
        <motion.span
          className="absolute left-0 top-full inline-block"
          variants={{
            hover: { y: "-100%", transition: { duration: 0.3, ease: [0.6, 0.01, 0, 0.9] } }
          }}
        >
          {children}
        </motion.span>
      </span>
      {superscript && (
        <sup className="text-[10px] text-muted-foreground/60 ml-0.5">{superscript}</sup>
      )}
      {/* Underline effect */}
      <motion.span
        className="absolute bottom-0 left-0 h-[1px] bg-foreground origin-left"
        initial={{ scaleX: 0 }}
        variants={{
          hover: { scaleX: 1, transition: { duration: 0.3, ease: [0.6, 0.01, 0, 0.9] } }
        }}
        style={{ width: "100%" }}
      />
    </motion.a>
  );
}

// Simple Hamburger Button - just lines, hover turns red
function HamburgerButton({ isOpen, onClick, inverted = false }: { isOpen: boolean; onClick: () => void; inverted?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const defaultColor = inverted ? "#ffffff" : "hsl(0, 0%, 4%)";
  const hoverColor = "hsl(4, 84%, 49%)";

  return (
    <motion.button
      className="relative p-2 group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-7 h-4 flex flex-col justify-between">
        {/* Top line */}
        <motion.span
          className="block h-[2px] rounded-full origin-center"
          animate={{
            backgroundColor: isHovered ? hoverColor : defaultColor,
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 7 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        
        {/* Bottom line */}
        <motion.span
          className="block h-[2px] rounded-full origin-center"
          animate={{
            backgroundColor: isHovered ? hoverColor : defaultColor,
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -7 : 0,
            width: isOpen ? "100%" : "70%",
            marginLeft: isOpen ? "0%" : "30%",
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </motion.button>
  );
}

// Menu nav link with same animation as header
function MenuNavLink({ href, children, index, onClick }: { href: string; children: React.ReactNode; index: number; onClick: () => void }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        delay: 0.1 + index * 0.08, 
        duration: 0.5, 
        ease: [0.6, 0.01, 0, 0.9] 
      }}
      onClick={onClick}
      className="group relative flex items-center gap-4"
      whileHover="hover"
    >
      {/* Index number */}
      <motion.span 
        className="text-xs text-background/40 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 + index * 0.08 }}
      >
        0{index + 1}
      </motion.span>

      {/* Dot indicator */}
      <motion.span
        className="w-2 h-2 rounded-full border border-background/30"
        variants={{
          hover: { 
            backgroundColor: "hsl(4, 84%, 49%)",
            borderColor: "hsl(4, 84%, 49%)",
            scale: 1.2
          }
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Link text with reveal animation */}
      <span className="relative inline-block overflow-hidden">
        <motion.span
          className="inline-block text-5xl md:text-6xl lg:text-7xl font-syne font-bold text-background"
          variants={{
            hover: { y: "-100%", transition: { duration: 0.3, ease: [0.6, 0.01, 0, 0.9] } }
          }}
        >
          {children}
        </motion.span>
        <motion.span
          className="absolute left-0 top-full inline-block text-5xl md:text-6xl lg:text-7xl font-syne font-bold text-background"
          variants={{
            hover: { y: "-100%", transition: { duration: 0.3, ease: [0.6, 0.01, 0, 0.9] } }
          }}
        >
          {children}
        </motion.span>
      </span>

      {/* Arrow icon */}
      <motion.span
        className="text-background/50"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 + index * 0.08 }}
        variants={{
          hover: { x: 5, color: "hsl(4, 84%, 49%)", transition: { duration: 0.3 } }
        }}
      >
        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
      </motion.span>
    </motion.a>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Hide header after scrolling past hero section (approximately viewport height)
    const heroHeight = window.innerHeight;
    setIsVisible(latest < heroHeight * 0.8);
  });

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-background"
      >
        <nav
          className="container-wide flex items-center justify-between h-14 md:h-16"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="font-syne font-bold text-base text-foreground relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative">
              Ahmed Inc.<sup className="text-[10px] text-primary">®</sup>
            </span>
          </motion.a>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navigationItems.slice(0, 4).map((item, index) => (
              <NavLink
                key={item.id}
                href={item.href}
                superscript={index === 1 ? "27" : undefined}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Hamburger Menu */}
          <HamburgerButton 
            isOpen={isMobileMenuOpen} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          />
        </nav>
      </motion.header>

      {/* Full Screen Menu Overlay - covers everything */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-foreground"
          >
            {/* Menu Header - logo left, close right */}
            <div className="container-wide flex items-center justify-between h-14 md:h-16">
              <motion.a 
                href="#"
                className="font-syne font-bold text-base text-background"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ahmed Inc.<sup className="text-[10px] text-primary">®</sup>
              </motion.a>
              
              {/* Close button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <HamburgerButton 
                  isOpen={true} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  inverted={true}
                />
              </motion.div>
            </div>

            {/* Navigation Links */}
            <nav className="container-wide flex flex-col items-center justify-center min-h-[calc(100vh-180px)]">
              <div className="flex flex-col items-center gap-4 md:gap-6">
                {navigationItems.map((item, index) => (
                  <MenuNavLink
                    key={item.id}
                    href={item.href}
                    index={index}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </MenuNavLink>
                ))}
              </div>
            </nav>

            {/* Footer Info */}
            <motion.div 
              className="absolute bottom-8 left-0 right-0 container-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-background/50">
                <a href="mailto:hello@ahmedinc.com" className="hover:text-background transition-colors">
                  hello@ahmedinc.com
                </a>
                <span>Based in Dubai, UAE</span>
                <a href="#" className="hover:text-background transition-colors">Twitter</a>
                <a href="#" className="hover:text-background transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-background transition-colors">Dribbble</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}