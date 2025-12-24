import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { navigationItems } from "@/data/navigation";

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
          <a
            href="#"
            className="font-syne font-bold text-base text-foreground"
          >
            Ahmed<sup className="text-[10px] text-primary">®</sup>
          </a>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {navigationItems.slice(0, 4).map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative"
              >
                {item.label}
                {index === 1 && (
                  <sup className="text-[10px] text-muted-foreground/60 ml-0.5">27</sup>
                )}
              </a>
            ))}
          </div>

          {/* Hamburger Menu */}
          <button
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-7 flex flex-col gap-1.5">
              <span className="block h-0.5 bg-foreground w-full"></span>
              <span className="block h-0.5 bg-foreground w-3/4 ml-auto"></span>
            </div>
          </button>
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
                  Ahmed<sup className="text-[10px] text-primary">®</sup>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-background"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center space-y-6">
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-syne font-bold text-background hover:text-background/70 transition-colors"
                  >
                    {item.label}
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