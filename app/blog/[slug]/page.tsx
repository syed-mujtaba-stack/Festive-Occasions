import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/section";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { PageBreadcrumbSchema } from "@/components/seo/page-breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { FinalCTA } from "@/components/sections/final-cta";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { blogPosts, getBlogPost, type BlogSection } from "@/lib/blog";
import { siteConfig, whatsappLink } from "@/lib/site";
import { images } from "@/lib/images";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published,
      ...(post.updated ? { modifiedTime: post.updated } : {}),
      images: [
        {
          url: `${siteConfig.url}${images[post.heroImage].src}`,
          alt: images[post.heroImage].alt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [`${siteConfig.url}${images[post.heroImage].src}`],
    },
  };
}

function renderSection(section: BlogSection, key: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          key={key}
          className="mt-12 font-display text-2xl leading-snug text-espresso lg:text-3xl"
        >
          {section.text}
        </h2>
      );
    case "ul":
      return (
        <ul key={key} className="mt-6 flex flex-col gap-3">
          {section.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[1.02rem] leading-relaxed text-cocoa"
            >
              <span
                className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-champagne"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      );
    case "p":
    default:
      return (
        <p
          key={key}
          className="mt-6 max-w-prose text-[1.02rem] leading-relaxed text-cocoa [&:first-of-type]:mt-0"
        >
          {section.text}
        </p>
      );
  }
}

function articleJsonLd(post: (typeof blogPosts)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `${siteConfig.url}${images[post.heroImage].src}`,
    datePublished: post.published,
    ...(post.updated ? { dateModified: post.updated } : {}),
    author: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon.svg`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };
}

function faqJsonLd(post: (typeof blogPosts)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <PageShell>
      <PageBreadcrumbSchema name={post.title} path={`/blog/${post.slug}`} />
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd data={faqJsonLd(post)} />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        lead={post.lead}
        image={post.heroImage}
      />

      <Section>
        <Container className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b hairline pb-6 text-label text-cocoa">
            <span>{post.published}</span>
            <span aria-hidden className="text-champagne">·</span>
            <span>{post.readingMinutes} min read</span>
            <span aria-hidden className="text-champagne">·</span>
            <Link href="/blog" className="transition-colors hover:text-champagne">
              All guides
            </Link>
          </div>

          <article className="mt-10">
            {post.sections.map((section, i) => renderSection(section, i))}
          </article>

          {/* Related internal links */}
          <div className="mt-12 border-t hairline pt-8">
            <p className="text-label text-cocoa">Keep reading</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {post.related.map((link) => (
                <Button key={link.href} variant="outline" size="md" href={link.href}>
                  {link.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Post FAQ — matches FAQPage schema above */}
          {post.faqs.length > 0 && (
            <div className="mt-14 border-t hairline pt-8">
              <h2 className="font-display text-2xl text-espresso">
                Frequently asked questions
              </h2>
              <div className="mt-6">
                {post.faqs.map((f, i) => (
                  <details
                    key={f.q}
                    className="group border-b hairline py-5"
                    {...(i === 0 ? { open: true } : {})}
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                      <h3 className="font-display text-lg text-espresso">{f.q}</h3>
                      <span
                        aria-hidden
                        className="mt-1 text-champagne transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-prose text-[0.98rem] leading-relaxed text-cocoa">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 flex flex-col items-start gap-6 rounded-md bg-night px-8 py-10">
            <div>
              <p className="text-label text-champagne">Talk to the team</p>
              <h2 className="mt-3 font-display text-3xl italic leading-tight text-ivory">
                Plan your space for the season.
              </h2>
              <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-ivory/70">
                Send photos of your space and your preferred dates on WhatsApp —
                we&apos;ll confirm the right package or shape a bespoke quote.
              </p>
            </div>
            <Button
              variant="whatsapp"
              size="lg"
              href={whatsappLink(
                `Hi Festive Occasions, I read the guide "${post.title}" and I'd like to plan Christmas decoration for my space.`
              )}
              external
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden />
              Start on WhatsApp
            </Button>
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </PageShell>
  );
}