"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "p1",
    num: "01",
    tag: "Startup MVP",
    title: "Traderly",
    headline: "Investments and day trading, tracked in one place.",
    desc: "A trading platform built for students exploring the markets, with portfolio control, performance monitoring, and insights for smarter decisions.",
    img: "/images/work/traderly.webp",
    href: "/our-work",
    accent: "129,140,248",
  },
  {
    id: "p2",
    num: "02",
    tag: "Enterprise Solution",
    title: "The Kits Pace",
    headline: "Sales, inventory, and customers in real time.",
    desc: "An integrated ecommerce platform that centralizes sales, customers, and inventory, with automated workflows and analytics for full operational control.",
    img: "/images/work/thekitspace.webp",
    href: "/our-work",
    accent: "129,140,248",
  },
  {
    id: "p3",
    num: "03",
    tag: "Startup MVP",
    title: "StatKick",
    headline: "AI performance stats for every player.",
    desc: "Players upload game clips and receive AI generated performance stats, giving scouts a faster, data driven way to discover talent.",
    img: "/images/work/statkick.avif",
    href: "/our-work",
    accent: "129,140,248",
  },
] as const;

const INTERVAL_MS = 5500;

/* ─── Section ────────────────────────────────────────────────────── */
export function SelectedWork() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % PROJECTS.length);
    }, INTERVAL_MS);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const select = (i: number) => {
    setCurrent(i);
    startTimer();
  };

  const project = PROJECTS[current];

  return (
    <section
      aria-label="Selected Work"
      style={{ padding: isMobile ? "64px 16px" : "88px 24px", position: "relative" }}
    >
      {/* Ambient glow behind the showcase */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "40%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "600px",
        background: `radial-gradient(ellipse at 50% 50%, rgba(${project.accent},0.07) 0%, transparent 65%)`,
        pointerEvents: "none",
        transition: "background 0.8s ease",
      }} />

      <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: 20,
            marginBottom: isMobile ? 28 : 36,
          }}
        >
          <div>
            <p style={{
              fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.11em",
              textTransform: "uppercase", color: "rgba(129,140,248,0.75)",
              margin: "0 0 14px",
            }}>
              Case Studies
            </p>
            <h2 style={{
              fontSize: "clamp(22px,3vw,34px)", fontWeight: 600,
              letterSpacing: "-0.026em", lineHeight: 1.13,
              color: "#f5f5f7", margin: 0,
            }}>
              Real systems.{" "}
              <span style={{ color: "rgba(255,255,255,0.38)", fontWeight: 400 }}>
                Measurable results.
              </span>
            </h2>
          </div>
          <p style={{
            fontSize: "14px", color: "rgba(255,255,255,0.44)",
            lineHeight: 1.72, maxWidth: "260px", margin: 0,
            fontWeight: 300, flexShrink: 0,
          }}>
            A selection of recent products we designed, built, and shipped from the ground up.
          </p>
        </motion.div>

        {/* ── Showcase ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.80, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          {/* Main image stage */}
          <div style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            height: isMobile ? "220px" : "420px",
            border: `1px solid rgba(${project.accent},0.16)`,
            boxShadow: `0 0 80px rgba(${project.accent},0.08), 0 32px 80px rgba(0,0,0,0.40)`,
            transition: "border-color 0.6s ease, box-shadow 0.6s ease",
          }}>
            {/* Image with crossfade */}
            <AnimatePresence mode="wait">
              <motion.img
                key={project.id}
                src={project.img}
                alt={project.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                }}
              />
            </AnimatePresence>

            {/* Gradient vignette */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(4,4,12,0.10) 0%, rgba(4,4,12,0.20) 40%, rgba(4,4,12,0.88) 100%)",
              pointerEvents: "none",
            }} />
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgba(4,4,12,0.30) 0%, transparent 50%)",
              pointerEvents: "none",
            }} />

            {/* Project info — bottom of stage */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: isMobile ? "16px 16px 20px" : "24px 28px 28px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "flex-end",
              justifyContent: "space-between",
              gap: 20,
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id + "-text"}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.40, ease: [0.22, 1, 0.36, 1] }}
                  style={{ flex: 1, maxWidth: "560px" }}
                >
                  {/* Tag */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    marginBottom: isMobile ? 8 : 10,
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: `rgba(${project.accent},0.90)`,
                      boxShadow: `0 0 6px rgba(${project.accent},0.60)`,
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontSize: "10.5px", fontWeight: 600,
                      letterSpacing: "0.09em", textTransform: "uppercase",
                      color: "rgba(129,140,248,0.75)",
                    }}>
                      {project.tag}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 style={{
                    fontSize: isMobile ? "16px" : "clamp(17px,2vw,22px)",
                    fontWeight: 600, letterSpacing: "-0.022em",
                    lineHeight: 1.22, color: "#f5f5f7",
                    margin: "0 0 10px",
                  }}>
                    {project.headline}
                  </h3>

                  {/* Description */}
                  {!isMobile && (
                    <p style={{
                      fontSize: "13px", color: "rgba(255,255,255,0.54)",
                      lineHeight: 1.68, margin: "0 0 16px", fontWeight: 300,
                    }}>
                      {project.desc}
                    </p>
                  )}

                  {/* View link */}
                  <ViewLink href={project.href} accent={project.accent} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Project selector tabs ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: "2px",
            marginTop: "12px",
          }}>
            {PROJECTS.map((p, i) => {
              const isActive = i === current;
              return (
                <button
                  key={p.id}
                  onClick={() => select(i)}
                  aria-label={`View ${p.title}`}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    padding: isMobile ? "10px 14px" : "13px 16px",
                    borderRadius: "12px",
                    background: isActive
                      ? `rgba(${p.accent},0.07)`
                      : "rgba(255,255,255,0.02)",
                    border: `1px solid rgba(${isActive ? p.accent : "255,255,255"},${isActive ? 0.18 : 0.05})`,
                    transition: "all 0.28s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Progress bar */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: `rgba(${p.accent},0.10)`,
                    borderRadius: "2px 2px 0 0",
                  }}>
                    {isActive && (
                      <motion.div
                        key={`bar-${i}-${current}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
                        style={{
                          position: "absolute", inset: 0,
                          background: `rgba(${p.accent},0.90)`,
                          transformOrigin: "left",
                          borderRadius: "2px 2px 0 0",
                        }}
                      />
                    )}
                  </div>

                  {/* Number + title */}
                  <div style={{
                    display: "flex", alignItems: "center",
                    gap: 10, marginTop: 2,
                  }}>
                    <span style={{
                      fontSize: "10px", fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: isActive ? "rgba(129,140,248,0.75)" : "rgba(255,255,255,0.24)",
                      transition: "color 0.28s ease",
                      flexShrink: 0,
                    }}>
                      {p.num}
                    </span>
                    <span style={{
                      fontSize: "13px", fontWeight: isActive ? 500 : 400,
                      letterSpacing: "-0.01em",
                      color: isActive ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.38)",
                      transition: "color 0.28s ease",
                      whiteSpace: "nowrap" as const,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                      {p.title}
                    </span>
                  </div>

                  {/* Tag — only on desktop */}
                  {!isMobile && (
                    <span style={{
                      fontSize: "11px", fontWeight: 300,
                      color: isActive ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.20)",
                      marginTop: 4, letterSpacing: "0.01em",
                      transition: "color 0.28s ease",
                    }}>
                      {p.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.60, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          style={{ display: "flex", justifyContent: "center", marginTop: isMobile ? 28 : 40 }}
        >
          <ViewAllBtn href="/our-work" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── View case study link ───────────────────────────────────────── */
function ViewLink({ href, accent }: { href: string; accent: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center",
        gap: hov ? "8px" : "6px",
        padding: "8px 16px",
        borderRadius: "100px",
        background: hov ? `rgba(${accent},0.14)` : `rgba(${accent},0.08)`,
        border: `1px solid rgba(${accent},${hov ? 0.35 : 0.20})`,
        fontSize: "12.5px", fontWeight: 500,
        color: "rgba(129,140,248,0.75)",
        textDecoration: "none",
        letterSpacing: "0.01em",
        transition: "all 0.22s ease",
      }}
    >
      View case study
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path d="M2 9l7-7M3.5 2H9v5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* ─── Bottom CTA ─────────────────────────────────────────────────── */
function ViewAllBtn({ href }: { href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      aria-label="View all our work"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center",
        gap: hov ? "11px" : "8px",
        padding: "13px 30px",
        borderRadius: "100px",
        border: `1px solid rgba(255,255,255,${hov ? 0.16 : 0.09})`,
        background: `rgba(255,255,255,${hov ? 0.06 : 0.025})`,
        color: `rgba(255,255,255,${hov ? 0.88 : 0.58})`,
        fontSize: "14px", fontWeight: 500,
        letterSpacing: "-0.01em",
        textDecoration: "none",
        transition: "all 0.24s ease",
      }}
    >
      View all case studies
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}
