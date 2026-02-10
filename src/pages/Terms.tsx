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

export default function Terms() {
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
            TERMS
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
            Terms of
            <br />
            <span className="text-background/30">Service</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-lg max-w-md mx-auto mb-12"
          >
            The rules and guidelines for using our services
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
              By using Ahmed Inc.'s services, you agree to these terms. Please read them carefully 
              before engaging with our services.
            </p>
          </motion.div>

          {/* Policy Blocks */}
          <PolicyBlock number="01" title="Agreement" index={0}>
            <p>
              By accessing or using our website and services, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms of Service. If you do not agree, 
              please refrain from using our services.
            </p>
          </PolicyBlock>

          <PolicyBlock number="02" title="Services" index={1}>
            <p className="mb-6">
              Ahmed Inc. provides professional digital design and development services:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Brand identity and visual design systems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Web design and full-stack development</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>UI/UX design and user research</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Motion design and digital marketing</span>
              </li>
            </ul>
          </PolicyBlock>

          <PolicyBlock number="03" title="Project Terms" index={2}>
            <p>
              All projects are governed by a separate project agreement or statement of work that 
              details specific deliverables, timelines, milestones, and payment schedules. These 
              project-specific terms supplement and take precedence over these general terms where applicable.
            </p>
          </PolicyBlock>

          <PolicyBlock number="04" title="Payment" index={3}>
            <p className="mb-6">
              Standard payment terms unless otherwise specified:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>50% deposit required before project commencement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Final payment due upon project completion and delivery</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Late payments may incur additional fees</span>
              </li>
            </ul>
          </PolicyBlock>

          <PolicyBlock number="05" title="Intellectual Property" index={4}>
            <p>
              Upon full payment, clients receive ownership of final approved deliverables as specified 
              in the project agreement. Ahmed Inc. retains the right to showcase work in portfolios 
              and marketing materials. All preliminary concepts, unused designs, working files, and 
              proprietary tools remain our property unless explicitly transferred in writing.
            </p>
          </PolicyBlock>

          <PolicyBlock number="06" title="Client Duties" index={5}>
            <p className="mb-6">
              To ensure project success, clients agree to:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Provide timely feedback and approvals within agreed timeframes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Supply necessary content, assets, and brand materials</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span>Ensure proper rights and licenses for all provided materials</span>
              </li>
            </ul>
          </PolicyBlock>

          <PolicyBlock number="07" title="Revisions" index={6}>
            <p>
              Each project agreement specifies the number of revision rounds included. Additional 
              revisions beyond the agreed scope will be billed at our standard hourly rate. Major 
              scope changes may require a new project agreement.
            </p>
          </PolicyBlock>

          <PolicyBlock number="08" title="Liability" index={7}>
            <p>
              Ahmed Inc. shall not be liable for any indirect, incidental, special, or consequential 
              damages arising from the use of our services. Our total liability is limited to the 
              amount paid for the specific service giving rise to the claim.
            </p>
          </PolicyBlock>

          <PolicyBlock number="09" title="Termination" index={8}>
            <p>
              Either party may terminate a project with 14 days written notice. Upon termination, 
              the client is responsible for payment of all work completed to date. Deposits are 
              non-refundable unless otherwise agreed in writing.
            </p>
          </PolicyBlock>

          <PolicyBlock number="10" title="Contact" index={9}>
            <p className="mb-6">
              Questions about these terms? Reach out to us.
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
              to="/privacy"
              className="group inline-flex items-center gap-4 font-syne text-3xl md:text-4xl font-bold text-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
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
