"use client";

import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { PremiumPlaceholder } from "@/components/placeholder/premium-visual";

/** Homes & villas · Corporate & commercial · Hospitality — audience pillars. */
const audiences = [
  {
    title: "Homes & Villas",
    copy: "Living rooms, entrances, staircases and gardens — polished, warm and unmistakably festive.",
    seed: "audience-homes",
    theme: "burgundy" as const,
  },
  {
    title: "Corporate & Commercial",
    copy: "Lobbies, offices and branded installations that impress clients and lift the whole team.",
    seed: "audience-corporate",
    theme: "evergreen" as const,
  },
  {
    title: "Hospitality & Retail",
    copy: "Hotels, restaurants, cafés and retail spaces — Instagrammable festive moments your guests remember.",
    seed: "audience-hospitality",
    theme: "champagne" as const,
  },
];

export function Audiences() {
  return (
    <Section id="who-we-decorate-for">
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

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {audiences.map((a, i) => (
            <ScrollReveal key={a.title} y={30} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-cream">
                <div className="aspect-[4/3] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]">
                    <PremiumPlaceholder
                      seed={a.seed}
                      theme={a.theme}
                      variant="wide"
                      label={a.title}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <h3 className="font-display text-2xl text-espresso">
                    {a.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-cocoa">
                    {a.copy}
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    href="/christmas-decoration-dubai"
                    className="self-start"
                  >
                    Explore
                  </Button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}