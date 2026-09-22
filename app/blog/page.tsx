import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { PageBreadcrumbSchema } from "@/components/seo/page-breadcrumb";
import { FinalCTA } from "@/components/sections/final-cta";
import { FestiveImage } from "@/components/ui/festive-image";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Christmas Decoration Guides & Inspiration | Festive Occasions Dubai",
  description:
    "Practical guides on Christmas decoration in Dubai — packages and pricing, villa schemes, trees, office styling, outdoor lighting and when to book.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Christmas Decoration Guides | Festive Occasions",
    description:
      "Practical, honest guides to Christmas decoration in Dubai — packages, villas, trees, offices and lighting.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <PageShell>
      <PageBreadcrumbSchema name="Blog" path="/blog" />
      <PageHero
        eyebrow="Journal"
        title="Christmas decoration, explained."
        lead="Practical guides on packages and pricing, villa schemes, trees, office styling, outdoor lighting and when to book — written around how we actually work."
        image="treeStringLights"
      />

      <Section id="blog">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Guides"
              title="Start with the space you have."
              description="Each guide answers a real question clients ask before booking — no fluff, no invented claims."
            />
          </ScrollReveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
            {blogPosts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.04}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-cream">
                    <FestiveImage
                      image={post.heroImage}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-night/80 px-3.5 py-1.5 text-label text-ivory backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="mt-6 flex flex-col gap-3">
                    <p className="text-label text-cocoa">
                      {post.published} · {post.readingMinutes} min read
                    </p>
                    <h2 className="font-display text-2xl leading-snug text-espresso transition-colors group-hover:text-champagne lg:text-[1.7rem]">
                      {post.title}
                    </h2>
                    <p className="max-w-prose text-[0.95rem] leading-relaxed text-cocoa">
                      {post.metaDescription}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-2 text-label text-champagne">
                      Read guide
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </PageShell>
  );
}