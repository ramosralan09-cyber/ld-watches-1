"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LDLogo from "./LDLogo";

const NAV_LINKS = [
  { label: "Relojes", href: "#relojes" },
  { label: "Carteras", href: "#carteras" },
  { label: "Cadenas", href: "#cadenas" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? "rgba(10,10,10,0.96)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(201,168,76,0.1)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" aria-label="LD Watches inicio">
            <LDLogo size={44} variant="light" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-cream/70 hover:text-cream transition-colors text-sm tracking-[0.12em] uppercase"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.instagram.com/ld_watches_"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2 text-sm tracking-[0.12em] uppercase border border-gold/60 text-gold hover:bg-gold hover:text-ink transition-all duration-300"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Instagram
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span
              className="block w-6 h-px bg-cream transition-all duration-300 origin-center"
              style={{
                transform: menuOpen
                  ? "translateY(4px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="block w-6 h-px bg-cream transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-px bg-cream transition-all duration-300 origin-center"
              style={{
                transform: menuOpen
                  ? "translateY(-4px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile slide-in menu */}
      <div
        className="fixed inset-0 z-40 bg-charcoal flex flex-col justify-center items-center gap-8 lg:hidden transition-all duration-500"
        style={{
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="text-cream text-3xl text-display"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://www.instagram.com/ld_watches_"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="mt-4 px-8 py-3 border border-gold text-gold text-sm tracking-widest uppercase"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Ver en Instagram
        </a>
      </div>
    </>
  );
}
