import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { PageBreadcrumbSchema } from "@/components/seo/page-breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { whatsappLink, siteConfig, dubaiCommunities } from "@/lib/site";
import { images } from "@/lib/images";
import { FaWhatsapp, FaArrowRight, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { PackagesSection } from "@/components/sections/packages";

export const metadata: Metadata = {
  title: "Areas We Serve in Dubai & UAE — Christmas Decoration by Community",
  description:
    "We provide Christmas decorations in Palm Jumeirah, Tilal Al Ghaf, Al Barari, DAMAC Hills, Al Furjan, Arabian Ranches, Dubai Hills Estate, Jumeirah Lakes, JVC, Mudon, Jumeirah Islands, Jumeirah Golf Estates, The Springs, The Meadows, and all across Dubai.",
  alternates: { canonical: "/areas-we-serve" },
  keywords: [
    "Christmas decoration Palm Jumeirah",
    "Christmas decoration Dubai Hills Estate",
    "Christmas decorators Arabian Ranches",
    "Christmas decoration Tilal Al Ghaf",
    "Christmas villa decoration Al Barari",
    "Christmas decorators DAMAC Hills",
    "Christmas decoration Al Furjan",
    "Christmas decoration Jumeirah Golf Estates",
    "Christmas decoration Jumeirah Islands",
    "Christmas decoration The Springs Dubai",
    "Christmas decoration The Meadows Dubai",
    "Christmas decorators JVC",
    "Christmas decorators Mudon",
    "Christmas decoration Jumeirah Lakes Towers",
    "Christmas decorators near me Dubai",
    "Christmas decoration Dubai coverage",
    "Christmas decorators Sharjah",
    "Christmas decoration service areas UAE",
  ],
  openGraph: {
    title: "Areas We Serve in Dubai & UAE | Festive Occasions",
    description:
      "Christmas decorations in Palm Jumeirah, Dubai Hills Estate, Arabian Ranches, Al Barari, DAMAC Hills, Tilal Al Ghaf, and all across Dubai.",
    url: "/areas-we-serve",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}${images.pageAreas.src}`,
        alt: images.pageAreas.alt,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Areas We Serve in Dubai & UAE | Festive Occasions",
    description:
      "Christmas decorations in Palm Jumeirah, Dubai Hills Estate, Arabian Ranches, Al Barari, DAMAC Hills, Tilal Al Ghaf, and all across Dubai.",
    images: [`${siteConfig.url}${images.pageAreas.src}`],
  },
};

const communityDetails = [
  {
    name: "Palm Jumeirah",
    type: "Luxury Beachfront Villas & Apartments",
    description: "Grand Christmas trees, beachfront villa garden lighting, and opulent interior holiday styling.",
  },
  {
    name: "Dubai Hills Estate",
    type: "Contemporary Villas & Townhouses",
    description: "Modern luxury Christmas installations, soaring tree styling, and foyer garland decorations.",
  },
  {
    name: "Arabian Ranches 1, 2 & 3",
    type: "Family Villas & Private Estates",
    description: "Warm holiday hearths, staircase garland draping, outdoor roofline lighting, and festive trees.",
  },
  {
    name: "Al Barari",
    type: "Eco-Luxury Botanical Villas",
    description: "Lush botanical Christmas garlands, organic pine accents, and cascading exterior tree lights.",
  },
  {
    name: "Tilal Al Ghaf",
    type: "Resort-Style Waterfront Villas",
    description: "Bespoke holiday illumination, entrance archways, illuminated deer displays, and grand trees.",
  },
  {
    name: "DAMAC Hills",
    type: "Golf Course Villas & Mansions",
    description: "Opulent crimson and gold theme trees, double-height entranceway styling, and garden decor.",
  },
  {
    name: "Jumeirah Golf Estates",
    type: "Prestigious Fairway Residences",
    description: "Elegant holiday dining table dressing, grand fireplace garlands, and patio illumination.",
  },
  {
    name: "Jumeirah Islands",
    type: "Waterfront Island Mansions",
    description: "Architectural Christmas light draping, grand foyer trees, and festive lakeside living styling.",
  },
  {
    name: "Al Furjan",
    type: "Contemporary Family Villas",
    description: "Charming family Christmas tree decoration, porch styling, and festive interior ambiance.",
  },
  {
    name: "Mudon",
    type: "Villas & Gated Community Homes",
    description: "Complete seasonal packages — indoor tree decorating, outdoor lights, and doorway wreaths.",
  },
  {
    name: "Jumeirah Village Circle (JVC)",
    type: "Townhouses & Luxury Apartments",
    description: "Festive living room transformations, statement trees, balcony lighting, and holiday touches.",
  },
  {
    name: "Jumeirah Lakes (JLT)",
    type: "Penthouses, Apartments & Offices",
    description: "High-rise holiday styling, corporate entrance displays, and festive office reception trees.",
  },
  {
    name: "The Springs",
    type: "Lakeside Family Villas",
    description: "Warm festive fireplaces, classic red and gold Christmas trees, and garden holiday accents.",
  },
  {
    name: "The Meadows",
    type: "Mature Greenery Villas",
    description: "Generous staircase garland installations, exterior lighting, and grand living room trees.",
  },
];

const coverage = [
  {
    title: "Dubai Prime Communities",
    copy: "Specialized teams operating daily across Palm Jumeirah, Dubai Hills Estate, Arabian Ranches, Al Barari, DAMAC Hills, Tilal Al Ghaf, Jumeirah Golf Estates, Jumeirah Islands, and all key Dubai residential developments.",
  },
  {
    title: "Sharjah & Northern Emirates",
    copy: "Our registered studio hub is located at Sharjah Publishing City Free Zone, serving premium residential and commercial installations across Sharjah and Ajman.",
  },
  {
    title: "Wider UAE & Abu Dhabi",
    copy: "Large-scale villa estates, hospitality venues, and corporate projects across Abu Dhabi, Ras Al Khaimah, and the UAE are serviced on dedicated advance scheduling.",
  },
];

function areasJsonLd(): Record<string, unknown> {
  const pageUrl = `${siteConfig.url}/areas-we-serve`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Christmas Decoration Services Across Dubai Communities",
        serviceType: "Christmas Decoration",
        description:
          "Professional Christmas decoration and installation across Palm Jumeirah, Tilal Al Ghaf, Al Barari, DAMAC Hills, Al Furjan, Arabian Ranches, Dubai Hills Estate, Jumeirah Lakes, JVC, Mudon, Jumeirah Islands, Jumeirah Golf Estates, The Springs, The Meadows, and all across Dubai.",
        url: pageUrl,
        provider: {
          "@type": "LocalBusiness",
          "@id": `${siteConfig.url}/#business`,
          name: siteConfig.name,
          url: siteConfig.url,
          telephone: siteConfig.phone,
          email: siteConfig.email,
        },
        areaServed: [
          { "@type": "City", name: "Dubai" },
          { "@type": "City", name: "Sharjah" },
          { "@type": "Country", name: "United Arab Emirates" },
          ...dubaiCommunities.map((area) => ({
            "@type": "AdministrativeArea",
            name: area,
          })),
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Which areas in Dubai do you provide Christmas decoration services in?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We provide Christmas decorations especially in Palm Jumeirah, Tilal Al Ghaf, Al Barari, DAMAC Hills, Al Furjan, Arabian Ranches 1, Dubai Hills Estate, Jumeirah Lakes, Jumeirah Village Circle (JVC), Mudon, Arabian Ranches 2, Arabian Ranches 3, Jumeirah Islands, Jumeirah Golf Estates, The Springs, The Meadows, and all over Dubai.",
            },
          },
          {
            "@type": "Question",
            name: "Do you offer villa Christmas tree and lighting installation in Dubai Hills and Palm Jumeirah?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, our team specializes in complete luxury villa Christmas transformations in Dubai Hills Estate and Palm Jumeirah, including interior tree styling, grand staircase garlands, and exterior architectural lights.",
            },
          },
          {
            "@type": "Question",
            name: "How do I book Christmas decorations for my home in Arabian Ranches or DAMAC Hills?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can book directly via WhatsApp or our contact form. Simply share your community name and requirements, and our team will provide a tailored concept, date confirmation, and free quote.",
            },
          },
        ],
      },
    ],
  };
}

export default function AreasWeServePage() {
  return (
    <PageShell>
      <PageBreadcrumbSchema name="Areas We Serve" path="/areas-we-serve" />
      <JsonLd data={areasJsonLd()} />
      <PageHero
        eyebrow="Coverage"
        title="Serving Dubai communities & the UAE."
        lead="We design, install and remove luxury Christmas decorations across Dubai's most prestigious communities and estates."
        image="pageAreas"
      />

      {/* Client Headline Announcement Banner */}
      <section className="border-b hairline bg-[#121c16] py-10 text-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-champagne/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-champagne">
              <FaMapMarkerAlt className="h-3 w-3" />
              Dubai Coverage
            </span>
            <p className="mt-5 font-serif text-xl sm:text-2xl leading-relaxed text-ivory">
              &ldquo;We provide Christmas decorations, especially in{" "}
              <strong className="text-champagne font-semibold">Palm Jumeirah</strong>,{" "}
              <strong className="text-champagne font-semibold">Tilal Al Ghaf</strong>,{" "}
              <strong className="text-champagne font-semibold">Al Barari</strong>,{" "}
              <strong className="text-champagne font-semibold">DAMAC Hills</strong>,{" "}
              <strong className="text-champagne font-semibold">Al Furjan</strong>,{" "}
              <strong className="text-champagne font-semibold">Arabian Ranches 1, 2 &amp; 3</strong>,{" "}
              <strong className="text-champagne font-semibold">Dubai Hills Estate</strong>,{" "}
              <strong className="text-champagne font-semibold">Jumeirah Lakes</strong>,{" "}
              <strong className="text-champagne font-semibold">Jumeirah Village Circle</strong>,{" "}
              <strong className="text-champagne font-semibold">Mudon</strong>,{" "}
              <strong className="text-champagne font-semibold">Jumeirah Islands</strong>,{" "}
              <strong className="text-champagne font-semibold">Jumeirah Golf Estates</strong>,{" "}
              <strong className="text-champagne font-semibold">The Springs</strong>, and{" "}
              <strong className="text-champagne font-semibold">The Meadows</strong>, and all over Dubai.&rdquo;
            </p>
            <p className="mt-4 font-display text-lg text-champagne">
              Book your decoration today and make this Christmas truly magical!
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button
                variant="whatsapp"
                size="lg"
                href={whatsappLink(
                  "Hi Festive Occasions, I would like to book Christmas decoration for my property in Dubai."
                )}
                external
              >
                <FaWhatsapp className="h-4 w-4" aria-hidden />
                Book Your Area Today
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Prime Dubai Communities Grid */}
      <Section id="dubai-communities">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Key Communities"
              title="Where we style & decorate in Dubai."
              description="Each community has its own architectural character. We tailor our festive schemes to complement your home's unique layout, light and aesthetic."
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {communityDetails.map((community, i) => (
              <ScrollReveal key={community.name} delay={(i % 3) * 0.08}>
                <div className="group relative flex h-full flex-col justify-between rounded-xl border hairline bg-white p-6 shadow-xs transition-all duration-300 hover:border-champagne hover:shadow-soft">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold text-espresso group-hover:text-champagne-deep transition-colors">
                        {community.name}
                      </h3>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-champagne/15 text-xs font-bold text-champagne-deep">
                        <FaCheckCircle className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-champagne-deep">
                      {community.type}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-cocoa">
                      {community.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t hairline flex items-center justify-between">
                    <span className="text-xs font-medium text-cocoa/80">
                      Full Installation &amp; Removal
                    </span>
                    <Link
                      href={whatsappLink(`Hi Festive Occasions, I am looking for Christmas decoration in ${community.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-champagne-deep transition-colors hover:text-espresso"
                    >
                      Enquire
                      <FaArrowRight className="h-2.5 w-2.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Regional Emirates Coverage */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Emirates Coverage"
                title="City & regional coverage."
                description="We operate throughout the UAE with full logistical coordination for delivery, installation, and post-holiday takedown."
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col">
                {coverage.map((c, i) => (
                  <div
                    key={c.title}
                    className="border-b hairline py-7 first:pt-0"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-label text-champagne-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl text-espresso">
                          {c.title}
                        </h3>
                        <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-cocoa">
                          {c.copy}
                        </p>
                        {c.title === "Wider UAE & Abu Dhabi" && (
                          <Link
                            href="/christmas-decoration-uae"
                            className="mt-3 inline-flex items-center gap-2 text-label text-champagne-deep transition-colors hover:text-espresso"
                          >
                            Nationwide projects
                            <FaArrowRight aria-hidden className="h-[0.85em] w-[0.85em]" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Community FAQ Section for Rich Search Snippets */}
      <Section>
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Community decoration questions."
              description="Everything you need to know about booking Christmas decorations in your Dubai area."
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border hairline bg-white p-6 shadow-xs">
              <h4 className="font-display text-lg font-semibold text-espresso">
                Do you cover gated communities?
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">
                Yes. Our crew regularly works with security, gate passes, and community permits across Arabian Ranches, Dubai Hills, Palm Jumeirah, Damac Hills, and Jumeirah Golf Estates for seamless access.
              </p>
            </div>
            <div className="rounded-xl border hairline bg-white p-6 shadow-xs">
              <h4 className="font-display text-lg font-semibold text-espresso">
                When should we book our installation?
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">
                Prime dates in late November and early December book out quickly. We recommend reserving your preferred installation slot 2–3 weeks in advance.
              </p>
            </div>
            <div className="rounded-xl border hairline bg-white p-6 shadow-xs">
              <h4 className="font-display text-lg font-semibold text-espresso">
                Is takedown &amp; removal included?
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">
                Yes. Every project includes scheduled post-holiday takedown, careful packaging, and clean removal in January at a time that suits your family or business.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section tone="cream">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col items-start justify-between gap-6 border-y hairline py-10 lg:flex-row lg:items-center lg:gap-16">
              <div>
                <h3 className="font-display text-2xl text-espresso">
                  Not sure if we cover your area?
                </h3>
                <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-cocoa">
                  Just ask — share your community or building address and we
                  will confirm coverage and availability for your dates. No
                  pressure, clear answer.
                </p>
              </div>
              <Button
                variant="whatsapp"
                size="lg"
                href={whatsappLink(
                  "Hi Festive Occasions, do you cover my area in Dubai for Christmas decoration?"
                )}
                external
              >
                <FaWhatsapp className="h-4 w-4" aria-hidden />
                Ask About Your Area
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
      <PackagesSection linkToPage cards />
    </PageShell>
  );
}