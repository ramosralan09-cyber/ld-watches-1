import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import SpinningHeroImage from "./SpinningHeroImage";
import inventory from "@/data/inventory.json";

type Category = "relojes" | "carteras" | "cadenas" | "gafas";

const CATEGORY_IMAGES: Record<Category, string> = {
  relojes: "/relojes.png",
  carteras: "/carteras.png",
  cadenas: "/cadenas.webp",
  gafas: "/gafas.png",
};

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  instagramUrl: string;
}

interface CategoryConfig {
  label: string;
  tagline: string;
  description: string;
  heroSub: string;
}

const CONFIGS: Record<Category, CategoryConfig> = {
  relojes: {
    label: "Relojes",
    tagline: "El tiempo te define",
    description: "Piezas para cada estilo y cada ocasión",
    heroSub:
      "Desde clásicos elegantes hasta deportivos modernos — cada reloj cuenta una historia.",
  },
  carteras: {
    label: "Carteras",
    tagline: "Estilo en tus manos",
    description: "Cuero premium, diseño que dura",
    heroSub:
      "Carteras premium para el hombre que sabe lo que quiere. Calidad que se nota.",
  },
  cadenas: {
    label: "Cadenas",
    tagline: "Lleva lo que te representa",
    description: "Accesorios que hablan por ti",
    heroSub:
      "Cadenas y accesorios seleccionados a mano. Piezas que hacen la diferencia.",
  },
  gafas: {
    label: "Gafas",
    tagline: "Estilo que se nota desde lejos",
    description: "Monturas para cada personalidad",
    heroSub:
      "Gafas seleccionadas a mano. Estilo que se nota desde lejos.",
  },
};

function ProductCard({ product }: { product: Product }) {
  const isEmpty = !product.name && !product.image;

  return (
    <div className="group flex flex-col">
      {/* Image */}
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
              style={{ opacity: 0.15 }}
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
          style={{ background: "rgba(10,10,10,0.6)" }}
        >
          <a
            href={product.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-ink bg-gold hover:bg-gold-light transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Consultar
          </a>
        </div>
      </div>

      {/* Info */}
      <div
        className="flex flex-col gap-1 pb-5"
        style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}
      >
        <p
          className="text-base text-white"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
        >
          {isEmpty ? "Próximamente" : product.name}
        </p>
        <p
          className="text-sm text-gold"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
        >
          {isEmpty ? "—" : product.price || "Consultar precio"}
        </p>
        {!isEmpty && product.description && (
          <p
            className="text-cream/75 text-xs mt-1 leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {product.description}
          </p>
        )}
        {!isEmpty && (
          <a
            href={product.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs text-cream/65 hover:text-gold transition-colors tracking-wide"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Consultar →
          </a>
        )}
      </div>
    </div>
  );
}

export default function CategoryPage({ category }: { category: Category }) {
  const cfg = CONFIGS[category];
  const products: Product[] =
    (inventory as Record<string, Product[]>)[category] ?? [];
  const hasProducts = products.some((p) => p.name || p.image);

  return (
    <>
      <Header />
      <main style={{ background: "var(--color-ink)" }}>
        {/* Hero */}
        <section
          className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 px-6 lg:px-10 overflow-hidden"
          style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}
        >
          {/* Background accent */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 50% 60% at 70% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto flex items-center justify-between gap-8">
            <div className="flex-1 min-w-0">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-cream/65 hover:text-cream transition-colors text-sm mb-10 group"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="group-hover:-translate-x-1 transition-transform duration-200"
              >
                <path
                  d="M10 3L5 8l5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Volver al inicio
            </Link>

            <p
              className="text-xs tracking-[0.32em] uppercase text-gold/70 mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Colección
            </p>
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-white mb-5"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
              }}
            >
              {cfg.label}
            </h1>
            <p
              className="text-cream/85 text-base lg:text-lg max-w-lg mt-6"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
            >
              {cfg.heroSub}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://www.instagram.com/ld_watches_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.2em] uppercase text-gold/75 hover:text-gold transition-colors border-b border-gold/30 hover:border-gold pb-0.5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Ver en Instagram →
              </a>
            </div>
            </div>

            {/* Spinning hero image */}
            <div className="hidden lg:flex flex-shrink-0 items-center">
              <SpinningHeroImage
                src={CATEGORY_IMAGES[category]}
                alt={cfg.label}
              />
            </div>
          </div>
        </section>

        {/* Product grid */}
        <section className="py-16 lg:py-24 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            {hasProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-24 flex flex-col items-center text-center gap-5">
                <div
                  className="w-10 h-px"
                  style={{ background: "var(--color-gold-dim)" }}
                />
                <p
                  className="text-cream/65 text-sm tracking-wide"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                >
                  Próximos items siendo añadidos
                </p>
                <a
                  href="https://www.instagram.com/ld_watches_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold/70 text-xs tracking-[0.22em] uppercase hover:text-gold transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Síguenos en Instagram para ver primero
                </a>
                <a
                  href="https://wa.me/17873225386?text=Hola%20Larry%2C%20me%20interesan%20tus%20productos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-6 py-2.5 border border-gold/40 text-cream/75 text-xs tracking-widest uppercase hover:border-gold hover:text-cream transition-all"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Consultar por WhatsApp
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
