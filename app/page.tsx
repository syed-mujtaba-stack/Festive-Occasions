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

export default function Home() {
  return (
    <>
      <JsDriver />
      <SmoothScroll />
      <Navbar />
      <main>
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