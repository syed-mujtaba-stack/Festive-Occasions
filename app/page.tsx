import { JsDriver } from "@/animations/registry";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Hero } from "@/components/hero/hero";
import { Intro } from "@/components/sections/intro";
import { ServicesSection } from "@/components/sections/services";
import { Signature } from "@/components/sections/signature";
import { Audiences } from "@/components/sections/audiences";
import { GallerySection } from "@/components/sections/gallery";
import { ProcessSection } from "@/components/sections/process";
import { WhyUs } from "@/components/sections/why-us";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

/** Organization + WebSite schema — home only (single source NAP via site.ts). */
function homeJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/icon.svg`,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
        areaServed: siteConfig.serviceArea,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        publisher: { "@id": `${siteConfig.url}/#business` },
      },
    ],
  };
}

export default function Home() {
  return (
    <>
      <JsDriver />
      <SmoothScroll />
      <JsonLd data={homeJsonLd()} />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Intro />
        <ServicesSection />
        <Signature />
        <Audiences />
        <GallerySection />
        <ProcessSection />
        <WhyUs />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <FloatingActions />
      <Footer />
    </>
  );
}