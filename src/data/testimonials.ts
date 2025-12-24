export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "sarah",
    quote: "Ahmed Inc. transformed our entire digital presence. Their attention to detail and creative vision exceeded all expectations. The results speak for themselves.",
    author: "Sarah Chen",
    role: "CEO",
    company: "Nova Fashion",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: "marcus",
    quote: "Working with Ahmed Inc. was a game-changer for our startup. They understood our vision instantly and delivered a product that our users absolutely love.",
    author: "Marcus Rivera",
    role: "Founder",
    company: "FinTech Pro",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: "elena",
    quote: "The team's strategic approach and flawless execution helped us achieve a 200% increase in conversions. Truly exceptional work from start to finish.",
    author: "Elena Kowalski",
    role: "Marketing Director",
    company: "Eco Ventures",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];