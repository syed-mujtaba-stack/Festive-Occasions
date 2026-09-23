"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/animations/registry";
import { prefersReducedMotion } from "@/lib/motion";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { services } from "@/lib/services";
import { FestiveImage } from "@/components/ui/festive-image";

/**
 * Services — cinematic pinned storytelling (brief §04).
 *
 * Desktop (lg+): a pinned stage steps through every service on scroll —
 * number, typography, description and image crossfade with a progress rail.
 * Mobile + reduced-motion: a clean editorial list (no pin, fully static).
 */
export function ServicesSection() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        // The motion-reduce:lg:block fallback list is shown via CSS.
        return;
      }
      const el = scope.current;
      if (!el) return;

      const q = gsap.utils.selector(el);
      const stage = q("[data-svc-stage]")[0] as HTMLElement;
      const slides = gsap.utils.toArray<HTMLElement>("[data-svc-slide]", el);
      if (!stage || slides.length === 0) return;

      const N = slides.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=380%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      // Vertical progress rail
      tl.fromTo(
        q("[data-svc-rail]")[0],
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: "none" },
        0
      );

      // Step dots
      const dots = gsap.utils.toArray<HTMLElement>("[data-svc-dot]", el);
      dots.forEach((dot, i) => {
        const inPos = i / N;
        const outPos = (i + 1) / N;
        tl.fromTo(
          dot,
          { autoAlpha: 0.22, scale: 1 },
          { autoAlpha: 1, scale: 1.35, duration: 0.35 / N },
          inPos
        ).to(dot, { autoAlpha: 0.22, scale: 1, duration: 0.3 / N }, outPos - 0.3 / N);
      });

      slides.forEach((slide, i) => {
        const inPos = i / N;
        const outPos = (i + 1) / N;
        const fade = 0.55 / N;

        const img = slide.querySelector<HTMLElement>("[data-svc-zoom]");

        if (i === 0) {
          gsap.set(slide, { autoAlpha: 1, y: 0 });
        } else {
          gsap.set(slide, { autoAlpha: 0, y: 56 });
        }

        if (i > 0) {
          tl.fromTo(
            slide,
            { autoAlpha: 0, y: 64 },
            { autoAlpha: 1, y: 0, duration: fade * 1.7, ease: "power2.out" },
            inPos
          );
        }
        tl.to(
          slide,
          { autoAlpha: 0, y: -64, duration: fade * 1.7, ease: "power2.in" },
          outPos - fade * 1.7
        );

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.18 },
            { scale: 1, duration: fade * 2.6, ease: "power2.out" },
            i === 0 ? 0 : inPos
          );
        }
      });
    },
    { scope }
  );

  return (
    <Section id="services" tone="cream">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="What We Do"
            title={
              <>
                Eight ways to make it <em className="text-champagne-deep not-italic">unforgettable.</em>
              </>
            }
            description="Every service can be delivered on its own or composed into a single, cohesive Christmas transformation."
          />
        </ScrollReveal>
      </Container>

      <div ref={scope}>
        {/* ——— Desktop pinned showcase (JS-gated; reduced motion → list) ——— */}
        <div className="svc-pinned">
          <div data-svc-stage className="relative h-[100svh] overflow-hidden">
            {/* Progress rail */}
            <div aria-hidden className="absolute left-[3vw] top-0 h-full w-px bg-espresso/10">
              <div
                data-svc-rail
                className="h-full w-full origin-top scale-y-0 bg-champagne"
              />
            </div>

            {/* Slides */}
            {services.map((service) => (
              <div
                key={service.id}
                data-svc-slide
                className="absolute inset-0 grid items-center gap-x-16 pl-[6vw] pr-[7vw] lg:grid-cols-[0.92fr_1.08fr]"
              >
                {/* Left: copy */}
                <div data-svc-text className="max-w-xl">
                  <p className="flex items-baseline gap-4 text-label text-champagne-deep">
                    <span className="font-display text-6xl leading-none tracking-normal text-espresso/15">
                      {service.number}
                    </span>
                    <span>{service.section}</span>
                  </p>
                  <h3 className="mt-6 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] leading-[1.02] tracking-[-0.015em] text-espresso">
                    {service.title}{" "}
                    <em className="italic text-cocoa">{service.subtitle}</em>
                  </h3>
                  <p className="mt-6 max-w-md text-lead text-cocoa">
                    {service.description}
                  </p>
                  <ul className="mt-8 flex max-w-md flex-wrap gap-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border hairline px-4 py-1.5 text-xs text-cocoa"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="group mt-10 inline-flex items-center gap-3 text-label text-espresso"
                  >
                    <span className="relative">
                      Explore this service
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
                  </Link>
                </div>

                {/* Right: image */}
                <div className="relative">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-14 -top-16 font-display text-[11rem] leading-none text-espresso/[0.06]"
                  >
                    {service.number}
                  </div>
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-card">
                    <div data-svc-zoom className="absolute inset-0 will-change-transform">
                      <FestiveImage
                        image={service.image}
                        sizes="(max-width: 1440px) 44vw, 40vw"
                        priority={service.id === "christmas-decoration"}
                      />
                    </div>
                    {/* Veil */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-night/25 via-transparent to-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Step dots */}
            <div
              aria-hidden
              className="absolute right-[3vw] top-1/2 flex -translate-y-1/2 flex-col gap-3"
            >
              {services.map((service) => (
                <span
                  key={service.id}
                  data-svc-dot
                  className="block h-1.5 w-1.5 rounded-full bg-espresso/40"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ——— Mobile / reduced-motion editorial list ——— */}
        <Container className="svc-list mt-16">
          <div className="grid gap-10">
            {services.map((service, i) => (
              <ScrollReveal key={service.id} y={26} delay={i * 0.03}>
                <Link
                  href={service.href}
                  className="group flex flex-col gap-5 border-t hairline pt-8"
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <span className="text-label text-champagne-deep">
                      {service.number} — {service.section}
                    </span>
                    <span
                      aria-hidden
                      className="text-xl text-warm-gray transition-all duration-500 group-hover:translate-x-1 group-hover:text-champagne"
                    >
                      →
                    </span>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-[1fr_0.85fr] sm:items-center">
                    <div>
                      <h3 className="font-display text-3xl leading-tight text-espresso">
                        {service.title}{" "}
                        <em className="italic text-cocoa">{service.subtitle}</em>
                      </h3>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-cocoa">
                        {service.description}
                      </p>
                    </div>
                    <div className="relative aspect-[16/11] overflow-hidden rounded-xl">
                      <div className="absolute inset-0 scale-105 transition-transform duration-700 group-hover:scale-100">
                        <FestiveImage image={service.image} sizes="480px" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}