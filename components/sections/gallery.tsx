"use client";

import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { galleryProjects } from "@/lib/gallery";
import { GalleryCard } from "@/components/gallery/gallery-card";

/**
 * Portfolio / Gallery preview (homepage). Editorial masonry: mixed portrait
 * and landscape tiles. All imagery is placeholder until client photos arrive.
 */
export function GallerySection() {
  return (
    <Section id="gallery" tone="dark">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Portfolio"
            title={
              <>
                Recent transformations, <em className="text-champagne not-italic">by space.</em>
              </>
            }
            tone="dark"
            description="A selection of festive schemes — villas, homes, offices and commercial settings. Each project is designed around its space."
          />
        </ScrollReveal>

        <ScrollReveal y={30}>
          <div className="mt-16 grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galleryProjects.slice(0, 6).map((project, i) => (
              <div
                key={project.id}
                className={
                  i === 1 || i === 4
                    ? "lg:col-span-2 lg:row-span-1"
                    : i === 2
                      ? "lg:row-span-2"
                      : ""
                }
              >
                <div className="h-full">
                  <GalleryCard project={project} />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <Button variant="primary" size="lg" href="/gallery">
              View Full Gallery
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}