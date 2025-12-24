import React from "react";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import { navigationItems } from "@/data/navigation";

export function Footer() {
  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-syne font-bold text-2xl mb-4">Ahmed Inc.</h3>
            <p className="text-background/60 max-w-sm">
              A cutting-edge digital design studio dedicated to crafting bold,
              immersive experiences that elevate brands.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-syne font-semibold text-sm uppercase tracking-wider mb-4 text-background/60">
              Navigation
            </h4>
            <nav className="space-y-3">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="block text-background/80 hover:text-background transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-syne font-semibold text-sm uppercase tracking-wider mb-4 text-background/60">
              Get in Touch
            </h4>
            <div className="space-y-3 text-background/80">
              <p>hello@ahmedinc.com</p>
              <p>+1 (555) 123-4567</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/40 transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/40">
            © 2010–2025 Ahmed Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/40">
            <a href="#" className="hover:text-background/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-background/60 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}