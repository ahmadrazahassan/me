export interface Benefit {
  id: string;
  title: string;
  description: string;
  image: string;
  size?: "large" | "medium" | "small";
}

export const benefits: Benefit[] = [
  {
    id: "creativity",
    title: "Cutting-Edge Creativity",
    description: "We push boundaries with innovative design solutions that set your brand apart from the competition.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    size: "large",
  },
  {
    id: "turnaround",
    title: "Fast & Efficient Turnarounds",
    description: "Quality doesn't have to take forever. Our streamlined process delivers exceptional results on time.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
    size: "medium",
  },
  {
    id: "collaboration",
    title: "Seamless Collaboration",
    description: "We work as an extension of your team, ensuring transparent communication throughout every project.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    size: "medium",
  },
  {
    id: "support",
    title: "24/7 Email Support",
    description: "Questions don't keep business hours. Neither do we. Reach out anytime for prompt assistance.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    size: "small",
  },
  {
    id: "future-ready",
    title: "Future-Ready Solutions",
    description: "We build with tomorrow in mind, using cutting-edge technologies that scale with your growth.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    size: "small",
  },
  {
    id: "expertise",
    title: "Proven Expertise",
    description: "With 15+ years and 100+ successful projects, our track record speaks for itself.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    size: "small",
  },
];