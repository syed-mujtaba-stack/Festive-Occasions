"use client";

import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { FestiveImage } from "@/components/ui/festive-image";
import type { ImageKey } from "@/lib/images";
import { FaWhatsapp } from "react-icons/fa";
import { christmasPackages, formatPrice } from "@/lib/packages";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Package card visuals — atmospheric scene images matched to each package. */
const packageCardImages: Record<string, ImageKey> = {
  cheers: "pkgCheers",
  fancy: "pkgFancy",
  luxury: "pkgLuxury",
};

/**
 * Packages — the Christmas collection (price-anchored, honest copy).
 * Editorial hairline rows (no boxed cards); each package carries its scale
 * (tree size), inclusions, "from" price + VAT and a WhatsApp enquiry CTA
 * prefilled with the package name. Bespoke row closes the collection.
 * `cards` renders the same packages as visual image cards (homepage use).
 */
export function PackagesSection({
  id = "packages",
  compact = false,
  linkToPage = false,
  cards = false,
}: {
  id?: string;
  /** Compact intro heading for inner pages. */
  compact?: boolean;
  /** Add an internal link to the /packages page (homepage usage). */
  linkToPage?: boolean;
  /** Render as visual package cards instead of editorial rows. */
  cards?: boolean;
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
                  A package for <em className="text-champagne-deep not-italic">your space.</em>
                </>
              }
              description="Fixed collections with considered styling, from a single signature tree to a complete seasonal setting. Custom colour themes and larger installations are quoted on request."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col items-start gap-3 md:items-end">
              {!compact && (
                <p className="text-label text-cocoa">From AED 6,000 + VAT</p>
              )}
              {linkToPage && (
                <Button variant="outline" size="md" href="/packages">
                  Compare all packages
                </Button>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Packages — visual cards (homepage) or editorial rows (packages page) */}
        {cards ? (
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {christmasPackages.map((pkg, i) => (
              <ScrollReveal key={pkg.id} delay={i * 0.08}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-lg border hairline bg-background shadow-soft transition-all duration-500 hover:shadow-card",
                    pkg.featured && "border-champagne/60"
                  )}
                >
                  {/* Card image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <FestiveImage
                      image={packageCardImages[pkg.id]}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />

                    {pkg.featured && (
                      <p className="absolute right-4 top-4 rounded-full border border-champagne/50 bg-night/80 px-3 py-1 text-label text-champagne backdrop-blur-sm">
                        Most requested
                      </p>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-3xl text-espresso">{pkg.name}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-cocoa">
                      {pkg.blurb}
                    </p>
                    <ul className="mt-5 flex-1 space-y-2">
                      {pkg.items.slice(0, 4).map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-relaxed text-espresso"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-end justify-between gap-4 border-t hairline pt-5">
                      <p>
                        <span className="block font-display text-3xl italic text-espresso">
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
                          `Hi Festive Occasions, I'd like to enquire about the ${pkg.name} (from AED ${formatPrice(pkg.fromPrice)} + VAT). Could you help me plan it for my space?`
                        )}
                        external
                      >
                        <FaWhatsapp className="h-4 w-4" aria-hidden />
                        Enquire
                      </Button>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        ) : (
        <div className="mt-16">
          <ScrollReveal>
            <div className="border-t hairline">
              {christmasPackages.map((pkg, i) => (
                <article
                  key={pkg.id}
                  className="grid gap-8 border-b hairline py-10 lg:grid-cols-[1.1fr_1.4fr_auto] lg:items-start lg:gap-14"
                >
                  {/* Identity */}
                  <div>
                    <p className="flex items-center gap-3 text-label text-champagne-deep">
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
                      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-champagne/50 px-4 py-1.5 text-label text-champagne-deep">
                        Most requested
                      </p>
                    )}
                  </div>

                  {/* Inclusions — pt-8 aligns the first item with the h3 package name (eyebrow + mt-4 gap ≈ 2rem) */}
                  <ul className="grid max-w-xl gap-2.5 lg:pt-8">
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

                  {/* Price + CTA — pt-8 aligns with the h3 package name */}
                  <div className="flex flex-col items-start gap-5 lg:items-end lg:pt-8">
                    <p className="text-right">
                      <span className="block font-display text-3xl italic text-espresso md:text-5xl">
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
                        `Hi Festive Occasions, I'd like to enquire about the ${pkg.name} (from AED ${formatPrice(pkg.fromPrice)} + VAT). Could you help me plan it for my space?`
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

          {/* Custom Package row — perfectly aligned with the packages grid above */}
          <ScrollReveal>
            <article className="grid gap-8 border-b hairline py-10 lg:grid-cols-[1.1fr_1.4fr_auto] lg:items-start lg:gap-14">
              {/* Identity */}
              <div>
                <p className="flex items-center gap-3 text-label text-champagne-deep">
                  <span aria-hidden className="h-px w-8 bg-champagne/60" />
                  04 · Bespoke
                </p>
                <h3 className="mt-4 font-display text-3xl leading-tight text-espresso lg:text-4xl">
                  Custom Package
                </h3>
                <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-cocoa">
                  Bespoke festive styling shaped around your space, architecture, tree scale and design direction.
                </p>
              </div>

              {/* Inclusions — pt-8 aligns with h3 Custom Package name */}
              <ul className="grid max-w-xl gap-2.5 lg:pt-8">
                <li className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-espresso">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne" aria-hidden />
                  Full villa, penthouse or commercial scheme
                </li>
                <li className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-espresso">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne" aria-hidden />
                  Custom tree heights (up to 15+ ft) & bespoke colour palette
                </li>
              </ul>

              {/* WhatsApp CTA — pt-8 aligns with h3 Custom Package name */}
              <div className="flex flex-col items-start gap-5 lg:items-end lg:pt-8">
                <p className="text-right">
                  <span className="block font-display text-3xl italic text-espresso md:text-5xl">
                    Bespoke
                  </span>
                  <span className="text-label text-cocoa">
                    Quoted on request
                  </span>
                </p>
                <Button
                  variant="whatsapp"
                  size="md"
                  href={whatsappLink(
                    "Hi Festive Occasions, I'd like a custom Christmas decoration package. Can we discuss my space, style and budget?"
                  )}
                  external
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden />
                  Enquire
                </Button>
              </div>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p className="mt-6 text-sm text-cocoa">
              Prices exclude VAT. Custom colour themes, add-ons and larger
              installations are quoted on request — final quote depends on
              your space, scale and styling direction.
            </p>
          </ScrollReveal>
        </div>
        )}
      </Container>
    </Section>
  );
}