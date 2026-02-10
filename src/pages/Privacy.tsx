import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

// Animated section block
function PolicyBlock({ 
  number, 
  title, 
  children, 
  index 
}: { 
  number: string; 
  title: string; 
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="grid grid-cols-12 gap-6 py-12 md:py-16 border-b border-foreground/10 hover:border-foreground/20 transition-colors duration-500">
        {/* Number */}
        <div className="col-span-12 md:col-span-2">
          <span className="font-bebas text-6xl md:text-7xl text-foreground/[0.08] group-hover:text-primary/20 transition-colors duration-500">
            {number}
          </span>
        </div>
        
        {/* Title */}
        <div className="col-span-12 md:col-span-3">
          <h3 className="font-syne text-xl md:text-2xl font-bold text-foreground sticky top-24">
            {title}
          </h3>
        </div>
        
        {/* Content */}
        <div className="col-span-12 md:col-span-7">
          <div className="text-muted-foreground leading-relaxed text-lg">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Privacy() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-[2px] bg-primary z-[60]"
        style={{ width: progressWidth }}
      />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="container-wide flex items-center justify-between h-20">
          <Link to="/" className="font-syne font-bold text-background text-lg">
            Ahmed Inc.
          </Link>
          <Link 
            to="/" 
            className="group inline-flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </Link>
        </div>
      </header>

      {/* Hero - Full Screen */}
      <section className="relative h-screen flex items-center justify-center bg-foreground overflow-hidden">
        {/* Large Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-bebas text-[30vw] md:text-[25vw] text-background/[0.03] leading-none whitespace-nowrap"
          >
            PRIVACY
          </motion.span>
        </div>

        <div className="container-wide relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-background/20 text-background/60 text-sm mb-8">
              Legal Document
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-syne text-[clamp(3rem,12vw,8rem)] font-bold text-background leading-[0.9] tracking-tight mb-8"
          >
            Privacy
            <br />
            <span className="text-background/30">Policy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-lg max-w-md mx-auto mb-12"
          >
            How we collect, use, and protect your information
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-8 text-sm text-background/40"
          >
            <span>Last updated</span>
            <span className="w-12 h-px bg-background/20" />
            <span>December 2025</span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-background/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 rounded-full bg-background/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32">
        <div className="container-wide">
          
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mb-20 md:mb-32"
          >
            <p className="text-2xl md:text-3xl text-foreground leading-relaxed font-light">
              At Ahmed Inc., we take your privacy seriously. This policy outlines our practices 
              regarding the collection, use, and disclosure of your information.
            </p>
          </motion.div>

          {/* Policy Blocks */}
          <PolicyBlock number="01" title="Information Collection" index={0}>
            <p className="mb-6">
              We collect information you provide directly to us when you interact with our services. This includes:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Contact details such as name, email address, and phone number</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Company information and project requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Communications and correspondence with our team</span>
              </li>
            </ul>
          </PolicyBlock>

          <PolicyBlock number="02" title="Use of Information" index={1}>
            <p className="mb-6">
              We use the information we collect to provide, maintain, and improve our services:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Respond to inquiries and provide customer support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Send project proposals, updates, and relevant communications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Analyze and improve our website and services</span>
              </li>
            </ul>
          </PolicyBlock>

          <PolicyBlock number="03" title="Data Sharing" index={2}>
            <p>
              We do not sell your personal information. We may share information with trusted 
              third-party service providers who assist us in operating our business, subject to 
              confidentiality agreements. We may also disclose information when required by law 
              or to protect our rights and safety.
            </p>
          </PolicyBlock>

          <PolicyBlock number="04" title="Data Security" index={3}>
            <p>
              We implement industry-standard security measures to protect your information from 
              unauthorized access, alteration, or destruction. While we strive to protect your 
              data, no method of transmission over the internet is completely secure.
            </p>
          </PolicyBlock>

          <PolicyBlock number="05" title="Cookies" index={4}>
            <p>
              Our website uses cookies to enhance your browsing experience and analyze site traffic. 
              You can manage cookie preferences through your browser settings. Essential cookies are 
              required for basic site functionality.
            </p>
          </PolicyBlock>

          <PolicyBlock number="06" title="Your Rights" index={5}>
            <p className="mb-6">
              You have the right to:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Access and receive a copy of your personal data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Request correction or deletion of your data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Opt-out of marketing communications at any time</span>
              </li>
            </ul>
          </PolicyBlock>

          <PolicyBlock number="07" title="Contact" index={6}>
            <p className="mb-6">
              Questions about this privacy policy? We're here to help.
            </p>
            <a
              href="mailto:hello@ahmedinc.com"
              className="group inline-flex items-center gap-3 text-foreground font-syne font-semibold text-xl hover:text-primary transition-colors"
            >
              hello@ahmedinc.com
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </PolicyBlock>

        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container-wide text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground mb-6"
          >
            Also check out
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/terms"
              className="group inline-flex items-center gap-4 font-syne text-3xl md:text-4xl font-bold text-foreground hover:text-primary transition-colors"
            >
              Terms of Service
              <ArrowUpRight className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-foreground/10">
        <div className="container-wide flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-syne font-bold text-foreground">
            Ahmed Inc.<sup className="text-[10px] text-primary">®</sup>
          </span>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved
          </span>
        </div>
      </footer>
    </div>
  );
}
