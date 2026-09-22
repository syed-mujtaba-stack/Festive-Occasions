"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site";

const navLinks = [
  { label: "Christmas", href: "/christmas-decoration-dubai" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Other Occasions", href: "/other-occasions" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
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
        <div className="container-site flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-col leading-none"
            aria-label="Festive Occasions — Home"
          >
            <span
              className={cn(
                "font-display text-[1.35rem] tracking-tight transition-colors",
                solid ? "text-ivory" : "text-ivory"
              )}
            >
              Festive&nbsp;Occasions
            </span>
            <span
              className={cn(
                "text-label mt-1 transition-colors",
                solid ? "text-champagne" : "text-champagne/90"
              )}
            >
              Christmas Decoration · Dubai
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-[0.8rem] font-medium tracking-[0.08em] uppercase transition-colors",
                  solid ? "text-ivory/75 hover:text-champagne" : "text-ivory/85 hover:text-champagne"
                )}
              >
                {l.label}
              </Link>
            ))}
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
        <div className="container-site flex flex-1 flex-col justify-center gap-2 pb-24 pt-28">
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