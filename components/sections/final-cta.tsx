"use client";

import { Container, Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import { FestiveImage } from "@/components/ui/festive-image";
import { whatsappLink } from "@/lib/site";
import { FaWhatsapp } from "react-icons/fa";

/**
 * Final CTA — large editorial statement over a premium project backdrop.
 */
export function FinalCTA() {
  return (
    <Section id="quote" tone="dark" className="relative overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0" aria-hidden>
        <FestiveImage image="treeGoldBaubles" sizes="100vw" />
        <div className="absolute inset-0 bg-night/82" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-10 text-center">
            <p className="text-label text-champagne">
              Request your consultation
            </p>

            <h2 className="text-h1 max-w-4xl text-ivory">
              Ready to make
              <br />
              <em className="text-champagne not-italic">Christmas</em> magical?
            </h2>

            <p className="max-w-xl text-lead text-ivory/70">
              Tell us about your space and we&apos;ll design a bespoke scheme
              around it — with a clear proposal, schedule and premium finish.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" href="/contact">
                Get a Free Quote
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href={whatsappLink()}
                external
              >
                <FaWhatsapp className="h-4 w-4" aria-hidden />
                WhatsApp Us
              </Button>
            </div>

            <p className="text-sm text-ivory/50">
              Villas · Homes · Offices · Hotels · Restaurants · Commercial spaces
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}