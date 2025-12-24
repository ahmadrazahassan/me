export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  timeline: string;
  image: string;
}

export const services: Service[] = [
  {
    id: "branding",
    number: "01",
    title: "Branding & Identity",
    description: "We craft distinctive brand identities that resonate with your audience and stand the test of time. From logo design to comprehensive brand guidelines, we build the visual foundation of your success.",
    timeline: "2-4 weeks",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  },
  {
    id: "web-design",
    number: "02",
    title: "Web Design & Development",
    description: "Beautiful, responsive websites that convert. We combine stunning aesthetics with intuitive user experiences to create digital platforms that drive real business results.",
    timeline: "4-8 weeks",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
  },
  {
    id: "ui-ux",
    number: "03",
    title: "UI/UX Design",
    description: "User-centered design that delights. We create intuitive interfaces and seamless experiences through research, prototyping, and iterative refinement.",
    timeline: "3-6 weeks",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
  },
  {
    id: "motion",
    number: "04",
    title: "Motion & Visual Design",
    description: "Bring your brand to life with captivating motion graphics and visual content. From social media animations to full-scale video production.",
    timeline: "2-5 weeks",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
  },
];