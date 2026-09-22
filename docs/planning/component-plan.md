# Component Architecture — Festive Occasions

## Folder structure

```
components/
├── layout/          Navbar, Footer, MobileNav, FloatingActions
├── hero/            Hero (homepage), ServiceHero (inner pages)
├── services/        ServicesSection, ServiceCard, ServicePageTemplate
├── gallery/         GallerySection, GalleryGrid, ProjectCard
├── sections/        Intro, Signature, Styles, Process, WhyUs, Testimonials, FAQ, FinalCTA
├── forms/           QuoteForm, ContactForm
├── seo/             JSONLDSchema, Breadcrumbs
├── ui/              Button, Container, SectionHeading, Eyebrow, Divider
└── placeholder/     PremiumPlaceholder (SVG-based image placeholder system)
```

## Data layer

```
lib/
├── site.ts          SiteConfig (name, phone, whatsapp, email, domain, social)
├── services.ts      Service definitions (outline, numbered)
├── gallery.ts       Gallery projects (placeholder-marked)
├── styles.ts        FAQ, process steps, styles/themes, why-us, testimonials
└── utils.ts         cn() helper
```

## Animation layer

```
animations/
├── registry.ts      registerGSAP() — registers ScrollTrigger once
├── hero.ts          createHeroTimeline()
├── textReveal.ts    split-text reveal helper (GSAP)
├── scroll.ts        useScrollReveal() / scrub helpers
├── navigation.ts    nav hide/show on scroll
└── hover.ts         hover micro-interactions
```

## Rules

- Server Components by default; `"use client"` only when needed (animations, forms, nav state).
- All animation hooks use `useGSAP` from `@gsap/react` (auto-cleanup of ScrollTriggers).
- Every meaningful image: descriptive alt, proper dimensions, optimized format.
- No random values — always reference design tokens.