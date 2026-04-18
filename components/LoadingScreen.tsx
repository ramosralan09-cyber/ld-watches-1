"use client";

import { useEffect, useState } from "react";
import LDLogo from "./LDLogo";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const onProgress = (e: Event) => {
      const detail = (e as CustomEvent<{ progress: number }>).detail;
      setProgress(Math.round(detail.progress * 100));
    };

    const onComplete = () => {
      setExiting(true);
      setTimeout(() => setVisible(false), 900);
    };

    window.addEventListener("frames:progress", onProgress);
    window.addEventListener("frames:complete", onComplete);

    return () => {
      window.removeEventListener("frames:progress", onProgress);
      window.removeEventListener("frames:complete", onComplete);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-ink"
      style={{
        transition: "opacity 0.9s ease, transform 0.9s ease",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.03)" : "scale(1)",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <div
        className="flex flex-col items-center gap-10"
        style={{
          animation: "fadeInUp 0.8s ease forwards",
        }}
      >
        <LDLogo size={90} variant="light" />

        <div className="flex flex-col items-center gap-4">
          <div
            className="w-48 h-px bg-charcoal-light overflow-hidden rounded-full relative"
          >
            <div
              className="absolute inset-y-0 left-0 bg-gold rounded-full"
              style={{
                width: `${progress}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>

          <p
            className="text-gray-muted text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {progress < 100 ? `Cargando ${progress}%` : "Listo"}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
