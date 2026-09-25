import { Container } from "@/components/ui/section";
import { FestiveImage } from "@/components/ui/festive-image";
import { BackToHome } from "@/components/ui/back-to-home";
import type { ImageKey } from "@/lib/images";

/**
 * PageHero — consistent dark editorial hero for inner pages.
 * Image sits behind an espresso veil; eyebrow + H1 + optional lead on top.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image: ImageKey;
}) {
  return (
    <section className="relative flex min-h-[62svh] items-end overflow-hidden bg-night">
      <div className="absolute inset-0" aria-hidden>
        <FestiveImage
          image={image}
          priority
          sizes="100vw"
          imgClassName="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#171312] via-[#171312]/55 to-[#171312]/25" />

      <Container className="relative z-10 pb-16 pt-40 sm:pb-20">
        <BackToHome className="mb-6" />
        <p className="text-label mb-5 flex items-center gap-4 text-champagne">
          <span className="h-px w-10 bg-champagne" aria-hidden />
          Festive Occasions · {eyebrow}
        </p>
        <h1 className="text-h1 max-w-4xl text-ivory">{title}</h1>
        {lead && (
          <p className="mt-6 max-w-xl text-lead text-ivory/75">{lead}</p>
        )}
      </Container>
    </section>
  );
}