import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Christmas Decoration Portfolio | Festive Occasions Dubai",
  description:
    "A selection of festive Christmas decoration schemes — villas, homes, offices and commercial settings styled around their space by Festive Occasions Dubai.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Christmas Decoration Portfolio | Festive Occasions",
    description:
      "Festive schemes for villas, homes, offices and commercial spaces — styled around their space.",
    url: "/gallery",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Portfolio"
        title="Festive transformations, by space."
        lead="A selection of schemes across villas, homes, offices and commercial settings — each designed around its architecture, light and character."
        image="livingroomTree"
      />

      <Section id="gallery">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="The Work"
              title="Every space, composed differently."
              description="Filter by space type to see the range — from a single signature tree to complete villa and office transformations."
            />
          </ScrollReveal>
          <GalleryGrid />
        </Container>
      </Section>

      {/* Trust line (honest, per spec 33-34) */}
      <Section tone="cream">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col gap-8 border-t hairline pt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
              <p className="font-display text-4xl italic leading-tight text-espresso lg:text-5xl">
                A note on
                <br />
                this gallery
              </p>
              <div className="max-w-2xl">
                <p className="text-[1.05rem] leading-relaxed text-cocoa">
                  The images above are curated festive imagery used to
                  demonstrate our editorial treatment — space, light and tone
                  composed the way we approach every project.
                </p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-cocoa/80">
                  Once your project photos are ready, this gallery is replaced
                  with your real completed work — each scheme documented and
                  verified by the studio.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      <FAQ />
      <FinalCTA />
    </PageShell>
  );
}