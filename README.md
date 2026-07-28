# Anil Joshi — Portfolio

A cinematic, single-page developer portfolio built with a Spider-Man-noir visual theme — comic-poster typography, a full-page looping video background, scroll-driven animations, and a handful of playful interactive details.

**Live site:** https://portfolio-omega-sage-12.vercel.app
**Repository:** https://github.com/aniljoshi121/Portfolio

---

## Tech Stack

- **React 18 + TypeScript** — component framework
- **Vite** — build tool / dev server
- **Tailwind CSS** — styling
- **GSAP** — timeline-based entrance animations, magnetic button effects, custom cursor
- **Framer Motion** — scroll-linked animations (name reveal, text reveal sections)
- **React Three Fiber / Three.js** — 3D particle field
- **Lenis** — smooth scrolling
- **Vercel** — hosting & CI/CD (auto-deploys on push to `main`)

---

## Features Built

### Hero Section
- Scroll-driven name reveal — "Anil Joshi" assembles from scattered, rotated letters into place as you scroll, using Framer Motion's `useScroll`/`useTransform`
- Comic-poster typography — bold white-fill/red-outline lettering (Anton font) with a stacked `text-shadow` technique to fake the poster-style outline, paired with italic Passion One for the tagline and buttons
- **PersonaReveal** — a circular portrait that reveals an alternate photo underneath via a mouse-following (and touch-dragging, on mobile) radial mask, eased with a `requestAnimationFrame` loop for smooth motion
- CTA button ("View My Work") with a magnetic mouse-follow effect on desktop, a distinct press/tap animation on touch devices, and a click handler that smooth-scrolls to the Projects section
- Fullscreen looping video background (site-wide, not just Hero) with a dark cinematic overlay for text readability

### Interactive Details
- **Hanging Spider** — a custom noir-styled video of a spider hangs from a thread in the corner of the screen, swings continuously via GSAP, and extends its thread length as you scroll. The thread itself is an SVG bezier curve that bows in sync with the spider's swing angle for a silk-like feel
- **Music Toggle** — a bottom-corner button with an animated 5-bar waveform visualization that reacts while ambient background audio plays, with a "Click to play the music" prompt
- **Custom cursor** and **glass-effect navbar** that responds to scroll
- **Loader** — an intro screen with a looping video and "Namaste" greeting, animated progress counter and bar, before revealing the site

### Scroll-Driven Sections
- **ScrollTextReveal** — a heading and a row of skill pills that converge from scattered positions into place as you scroll through sticky-pinned sections, adapted from Skiper UI's scroll-animation components (attribution below)

### Mobile Considerations
- Touch-safe interactions throughout: hover-only effects (magnetic buttons, cursor-follow reveals) are gated behind `(hover: hover) and (pointer: fine)` media query checks so they don't misfire on touch devices, with dedicated touch handlers (`onTouchStart`/`onTouchEnd`/`onTouchMove`) providing equivalent feedback
- Responsive sizing and repositioning (e.g., the hanging spider shrinks and shifts below the navbar on small screens)

---

## Attribution

Some scroll-animation components (`ScrollTextReveal`, the music toggle's waveform visualization) are adapted from **[Skiper UI](https://skiperui.com)** by [@gurvinder-singh02](https://x.com/Gur__vi), used under their free license which requires attribution.

---

## Project Structure (key files)

```
src/
├── components/
│   ├── CustomCursor.tsx
│   ├── GlobalVideoBackground.tsx
│   ├── Loader.tsx
│   ├── MusicToggle.tsx
│   ├── Navbar.tsx
│   ├── PersonaReveal.tsx
│   ├── ScrollSpider.tsx
│   └── ScrollTextReveal.tsx
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Timeline.tsx
│   ├── Certificates.tsx
│   └── Contact.tsx
├── hooks/
│   └── useLenis.ts
└── App.tsx
```

---

## Running Locally

```bash
npm install
npm run dev
```

## Building for Production

```bash
npm run build
```

## Deployment

Connected to Vercel — every push to `main` on GitHub triggers an automatic production deployment.

```bash
git add .
git commit -m "your message"
git push
```