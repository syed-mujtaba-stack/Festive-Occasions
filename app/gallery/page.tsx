import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
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
    <>
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
            <div className="flex flex-col items-start justify-between gap-6 rounded-lg border hairline bg-white/60 p-8 lg:flex-row lg:items-center">
              <div>
                <h3 className="font-display text-2xl text-espresso">
                  A note on this gallery
                </h3>
                <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-cocoa">
                  The images above are curated festive imagery used to
                  demonstrate our editorial treatment. Once your project photos
                  are ready, this gallery is replaced with your real completed
                  work — each scheme documented and verified.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      <FAQ />
      <FinalCTA />
    </>
  );
}