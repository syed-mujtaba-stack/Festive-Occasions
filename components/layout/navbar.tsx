"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo-mark";
import { siteConfig, whatsappLink } from "@/lib/site";
import { services } from "@/lib/services";

/**
 * Navigation rebuild — Services dropdown.
 * Top level is now compact (6 links + CTA); the "Services" dropdown groups:
 *   the Dubai pillar, the UAE-wide coverage page, and all 7 service pages.
 * Active state covers /christmas-* so the dropdown stays highlighted across
 * pillar, UAE and service pages. Mobile menu groups the same structure.
 */

const mainLinks = [
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const featuredLinks = [
  {
    label: "Christmas Decoration",
    href: "/christmas-decoration-dubai",
    note: "Dubai",
  },
  {
    label: "Christmas Decoration UAE",
    href: "/christmas-decoration-uae",
    note: "All 7 Emirates — Nationwide",
    badge: true,
  },
];

const allServices = services.filter((s) => s.id !== "christmas-decoration");

/** True when the given href represents the current page. */
function isActive(href: string, pathname: string): boolean {
  return pathname === href;
}

/** Services dropdown is active across the pillar, UAE and service pages. */
function isServicesActive(pathname: string): boolean {
  return pathname === "/christmas-decoration-dubai" || pathname.startsWith("/christmas-");
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const y = window.scrollY;
        setScrolled(y > 32);
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [menuOpen]);

  const solid = scrolled || menuOpen || pathname !== "/";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid
            ? "border-b hairline-dark bg-night/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* Scroll progress — champagne hairline that fills the page width */}
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-px bg-champagne"
          style={{
            width: `${progress * 100}%`,
            opacity: solid && progress > 0.02 ? 1 : 0,
            transition: "opacity 500ms, width 120ms linear",
          }}
        />
        <div className="container-site flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <LogoMark />
            <span className="flex flex-col leading-none">
              <span className="flex items-baseline font-display text-[1.3rem] tracking-tight text-ivory">
                Festive&nbsp;
                <span className="italic text-champagne-soft transition-colors duration-500 group-hover:text-champagne">
                  Occasions
                </span>
              </span>
              <span className="text-label mt-1.5 flex items-center gap-2 text-champagne">
                <span aria-hidden className="inline-block h-[3px] w-[3px] rotate-45 bg-champagne/70" />
                Christmas Decoration · Dubai &amp; UAE
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-6 lg:flex xl:gap-8"
            aria-label="Primary"
          >
            {/* Services — dropdown */}
            <div className="group relative">
              <Link
                href="/christmas-decoration-dubai"
                aria-haspopup="true"
                aria-current={isServicesActive(pathname) ? "page" : undefined}
                className={cn(
                  "group/link relative flex items-center gap-1.5 text-[0.8rem] font-medium uppercase tracking-[0.08em] transition-colors",
                  "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-champagne after:transition-transform after:duration-500 after:ease-out",
                  "group-hover/link:after:scale-x-100",
                  isServicesActive(pathname)
                    ? "text-champagne after:scale-x-100"
                    : solid
                      ? "text-ivory/75 hover:text-champagne"
                      : "text-ivory/85 hover:text-champagne"
                )}
              >
                Services
                <svg
                  aria-hidden
                  viewBox="0 0 12 12"
                  className="h-2.5 w-2.5 transition-transform duration-300 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Dropdown panel — visible on hover + focus-within */}
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-5 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="w-[320px] translate-y-2 rounded-xl border hairline-dark bg-night/95 p-2 shadow-2xl backdrop-blur-xl transition-transform duration-300 group-hover:translate-y-0">
                  {/* Featured — pillar + UAE */}
                  {featuredLinks.map((f) => (
                    <Link
                      key={f.href}
                      href={f.href}
                      className={cn(
                        "group/item flex items-center justify-between gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-ivory/5",
                        f.href === pathname && "bg-ivory/5"
                      )}
                    >
                      <span className="flex flex-col">
                        <span className="font-display text-lg leading-tight text-ivory transition-colors group-hover/item:text-champagne">
                          {f.label}
                        </span>
                        <span className="text-label mt-1 text-champagne/80">{f.note}</span>
                      </span>
                      {f.badge && (
                        <span className="rounded-full border border-champagne/40 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-champagne">
                          Nationwide
                        </span>
                      )}
                    </Link>
                  ))}

                  {/* Divider */}
                  <div aria-hidden className="my-2 h-px bg-ivory/10" />

                  {/* All services */}
                  <p className="text-label px-4 pb-1 pt-2 text-ivory/50">All services</p>
                  <div className="flex flex-col">
                    {allServices.map((s) => (
                      <Link
                        key={s.id}
                        href={s.href}
                        className={cn(
                          "group/item flex items-center justify-between gap-3 rounded-lg px-4 py-2 transition-colors hover:bg-ivory/5",
                          s.href === pathname && "bg-ivory/5"
                        )}
                      >
                        <span className="text-[0.82rem] font-medium text-ivory/85 transition-colors group-hover/item:text-champagne">
                          {s.title} {s.subtitle}
                        </span>
                        <svg
                          aria-hidden
                          viewBox="0 0 12 12"
                          className="h-2.5 w-2.5 text-champagne/50 transition-transform duration-300 group-hover/item:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M3 1.5l4.5 4.5L3 10.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Remaining top-level links */}
            {mainLinks.map((l) => {
              const active = isActive(l.href, pathname);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group/link relative text-[0.8rem] font-medium uppercase tracking-[0.08em] transition-colors",
                    "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-champagne after:transition-transform after:duration-500 after:ease-out",
                    "group-hover/link:after:scale-x-100",
                    active
                      ? "text-champagne after:scale-x-100"
                      : solid
                        ? "text-ivory/75 hover:text-champagne"
                        : "text-ivory/85 hover:text-champagne"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
            <Button variant="primary" size="md" href="/#quote">
              Get a Quote
            </Button>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center text-ivory lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="relative block h-4 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-6 bg-current transition-all duration-300",
                  menuOpen && "top-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-2 h-px w-6 bg-current transition-all duration-300",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-4 h-px w-6 bg-current transition-all duration-300",
                  menuOpen && "top-2 -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-night transition-all duration-500 lg:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <div className="container-site flex flex-1 flex-col overflow-y-auto pb-24 pt-6">
          {/* Brand row — monogram + wordmark */}
          <div
            className={cn(
              "flex items-center gap-3 border-b hairline-dark pb-6 transition-all duration-500",
              menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
            )}
            style={{ transitionDelay: menuOpen ? "40ms" : "0ms" }}
          >
            <LogoMark className="h-10 w-10" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl text-ivory">
                Festive&nbsp;
                <span className="italic text-champagne-soft">Occasions</span>
              </span>
              <span className="text-label mt-1.5 text-champagne">
                Christmas Decoration · Dubai &amp; UAE
              </span>
            </div>
          </div>

          {/* Services — featured */}
          <div
            className={cn(
              "pt-6 transition-all duration-500",
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
            style={{ transitionDelay: menuOpen ? "100ms" : "0ms" }}
          >
            <p className="text-label text-champagne/70">Services</p>
            <div className="mt-3 flex flex-col">
              {featuredLinks.map((f, i) => (
                <Link
                  key={f.href}
                  href={f.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline justify-between gap-4 border-b hairline-dark py-4"
                >
                  <span className="flex flex-col">
                    <span className="font-display text-2xl text-ivory transition-colors group-hover:text-champagne">
                      {f.label}
                    </span>
                    <span className="text-label mt-1 text-champagne/80">{f.note}</span>
                  </span>
                  <span className="text-label text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </div>

            {/* All services — compact links */}
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {allServices.map((s) => (
                <Link
                  key={s.id}
                  href={s.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between gap-3 border-b hairline-dark py-2.5"
                >
                  <span className="text-[0.95rem] font-medium text-ivory/85 transition-colors group-hover:text-champagne">
                    {s.title} {s.subtitle}
                  </span>
                  <span aria-hidden className="text-champagne/50 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Main pages */}
          <div
            className={cn(
              "mt-8 transition-all duration-500",
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
            style={{ transitionDelay: menuOpen ? "200ms" : "0ms" }}
          >
            <p className="text-label text-champagne/70">Explore</p>
            {[{ label: "Home", href: "/" }, ...mainLinks, { label: "Other Occasions", href: "/other-occasions" }].map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-4 border-b hairline-dark py-4"
              >
                <span className="text-label text-champagne">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-3xl text-ivory transition-colors group-hover:text-champagne">
                  {l.label}
                </span>
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div
            className={cn(
              "mt-10 flex flex-col gap-3 transition-all duration-500",
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
            style={{ transitionDelay: menuOpen ? "320ms" : "0ms" }}
          >
            <Button variant="whatsapp" size="lg" href={whatsappLink()} external>
              WhatsApp Us
            </Button>
            <Button variant="outline-light" size="lg" href={`tel:${siteConfig.phone}`}>
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}