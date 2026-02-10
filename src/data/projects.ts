export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  link?: string;
  // Case study details
  client: string;
  duration: string;
  date: string;
  category: string;
  heroImage: string;
  about: {
    headline: string;
    description: string;
  };
  challenge: {
    headline: string;
    description: string;
  };
  summary: {
    headline: string;
    description: string;
  };
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: "nextgenrdp",
    title: "NextGenRDP",
    description: "A complete SaaS system for managing and selling RDPs/VPS with modern UI, automation, and secure integrations.",
    image: "/projects/nextgenrdp/cover.png",
    tags: ["SaaS", "Full-Stack", "Cloud Infrastructure"],
    year: "2024",
    link: "https://nextgenrdp.com",
    client: "NextGenRDP",
    duration: "12 Weeks",
    date: "2024",
    category: "SaaS Platform",
    heroImage: "/projects/nextgenrdp/hero.png",
    about: {
      headline: "NextGenRDP needed a robust, scalable platform to automate the entire RDP/VPS selling workflow—from provisioning to billing.",
      description: "We architected a complete SaaS ecosystem with automated server provisioning, real-time monitoring, secure payment integrations, and an intuitive admin dashboard. The platform handles everything from user onboarding to resource management with zero manual intervention."
    },
    challenge: {
      headline: "Building a cloud infrastructure marketplace requires handling complex provisioning logic, security concerns, and seamless payment flows.",
      description: "The challenge was creating a system that could automatically provision servers across multiple providers, handle billing cycles, manage user permissions, and maintain 99.9% uptime. Security was paramount—we implemented multi-layer authentication and encrypted communications throughout."
    },
    summary: {
      headline: "NextGenRDP now operates as a fully automated SaaS platform serving customers globally with minimal operational overhead.",
      description: "The platform processes hundreds of transactions monthly with automated provisioning completing in under 60 seconds. Customer support tickets dropped 70% thanks to self-service features, and the modern UI has become a competitive advantage in the market."
    },
    gallery: [
      "/projects/nextgenrdp/gallery-1.png",
      "/projects/nextgenrdp/gallery-2.png",
      "/projects/nextgenrdp/gallery-3.png",
      "/projects/nextgenrdp/gallery-4.png"
    ]
  },
  {
    id: "mattr-ai",
    title: "Mattr AI",
    description: "A production-ready AI image generation platform with advanced prompts, high-speed rendering, and user account management.",
    image: "/projects/mattr-ai/cover.png",
    tags: ["AI/ML", "SaaS", "Image Generation"],
    year: "2024",
    link: "https://mattr-blue.vercel.app",
    client: "Mattr AI",
    duration: "8 Weeks",
    date: "2024",
    category: "AI Platform",
    heroImage: "/projects/mattr-ai/hero.png",
    about: {
      headline: "Mattr AI was built to democratize AI image generation with an intuitive interface and powerful backend infrastructure.",
      description: "We developed a full-stack AI platform featuring advanced prompt engineering, multiple model support, user credit systems, and a gallery for generated artwork. The architecture prioritizes speed without compromising on image quality."
    },
    challenge: {
      headline: "AI image generation demands significant computational resources while users expect instant results and a seamless experience.",
      description: "Balancing generation speed with quality required optimizing API calls, implementing smart queuing systems, and building a responsive UI that keeps users engaged during processing. We also needed robust user management with credit-based access control."
    },
    summary: {
      headline: "Mattr AI delivers enterprise-grade AI image generation with consumer-friendly simplicity.",
      description: "The platform achieves sub-10-second generation times for most requests, with a 95% user satisfaction rate. The credit system enables sustainable monetization while the intuitive interface has attracted both professional designers and casual creators."
    },
    gallery: [
      "/projects/mattr-ai/gallery-1.png",
      "/projects/mattr-ai/gallery-2.png",
      "/projects/mattr-ai/gallery-3.png",
      "/projects/mattr-ai/gallery-4.png"
    ]
  },
  {
    id: "billcraft",
    title: "BillCraft",
    description: "AI-powered invoice creation where users provide details and the system auto-generates professional invoices using dynamic templates.",
    image: "/projects/billcraft/cover.png",
    tags: ["AI Integration", "FinTech", "Automation"],
    year: "2024",
    link: "https://billcraft-zhx6.vercel.app",
    client: "BillCraft",
    duration: "6 Weeks",
    date: "2024",
    category: "Business Tools",
    heroImage: "/projects/billcraft/hero.png",
    about: {
      headline: "BillCraft reimagines invoice creation by leveraging AI to transform simple inputs into polished, professional documents.",
      description: "Users simply describe their invoice needs in natural language, and our AI engine generates complete invoices with proper formatting, calculations, and professional templates. The system learns from user preferences to deliver increasingly personalized results."
    },
    challenge: {
      headline: "Traditional invoice software is tedious and template-bound. We needed to make invoice creation as simple as having a conversation.",
      description: "The challenge was building an AI system that could accurately interpret varied user inputs, handle complex calculations, and generate visually appealing documents. We also needed multiple export formats and a template system flexible enough for any business type."
    },
    summary: {
      headline: "BillCraft has transformed invoice creation from a chore into a 30-second task.",
      description: "Users report 90% time savings compared to traditional methods. The AI accuracy rate exceeds 98%, and the dynamic template system has generated over 10,000 unique invoice designs. Freelancers and small businesses particularly love the natural language input feature."
    },
    gallery: [
      "/projects/billcraft/gallery-1.png",
      "/projects/billcraft/gallery-2.png",
      "/projects/billcraft/gallery-3.png",
      "/projects/billcraft/gallery-4.png"
    ]
  },
  {
    id: "ayan-collection",
    title: "Ayan Collection",
    description: "Fully customized e-commerce platform with product management, checkout flow, and a high-end modern UI.",
    image: "/projects/ayan-collection/cover.png",
    tags: ["E-Commerce", "Next.js", "Full-Stack"],
    year: "2024",
    link: "https://www.ayancollection.me",
    client: "Ayan Collection",
    duration: "10 Weeks",
    date: "2024",
    category: "E-Commerce",
    heroImage: "/projects/ayan-collection/hero.png",
    about: {
      headline: "Ayan Collection required a bespoke e-commerce experience that would elevate their brand and streamline operations.",
      description: "We built a custom Next.js storefront with advanced product filtering, real-time inventory management, seamless checkout, and an admin dashboard for complete business control. Every pixel was crafted to reflect the brand's premium positioning."
    },
    challenge: {
      headline: "Off-the-shelf e-commerce solutions couldn't deliver the unique experience Ayan Collection envisioned for their customers.",
      description: "The challenge was building a fully custom solution that matched enterprise-level functionality while maintaining the flexibility for unique brand expression. Performance was critical—every millisecond of load time impacts conversion rates."
    },
    summary: {
      headline: "Ayan Collection now operates a world-class e-commerce platform that competitors envy.",
      description: "The custom platform achieved a 40% higher conversion rate than their previous solution. Page load times under 1.5 seconds and the intuitive checkout flow reduced cart abandonment by 35%. The admin dashboard saves hours of daily operational work."
    },
    gallery: [
      "/projects/ayan-collection/gallery-1.png",
      "/projects/ayan-collection/gallery-2.png",
      "/projects/ayan-collection/gallery-3.png",
      "/projects/ayan-collection/gallery-4.png"
    ]
  },
  {
    id: "uol-paper-bank",
    title: "UOL Paper Bank",
    description: "A fully approved university project providing students with past papers, officially approved by the department HOD.",
    image: "/projects/uol-paper-bank/cover.png",
    tags: ["EdTech", "Web App", "University Project"],
    year: "2024",
    link: "https://www.uolpaperbank.page",
    client: "University of Lahore",
    duration: "8 Weeks",
    date: "2024",
    category: "Education",
    heroImage: "/projects/uol-paper-bank/hero.png",
    about: {
      headline: "UOL Paper Bank was created to solve a real problem—students struggling to find organized, reliable past examination papers.",
      description: "We developed a comprehensive platform with categorized papers by department, subject, and year. The system includes search functionality, download tracking, and an admin panel for paper management. Official approval from the HOD validates its academic integrity."
    },
    challenge: {
      headline: "Past papers were scattered across various sources with no reliable, centralized repository for students.",
      description: "The challenge was creating a system that could organize thousands of documents logically, provide fast search capabilities, and maintain academic standards. We needed approval from university administration, requiring careful attention to copyright and distribution policies."
    },
    summary: {
      headline: "UOL Paper Bank has become an essential resource for students, officially recognized by the university.",
      description: "The platform serves thousands of students with a library of categorized past papers. Student feedback has been overwhelmingly positive, with many crediting the resource for improved exam preparation. The official HOD approval sets it apart from unofficial alternatives."
    },
    gallery: [
      "/projects/uol-paper-bank/gallery-1.png",
      "/projects/uol-paper-bank/gallery-2.png",
      "/projects/uol-paper-bank/gallery-3.png",
      "/projects/uol-paper-bank/gallery-4.png"
    ]
  },
  {
    id: "lastpdf",
    title: "LastPDF",
    description: "A complete toolkit for PDF and image conversions, compressions, merges, and processing.",
    image: "/projects/lastpdf/cover.png",
    tags: ["Utility Tool", "File Processing", "Web App"],
    year: "2024",
    link: "https://lastpdf.vercel.app",
    client: "LastPDF",
    duration: "5 Weeks",
    date: "2024",
    category: "Productivity",
    heroImage: "/projects/lastpdf/hero.png",
    about: {
      headline: "LastPDF was built to be the only file tool you'll ever need—comprehensive, fast, and completely free.",
      description: "We created an all-in-one suite handling PDF merging, splitting, compression, conversion, and image processing. The tool works entirely in-browser for privacy, with no file uploads to external servers. Clean UI makes complex operations simple."
    },
    challenge: {
      headline: "Most PDF tools are either limited, slow, or riddled with ads and privacy concerns.",
      description: "The challenge was building a comprehensive toolkit that processes files client-side for maximum privacy while maintaining speed and quality. We needed to handle large files efficiently without crashing browsers or compromising output quality."
    },
    summary: {
      headline: "LastPDF delivers professional-grade file processing with zero compromises on privacy or usability.",
      description: "The platform handles thousands of file operations daily with 100% client-side processing. Users appreciate the ad-free experience and the confidence that their sensitive documents never leave their device. The tool has become a go-to resource for professionals and students alike."
    },
    gallery: [
      "/projects/lastpdf/gallery-1.png",
      "/projects/lastpdf/gallery-2.png",
      "/projects/lastpdf/gallery-3.png",
      "/projects/lastpdf/gallery-4.png"
    ]
  },
  {
    id: "articleforge",
    title: "ArticleForge",
    description: "Generates high-end single or bulk HTML articles using advanced AI content automation.",
    image: "/projects/articleforge/cover.png",
    tags: ["AI Content", "Automation", "SaaS"],
    year: "2024",
    link: "https://articleforge-eight.vercel.app",
    client: "ArticleForge",
    duration: "7 Weeks",
    date: "2024",
    category: "AI Tools",
    heroImage: "/projects/articleforge/hero.png",
    about: {
      headline: "ArticleForge empowers content creators to produce high-quality articles at scale without sacrificing quality.",
      description: "We built an AI-powered content generation platform that produces SEO-optimized, well-structured HTML articles. The system supports bulk generation, custom templates, and multiple content styles. Output is ready for direct publishing with proper formatting and meta tags."
    },
    challenge: {
      headline: "AI-generated content often feels generic and requires heavy editing. We needed to produce publish-ready articles.",
      description: "The challenge was fine-tuning AI outputs to match professional writing standards while maintaining the speed benefits of automation. We implemented custom prompt engineering, style controls, and quality checks to ensure every article meets publication standards."
    },
    summary: {
      headline: "ArticleForge has become a secret weapon for content teams needing quality at scale.",
      description: "The platform generates thousands of articles monthly with minimal editing required. Users report 80% time savings compared to manual writing, and SEO performance of AI-generated content matches human-written pieces. Bulk generation features have been particularly popular with agencies."
    },
    gallery: [
      "/projects/articleforge/gallery-1.png",
      "/projects/articleforge/gallery-2.png",
      "/projects/articleforge/gallery-3.png",
      "/projects/articleforge/gallery-4.png"
    ]
  },
  {
    id: "reels-studio",
    title: "Reels Studio",
    description: "A complete content downloading platform supporting reels, images, and videos from Instagram.",
    image: "/projects/reels-studio/cover.png",
    tags: ["Social Media", "Downloader", "Web App"],
    year: "2024",
    link: "https://reels-studio-eta.vercel.app",
    client: "Reels Studio",
    duration: "4 Weeks",
    date: "2024",
    category: "Social Tools",
    heroImage: "/projects/reels-studio/hero.png",
    about: {
      headline: "Reels Studio provides a clean, fast way to download Instagram content for personal use and content repurposing.",
      description: "We built a streamlined platform that extracts and downloads reels, images, and videos with a simple URL paste. The tool handles various content types automatically, provides quality options, and works without requiring user authentication."
    },
    challenge: {
      headline: "Instagram's API restrictions and frequent changes make content downloading technically challenging.",
      description: "The challenge was building a reliable extraction system that adapts to platform changes while maintaining fast download speeds. We needed to handle various content formats, provide quality options, and ensure a smooth user experience without technical complexity."
    },
    summary: {
      headline: "Reels Studio has become a trusted tool for creators and marketers managing Instagram content.",
      description: "The platform processes thousands of downloads daily with near-instant extraction times. Users appreciate the clean interface and reliable performance. Content creators use it for backup and repurposing, while marketers leverage it for competitive analysis."
    },
    gallery: [
      "/projects/reels-studio/gallery-1.png",
      "/projects/reels-studio/gallery-2.png",
      "/projects/reels-studio/gallery-3.png",
      "/projects/reels-studio/gallery-4.png"
    ]
  },
  {
    id: "auronex-media",
    title: "Auronex Media",
    description: "A clean, professional article-based website with a modern layout and optimized performance.",
    image: "/projects/auronex-media/cover.png",
    tags: ["Media", "Content Platform", "Web Design"],
    year: "2024",
    link: "https://auronexmedia.space",
    client: "Auronex Media",
    duration: "6 Weeks",
    date: "2024",
    category: "Media & Publishing",
    heroImage: "/projects/auronex-media/hero.png",
    about: {
      headline: "Auronex Media needed a publishing platform that prioritized readability, performance, and professional aesthetics.",
      description: "We designed and developed a modern article platform with clean typography, optimized images, and lightning-fast page loads. The CMS allows easy content management while the frontend delivers an exceptional reading experience across all devices."
    },
    challenge: {
      headline: "Content websites often sacrifice performance for features, resulting in slow, cluttered experiences.",
      description: "The challenge was building a feature-rich publishing platform that loads instantly and keeps readers engaged. We optimized every aspect—from image delivery to font loading—while maintaining a sophisticated design that establishes credibility."
    },
    summary: {
      headline: "Auronex Media now operates a world-class publishing platform that readers and search engines love.",
      description: "The platform achieves perfect Lighthouse scores with sub-second load times. Reader engagement metrics have exceeded industry benchmarks, with average time on page 3x higher than competitors. The clean design has become a signature element of the brand."
    },
    gallery: [
      "/projects/auronex-media/gallery-1.png",
      "/projects/auronex-media/gallery-2.png",
      "/projects/auronex-media/gallery-3.png",
      "/projects/auronex-media/gallery-4.png"
    ]
  }
];
