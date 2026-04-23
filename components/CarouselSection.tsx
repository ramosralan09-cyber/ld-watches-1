"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ITEMS = [
  { id: "relojes",  label: "RELOJES",  src: "/relojes.png",   route: "/relojes"  },
  { id: "carteras", label: "CARTERAS", src: "/carteras.png",   route: "/carteras" },
  { id: "cadenas",  label: "CADENAS",  src: "/cadenas.webp",   route: "/cadenas"  },
  { id: "gafas",    label: "GAFAS",    src: "/gafas.png",      route: "/gafas"    },
] as const;

// Arc offset per item index: outer items sit lower than center items.
const ARC_Y = [40, 15, 15, 40];

export default function CarouselSection() {
  const router = useRouter();
  const [hoveredItem, setHoveredItem]   = useState<string | null>(null);
  const [spinningItem, setSpinningItem] = useState<string | null>(null);
  const [isMobile, setIsMobile]         = useState(() => {
    try { return window.innerWidth < 1024; } catch { return false; }
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleClick = (id: string, route: string) => {
    if (spinningItem !== null) return;
    setSpinningItem(id);
    setTimeout(() => router.push(route), 600);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background: "#0A0A0A",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "60px 0",
        boxSizing: "border-box",
      }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "repeating-linear-gradient(0deg, rgba(201,168,76,0.08) 0px, rgba(201,168,76,0.08) 1px, transparent 1px, transparent 80px)",
            "repeating-linear-gradient(90deg, rgba(201,168,76,0.08) 0px, rgba(201,168,76,0.08) 1px, transparent 1px, transparent 80px)",
          ].join(", "),
          pointerEvents: "none",
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.13) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Header ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            color: "#C9A84C",
            textTransform: "uppercase",
            margin: "0 0 8px 0",
          }}
        >
          LD WATCHES
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "#FFFFFF",
            fontWeight: 300,
            margin: "0 0 4px 0",
            lineHeight: 1.1,
          }}
        >
          Explora la colección
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            margin: "4px 0 0 0",
          }}
        >
          Selecciona una categoría
        </p>
      </div>

      {/* ── Items ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: isMobile ? "grid" : "flex",
          ...(isMobile
            ? {
                gridTemplateColumns: "1fr 1fr",
                justifyItems: "center",
                gap: "32px",
                padding: "0 24px",
              }
            : {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
                gap: "clamp(40px, 6vw, 100px)",
                padding: "0 5vw",
              }),
        }}
      >
        {ITEMS.map((item, idx) => {
          const isHovered  = hoveredItem === item.id;
          const isSpinning = spinningItem === item.id;
          const arcY       = isMobile ? 0 : ARC_Y[idx];
          const liftY      = isHovered ? arcY - 20 : arcY;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleClick(item.id, item.route)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                transform: `translateY(${liftY}px)`,
                transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Card */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  padding: "24px",
                  borderRadius: "16px",
                  background:
                    "radial-gradient(ellipse 80% 80% at 50% 40%, #1c1c1c 0%, #0a0a0a 100%)",
                  border: `1px solid ${isHovered ? "rgba(201,168,76,0.8)" : "rgba(201,168,76,0.2)"}`,
                  boxShadow: isHovered ? "0 0 40px rgba(201,168,76,0.5)" : "none",
                  transition:
                    "border-color 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  animation: isSpinning
                    ? "spinCarouselItem 0.6s ease-in-out forwards"
                    : "none",
                }}
              >
                {/* Label */}
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.1rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: isHovered ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                    transition: "color 0.3s",
                    margin: 0,
                    userSelect: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </p>

                {/* Image */}
                <div
                  style={{
                    position: "relative",
                    width: isMobile ? "130px" : "180px",
                    height: isMobile ? "130px" : "180px",
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                    transition:
                      "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 1023px) 130px, 180px"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom accent line ── */}
      <div
        aria-hidden
        style={{
          position: "relative",
          zIndex: 1,
          width: "1px",
          height: "60px",
          background: "#C9A84C",
          opacity: 0.4,
          margin: "40px auto 0",
        }}
      />

      <style>{`
        @keyframes spinCarouselItem {
          0%   { transform: perspective(800px) rotateY(0deg)   scale(1);   }
          50%  { transform: perspective(800px) rotateY(180deg) scale(1.3); }
          100% { transform: perspective(800px) rotateY(360deg) scale(1.3); }
        }
      `}</style>
    </div>
  );
}
