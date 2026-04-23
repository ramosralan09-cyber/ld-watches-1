"use client";

import { useState } from "react";
import VideoHero from "./VideoHero";
import CarouselSection from "./CarouselSection";

const SESSION_KEY = "ld_hero_seen";

export default function HeroGroup() {
  // Lazy initializer runs client-side only (ssr:false parent).
  // If the session key already exists, skip the video immediately.
  const [videoEnded, setVideoEnded] = useState(() => {
    try {
      return Boolean(sessionStorage.getItem(SESSION_KEY));
    } catch {
      return false;
    }
  });

  const handleVideoEnded = () => {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* private mode */ }
    setVideoEnded(true);
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Video only mounts on first visit — unmounts once ended */}
      {!videoEnded && <VideoHero onEnded={handleVideoEnded} />}

      {/* Carousel crossfades in over the frozen last frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: videoEnded ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: videoEnded ? "auto" : "none",
          zIndex: 5,
        }}
      >
        <CarouselSection />
      </div>
    </div>
  );
}
