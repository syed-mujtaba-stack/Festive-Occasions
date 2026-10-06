import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { images } from "@/lib/images";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Rental Christmas Decoration Dubai | Festive Occasions",
  description:
    "Rental Christmas decoration in Dubai from 25th October to 25th January — budget-friendly festive schemes for rented properties. Expert installation and careful removal on your dates.",
  keywords: [
    "Rental Christmas Decoration Dubai",
    "Rented property fest decoration UAE",
    "Christmas decoration for apartments Dubai",
    "Short-term rental festive styling",
  ],
  openGraph: {
    title: "Rental Christmas Decoration Dubai | Festive Occasions",
    description:
      "Rental Christmas decoration in Dubai from 25th October to 25th January — budget-friendly festive schemes for rented properties.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}${images.hero.src}`,
        alt: images.hero.alt,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rental Christmas Decoration Dubai | Festive Occasions",
    description:
      "Rental Christmas decoration in Dubai from 25th October to 25th January — budget-friendly festive schemes for rented spaces.",
    images: [`${siteConfig.url}${images.hero.src}`],
  },
};

export default function RentalChristmasDecorationDubaiPage() {
  return (
    <section className="relative py-24">
      <div className="bg-gradient-to-b from-night via-night/90 to-night/80 min-h-screen">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/15 via-emerald-500/5 to-transparent pointer-events-none"
        />
        <div className="relative container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Festive decoration for<br />
            <span className="text-emerald-400">Rented Properties</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Don't let a rented property stop you from enjoying the festive season. We specialize in beautiful, non-damaging Christmas decoration for apartments, villas, and homes on rental — installed carefully and removed on your dates.
          </p>

          {/* 5 Steps */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 max-w-4xl mx-auto">
            <div className="group p-6 bg-white/10 rounded-xl transition-colors hover:bg-white/15">
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 group-hover:text-white transition-colors">
                1
              </div>
              <h3 className="mt-4 text-sm font-medium text-white">
                Select Your Space
              </h3>
              <p className="mt-2 text-white/50 text-sm">
                Choose rooms, tree size, and style
              </p>
            </div>
            <div className="group p-6 bg-white/10 rounded-xl transition-colors hover:bg-white/15">
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 group-hover:text-white transition-colors">
                2
              </div>
              <h3 className="mt-4 text-sm font-medium text-white">
                Finalize Price
              </h3>
              <p className="mt-2 text-white/50 text-sm">
                We quote based on your selection
              </p>
            </div>
            <div className="group p-6 bg-white/10 rounded-xl transition-colors hover:bg-white/15">
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 group-hover:text-white transition-colors">
                3
              </div>
              <h3 className="mt-4 text-sm font-medium text-white">
                Get Installation
              </h3>
              <p className="mt-2 text-white/50 text-sm">
                Professional install on your schedule
              </p>
            </div>
            <div className="group p-6 bg-white/10 rounded-xl transition-colors hover:bg-white/15">
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 group-hover:text-white transition-colors">
                4
              </div>
              <h3 className="mt-4 text-sm font-medium text-white">
                Complete Payment
              </h3>
              <p className="mt-2 text-white/50 text-sm">
                Transparent pricing, no hidden costs
              </p>
            </div>
            <div className="group p-6 bg-white/10 rounded-xl transition-colors hover:bg-white/15">
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 group-hover:text-white transition-colors">
                5
              </div>
              <h3 className="mt-4 text-sm font-medium text-white">
                Collect on Your Dates
              </h3>
              <p className="mt-2 text-white/50 text-sm">
                We remove carefully after the season
              </p>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-16 inline-block">
            <a
              href="https://wa.me/971564284444?text=Hi%20Festive%20Occasions,%20I'd%20like%20to%20enquire%20about%20rental%20Christmas%20decoration"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-emerald-400 hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              <FaWhatsapp className="h-6 w-6 shrink-0" />
              <span>WhatsApp for a Quote</span>
            </a>
            <p className="mt-2 text-sm text-white/60">
              Oct 25 - Jan 25 | Non-damaging | Installed & removed on your dates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}