# Ahmed Studio - Codebase Overview & Migration Guide

> Migration from Lovable.dev to Local Development Environment

---

## Executive Summary

Ahmed Studio is a React-based portfolio/agency website built with modern tooling. The Lovable.dev integration is minimal and non-invasive—only a dev-time component tagger plugin and some documentation references. The core application is fully independent and production-ready.

**Migration Complexity: Low**  
**Estimated Time: 15-30 minutes**

---

## Tech Stack Overview

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 18.3.1 |
| Language | TypeScript | 5.8.3 |
| Build Tool | Vite | 5.4.19 |
| Styling | Tailwind CSS | 3.4.17 |
| UI Components | shadcn/ui (Radix UI) | Various |
| Animations | Framer Motion | 12.23.26 |
| Routing | React Router DOM | 6.30.1 |
| State/Data | TanStack React Query | 5.83.0 |
| Forms | React Hook Form + Zod | 7.61.1 / 3.25.76 |
| Icons | Lucide React | 0.462.0 |

---

## Project Structure

```
ahmed-studio/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Layout wrapper
│   │   ├── sections/        # Page sections (Hero, Services, etc.)
│   │   └── ui/              # shadcn/ui components + custom UI
│   ├── data/                # Static data (services, projects, testimonials)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities (cn function for Tailwind)
│   ├── pages/               # Route pages (Index, NotFound)
│   ├── App.tsx              # Root component with providers
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles + CSS variables
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── components.json          # shadcn/ui configuration
└── package.json             # Dependencies
```

---

## Lovable.dev Dependencies Identified

### 1. Package Dependency
**File:** `package.json`
```json
"devDependencies": {
  "lovable-tagger": "^1.1.13"  // ← REMOVE THIS
}
```

### 2. Vite Plugin Integration
**File:** `vite.config.ts`
```typescript
import { componentTagger } from "lovable-tagger";  // ← REMOVE THIS

plugins: [
  react(), 
  mode === "development" && componentTagger()  // ← REMOVE THIS
].filter(Boolean),
```

### 3. OpenGraph Images
**File:** `index.html`
```html
<meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
<meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
```

### 4. Documentation References
**File:** `README.md`
- Multiple references to Lovable.dev URLs and workflows

---

## Step-by-Step Migration Plan

### Phase 1: Remove Lovable Dependencies

#### Step 1.1: Update vite.config.ts
Replace the entire file with:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

#### Step 1.2: Update package.json
Remove the `lovable-tagger` line from devDependencies:

```json
"devDependencies": {
  "@eslint/js": "^9.32.0",
  "@tailwindcss/typography": "^0.5.16",
  "@types/node": "^22.16.5",
  "@types/react": "^18.3.23",
  "@types/react-dom": "^18.3.7",
  "@vitejs/plugin-react-swc": "^3.11.0",
  "autoprefixer": "^10.4.21",
  "eslint": "^9.32.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.20",
  "globals": "^15.15.0",
  "postcss": "^8.5.6",
  "tailwindcss": "^3.4.17",
  "typescript": "^5.8.3",
  "typescript-eslint": "^8.38.0",
  "vite": "^5.4.19"
}
```

#### Step 1.3: Update index.html
Replace the Lovable OpenGraph images with your own or remove them:

```html
<!-- Replace these lines -->
<meta property="og:image" content="/og-image.png" />
<meta name="twitter:image" content="/og-image.png" />
```

Then add your own `og-image.png` to the `public/` folder (create it if needed).

### Phase 2: Clean Install

```bash
# Navigate to project
cd ahmed-studio

# Remove existing node_modules and lock file
rm -rf node_modules
rm package-lock.json

# Fresh install
npm install
```

### Phase 3: Verify Local Development

```bash
# Start development server
npm run dev
```

The app should now be running at `http://localhost:8080`

### Phase 4: Test Production Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## Environment Configuration

**Current State:** No environment variables required.

The application is entirely static with no backend API calls. All data is hardcoded in the `src/data/` directory.

If you need to add environment variables later:

1. Create `.env` file in project root
2. Prefix variables with `VITE_` for client-side access
3. Access via `import.meta.env.VITE_YOUR_VAR`

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root component, providers, routing |
| `src/pages/Index.tsx` | Main landing page composition |
| `src/components/layout/Layout.tsx` | Page wrapper with Header/Footer |
| `src/index.css` | CSS variables, Tailwind config, global styles |
| `tailwind.config.ts` | Extended Tailwind theme (fonts, colors, animations) |
| `components.json` | shadcn/ui component configuration |

---

## Custom Features

### Custom Cursor
- Location: `src/components/ui/CustomCursor.tsx`
- Provides a custom cursor effect across the site

### Preloader
- Location: `src/components/ui/Preloader.tsx`
- Animated loading screen on initial page load

### Magnetic Buttons
- Location: `src/components/ui/MagneticButton.tsx`
- Hook: `src/hooks/useMagneticEffect.tsx`
- Interactive button hover effects

### Scroll Reveal Animations
- Hook: `src/hooks/useScrollReveal.tsx`
- Framer Motion-based scroll animations

---

## Design System

### Fonts (loaded via Google Fonts in index.html)
- **Syne** - Headings
- **Inter** - Body text
- **Bebas Neue** - Display/accent text

### Color Palette (CSS Variables in index.css)
- **Primary:** Scarlet Red (`hsl(4 84% 49%)`)
- **Background:** Warm off-white (`hsl(30 20% 98%)`)
- **Foreground:** Near-black (`hsl(0 0% 4%)`)

---

## Deployment Options

Since this is a static site, you can deploy to:

| Platform | Command |
|----------|---------|
| Vercel | `vercel` or connect GitHub repo |
| Netlify | `netlify deploy --prod` or connect GitHub repo |
| GitHub Pages | Push `dist/` to `gh-pages` branch |
| AWS S3 | Upload `dist/` contents to S3 bucket |
| Cloudflare Pages | Connect GitHub repo |

Build command: `npm run build`  
Output directory: `dist`

---

## Troubleshooting

### Port 8080 already in use
Change the port in `vite.config.ts`:
```typescript
server: {
  host: "::",
  port: 3000,  // or any available port
},
```

### TypeScript errors after migration
Run: `npm run lint` to identify issues. The tsconfig has relaxed settings (`noImplicitAny: false`, etc.) so most issues should be warnings.

### Missing fonts
Ensure you have internet access on first load—fonts are loaded from Google Fonts CDN.

---

## Post-Migration Checklist

- [ ] Removed `lovable-tagger` from package.json
- [ ] Updated vite.config.ts to remove componentTagger
- [ ] Replaced OpenGraph images in index.html
- [ ] Ran `npm install` with clean node_modules
- [ ] Verified `npm run dev` works
- [ ] Verified `npm run build` succeeds
- [ ] Tested production preview with `npm run preview`
- [ ] Updated README.md with your own documentation

---

## Quick Start Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

*Migration guide created: December 2024*
