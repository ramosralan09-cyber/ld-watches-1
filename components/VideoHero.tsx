"use client";

import { useEffect, useRef, useState } from "react";
import LDLogo from "./LDLogo";

interface VideoHeroProps {
  onEnded: () => void;
}

const DESKTOP_SRC = "/video/new-home.mp4";
const MOBILE_SRC = "/video/new-home-mobile.mp4";

export default function VideoHero({ onEnded }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => window.innerWidth >= 1024;
    setIsDesktop(check());

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setIsDesktop(check()), 200);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
    };
  }, []);

  const src = isDesktop ? DESKTOP_SRC : MOBILE_SRC;

  return (
    <div className="absolute inset-0 bg-black">
      {(!isLoaded || isDesktop === null) && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black">
          <LDLogo size={80} variant="light" />
        </div>
      )}

      {isDesktop !== null && (
        <video
          ref={videoRef}
          key={src}
          src={src}
          autoPlay
          muted
          playsInline
          loop={false}
          onLoadedData={() => setIsLoaded(true)}
          onEnded={onEnded}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />
      )}
    </div>
  );
}
