export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery & Strategy",
    description: "We dive deep into understanding your business, audience, and goals to create a strategic roadmap for success.",
  },
  {
    id: "concept",
    number: "02",
    title: "Concept & Design",
    description: "Our creative team develops compelling concepts and designs that align with your vision and resonate with your audience.",
  },
  {
    id: "development",
    number: "03",
    title: "Development & Execution",
    description: "We bring designs to life with meticulous attention to detail, ensuring every element functions flawlessly.",
  },
  {
    id: "launch",
    number: "04",
    title: "Launch & Optimization",
    description: "After a successful launch, we continue to monitor, analyze, and optimize for ongoing success and growth.",
  },
];