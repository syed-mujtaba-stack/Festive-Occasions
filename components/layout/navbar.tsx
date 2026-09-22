"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo-mark";
import { siteConfig, whatsappLink } from "@/lib/site";

const navLinks = [
  { label: "Christmas", href: "/christmas-decoration-dubai" },
  { label: "Services", href: "/#services" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Other Occasions", href: "/other-occasions" },
  { label: "Contact", href: "/contact" },
];

/** True when the given nav href represents the current page. */
function isActive(href: string, pathname: string): boolean {
  if (href.startsWith("/#")) return pathname === "/";
  if (href === "/christmas-decoration-dubai")
    return pathname === href || pathname.startsWith("/christmas-");
  return pathname === href;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when full-screen menu is open
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [menuOpen]);

  // Close menu on navigation
  useEffect(() => setMenuOpen(false), [pathname]);

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
            aria-label="Festive Occasions — Home"
          >
            <LogoMark />
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  "flex items-baseline font-display text-[1.3rem] tracking-tight transition-colors",
                  solid ? "text-ivory" : "text-ivory"
                )}
              >
                Festive&nbsp;
                <span className="italic text-champagne-soft transition-colors duration-500 group-hover:text-champagne">
                  Occasions
                </span>
              </span>
              <span
                className={cn(
                  "text-label mt-1.5 flex items-center gap-2 transition-colors",
                  solid ? "text-champagne" : "text-champagne/90"
                )}
              >
                <span aria-hidden className="inline-block h-[3px] w-[3px] rotate-45 bg-champagne/70" />
                Christmas Decoration · Dubai
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((l) => {
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
        <div className="container-site flex flex-1 flex-col pb-24 pt-6">
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
                Christmas Decoration · Dubai
              </span>
            </div>
          </div>

          {[{ label: "Home", href: "/" }, ...navLinks].map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "group flex items-baseline gap-4 border-b hairline-dark py-4 transition-all duration-500",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: menuOpen ? `${80 + i * 60}ms` : "0ms" }}
            >
              <span className="text-label text-champagne">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-3xl text-ivory transition-colors group-hover:text-champagne">
                {l.label}
              </span>
            </Link>
          ))}

          <div
            className={cn(
              "mt-8 flex flex-col gap-3 transition-all duration-500",
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
            style={{ transitionDelay: menuOpen ? "420ms" : "0ms" }}
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