"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { galleryProjects } from "@/lib/gallery";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox";

/**
 * Portfolio preview (homepage) — editorial numbered grid.
 * Large photographic cards with a running index, minimal captions and an
 * "Explore Look ↗" CTA that opens the full-screen lightbox. Mirrors the
 * /gallery page so the set reads consistently; the full set lives there.
 */
export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const featured = galleryProjects.slice(0, 6);

  return (
    <Section id="gallery" tone="dark" className="overflow-hidden">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Portfolio"
              title={
                <>
                  Recent transformations, <em className="text-champagne not-italic">by space.</em>
                </>
              }
              tone="dark"
              description="A numbered set of festive looks — villas, homes, offices and commercial settings. Each scheme is designed around its space."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Button variant="outline-light" size="lg" href="/gallery" className="shrink-0">
              View All Looks
            </Button>
          </ScrollReveal>
        </div>

        {/* Editorial numbered grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <div key={project.id} className="h-full">
              <ScrollReveal y={28} delay={(i % 3) * 0.06}>
                <div className="h-full">
                  <GalleryCard
                    project={project}
                    index={i}
                    onSelect={(idx) => setLightbox(idx)}
                  />
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Full-screen editorial view */}
        {lightbox !== null && (
          <GalleryLightbox
            items={featured}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onNavigate={setLightbox}
          />
        )}
      </Container>
    </Section>
  );
}