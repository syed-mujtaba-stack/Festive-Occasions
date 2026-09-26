import Link from "next/link";
import { Container } from "@/components/ui/section";
import { LogoMark } from "@/components/ui/logo-mark";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";
import { FaInstagram } from "react-icons/fa";

const footerColumns = [
  {
    title: "Christmas Services",
    links: services.map((s) => ({
      label: `${s.title} ${s.subtitle}`,
      href: s.href,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "Packages", href: "/packages" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Areas We Serve", href: "/areas-we-serve" },
      { label: "Christmas Decoration UAE", href: "/christmas-decoration-uae" },
      { label: "Other Occasions", href: "/other-occasions" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-night text-ivory">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <LogoMark />
              <span className="flex flex-col leading-none">
                <span className="font-display text-2xl tracking-tight text-ivory">
                  Festive&nbsp;
                  <span className="italic text-champagne-soft transition-colors duration-500 group-hover:text-champagne">
                    Occasions
                  </span>
                </span>
                <span className="text-label mt-2 flex items-center gap-2 text-champagne">
                  <span aria-hidden className="inline-block h-[3px] w-[3px] rotate-45 bg-champagne/70" />
                  Christmas Decoration · Dubai
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">
              A premium Christmas &amp; festive decoration studio serving homes,
              villas, offices and commercial spaces across Dubai and the UAE.
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-label text-ivory/50">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ivory/70 transition-colors hover:text-champagne"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <p className="text-label text-ivory/50">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory/70">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="transition-colors hover:text-champagne"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-champagne"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.addressLine}</li>
              <li className="text-ivory/50">{siteConfig.hours}</li>

            </ul>

            {/* Social — verified channels only (off-page / brand presence) */}
            <div className="mt-6">
              <p className="text-label text-ivory/50">Follow</p>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="@festive_ocassions on Instagram"
                className="mt-3 inline-flex items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-champagne"
              >
                <FaInstagram aria-hidden className="h-4 w-4" />
                @festive_ocassions
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t hairline-dark pt-8 text-xs text-ivory/70 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.domain}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-champagne"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-champagne">
                Terms of Service
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-label text-ivory/70">Bespoke festive decoration</span>
              <span className="text-champagne">DUBAI · UAE</span>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}