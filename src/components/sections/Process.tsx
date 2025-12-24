import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Subscribe",
    description: "Choose a plan and request as many designs as you need.",
  },
  {
    number: "2",
    title: "Request",
    description: "Choose a plan and request as many designs as you need.",
  },
  {
    number: "3",
    title: "Get Your Designs",
    description: "Choose a plan and request as many designs as you need.",
  },
];

function StepCard({
  step,
  className,
  rotate,
  delay,
}: {
  step: (typeof steps)[number];
  className: string;
  rotate: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 64, rotate }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={className}
    >
      <div className="relative w-[18.5rem] sm:w-[20rem] md:w-[22rem] lg:w-[24rem] h-[22rem] sm:h-[24rem] md:h-[26rem] bg-card rounded-[28px] shadow-[0_30px_80px_hsl(var(--foreground)/0.12)] ring-1 ring-border/50 p-8 md:p-10 flex flex-col">
        <span className="font-syne font-bold tracking-tight text-[5.5rem] sm:text-[6.5rem] md:text-[7.5rem] leading-none text-foreground">
          {step.number}
        </span>

        <div className="mt-auto">
          <h3 className="font-syne font-bold text-xl md:text-2xl text-foreground">
            {step.title}
          </h3>
          <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed max-w-[26ch]">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ArrowOverlay() {
  // One overlay with two arrow drawings to match the reference precisely.
  return (
    <svg
      className="absolute inset-0 z-30 pointer-events-none hidden md:block"
      viewBox="0 0 1200 520"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Arrow 1 -> 2 (top arc) */}
      <motion.path
        d="M405 265 C 455 185, 540 150, 620 125"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      />
      <motion.circle
        cx="405"
        cy="265"
        r="8"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        fill="hsl(var(--background))"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.55 }}
      />
      <motion.circle
        cx="620"
        cy="125"
        r="8"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        fill="hsl(var(--background))"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 1.55 }}
      />

      {/* Arrow 2 -> 3 (small loop + tail) */}
      <motion.path
        d="M735 260 C 760 240, 785 235, 810 250 C 835 265, 825 295, 800 290 C 770 284, 770 250, 795 245 C 845 235, 900 260, 935 280"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.25, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      />
      <motion.circle
        cx="735"
        cy="260"
        r="8"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        fill="hsl(var(--background))"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.95 }}
      />
      <motion.circle
        cx="1000"
        cy="290"
        r="8"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        fill="hsl(var(--background))"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 2.15 }}
      />
    </svg>
  );
}

export function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background: soft vignette like the reference */}
      <div className="absolute inset-0 bg-muted/60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 360px at 50% 0%, hsl(var(--foreground)/0.16), transparent 55%), radial-gradient(900px 420px at 50% 85%, hsl(var(--foreground)/0.12), transparent 60%)",
        }}
      />

      <div className="relative container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <span className="w-12 h-px bg-muted-foreground/30" />
            <span className="text-muted-foreground italic text-sm md:text-base">
              Our Process, Explained
            </span>
            <span className="w-12 h-px bg-muted-foreground/30" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="font-syne font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl text-foreground"
          >
            Here&apos;s how it works
          </motion.h2>
        </div>

        {/* Mobile: simple stacked list (no arrows) */}
        <div className="md:hidden grid gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            >
              <div className="bg-card rounded-[24px] ring-1 ring-border/50 shadow-[0_24px_60px_hsl(var(--foreground)/0.10)] p-7">
                <div className="font-syne font-bold text-6xl leading-none">{s.number}</div>
                <div className="mt-6">
                  <div className="font-syne font-bold text-xl">{s.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: overlapped cards + arrows */}
        <div className="relative hidden md:flex items-center justify-center min-h-[520px]">
          <ArrowOverlay />

          {/* Left */}
          <StepCard
            step={steps[0]}
            rotate={-8}
            delay={0.15}
            className="absolute left-0 lg:left-[6%] -translate-y-2"
          />

          {/* Center */}
          <StepCard
            step={steps[1]}
            rotate={-2}
            delay={0.3}
            className="relative z-20 -translate-y-10"
          />

          {/* Right */}
          <StepCard
            step={steps[2]}
            rotate={8}
            delay={0.45}
            className="absolute right-0 lg:right-[6%] -translate-y-2"
          />

          {/* Subtle base shadow under the trio */}
          <div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[900px] h-[120px] blur-2xl opacity-40"
            style={{
              background:
                "radial-gradient(closest-side, hsl(var(--foreground)/0.22), transparent 70%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Process;
