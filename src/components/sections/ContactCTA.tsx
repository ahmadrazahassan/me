import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Send, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Magnetic element
function Magnetic({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated counter
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Text reveal animation
function RevealText({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Service tag
function ServiceTag({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="inline-flex items-center px-4 py-2 rounded-full border border-background/15 text-background/60 text-sm hover:border-primary hover:text-primary transition-colors duration-300 cursor-default"
    >
      {label}
    </motion.span>
  );
}

export function ContactCTA() {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const services = [
    "Brand Identity",
    "Web Design",
    "Development",
    "Motion Design",
    "UI/UX",
    "Strategy",
  ];

  const budgetOptions = [
    { value: "5k-10k", label: "$5K – $10K" },
    { value: "10k-25k", label: "$10K – $25K" },
    { value: "25k-50k", label: "$25K – $50K" },
    { value: "50k+", label: "$50K+" },
  ];

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Message sent",
      description: "We'll be in touch within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", budget: "", message: "" });
    setSelectedServices([]);
    setIsSubmitting(false);
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative bg-foreground overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem]"
    >
      <div className="container-wide relative z-10 pt-20 md:pt-28 lg:pt-36 pb-16 md:pb-24">
        
        {/* Top Row - Large CTA */}
        <div className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-background/40 text-sm uppercase tracking-[0.2em] mb-8"
          >
            Start a project
          </motion.p>

          <h2 className="font-syne text-[clamp(2.5rem,8vw,6rem)] font-bold text-background leading-[0.95] tracking-tight">
            <RevealText>Have an idea?</RevealText>
            <br />
            <span className="text-background/30">
              <RevealText delay={0.1}>Let's make it</RevealText>
            </span>
            <br />
            <RevealText delay={0.2}>happen</RevealText>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-block ml-4 text-primary"
            >
              .
            </motion.span>
          </h2>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-3 gap-8 mb-20 md:mb-28 py-10 border-y border-background/10"
        >
          <div>
            <p className="font-bebas text-4xl md:text-5xl lg:text-6xl text-background mb-1">
              <AnimatedNumber value={50} suffix="+" />
            </p>
            <p className="text-background/40 text-sm">Projects Delivered</p>
          </div>
          <div>
            <p className="font-bebas text-4xl md:text-5xl lg:text-6xl text-background mb-1">
              <AnimatedNumber value={98} suffix="%" />
            </p>
            <p className="text-background/40 text-sm">Client Satisfaction</p>
          </div>
          <div>
            <p className="font-bebas text-4xl md:text-5xl lg:text-6xl text-background mb-1">
              <AnimatedNumber value={24} suffix="h" />
            </p>
            <p className="text-background/40 text-sm">Response Time</p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left - Contact Info */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xs text-background/30 uppercase tracking-[0.15em] mb-4">
                Email us
              </p>
              <Magnetic>
                <a
                  href="mailto:hello@ahmedinc.com"
                  className="group inline-flex items-center gap-3"
                >
                  <span className="text-xl md:text-2xl font-syne font-semibold text-background group-hover:text-primary transition-colors duration-300">
                    hello@ahmedinc.com
                  </span>
                  <motion.span
                    whileHover={{ rotate: 45 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-background/20 group-hover:border-primary group-hover:bg-primary transition-all duration-300"
                  >
                    <ArrowUpRight className="w-4 h-4 text-background group-hover:text-foreground transition-colors duration-300" />
                  </motion.span>
                </a>
              </Magnetic>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-xs text-background/30 uppercase tracking-[0.15em] mb-4">
                Call us
              </p>
              <a
                href="tel:+14155551234"
                className="text-xl md:text-2xl font-syne font-semibold text-background hover:text-primary transition-colors duration-300"
              >
                +1 (415) 555-1234
              </a>
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="lg:col-span-8 lg:pl-12 lg:border-l border-background/10"
          >
            {/* Services Selection */}
            <div className="mb-10">
              <p className="text-xs text-background/30 uppercase tracking-[0.15em] mb-5">
                I'm interested in
              </p>
              <div className="flex flex-wrap gap-3">
                {services.map((service, index) => (
                  <motion.button
                    key={service}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleService(service)}
                    className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
                      selectedServices.includes(service)
                        ? "border-primary bg-primary text-white"
                        : "border-background/15 text-background/60 hover:border-background/40 hover:text-background"
                    }`}
                  >
                    {service}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Budget Selection */}
            <div className="mb-10">
              <p className="text-xs text-background/30 uppercase tracking-[0.15em] mb-5">
                Project budget
              </p>
              <div className="flex flex-wrap gap-3">
                {budgetOptions.map((option, index) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, budget: option.value })}
                    className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
                      formData.budget === option.value
                        ? "border-primary bg-primary text-white"
                        : "border-background/15 text-background/60 hover:border-background/40 hover:text-background"
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-8">
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <motion.label
                    animate={{
                      y: focusedField === "name" || formData.name ? -24 : 0,
                      scale: focusedField === "name" || formData.name ? 0.85 : 1,
                      color: focusedField === "name" ? "rgb(220, 38, 38)" : "rgba(255,255,255,0.4)"
                    }}
                    className="absolute left-0 top-4 text-background/40 origin-left pointer-events-none transition-all duration-300"
                  >
                    Your name *
                  </motion.label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-background/15 focus:border-primary py-4 text-background text-lg focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div className="relative">
                  <motion.label
                    animate={{
                      y: focusedField === "email" || formData.email ? -24 : 0,
                      scale: focusedField === "email" || formData.email ? 0.85 : 1,
                      color: focusedField === "email" ? "rgb(220, 38, 38)" : "rgba(255,255,255,0.4)"
                    }}
                    className="absolute left-0 top-4 text-background/40 origin-left pointer-events-none transition-all duration-300"
                  >
                    Email address *
                  </motion.label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-background/15 focus:border-primary py-4 text-background text-lg focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === "company" || formData.company ? -24 : 0,
                    scale: focusedField === "company" || formData.company ? 0.85 : 1,
                    color: focusedField === "company" ? "rgb(220, 38, 38)" : "rgba(255,255,255,0.4)"
                  }}
                  className="absolute left-0 top-4 text-background/40 origin-left pointer-events-none transition-all duration-300"
                >
                  Company name
                </motion.label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  onFocus={() => setFocusedField("company")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-background/15 focus:border-primary py-4 text-background text-lg focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === "message" || formData.message ? -24 : 0,
                    scale: focusedField === "message" || formData.message ? 0.85 : 1,
                    color: focusedField === "message" ? "rgb(220, 38, 38)" : "rgba(255,255,255,0.4)"
                  }}
                  className="absolute left-0 top-4 text-background/40 origin-left pointer-events-none transition-all duration-300"
                >
                  Tell us about your project *
                </motion.label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-background/15 focus:border-primary py-4 text-background text-lg focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <Magnetic>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative inline-flex items-center gap-4 px-8 py-4 rounded-full font-syne font-semibold text-base transition-all duration-300 ${
                    isSubmitting
                      ? "bg-background/20 text-background/50 cursor-wait"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                    )}
                  </span>
                </motion.button>
              </Magnetic>

              <p className="text-background/30 text-sm">
                We'll respond within 24 hours
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
