"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type FrameVariant = "desktop" | "mobile";

interface Manifest {
  desktop: { totalFrames: number; format?: string };
  mobile: { totalFrames: number; format?: string };
}

interface Segment {
  id: string;
  label: string;
  headline: string;
  subtext: string;
  start: number;
  end: number;
}

const SEGMENTS: Segment[] = [
  {
    id: "carteras",
    label: "CARTERAS",
    headline: "Estilo en tus manos",
    subtext: "Carteras premium para el hombre que sabe lo que quiere",
    start: 0,
    end: 0.333,
  },
  {
    id: "relojes",
    label: "RELOJES",
    headline: "El tiempo te define",
    subtext: "Relojes para cada estilo, cada ocasión",
    start: 0.333,
    end: 0.666,
  },
  {
    id: "cadenas",
    label: "CADENAS",
    headline: "Lleva lo que te representa",
    subtext: "Cadenas y accesorios que hablan sin palabras",
    start: 0.666,
    end: 1,
  },
];

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: ImageBitmap,
  cw: number,
  ch: number
) {
  const scale = Math.max(cw / img.width, ch / img.height);
  const dx = (cw - img.width * scale) / 2;
  const dy = (ch - img.height * scale) / 2;
  ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale);
}

export default function ScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const currentFrameRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const popupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSegIdxRef = useRef(0);

  // DOM refs for scroll-driven updates (avoid React re-renders in scroll loop)
  const labelWrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLHeadingElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [noFrames, setNoFrames] = useState(false);
  const [activePopup, setActivePopup] = useState<number | null>(null);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const frame = framesRef.current[index];
    if (!frame) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCover(ctx, frame, canvas.width, canvas.height);
  }, []);

  // Load manifest + detect variant
  useEffect(() => {
    fetch("/frames-manifest.json")
      .then((r) => r.json())
      .then((data: Manifest) => {
        const variant: FrameVariant =
          window.innerWidth >= 1024 ? "desktop" : "mobile";
        const total = data[variant].totalFrames;
        const ext = data[variant].format ?? "jpg";
        if (total === 0) {
          setNoFrames(true);
          setIsLoaded(true);
          window.dispatchEvent(new CustomEvent("frames:complete"));
          return;
        }

        // Preload frames in batches
        const frames: ImageBitmap[] = new Array(total);
        let loaded = 0;
        const BATCH = 20;

        async function loadBatch(start: number) {
          const end = Math.min(start + BATCH, total);
          await Promise.all(
            Array.from({ length: end - start }, (_, j) => {
              const idx = start + j;
              const pad = String(idx + 1).padStart(4, "0");
              return fetch(`/frames/${variant}/frame-${pad}.${ext}`)
                .then((r) => r.blob())
                .then((b) => createImageBitmap(b))
                .then((bmp) => {
                  frames[idx] = bmp;
                  loaded++;
                  window.dispatchEvent(
                    new CustomEvent("frames:progress", {
                      detail: { progress: loaded / total },
                    })
                  );
                });
            })
          );
        }

        async function loadAll() {
          for (let i = 0; i < total; i += BATCH) {
            await loadBatch(i);
          }
          framesRef.current = frames;
          setIsLoaded(true);
          window.dispatchEvent(new CustomEvent("frames:complete"));
        }

        loadAll();
      });
  }, []);

  // Canvas resize handler
  useEffect(() => {
    if (noFrames) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };
    resize();
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [noFrames, drawFrame]);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (!isLoaded || noFrames || !wrapperRef.current) return;
    const total = framesRef.current.length;
    if (total === 0) return;

    const obj = { frame: 0 };

    const setup = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      drawFrame(0);

      gsap.to(obj, {
        frame: total - 1,
        ease: "none",
        onUpdate() {
          const idx = Math.round(obj.frame);
          if (idx !== currentFrameRef.current) {
            currentFrameRef.current = idx;
            drawFrame(idx);
          }
        },
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate(self) {
            const progress = self.progress;

            // Hide scroll indicator after slight scroll
            if (scrollIndicatorRef.current) {
              scrollIndicatorRef.current.style.opacity =
                progress < 0.015 ? "1" : "0";
            }

            // Find current segment
            let segIdx = 0;
            for (let i = SEGMENTS.length - 1; i >= 0; i--) {
              if (progress >= SEGMENTS[i].start) {
                segIdx = i;
                break;
              }
            }
            const seg = SEGMENTS[segIdx];
            const sp = Math.max(
              0,
              Math.min(
                1,
                (progress - seg.start) / (seg.end - seg.start)
              )
            );

            // Text opacity
            let opacity = 0;
            if (sp > 0.12 && sp < 0.88) {
              if (sp < 0.22) opacity = (sp - 0.12) / 0.1;
              else if (sp > 0.78) opacity = (0.88 - sp) / 0.1;
              else opacity = 1;
            }

            // Update DOM directly — no React state in scroll loop
            if (labelWrapRef.current) {
              labelWrapRef.current.style.opacity = String(opacity);
            }
            if (labelRef.current) labelRef.current.textContent = seg.label;
            if (headlineRef.current)
              headlineRef.current.textContent = seg.headline;

            // Popup: debounce on segment midpoint
            lastScrollTimeRef.current = Date.now();
            if (popupTimerRef.current) clearTimeout(popupTimerRef.current);

            if (segIdx !== lastSegIdxRef.current) {
              lastSegIdxRef.current = segIdx;
              setActivePopup(null);
            }

            if (sp > 0.4 && sp < 0.62) {
              popupTimerRef.current = setTimeout(() => {
                if (Date.now() - lastScrollTimeRef.current >= 1400) {
                  setActivePopup(segIdx);
                }
              }, 1500);
            } else if (sp < 0.35 || sp > 0.68) {
              setActivePopup(null);
            }
          },
        },
      });
    };

    setup();

    return () => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    };
  }, [isLoaded, noFrames, drawFrame]);

  if (noFrames) return null;

  return (
    <section
      ref={wrapperRef}
      className="relative"
      id="scroll-hero"
      style={{ height: "900vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 35%, rgba(10,10,10,0.45) 100%)",
          }}
        />

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 100%)",
          }}
        />

        {/* Main text — large category label + subheadline, centered ~20% from top */}
        <div
          ref={labelWrapRef}
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-none"
          style={{
            top: "18vh",
            opacity: 0,
            width: "min(90vw, 900px)",
          }}
        >
          <h2
            ref={labelRef}
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "#ffffff",
              letterSpacing: "0.15em",
              lineHeight: 1,
              textShadow: "0 2px 40px rgba(0,0,0,0.8)",
              textTransform: "uppercase",
            }}
          >
            CARTERAS
          </h2>
          <p
            ref={headlineRef}
            className="mt-5"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "clamp(0.95rem, 2vw, 1.25rem)",
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.04em",
              textShadow: "0 1px 20px rgba(0,0,0,0.9)",
            }}
          >
            Estilo en tus manos
          </p>
        </div>

        {/* Scroll cue */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ transition: "opacity 0.5s ease" }}
        >
          <div
            className="w-px h-10 relative overflow-hidden"
            style={{ background: "rgba(245,240,232,0.15)" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "40%",
                background: "rgba(201,168,76,0.7)",
                animation: "scrollLine 1.8s ease-in-out infinite",
              }}
            />
          </div>
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-cream/60"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Scroll
          </span>
        </div>

        {/* Popup */}
        {activePopup !== null && (
          <PopupCard
            segment={SEGMENTS[activePopup]}
            onDismiss={() => setActivePopup(null)}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(150%);
          }
          100% {
            transform: translateY(250%);
          }
        }
      `}</style>
    </section>
  );
}

// ─── Popup Card ────────────────────────────────────────────────────

interface PopupCardProps {
  segment: Segment;
  onDismiss: () => void;
}

function PopupCard({ segment, onDismiss }: PopupCardProps) {
  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center"
      onClick={onDismiss}
    >
      <div
        className="frosted-card w-[92vw] max-w-[420px] p-7 rounded-sm gold-glow"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: "popupIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p
              className="text-xs tracking-[0.28em] uppercase text-gold mb-1.5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {segment.label}
            </p>
            <h3
              className="text-2xl lg:text-3xl text-cream leading-tight"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
              }}
            >
              {segment.headline}
            </h3>
          </div>
          <button
            onClick={onDismiss}
            className="text-cream/35 hover:text-cream/80 transition-colors p-1 -mt-1"
            aria-label="Cerrar"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4.5 4.5l9 9M13.5 4.5l-9 9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Product slots */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <div
                className="aspect-square flex items-center justify-center"
                style={{
                  background: "rgba(42,42,42,0.6)",
                  border: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  style={{ opacity: 0.25 }}
                >
                  <rect
                    x="2"
                    y="2"
                    width="18"
                    height="18"
                    rx="1.5"
                    stroke="#c9a84c"
                    strokeWidth="0.8"
                  />
                  <circle
                    cx="7.5"
                    cy="7.5"
                    r="2"
                    stroke="#c9a84c"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M2 14l4.5-4.5 3.5 3.5 2.5-2.5 5.5 6"
                    stroke="#c9a84c"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                className="text-cream/35 text-[10px] text-center tracking-wide"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Próximamente
              </p>
              <p
                className="text-cream/20 text-[10px] text-center"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                —
              </p>
            </div>
          ))}
        </div>

        <a
          href="https://www.instagram.com/ld_watches_"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3 text-sm tracking-[0.2em] uppercase text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
          style={{
            fontFamily: "var(--font-sans)",
            border: "1px solid rgba(201,168,76,0.5)",
          }}
        >
          Ver colección →
        </a>
      </div>

      <style jsx>{`
        @keyframes popupIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
