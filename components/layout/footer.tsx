import Link from "next/link";
import { Container } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";

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
      { label: "Gallery", href: "/gallery" },
      { label: "About", href: "/about" },
      { label: "Areas We Serve", href: "/areas-we-serve" },
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
            <p className="font-display text-2xl tracking-tight">
              Festive&nbsp;Occasions
            </p>
            <p className="text-label mt-2 text-champagne">
              Christmas Decoration · Dubai
            </p>
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
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t hairline-dark pt-8 text-xs text-ivory/40 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.domain}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-label text-ivory/40">Bespoke festive decoration</span>
            <span className="text-champagne">DUBAI · UAE</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}