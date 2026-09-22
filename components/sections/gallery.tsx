"use client";

import Link from "next/link";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { galleryProjects } from "@/lib/gallery";
import { FestiveImage } from "@/components/ui/festive-image";
import { cn } from "@/lib/utils";

/**
 * Portfolio preview (homepage) — editorial project presentations (brief §06):
 * large alternating image rows with project number, type and location.
 * Imagery is placeholder until client photos arrive.
 */
export function GallerySection() {
  const featured = galleryProjects.slice(0, 4);

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
              description="A selection of festive schemes — villas, homes, offices and commercial settings. Each project is designed around its space."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Button variant="outline-light" size="lg" href="/gallery" className="shrink-0">
              View All Projects
            </Button>
          </ScrollReveal>
        </div>

        {/* Editorial presentations */}
        <div className="mt-16 flex flex-col gap-24 lg:gap-32">
          {featured.map((project, i) => {
            const reverse = i % 2 === 1;
            const size = i === 0 ? "aspect-[16/10]" : "aspect-[4/3] lg:aspect-[16/11]";
            return (
              <ScrollReveal key={project.id} y={36}>
                <article className="group grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
                  {/* Image */}
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl shadow-card",
                      size,
                      reverse && "lg:order-2"
                    )}
                  >
                    <div className="absolute inset-0 scale-[1.02] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]">
                      <FestiveImage
                        image={project.image}
                        sizes="(max-width: 1024px) 100vw, 52vw"
                      />
                    </div>
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-95"
                    />
                    {/* Big number */}
                    <span
                      aria-hidden
                      className="absolute right-6 top-5 font-display text-5xl leading-none text-ivory/35 lg:text-6xl"
                    >
                      0{i + 1}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className={cn(reverse && "lg:order-1")}>
                    <p className="flex items-center gap-3 text-label text-champagne">
                      <span aria-hidden className="h-px w-10 bg-champagne/60" />
                      {project.category}
                    </p>
                    <h3 className="mt-5 font-display text-3xl leading-tight text-ivory lg:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ivory/60">
                      {project.year} — a seasonal scheme composed around its
                      space, from statement tree to final styling detail.
                    </p>
                    <Link
                      href="/gallery"
                      className="mt-8 inline-flex items-center gap-3 text-label text-ivory transition-colors duration-500 hover:text-champagne"
                    >
                      View case
                      <span
                        aria-hidden
                        className="text-champagne transition-transform duration-500 group-hover:translate-x-1.5"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}