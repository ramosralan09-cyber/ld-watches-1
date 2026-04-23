"use client";

import { useState } from "react";
import VideoHero from "./VideoHero";
import CarouselSection from "./CarouselSection";

export default function HeroGroup() {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Video layer — freezes on last frame when ended */}
      <VideoHero onEnded={() => setVideoEnded(true)} />

      {/* Carousel overlay — crossfades in over frozen last frame */}
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
