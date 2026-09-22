"use client";

import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { FestiveImage } from "@/components/ui/festive-image";

export function Intro() {
  return (
    <Section id="introduction">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* Copy */}
          <div className="flex flex-col justify-center gap-8">
            <ScrollReveal>
              <SectionHeading
                eyebrow="The Studio"
                title={
                  <>
                    Christmas decoration, designed around <em className="text-champagne not-italic font-display">your space</em>.
                  </>
                }
              />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="max-w-xl text-lead text-cocoa">
                Festive Occasions is a premium decoration studio in Dubai. We
                design, style and install complete Christmas transformations —
                not off-the-shelf décor, but considered schemes composed around
                the architecture, light and character of every property we work
                with.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <ul className="grid max-w-xl grid-cols-2 gap-4">
                {[
                  "Homes & villas",
                  "Offices & lobbies",
                  "Hotels & hospitality",
                  "Restaurants & cafés",
                  "Retail & commercial",
                  "Outdoor & lighting",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b hairline pb-4 text-[0.9rem] font-medium text-espresso"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-champagne" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <Button variant="dark" href="/#services">
                  Explore Services
                </Button>
                <Button variant="outline" href="/gallery">
                  View Gallery
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* Media */}
          <ScrollReveal y={24} className="relative">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-card">
                <FestiveImage image="clientIntro" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              {/* Offset champagne frame */}
              <div
                aria-hidden
                className="absolute -bottom-5 -left-5 hidden h-full w-full rounded-lg border border-champagne/40 lg:block"
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}