"use client";

import { useRef } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { gsap, useGSAP, prefersReducedMotion } from "@/animations/registry";
import { FestiveImage } from "@/components/ui/festive-image";

/**
 * Who We Decorate For — editorial audiences (brief §08: typography +
 * image interaction, never cards).
 *
 * Desktop: the left typography rows scroll while a sticky right-hand
 * image panel crossfades between audiences (GSAP scrub). Each row links
 * to the honest service page for that audience.
 * Mobile + reduced-motion: rows stack with their own image inline.
 */
const audiences = [
  {
    title: "Homes & Villas",
    copy: "Living rooms, entrances, staircases and gardens — polished, warm and unmistakably festive.",
    image: "livingroomCandles" as const,
    href: "/christmas-villa-decoration-dubai",
    cta: "Explore villa decoration",
  },
  {
    title: "Corporate & Commercial",
    copy: "Lobbies, offices and branded installations that impress clients and lift the whole team.",
    image: "officeLobbyTree" as const,
    href: "/christmas-office-decoration-dubai",
    cta: "Explore office decoration",
  },
  {
    title: "Hospitality & Retail",
    copy: "Hotels, restaurants, cafés and retail spaces — Instagrammable festive moments your guests remember.",
    image: "tableSetting" as const,
    href: "/christmas-corporate-decoration-dubai",
    cta: "Explore corporate decoration",
  },
];

export function Audiences() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = scope.current;
      if (!el) return;

      const images = gsap.utils.toArray<HTMLElement>("[data-aud-img]", el);
      if (images.length === 0) return;

      const N = images.length;
      const win = 1 / N;

      // First image starts visible; each following audience crossfades in
      // as the rows above scroll past the sticky panel.
      gsap.set(images[0], { autoAlpha: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 72%",
          end: "bottom 68%",
          scrub: 1,
        },
        defaults: { ease: "none" },
      });

      images.forEach((img, i) => {
        if (i === 0) return;
        const inPos = i * win;
        tl.fromTo(
          img,
          { autoAlpha: 0, scale: 1.14 },
          { autoAlpha: 1, scale: 1, duration: win * 0.55, ease: "power2.out" },
          inPos
        ).to(
          img,
          { autoAlpha: 0, scale: 1.03, duration: win * 0.5, ease: "power2.in" },
          (i + 1) * win - win * 0.5
        );
      });
    },
    { scope }
  );

  return (
    <Section id="who-we-decorate-for" className="overflow-hidden">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Who We Decorate For"
            title={
              <>
                One studio. Every kind of <em className="text-champagne not-italic">space.</em>
              </>
            }
            description="We work across residential, corporate and hospitality environments — from a single statement tree to a full property transformation."
          />
        </ScrollReveal>

        <div
          ref={scope}
          className="mt-16 grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20"
        >
          {/* Typography rows */}
          <div className="flex flex-col lg:pr-10">
            {audiences.map((a, i) => (
              <ScrollReveal key={a.title} y={24} delay={i * 0.05}>
                <Link
                  href={a.href}
                  className="group block border-t hairline py-8 transition-colors duration-500 last:border-b lg:py-10"
                >
                  <div className="flex items-baseline gap-5">
                    <span
                      aria-hidden
                      className="font-display text-2xl italic leading-none text-champagne/60 lg:text-3xl"
                    >
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.02] tracking-[-0.015em] text-espresso transition-colors duration-500 group-hover:text-cocoa">
                      {a.title}
                    </h3>
                  </div>

                  <p className="mt-4 max-w-xl text-lead text-cocoa/80">
                    {a.copy}
                  </p>

                  <span className="mt-7 inline-flex items-center gap-3 text-label text-espresso">
                    <span className="relative">
                      {a.cta}
                      <span
                        aria-hidden
                        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-500 group-hover:scale-x-100"
                      />
                    </span>
                    <span
                      aria-hidden
                      className="text-champagne transition-transform duration-500 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>

                  {/* Inline image — mobile + reduced-motion desktop only */}
                  <div className="aud-inline-img mt-8">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                      <div className="absolute inset-0 scale-105 transition-transform duration-700 group-hover:scale-100">
                        <FestiveImage image={a.image} sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Sticky image panel — desktop JS-gated */}
          <div className="aud-sticky relative">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card">
                {audiences.map((a, i) => (
                  <div
                    key={a.title}
                    data-aud-img
                    className="absolute inset-0 will-change-transform"
                  >
                    <div className="absolute inset-0">
                      <FestiveImage image={a.image} sizes="(max-width: 1440px) 42vw, 38vw" />
                    </div>
                    {/* Veil + caption travel with the image */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-night/55 via-night/5 to-transparent"
                    />
                    <div className="absolute bottom-6 left-6">
                      <p className="text-label text-ivory/70">
                        Audience 0{i + 1}
                      </p>
                      <p className="mt-2 font-display text-2xl italic text-ivory">
                        {a.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}