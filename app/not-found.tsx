import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/section";
import { Button, ArrowIcon } from "@/components/ui/button";

/**
 * Premium branded 404 — editorial, on-brand, converts lost visitors
 * back to the quote journey. Renders inside the root layout (204-level
 * navigation consistency), returns a true 404 status for crawlers.
 */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="relative flex min-h-[78svh] items-center overflow-hidden bg-night"
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(198,161,91,0.14),transparent_55%)]"
        />
        <Container className="relative z-10 py-32">
          <p className="text-label mb-6 flex items-center gap-4 text-champagne">
            <span className="h-px w-10 bg-champagne" aria-hidden />
            Error 404 · Page Not Found
          </p>
          <h1 className="text-h1 max-w-3xl text-ivory">
            This corner has <em className="text-champagne not-italic">gone dark.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/70">
            The page you are looking for isn&apos;t here — but the festive
            season certainly is. Head back to explore our work, or tell us
            about your space and we&apos;ll light it up.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="primary" href="/" size="lg">
              Return Home <ArrowIcon />
            </Button>
            <Button variant="outline-light" href="/contact" size="lg">
              Get a Quote
            </Button>
          </div>
          <nav aria-label="Popular pages" className="mt-16 border-t hairline pt-8">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ivory/60">
              <li>
                <Link
                  href="/christmas-decoration-dubai"
                  className="transition-colors hover:text-champagne"
                >
                  Christmas Decoration Dubai
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="transition-colors hover:text-champagne"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-champagne"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </Container>
      </main>
      <Footer />
    </>
  );
}