# Ali Eren Tumer Portfolio (Interactive Globe)

Interactive multilingual portfolio built with:

- Next.js
- Tailwind CSS
- Three.js (`@react-three/fiber` + `@react-three/drei`)
- Framer Motion
- Lenis smooth scrolling
- `react-i18next` (EN / TR / DE)

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Active architecture

- `components/three/InteractiveGlobe.tsx`
- `components/providers/PortfolioProvider.tsx`
- `components/providers/SmoothScrollProvider.tsx`
- `components/ui/*`
- `components/sections/*`
- `lib/i18n.ts`
- `messages/en.json`
- `messages/tr.json`
- `messages/de.json`

## Highlights

- Interactive 3D Earth with high-res day/night textures
- Fresnel atmosphere shader and interactive language hotspots (TR / EN / DE)
- OrbitControls rotation + zoom
- Auto/local-time day-night sync with manual mode switch (Auto / Day / Night)
- Multilingual CV data (EN / TR / DE) sourced from PDF content
- Glitch/fade-slide text transitions when language changes
- Bento grids for projects and skills
- Contact form with EmailJS
- GitHub Pages deployment with single artifact workflow
