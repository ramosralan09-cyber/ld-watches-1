"use client";

import { useEffect, useRef } from "react";
import LDLogo from "./LDLogo";

export default function InstagramCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && contentRef.current) {
          const children = contentRef.current.children;
          Array.from(children).forEach((child, i) => {
            (child as HTMLElement).style.transition = `opacity 0.8s ease ${i * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`;
            (child as HTMLElement).style.opacity = "1";
            (child as HTMLElement).style.transform = "translateY(0)";
          });
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--color-charcoal)" }}
    >
      {/* Gold grain texture background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(201,168,76,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 80% 20%, rgba(201,168,76,0.04) 0%, transparent 60%)
          `,
        }}
      />
      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto gap-6"
      >
        {/* Logo */}
        <div style={{ opacity: 0, transform: "translateY(28px)" }}>
          <LDLogo size={72} variant="gold" />
        </div>

        {/* Headline */}
        <div style={{ opacity: 0, transform: "translateY(28px)" }}>
          <p
            className="text-xs tracking-[0.35em] uppercase text-gold/80 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Síguenos
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl text-cream leading-tight"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            Síguenos y descubre
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
              lo último
            </em>
          </h2>
        </div>

        {/* Handle */}
        <div style={{ opacity: 0, transform: "translateY(28px)" }}>
          <span
            className="block w-10 h-px bg-gold/40 mx-auto mb-5"
          />
          <p
            className="text-cream/85 text-lg tracking-[0.12em]"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            @ld_watches_
          </p>
        </div>

        {/* CTA button */}
        <div style={{ opacity: 0, transform: "translateY(28px)" }}>
          <a
            href="https://www.instagram.com/ld_watches_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-ink text-sm tracking-[0.2em] uppercase font-medium hover:bg-gold-light transition-colors duration-300"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Seguir en Instagram
          </a>
        </div>

        {/* WhatsApp line */}
        <div style={{ opacity: 0, transform: "translateY(28px)" }}>
          <p
            className="text-cream/75 text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            ¿Buscas algo específico?{" "}
            <a
              href="https://wa.me/17873225386?text=Hola%20Larry%2C%20vi%20tu%20p%C3%A1gina%20y%20quiero%20saber%20m%C3%A1s%20sobre%20un%20producto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/85 hover:text-gold transition-colors underline underline-offset-4"
            >
              Llámame que yo lo consigo.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
