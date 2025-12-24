import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useSmoothScroll();
  
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}