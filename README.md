# Ahmed Studio

A modern, premium portfolio/agency website built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** with custom design system
- **shadcn/ui** components (Radix UI)
- **Framer Motion** for animations
- **React Router** for client-side routing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/      # Header, Footer, Layout
│   ├── sections/    # Page sections
│   └── ui/          # UI components
├── data/            # Static content data
├── hooks/           # Custom React hooks
├── lib/             # Utilities
├── pages/           # Route pages
└── index.css        # Global styles
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Deployment

This is a static site. Build with `npm run build` and deploy the `dist/` folder to any static hosting:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 / CloudFront
- Cloudflare Pages

## License

Private project.
