import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
          <motion.button
            className="p-2 text-foreground relative group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-7 flex flex-col gap-1.5">
              <motion.span 
                className="block h-0.5 bg-foreground w-full origin-right"
                variants={{
                  hover: { scaleX: 0.8, transition: { duration: 0.2 } }
                }}
              />
              <motion.span 
                className="block h-0.5 bg-foreground w-3/4 ml-auto"
                variants={{
                  hover: { scaleX: 1.2, transition: { duration: 0.2 } }
                }}
              />
            </div>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-syne font-bold text-base text-background">
                  Ahmed Inc.<sup className="text-[10px] text-primary">®</sup>
                </span>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-background"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <nav className="flex-1 flex flex-col justify-center space-y-6">
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.08, duration: 0.4, ease: [0.6, 0.01, 0, 0.9] }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-syne font-bold text-background hover:text-background/70 transition-colors relative group overflow-hidden"
                    whileHover={{ x: 10 }}
                  >
                    <span className="relative inline-block">
                      {item.label}
                      <motion.span
                        className="absolute bottom-0 left-0 h-[2px] bg-background/50 origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ width: "100%" }}
                      />
                    </span>
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}