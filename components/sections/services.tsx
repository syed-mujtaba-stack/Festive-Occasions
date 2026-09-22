"use client";

import Link from "next/link";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { services } from "@/lib/services";
import { PremiumPlaceholder } from "@/components/placeholder/premium-visual";

const themeMap = {
  champagne: "champagne" as const,
  burgundy: "burgundy" as const,
  evergreen: "evergreen" as const,
};

export function ServicesSection() {
  return (
    <Section id="services" tone="cream">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="What We Do"
            title={
              <>
                Services for every space, <em className="text-champagne not-italic">styled as one.</em>
              </>
            }
            description="Every service below can be delivered on its own or composed into a single, cohesive Christmas transformation."
          />
        </ScrollReveal>

        <div className="mt-16">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} y={28} delay={i * 0.03}>
              <Link
                href={service.href}
                className="group grid items-center gap-6 border-t hairline py-9 transition-all duration-500 last:border-b lg:grid-cols-[120px_1.1fr_1.4fr_minmax(220px,0.9fr)_60px] lg:gap-8 lg:py-7"
              >
                {/* Number */}
                <span className="text-label text-warm-gray transition-colors duration-500 group-hover:text-champagne">
                  {service.number}
                </span>

                {/* Title */}
                <div>
                  <h3 className="font-display text-[1.7rem] leading-tight text-espresso lg:text-[2rem]">
                    {service.title}{" "}
                    <span className="text-cocoa">{service.subtitle}</span>
                  </h3>
                  <p className="text-label mt-2 text-champagne">
                    {service.section}
                  </p>
                </div>

                {/* Description */}
                <p className="hidden text-[0.95rem] leading-relaxed text-cocoa lg:block">
                  {service.description}
                </p>

                {/* Image reveal on hover */}
                <div className="pointer-events-none relative hidden h-24 w-40 overflow-hidden rounded-md opacity-0 transition-all duration-500 group-hover:opacity-100 lg:block">
                  <div className="absolute inset-0 scale-105 transition-transform duration-700 group-hover:scale-100">
                    <PremiumPlaceholder
                      seed={`svc-${service.id}`}
                      theme={themeMap[service.theme]}
                      variant="wide"
                      label={service.section}
                    />
                  </div>
                </div>

                {/* Arrow */}
                <span
                  aria-hidden
                  className="hidden text-2xl text-warm-gray transition-all duration-500 group-hover:translate-x-1 group-hover:text-champagne lg:block"
                >
                  →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}