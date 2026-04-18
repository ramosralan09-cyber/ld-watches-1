import inventory from "@/data/inventory.json";

type ProductCategory = "relojes" | "carteras" | "cadenas";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  instagramUrl: string;
}

interface CategoryConfig {
  key: ProductCategory;
  label: string;
  anchor: string;
  description: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    key: "relojes",
    label: "Relojes",
    anchor: "relojes",
    description: "Piezas para cada estilo y cada ocasión",
  },
  {
    key: "carteras",
    label: "Carteras",
    anchor: "carteras",
    description: "Cuero premium para el hombre que sabe lo que quiere",
  },
  {
    key: "cadenas",
    label: "Cadenas",
    anchor: "cadenas",
    description: "Accesorios que hablan sin palabras",
  },
];

function ProductCard({ product }: { product: Product }) {
  const isEmpty = !product.name && !product.image;

  return (
    <div
      className="group flex flex-col"
      style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}
    >
      {/* Image area */}
      <div
        className="relative aspect-square overflow-hidden mb-4"
        style={{ background: "var(--color-charcoal-mid)" }}
      >
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              style={{ opacity: 0.18 }}
            >
              <rect
                x="3"
                y="3"
                width="30"
                height="30"
                rx="2"
                stroke="#c9a84c"
                strokeWidth="1"
              />
              <circle
                cx="12"
                cy="12"
                r="3.5"
                stroke="#c9a84c"
                strokeWidth="1"
              />
              <path
                d="M3 23l8-8 6 6 4-4 9 9"
                stroke="#c9a84c"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(10,10,10,0.65)" }}
        >
          <a
            href={product.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-ink bg-gold"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Consultar
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 pb-5">
        <p
          className="text-base text-cream"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
          }}
        >
          {isEmpty ? "Próximamente" : product.name}
        </p>
        <p
          className="text-sm text-gold/70"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
        >
          {isEmpty ? "—" : product.price || "Consultar precio"}
        </p>
        {!isEmpty && (
          <a
            href={product.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs text-cream/40 hover:text-gold transition-colors tracking-wide"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Consultar →
          </a>
        )}
      </div>
    </div>
  );
}

export default function CatalogSection() {
  return (
    <section
      className="py-24 lg:py-32"
      style={{ background: "var(--color-ink)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {CATEGORIES.map((cat) => {
          const products: Product[] =
            inventory[cat.key as keyof typeof inventory] as Product[];
          const hasProducts = products.some((p) => p.name || p.image);

          return (
            <div
              key={cat.key}
              id={cat.anchor}
              className="mb-24 lg:mb-36 last:mb-0"
            >
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6"
                style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}
              >
                <div>
                  <p
                    className="text-xs tracking-[0.3em] uppercase text-gold/50 mb-2"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Colección
                  </p>
                  <h2
                    className="text-4xl lg:text-5xl text-cream"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 300,
                    }}
                  >
                    {cat.label}
                  </h2>
                  <p
                    className="mt-2 text-cream/40 text-sm"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 300,
                    }}
                  >
                    {cat.description}
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/ld_watches_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 sm:mt-0 self-start sm:self-auto text-xs tracking-[0.2em] uppercase text-gold/60 hover:text-gold transition-colors border-b border-gold/30 hover:border-gold pb-0.5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Ver en Instagram →
                </a>
              </div>

              {hasProducts ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center text-center gap-4">
                  <div
                    className="w-12 h-px"
                    style={{ background: "var(--color-gold-dim)" }}
                  />
                  <p
                    className="text-cream/30 text-sm tracking-wide max-w-xs"
                    style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                  >
                    Próximos items siendo añadidos
                  </p>
                  <a
                    href="https://www.instagram.com/ld_watches_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold/50 text-xs tracking-[0.2em] uppercase hover:text-gold transition-colors"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Síguenos en Instagram para ver primero
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
