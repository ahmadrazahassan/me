export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
}

export const projects: Project[] = [
  {
    id: "nova-fashion",
    title: "Nova Fashion",
    description: "Complete brand identity and e-commerce platform for a luxury fashion house.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    tags: ["Branding", "E-commerce", "Web Design"],
    year: "2024",
  },
  {
    id: "fintech-pro",
    title: "FinTech Pro",
    description: "Mobile banking app redesign focused on accessibility and user experience.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    tags: ["UI/UX", "Mobile App", "Finance"],
    year: "2024",
  },
  {
    id: "eco-ventures",
    title: "Eco Ventures",
    description: "Sustainable brand identity and website for an environmental investment firm.",
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80",
    tags: ["Branding", "Web Design", "Sustainability"],
    year: "2023",
  },
  {
    id: "artisan-collective",
    title: "Artisan Collective",
    description: "Digital marketplace connecting local artisans with global customers.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    tags: ["Marketplace", "Web Design", "UX"],
    year: "2023",
  },
  {
    id: "wellness-hub",
    title: "Wellness Hub",
    description: "Holistic wellness platform with booking, content, and community features.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    tags: ["Web App", "UI/UX", "Health"],
    year: "2023",
  },
  {
    id: "urban-spaces",
    title: "Urban Spaces",
    description: "Real estate platform with immersive virtual tours and smart search.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    tags: ["Web Design", "Real Estate", "3D"],
    year: "2024",
  },
];