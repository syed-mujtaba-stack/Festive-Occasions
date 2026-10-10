import { Container } from "@/components/ui/section";
import { FestiveImage } from "@/components/ui/festive-image";
import { BackToHome } from "@/components/ui/back-to-home";
import type { ImageKey } from "@/lib/images";

/**
 * PageHero — full-screen hero matching home page style.
 * Full viewport height, vertically centered, dual gradients, 2-column layout.
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
    <section className="relative flex min-h-[95vh] sm:min-h-screen items-center justify-center overflow-hidden bg-night pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="absolute inset-0" aria-hidden>
        <FestiveImage
          image={image}
          priority
          sizes="100vw"
          imgClassName="object-cover object-top scale-105 transition-transform duration-1000 ease-out"
        />
      </div>
      {/* Dual gradients matching home page */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0c] via-transparent to-black/50" />

      <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <BackToHome className="mb-7" />
            <p className="text-label mb-5 flex items-center gap-4 text-champagne">
              <span className="h-px w-10 bg-champagne" aria-hidden />
              Festive Occasions · {eyebrow}
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12] mb-6 drop-shadow-md max-w-4xl">
              {title}
            </h1>
            {lead && (
              <p className="text-base sm:text-lg text-white/85 max-w-2xl font-light leading-relaxed mb-8 drop-shadow">
                {lead}
              </p>
            )}
          </div>

          {/* Right Column: Image preview card (hidden on mobile) */}
          <div className="lg:col-span-4 relative mt-4 lg:mt-0 flex justify-center lg:justify-end hidden lg:block">
            <div className="relative w-full sm:max-w-[340px]">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border-2 border-[#dfba73]/50 bg-black/60 backdrop-blur-xl p-3.5">
                <FestiveImage
                  image={image}
                  sizes="(max-width: 768px) 300px, 340px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}