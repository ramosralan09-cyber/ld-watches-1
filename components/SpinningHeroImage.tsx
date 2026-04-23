"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SpinningHeroImageProps {
  src: string;
  alt: string;
}

export default function SpinningHeroImage({ src, alt }: SpinningHeroImageProps) {
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSpin(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ perspective: "800px", width: "200px", height: "200px", position: "relative" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          animation: spin ? "spinHeroY 0.8s ease-in-out forwards" : "none",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "contain" }}
          sizes="200px"
        />
      </div>
      <style>{`
        @keyframes spinHeroY {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
