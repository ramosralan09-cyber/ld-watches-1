"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ITEMS = [
  { id: "relojes", label: "RELOJES", src: "/relojes.png", route: "/relojes" },
  { id: "carteras", label: "CARTERAS", src: "/carteras.png", route: "/carteras" },
  { id: "cadenas", label: "CADENAS", src: "/cadenas.webp", route: "/cadenas" },
  { id: "gafas", label: "GAFAS", src: "/gafas.png", route: "/gafas" },
] as const;

export default function CarouselSection() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [centerIdx, setCenterIdx] = useState(1);
  const [spinningIdx, setSpinningIdx] = useState<number | null>(null);

  // Drag state
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const velX = useRef(0);
  const lastX = useRef(0);
  const rafRef = useRef<number | null>(null);

  const detectCenter = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    const items = el.querySelectorAll<HTMLElement>("[data-item]");
    let best = 0;
    let bestDist = Infinity;
    items.forEach((item, i) => {
      const dist = Math.abs(item.offsetLeft + item.offsetWidth / 2 - mid);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    setCenterIdx(best);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const id = setTimeout(detectCenter, 120);
    el.addEventListener("scroll", detectCenter, { passive: true });
    return () => {
      el.removeEventListener("scroll", detectCenter);
      clearTimeout(id);
    };
  }, [detectCenter]);

  const cancelMomentum = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    cancelMomentum();
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    scrollStart.current = containerRef.current?.scrollLeft ?? 0;
    velX.current = 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    velX.current = e.clientX - lastX.current;
    lastX.current = e.clientX;
    if (containerRef.current) containerRef.current.scrollLeft = scrollStart.current - dx;
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const applyMomentum = () => {
      if (Math.abs(velX.current) < 0.5) return;
      if (containerRef.current) containerRef.current.scrollLeft -= velX.current;
      velX.current *= 0.92;
      rafRef.current = requestAnimationFrame(applyMomentum);
    };
    rafRef.current = requestAnimationFrame(applyMomentum);
  };

  const handleClick = (idx: number, route: string) => {
    if (hasDragged.current) return;
    if (spinningIdx !== null) return;
    setSpinningIdx(idx);
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
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
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

      {/* Carousel track */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "clamp(32px, 5.5vw, 80px)",
          padding: "0 clamp(24px, 8vw, 120px)",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          cursor: isDragging.current ? "grabbing" : "grab",
          alignItems: "center",
          width: "100%",
          userSelect: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {ITEMS.map((item, idx) => (
          <CarouselItem
            key={item.id}
            label={item.label}
            src={item.src}
            isCenter={centerIdx === idx}
            isSpinning={spinningIdx === idx}
            floatDelay={idx * 0.3}
            onClick={() => handleClick(idx, item.route)}
          />
        ))}
      </div>

      <style>{`
        @keyframes floatItem {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes spinCarouselItem {
          0%   { transform: rotateY(0deg) scale(1); }
          50%  { transform: rotateY(180deg) scale(1.4); }
          100% { transform: rotateY(360deg) scale(1.4); }
        }
      `}</style>
    </div>
  );
}

interface CarouselItemProps {
  label: string;
  src: string;
  isCenter: boolean;
  isSpinning: boolean;
  floatDelay: number;
  onClick: () => void;
}

function CarouselItem({ label, src, isCenter, isSpinning, floatDelay, onClick }: CarouselItemProps) {
  const imgSize = "clamp(140px, 14vw, 200px)";
  const fontSize = "clamp(1.4rem, 2vw, 2.5rem)";

  const scale = isCenter ? 1.15 : 0.9;
  const labelOpacity = isCenter ? 1 : 0.5;
  const glowSpread = isCenter ? "0 0 40px 8px rgba(201,168,76,0.38)" : "0 0 18px 3px rgba(201,168,76,0.12)";

  return (
    <div
      data-item
      onClick={onClick}
      style={{
        flexShrink: 0,
        scrollSnapAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        cursor: "pointer",
        perspective: "800px",
        transform: isSpinning ? undefined : `scale(${scale})`,
        transition: isSpinning ? "none" : "transform 0.4s ease",
        animation: isSpinning ? "spinCarouselItem 0.6s ease-in-out forwards" : undefined,
      }}
    >
      {/* Label above */}
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize,
          color: "#FFFFFF",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          opacity: labelOpacity,
          transition: "opacity 0.4s ease",
          userSelect: "none",
          whiteSpace: "nowrap",
          margin: 0,
        }}
      >
        {label}
      </p>

      {/* Image with glow rim */}
      <div
        style={{
          position: "relative",
          width: imgSize,
          height: imgSize,
          boxShadow: glowSpread,
          transition: "box-shadow 0.4s ease",
          animation: isSpinning ? "none" : `floatItem 3s ease-in-out ${floatDelay}s infinite`,
        }}
      >
        <Image
          src={src}
          alt={label}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 1024px) 140px, 200px"
          draggable={false}
        />
      </div>
    </div>
  );
}
