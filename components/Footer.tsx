import LDLogo from "./LDLogo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--color-charcoal)",
        borderTop: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      {/* Subtle radial accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-14">
          {/* Brand col */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <LDLogo size={60} variant="light" />
            <p
              className="text-cream/40 text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
            >
              Donde el tiempo, se vuelve estilo.
            </p>
            <p
              className="text-cream/30 text-xs leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Ajuste de medidas · Cambio de batería · Pedidos especiales
            </p>
            <p
              className="text-gold/50 text-xs italic"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Disponible para collabs con marcas y modelos
            </p>
          </div>

          {/* Nav col */}
          <div>
            <p
              className="text-xs tracking-[0.28em] uppercase text-gold/50 mb-5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Colecciones
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Relojes", href: "#relojes" },
                { label: "Carteras", href: "#carteras" },
                { label: "Cadenas", href: "#cadenas" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-cream/45 text-sm hover:text-cream transition-colors"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact col */}
          <div>
            <p
              className="text-xs tracking-[0.28em] uppercase text-gold/50 mb-5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Contacto
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/ld_watches_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/45 text-sm hover:text-gold transition-colors"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
              >
                <svg
                  width="14"
                  height="14"
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
                @ld_watches_
              </a>
              <a
                href="https://wa.me/17873225386?text=Hola%20Larry%2C%20vi%20tu%20p%C3%A1gina%20y%20quiero%20saber%20m%C3%A1s%20sobre%20un%20producto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/45 text-sm hover:text-gold transition-colors"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
                787-322-5386
              </a>
              <p
                className="flex items-start gap-2 text-cream/35 text-xs mt-1"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 mt-0.5"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Mayagüez, Puerto Rico
                <br />
                Entregas zona oeste
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}
        >
          <p
            className="text-cream/20 text-xs"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            © {year} LD Watches. Todos los derechos reservados.
          </p>
          <p
            className="text-cream/15 text-xs italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Donde el tiempo, se vuelve estilo
          </p>
        </div>
      </div>
    </footer>
  );
}
