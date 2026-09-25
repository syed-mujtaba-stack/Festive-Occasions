import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { PageShell } from "@/components/layout/page-shell";
import { BackToHome } from "@/components/ui/back-to-home";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

/**
 * Privacy Policy — honest, factual, and deliberately light: the site runs
 * no analytics or tracking scripts, so the policy only covers enquiry
 * data (WhatsApp, call, email) and installation photos published with
 * permission. Noindexed: it is a trust/compliance page, not a search target.
 */
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Festive Occasions handles enquiry information — WhatsApp, email and call details — and what we do with them. No tracking scripts, no data sales.",
  alternates: { canonical: "/privacy-policy" },
  robots: {
    index: false,
    follow: true,
  },
};

const sections = [
  {
    heading: "What this policy covers",
    body: "This policy explains how Festive Occasions (\"we\", \"our\") handles the information you share with us when you contact us about Christmas and festive decoration. It is written to be plain and accurate about what we actually do — nothing more.",
  },
  {
    heading: "Information you send us",
    body: `When you enquire through WhatsApp, phone or email, you choose what to share — typically your name, contact number, property location and the details of your space or project. We use that information only to respond to your enquiry, prepare a quote and, if you proceed, plan and deliver your installation.`,
  },
  {
    heading: "What we do not do",
    body: "We do not run analytics or tracking scripts on this website, we do not sell or rent personal information to anyone, and we do not send marketing messages beyond direct replies to enquiries you have started with us.",
  },
  {
    heading: "Installation photos",
    body: "Finished installations may be photographed for our gallery and portfolio. We only publish imagery we are entitled to use, and captions are written to describe the work factually. If you are a client and wish to have a particular photo removed or credited differently, tell us and we will action it promptly.",
  },
  {
    heading: "How long we keep information",
    body: "Enquiry details are kept for as long as they are needed to serve you — to prepare or honour a quote, or to complete a booked project — and no longer than reasonably necessary afterwards.",
  },
  {
    heading: "Your rights and how to reach us",
    body: `You may ask at any time to review, correct or delete the personal information we hold about you. Please contact us at ${siteConfig.email} or on ${siteConfig.phoneDisplay} and we will respond to your request directly.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy",
          url: `${siteConfig.url}/privacy-policy`,
          inLanguage: "en-AE",
          isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <section className="relative flex min-h-[42svh] items-end overflow-hidden bg-night">
        <div className="absolute inset-0 bg-gradient-to-t from-[#171312] via-[#171312]/85 to-[#171312]/60" />
        <Container className="relative z-10 pb-14 pt-36">
          <BackToHome className="mb-6" />
          <p className="text-label mb-5 flex items-center gap-4 text-champagne-deep">
            <span className="h-px w-10 bg-champagne" aria-hidden />
            Festive Occasions · Policy
          </p>
          <h1 className="text-h1 max-w-3xl text-ivory">Privacy Policy</h1>
          <p className="mt-5 max-w-xl text-lead text-ivory/75">
            The short version: we only keep what you send us, we do not track
            you, and we never sell your details.
          </p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            {sections.map((s) => (
              <div key={s.heading} className="border-b hairline py-8 first:pt-0">
                <h2 className="font-display text-2xl text-espresso">
                  {s.heading}
                </h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-cocoa">
                  {s.body}
                </p>
              </div>
            ))}
            <p className="mt-8 text-xs text-warm-gray-deep">
              Last updated: September 2026. We will revise this page if our
              practices change, and the date above will always reflect the
              latest version.
            </p>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}