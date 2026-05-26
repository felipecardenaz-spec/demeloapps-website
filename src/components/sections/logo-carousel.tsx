"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const LOGOS = [
  { src: "/logos/image 52.png", alt: "Statkick", height: 55 },
  { src: "/logos/image 53.png", alt: "Traderly", height: 41 },
  { src: "/logos/image 54.png", alt: "SummitFlow", height: 42 },
  { src: "/logos/image 55.png", alt: "The Kits Pace", height: 49 },
  { src: "/logos/image 56.png", alt: "WorkWise", height: 37 },
  { src: "/logos/image 57.png", alt: "Level company", height: 47 },
  { src: "/logos/image 58.png", alt: "shaker", height: 35 },
  { src: "/logos/image 59.png", alt: "ED Pro", height: 41 },
  { src: "/logos/image 60.png", alt: "BluePeak", height: 39 },
];

const SPEED = 0.5;
const LOGO_GAP = 50;

export function LogoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const singleWidthRef = useRef(0);
  const cachedCentersRef = useRef<number[]>([]);
  const cachedItemsRef = useRef<HTMLElement[]>([]);
  const containerWidthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    let isVisible = true;

    const loop = () => {
      const singleW = singleWidthRef.current;
      if (singleW > 0) {
        offsetRef.current += SPEED;
        if (offsetRef.current >= singleW) offsetRef.current -= singleW;

        track.style.transform = `translateX(-${offsetRef.current}px)`;

        const center = containerWidthRef.current / 2;
        const centers = cachedCentersRef.current;
        const items = cachedItemsRef.current;
        const offset = offsetRef.current;

        for (let i = 0; i < items.length; i++) {
          const vc = centers[i] - offset;
          const dist = Math.abs(vc - center);
          const t = Math.min(dist / (center * 0.85), 1);
          items[i].style.transform = `scale(${(1.1 - t * 0.22).toFixed(4)})`;
          items[i].style.opacity = (1.0 - t * 0.60).toFixed(4);
        }
      }

      if (isVisible) rafRef.current = requestAnimationFrame(loop);
    };

    const resume = () => {
      if (!isVisible || document.hidden) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    const pause = () => cancelAnimationFrame(rafRef.current);

    // Measure item positions once after layout — no DOM reads in the hot loop
    rafRef.current = requestAnimationFrame(() => {
      singleWidthRef.current = track.scrollWidth / 3;
      containerWidthRef.current = container.offsetWidth;
      const items = Array.from(track.querySelectorAll<HTMLElement>("[data-logo-item]"));
      cachedItemsRef.current = items;
      const containerLeft = container.getBoundingClientRect().left;
      cachedCentersRef.current = items.map(item => {
        const r = item.getBoundingClientRect();
        return r.left - containerLeft + r.width / 2;
      });
      resume();
    });

    const io = new IntersectionObserver(([e]) => {
      isVisible = e.isIntersecting;
      if (isVisible) resume(); else pause();
    }, { threshold: 0 });
    io.observe(container);

    const onVis = () => { if (document.hidden) pause(); else resume(); };
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(() => {
      containerWidthRef.current = container.offsetWidth;
    });
    ro.observe(container);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <section
      aria-label="Trusted by"
      style={{ padding: "52px 0 80px", position: "relative" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ textAlign: "center", marginBottom: "52px", padding: "0 20px" }}
      >
        <h2 style={{
          fontSize: "clamp(22px, 4vw, 30px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "#f5f5f7",
          margin: 0,
          lineHeight: 1.2,
        }}>
          Trusted by Ambitious Companies
        </h2>
        <p style={{
          marginTop: "10px",
          fontSize: "clamp(14px, 2vw, 16px)",
          fontWeight: 400,
          color: "rgba(255,255,255,0.80)",
          lineHeight: 1.6,
          margin: "10px 0 0",
        }}>
          Startups and growing teams rely on DeMelo Apps to build products, automate workflows, and scale.
        </p>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
      >
      <div
        ref={containerRef}
        style={{
          position: "relative",
          overflow: "hidden",
          maxWidth: "900px",
          margin: "-50px auto",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: `${LOGO_GAP}px`,
            willChange: "transform",
            width: "max-content",
            padding: "20px 0",
          }}
        >
          {[0, 1, 2].flatMap((copy) =>
            LOGOS.map((logo, i) => (
              <LogoItem key={`${copy}-${i}`} src={logo.src} alt={logo.alt} height={logo.height} />
            ))
          )}
        </div>
      </div>
      </motion.div>
    </section>
  );
}

function LogoItem({ src, alt, height }: { src: string; alt: string; height: number }) {
  // Estimate width from height to keep aspect ratio reasonable
  const width = Math.round(height * 3.5);

  return (
    <div
      data-logo-item=""
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transformOrigin: "center center",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          height: `${height}px`,
          width: "auto",
          maxWidth: `${width}px`,
          objectFit: "contain",
          display: "block",
          // Keep logos white/light — they're already light-gray PNGs
          filter: "brightness(1.1)",
        }}
        draggable={false}
      />
    </div>
  );
}
