"use client";

import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { christmasPackages, formatPrice } from "@/lib/packages";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Packages — the Christmas collection (price-anchored, honest copy).
 * Editorial hairline rows (no boxed cards); each package carries its scale
 * (tree size), inclusions, "from" price + VAT and a WhatsApp enquiry CTA
 * prefilled with the package name. Bespoke row closes the collection.
 */
export function PackagesSection({
  id = "packages",
  compact = false,
}: {
  id?: string;
  /** Compact intro heading for inner pages. */
  compact?: boolean;
}) {
  return (
    <Section id={id}>
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <ScrollReveal>
            <SectionHeading
              eyebrow="The Collection"
              title={
                <>
                  A package for <em className="text-champagne not-italic">your space.</em>
                </>
              }
              description="Fixed collections with considered styling, from a single signature tree to a complete seasonal setting. Custom colour themes and larger installations are quoted on request."
            />
          </ScrollReveal>
          {!compact && (
            <ScrollReveal delay={0.1}>
              <p className="text-label text-cocoa">
                From AED 6,000 + VAT
              </p>
            </ScrollReveal>
          )}
        </div>

        {/* Package rows */}
        <div className="mt-16">
          <ScrollReveal>
            <div className="border-t hairline">
              {christmasPackages.map((pkg, i) => (
                <article
                  key={pkg.id}
                  className={cn(
                    "grid gap-8 border-b hairline py-10 lg:grid-cols-[1.1fr_1.4fr_auto] lg:items-start lg:gap-14",
                    i % 2 === 1 && "lg:grid-cols-[1.4fr_1.1fr_auto] lg:*:order-none"
                  )}
                >
                  {/* Identity */}
                  <div>
                    <p className="flex items-center gap-3 text-label text-champagne">
                      <span aria-hidden className="h-px w-8 bg-champagne/60" />
                      {String(i + 1).padStart(2, "0")} · {pkg.tree}
                    </p>
                    <h3 className="mt-4 font-display text-3xl leading-tight text-espresso lg:text-4xl">
                      {pkg.name}
                    </h3>
                    <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-cocoa">
                      {pkg.blurb}
                    </p>
                    {pkg.featured && (
                      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-champagne/50 px-4 py-1.5 text-label text-champagne">
                        Most requested
                      </p>
                    )}
                  </div>

                  {/* Inclusions */}
                  <ul className="grid max-w-xl gap-2.5">
                    {pkg.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-espresso"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div className="flex flex-col items-start gap-5 lg:items-end lg:pt-1">
                    <p className="text-right">
                      <span className="block font-display text-4xl italic text-espresso lg:text-5xl">
                        {formatPrice(pkg.fromPrice)}
                      </span>
                      <span className="text-label text-cocoa">
                        AED · from · excl. VAT
                      </span>
                    </p>
                    <Button
                      variant={pkg.featured ? "primary" : "whatsapp"}
                      size="md"
                      href={whatsappLink(
                        `Hi Festive Occasions, I'd like to enquire about the ${pkg.name} package (from AED ${formatPrice(pkg.fromPrice)} + VAT). Could you help me plan it for my space?`
                      )}
                      external
                    >
                      <FaWhatsapp className="h-4 w-4" aria-hidden />
                      Enquire
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </ScrollReveal>

          {/* Bespoke row */}
          <ScrollReveal>
            <div className="flex flex-col gap-6 border-b hairline py-10 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-display text-2xl italic text-espresso">
                  A Christmas that feels like you.
                </h3>
                <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-cocoa">
                  A particular colour palette, an entrance with presence, a
                  complete festive setting — bespoke concepts are designed
                  around your space, style and budget.
                </p>
              </div>
              <Button
                variant="outline"
                size="md"
                href={whatsappLink(
                  "Hi Festive Occasions, I'd like a bespoke Christmas installation. Can we discuss my space, style and budget?"
                )}
                external
              >
                Discuss a bespoke design
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p className="mt-6 text-sm text-cocoa/70">
              Prices exclude VAT. Custom colour themes, add-ons and larger
              installations are quoted on request — final quote depends on
              your space, scale and styling direction.
            </p>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}