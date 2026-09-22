"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/animations/registry";
import { FestiveImage } from "@/components/ui/festive-image";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "@/lib/site";

/**
 * Homepage hero — cinematic GSAP timeline per spec.
 *  0.0 media scale 1.08 → 1.0
 *  0.2 overlay reveal
 *  0.4 eyebrow
 *  0.6 H1 line 1
 *  0.75 H1 line 2
 *  0.9 description
 *  1.1 CTA
 *  1.3 decorative detail
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const q = gsap.utils.selector(scope);
      const split = new SplitText(q("[data-split]"), {
        type: "lines,words",
        linesClass: "overflow-hidden",
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        q("[data-hero-media]"),
        { scale: 1.08 },
        { scale: 1, duration: 2.4, ease: "power2.out", delay: 0.0 }
      )
        .fromTo(
          q("[data-hero-overlay]"),
          { opacity: 0 },
          { opacity: 1, duration: 1.1, ease: "power2.out" },
          0.2
        )
        .fromTo(
          q("[data-hero-eyebrow]"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.4
        )
        // split lines: first line, then second
        .fromTo(
          split.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.15, stagger: 0.12 },
          0.55
        )
        .fromTo(
          q("[data-hero-lead]"),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.95
        )
        .fromTo(
          q("[data-hero-cta]"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          1.1
        )
        .fromTo(
          q("[data-hero-decor]"),
          { opacity: 0, scaleX: 0.4 },
          { opacity: 1, scaleX: 1, duration: 0.9, ease: "power3.inOut" },
          1.3
        );

      return () => split.revert();
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-night"
      aria-label="Introduction"
    >
      {/* Media */}
      <div className="absolute inset-0" data-hero-media>
        <FestiveImage
          image="hero"
          priority
          sizes="100vw"
          imgClassName="object-cover"
        />
      </div>

      {/* Overlay / veiling to keep text readable */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#171312] via-[#171312]/45 to-[#171312]/25"
        data-hero-overlay
      />

      {/* Content */}
      <div className="container-site relative z-10 pb-24 pt-40 sm:pb-28">
        <div data-hero-eyebrow className="mb-7 flex items-center gap-4">
          <span className="h-px w-12 bg-champagne" aria-hidden />
          <p className="text-label text-champagne">
            Festive Occasions · Christmas Decoration Dubai
          </p>
        </div>

        <h1 className="text-hero max-w-5xl text-ivory">
          <span data-split className="block">
            Christmas,
          </span>
          <span data-split className="block">
            reimagined.
          </span>
        </h1>

        <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
          <p data-hero-lead className="max-w-xl text-lead text-ivory/75">
            Bespoke Christmas decoration for homes, villas, offices and
            commercial spaces across Dubai — designed, styled and installed
            around your space.
          </p>

          <div data-hero-cta className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="lg" href="/#quote">
              Get a Free Quote
            </Button>
            <Button
              variant="whatsapp"
              size="lg"
              href={whatsappLink()}
              external
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden />
              WhatsApp Us
            </Button>
          </div>
        </div>

        {/* Decorative hairline */}
        <div
          data-hero-decor
          className="mt-12 flex items-center gap-4"
          aria-hidden
        >
          <span className="flex-1 border-t hairline-dark" />
          <span className="text-warm-gray text-sm italic">Dubai · UAE</span>
          <span className="flex-1 border-t hairline-dark" />
        </div>
      </div>
    </section>
  );
}