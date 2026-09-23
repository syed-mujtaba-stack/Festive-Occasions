import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { PageBreadcrumbSchema } from "@/components/seo/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/final-cta";
import { FAQ } from "@/components/sections/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { whatsappLink, siteConfig } from "@/lib/site";
import { images } from "@/lib/images";
import type { FaqEntry } from "@/lib/faqs";
import { FaWhatsapp } from "react-icons/fa";

/**
 * Christmas Decoration UAE — nationwide coverage page (page-plan: /christmas-decoration-uae).
 * Distinct from the Dubai pillar: this is about nationwide logistics, coverage of
 * ALL seven Emirates + key communities/areas, and multi-location projects.
 * Honest: coverage confirmed on enquiry; no area is claimed that cannot be scheduled.
 * FAQs are this page's own — no overlap with home/pillar/service/blog FAQ sets.
 */
export const metadata: Metadata = {
  title: "Christmas Decoration UAE — All Emirates",
  description:
    "Christmas decorators across all seven Emirates — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain — plus every major community and area. Villas, hotels, offices and venues, planned from our Sharjah base. Confirm coverage for your area on enquiry.",
  alternates: { canonical: "/christmas-decoration-uae" },
  keywords: [
    "Christmas decoration UAE",
    "Christmas decorators UAE",
    "Christmas decoration Abu Dhabi",
    "Christmas decoration Sharjah",
    "Christmas decoration Ajman",
    "Christmas decoration Ras Al Khaimah",
    "Christmas decoration Fujairah",
    "Christmas decoration Umm Al Quwain",
    "Christmas decoration Palm Jumeirah",
    "Christmas decoration Al Ain",
    "Decorators across all Emirates",
  ],
  openGraph: {
    title: "Christmas Decoration UAE — All Emirates & Cities",
    description:
      "Nationwide Christmas decoration across all seven Emirates and every major area — planned from our Sharjah base, coverage confirmed on enquiry.",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}${images.pageUae.src}`,
        alt: images.pageUae.alt,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christmas Decoration UAE — All Emirates & Cities",
    description:
      "Nationwide Christmas decoration across all seven Emirates and every major area — planned from our Sharjah base, coverage confirmed on enquiry.",
    images: [`${siteConfig.url}${images.pageUae.src}`],
  },
};

const emirates = [
  {
    name: "Dubai",
    copy: "Homes, villas, offices and venues across the city — from Palm Jumeirah to Mirdif — coverage and dates confirmed on enquiry.",
  },
  {
    name: "Abu Dhabi",
    copy: "The capital and its surroundings — villas in Khalifa City, island residences on Saadiyat and Al Reem, plus Al Ain — scheduled on enquiry.",
  },
  {
    name: "Sharjah",
    copy: "Our registered base — projects are planned and dispatched from Sharjah Publishing City Free Zone, so local installations start on familiar ground.",
  },
  {
    name: "Ajman",
    copy: "Homes overlooking the corniche and communities like Al Zorah — handled on enquiry with the same planning as any other project.",
  },
  {
    name: "Ras Al Khaimah",
    copy: "Coastal and resort-facing residences around Al Marjan, Al Hamra and Mina Al Arab — scheduled on enquiry.",
  },
  {
    name: "Fujairah",
    copy: "East-coast properties from Fujairah City to Dibba and Al Aqah — travel and dates confirmed on enquiry.",
  },
  {
    name: "Umm Al Quwain",
    copy: "Projects across Umm Al Quwain City and its coastal communities — considered with confirmed logistics on enquiry.",
  },
];

const areas = [
  {
    group: "Dubai communities",
    items: [
      "Palm Jumeirah",
      "Jumeirah",
      "Emirates Hills",
      "Arabian Ranches",
      "Dubai Marina",
      "Downtown Dubai",
      "Business Bay",
      "Dubai Hills Estate",
      "Al Barari",
      "Mirdif",
      "Jumeirah Golf Estates",
      "Damac Hills",
    ],
  },
  {
    group: "Abu Dhabi areas",
    items: [
      "Saadiyat Island",
      "Yas Island",
      "Al Reem Island",
      "Al Raha Beach",
      "Khalifa City",
      "Al Ain",
    ],
  },
  {
    group: "Sharjah areas",
    items: [
      "Al Majaz",
      "Al Khan",
      "Sharjah Publishing City Free Zone",
      "Muwaileh",
    ],
  },
  {
    group: "Northern Emirates",
    items: [
      "Al Zorah (Ajman)",
      "Al Marjan Island (RAK)",
      "Al Hamra Village (RAK)",
      "Mina Al Arab (RAK)",
      "Dibba (Fujairah)",
      "Al Aqah (Fujairah)",
      "Umm Al Quwain City",
    ],
  },
];

const scope = [
  {
    title: "Villas & residences",
    copy: "Whole-property festive schemes for private homes — interior, entrance and outdoor lighting handled as one design.",
  },
  {
    title: "Hotels & venues",
    copy: "Lobbies, restaurants and event spaces dressed for the season, installed around your operating schedule.",
  },
  {
    title: "Offices & businesses",
    copy: "Reception and workspace styling that works with your working day — branded where the brief asks for it.",
  },
  {
    title: "Multi-location projects",
    copy: "One studio planning several properties on the same calendar — so every space is consistent and on time.",
  },
];

const uaeFaqs: FaqEntry[] = [
  {
    q: "Do you cover every city and area in the UAE?",
    a: "The client takes on projects across all seven Emirates — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain — and in communities from Palm Jumeirah to Al Ain. Tell us your exact location and dates and we will confirm coverage on enquiry.",
  },
  {
    q: "Can you install Christmas decoration in Abu Dhabi or other Emirates?",
    a: "Yes — we take on projects across the UAE. Tell us your location and dates and we will confirm coverage and scheduling on enquiry.",
  },
  {
    q: "How does scheduling work for projects outside Dubai?",
    a: "Every project is planned from our Sharjah base, so travel and installation dates are mapped together before anything is confirmed.",
  },
  {
    q: "Is travel included for projects outside Dubai?",
    a: "It depends on the location and scope of your project — we confirm the full picture, including any logistics, in your written quote.",
  },
  {
    q: "Can you decorate more than one property for us?",
    a: "Yes. Homes, offices and venues owned or managed by the same owner can be planned by a single studio with one coordinated schedule.",
  },
];

function uaeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteConfig.url}/christmas-decoration-uae#service`,
        serviceType: "Christmas Decoration (UAE-wide)",
        name: "Christmas Decoration UAE",
        description: metadata.description,
        provider: { "@id": `${siteConfig.url}/#business` },
        areaServed: [
          "UAE",
          "Dubai",
          "Abu Dhabi",
          "Sharjah",
          "Ajman",
          "Ras Al Khaimah",
          "Fujairah",
          "Umm Al Quwain",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}/christmas-decoration-uae#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Christmas Decoration UAE",
            item: `${siteConfig.url}/christmas-decoration-uae`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/christmas-decoration-uae#faq`,
        mainEntity: uaeFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export default function ChristmasDecorationUaePage() {
  return (
    <PageShell>
      <JsonLd data={uaeJsonLd()} />
      <PageBreadcrumbSchema name="Christmas Decoration UAE" path="/christmas-decoration-uae" />
      <PageHero
        eyebrow="Nationwide"
        title="Christmas decoration across the UAE."
        lead="One studio, every festive space in the Emirates — planned from our Sharjah base and installed wherever your property is."
        image="pageUae"
      />

      {/* Intro — why nationwide */}
      <Section id="introduction">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <ScrollReveal>
              <SectionHeading
                eyebrow="The Nationwide Service"
                title="One calendar, every Emirate."
                description="We plan festive schemes around distances, dates and logistics — because a project that travels deserves a schedule that fits."
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col justify-center gap-8">
                <p className="text-lead text-cocoa">
                  Festive Occasions is a Christmas decoration studio with its
                  registered base in Sharjah, taking on projects across the
                  Emirates. A typical nationwide project is planned exactly as a
                  Dubai project is — your space, your dates and a design that
                  belongs there — with travel and timing worked into the
                  schedule up front rather than as an afterthought.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="dark" href="/contact">
                    Get a Free Quote
                  </Button>
                  <Button variant="whatsapp" href={whatsappLink()} external>
                    <FaWhatsapp className="h-4 w-4" aria-hidden />
                    WhatsApp Us
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Emirates coverage */}
      <Section id="coverage" tone="cream">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Coverage"
              title="Where the team travels."
              description="Coverage is genuine and confirmed on enquiry — we never list an area we cannot actually schedule."
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {emirates.map((e, i) => (
              <ScrollReveal key={e.name} delay={i * 0.05}>
                <div className="h-full rounded-lg border hairline bg-background p-7">
                  <p className="text-label text-champagne-deep">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-espresso">
                    {e.name}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-cocoa">
                    {e.copy}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Areas & communities — all key locations */}
      <Section id="areas">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="All Areas & Communities"
              title="If it is in the UAE, we can talk about it."
              description="The list below covers the communities we are most often asked about — Palm Jumeirah to Dibba. Your area not named? We still take it on enquiry, because the client works across all emirates and areas."
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {areas.map((group, gi) => (
              <ScrollReveal key={group.group} delay={gi * 0.05}>
                <div className="h-full rounded-lg border hairline bg-background p-7">
                  <h3 className="font-display text-xl text-espresso">
                    {group.group}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border hairline px-4 py-2 text-sm font-medium text-cocoa"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.15}>
            <p className="mt-8 text-sm text-cocoa">
              Every area shown is confirmed on enquiry — we do not publish
              coverage we cannot actually schedule. If your community is not
              listed, ask anyway: the client takes on projects across all
              Emirates, and dates are confirmed with a clear answer either way.
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Scope across the UAE */}
      <Section id="scope">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <ScrollReveal>
              <SectionHeading
                eyebrow="What We Install"
                title="The same standard, wherever the property is."
                description="A nationwide project is not a different service — it is the same premium installation with logistics planned around it."
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col">
                {scope.map((s, i) => (
                  <div key={s.title} className="border-b hairline py-7 first:pt-0">
                    <div className="flex items-baseline gap-4">
                      <span className="text-label text-champagne-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl text-espresso">
                          {s.title}
                        </h3>
                        <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-cocoa">
                          {s.copy}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Regional FAQs — this page's own set */}
      <FAQ questions={uaeFaqs} />

      <FinalCTA />
    </PageShell>
  );
}