const COLLECTIONS = [
  {
    num: "01",
    name: "Relojes",
    desc: "Piezas para cada estilo y ocasión",
    href: "/relojes",
  },
  {
    num: "02",
    name: "Carteras",
    desc: "Cuero premium, diseño que dura",
    href: "/carteras",
  },
  {
    num: "03",
    name: "Cadenas",
    desc: "Accesorios que hablan por ti",
    href: "/cadenas",
  },
];

export default function CollectionsTeaser() {
  return (
    <section
      className="py-24 lg:py-36"
      style={{ background: "var(--color-ink)" }}
      id="colecciones"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-14 lg:mb-16 text-center">
          <p
            className="text-xs tracking-[0.35em] uppercase text-gold/70 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            COLECCIONES
          </p>
          <h2
            className="text-4xl lg:text-5xl xl:text-6xl text-cream mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            Explora el catálogo
          </h2>
          <p
            className="text-cream/75 text-sm lg:text-base"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            Cada pieza seleccionada a mano por Larry
          </p>
        </div>

        {/* 3 collection cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          {COLLECTIONS.map((col) => (
            <a
              key={col.href}
              href={col.href}
              className="group relative flex flex-col gap-6 p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 focus:outline-none"
              style={{
                background: "var(--color-charcoal)",
                border: "1px solid rgba(201,168,76,0.1)",
              }}
            >
              {/* Number */}
              <span
                className="text-xs text-gold/60 group-hover:text-gold/90 transition-colors"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                }}
              >
                {col.num}
              </span>

              {/* Category name */}
              <div className="flex-1">
                <h3
                  className="text-3xl lg:text-4xl xl:text-5xl text-white mb-3 leading-tight"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 400,
                    transition: "color 0.3s ease",
                  }}
                >
                  {col.name}
                </h3>
                <p
                  className="text-cream/65 group-hover:text-cream/85 transition-colors text-sm lg:text-base"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    letterSpacing: "0.01em",
                  }}
                >
                  {col.desc}
                </p>
              </div>

              {/* CTA */}
              <span
                className="text-gold/65 group-hover:text-gold transition-colors text-sm tracking-[0.1em]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Explorar colección →
              </span>

              {/* Hover gold border overlay */}
              <div
                className="absolute inset-0 border opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                style={{ borderColor: "var(--color-gold)" }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                style={{
                  boxShadow: "0 0 40px rgba(201,168,76,0.08) inset",
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
