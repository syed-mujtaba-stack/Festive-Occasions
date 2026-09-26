"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/animations/registry";
import { prefersReducedMotion, whenNearViewport } from "@/lib/motion";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { services } from "@/lib/services";
import { FestiveImage } from "@/components/ui/festive-image";
import { FaArrowRight } from "react-icons/fa";

/**
 * Services — cinematic pinned storytelling (brief §04).
 
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

      let stopProximity: (() => void) | null = null;

      // Pinned stage sits thousands of pixels below the fold — build the
      // pin + timeline as it approaches (positive margin), never at load.
      //
      // `gsap.context` passes itself as the callback's first argument (`self`),
      // and it must be used here: the inner callback can fire synchronously
      // (whenNearViewport's immediate rect check) before `ctx` is assigned,
      // which would otherwise throw "Cannot access 'ctx' before initialization".
      const ctx = gsap.context((self) => {
        stopProximity = whenNearViewport(
          el,
          () => {
            self.add(() => {
              const q = gsap.utils.selector(el);
              const stage = q("[data-svc-stage]")[0] as HTMLElement;
              const slides = gsap.utils.toArray<HTMLElement>("[data-svc-slide]", el);
              if (!stage || slides.length === 0) return;

              const N = slides.length;

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: stage,
                  start: "top top",
                  // 7 slides × a readable dwell each. At 100svh per screen
                  // this is ~6.6 screens of scroll for the whole sequence.
                  end: "+=560%",
                  // A little scrub smoothing stops the swap reading as a
                  // hard cut when the user flicks the wheel.
                  scrub: 1.2,
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
                  { autoAlpha: 1, scale: 1.35, duration: 0.5 / N },
                  inPos
                ).to(dot, { autoAlpha: 0.22, scale: 1, duration: 0.45 / N }, outPos - 0.45 / N);
              });

              /* Each slide owns a 1/N slice of the timeline as its DWELL
                 window, and the crossfade is placed entirely inside that
                 window. The previous code used fade = 0.55/N for the
                 transition but multiplied it by 1.7, giving
                 0.117 + 0.117 = 0.234 against a dwell of only 1/8 = 0.125 —
                 so slide N+1 began before slide N had finished arriving, and
                 a fast flick surfaced slide N+2. Transitions must always be
                 sized against the dwell, never larger. */
              const dwell = 1 / N;
              const fade = dwell * 0.34;   // ~0.043 — inside the window
              const zoom = dwell * 0.9;    // image settle, still inside

              slides.forEach((slide, i) => {
                const inPos = i * dwell;
                const outPos = (i + 1) * dwell;

                const img = slide.querySelector<HTMLElement>("[data-svc-zoom]");

                if (i === 0) {
                  gsap.set(slide, { autoAlpha: 1, y: 0 });
                } else {
                  gsap.set(slide, { autoAlpha: 0, y: 40 });
                }

                if (i > 0) {
                  tl.fromTo(
                    slide,
                    { autoAlpha: 0, y: 40 },
                    { autoAlpha: 1, y: 0, duration: fade, ease: "power2.out" },
                    inPos
                  );
                }
                tl.to(
                  slide,
                  { autoAlpha: 0, y: -40, duration: fade, ease: "power2.in" },
                  outPos - fade
                );

                if (img) {
                  tl.fromTo(
                    img,
                    { scale: 1.12 },
                    { scale: 1, duration: zoom, ease: "power2.out" },
                    i === 0 ? 0 : inPos
                  );
                }
              });
            });
          },
          700
        );
      }, scope);

      return () => {
        stopProximity?.();
        ctx.revert();
      };
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
                Seven ways to make it <em className="text-champagne-deep not-italic">unforgettable.</em>
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
                      <FaArrowRight className="h-[0.9em] w-[0.9em]" />
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
                      <FaArrowRight className="h-[0.9em] w-[0.9em]" />
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
