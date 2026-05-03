"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Data ──────────────────────────────────────────────────────── */
const BLOCKS = [
  {
    id: "launch",
    position: "left" as const,
    label: "Focused Systems",
    title: "Launch System",
    description: "Lean systems for validation and targeted automation.",
    investment: "$5k – $15k",
    bullets: ["MVP builds", "Core automation", "Essential integrations"],
  },
  {
    id: "growth",
    position: "center" as const,
    label: "Most Common",
    title: "Growth System",
    description: "Connected systems to scale business operations.",
    investment: "$15k – $40k",
    bullets: ["Multi workflows", "Dashboards", "AI-assisted processes", "Integrations"],
  },
  {
    id: "advanced",
    position: "right" as const,
    label: "Full Systems",
    title: "Advanced Systems",
    description: "Scalable ecosystems with advanced automation.",
    investment: "$40k+",
    bullets: ["Custom architecture", "AI systems", "Complex platforms"],
  },
] as const;

type BlockId = typeof BLOCKS[number]["id"];

/* ─── Animated signal flow ──────────────────────────────────────── */
function SignalFlow({ t }: { t: number }) {
  const progress = (t * 0.18) % 1;
  const x = progress * 100;
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "visible",
      }}
      preserveAspectRatio="none"
    >
      {/* Structural horizontal line */}
      <line
        x1="0%" y1="52%"
        x2="100%" y2="52%"
        stroke="rgba(129,140,248,0.05)"
        strokeWidth="1"
        strokeDasharray="6 12"
      />
      {/* Left–center connector */}
      <line x1="30%" y1="52%" x2="38%" y2="52%"
        stroke="rgba(129,140,248,0.09)" strokeWidth="0.8" />
      {/* Center–right connector */}
      <line x1="62%" y1="52%" x2="70%" y2="52%"
        stroke="rgba(129,140,248,0.09)" strokeWidth="0.8" />
      {/* Junction dots */}
      <circle cx="38%" cy="52%" r="2" fill="rgba(129,140,248,0.18)" />
      <circle cx="62%" cy="52%" r="2" fill="rgba(129,140,248,0.18)" />
      {/* Animated signal dot */}
      <circle
        cx={`${x}%`}
        cy="52%"
        r="2.5"
        fill="rgba(165,180,252,0.35)"
        style={{ filter: "blur(0.5px)" }}
      />
    </svg>
  );
}

/* ─── System block ──────────────────────────────────────────────── */
function SystemBlock({
  block,
  active,
  hoveredId,
  onHover,
  delay,
  t,
}: {
  block: typeof BLOCKS[number];
  active: boolean;
  hoveredId: BlockId | null;
  onHover: (id: BlockId | null) => void;
  delay: number;
  t: number;
}) {
  const isCenter = block.position === "center";
  const isLeft = block.position === "left";
  const isDimmed = hoveredId !== null && hoveredId !== block.id;
  const isHovered = hoveredId === block.id;

  /* Vertical offset: left lower, right higher, center neutral */
  const verticalOffset = isCenter ? 0 : isLeft ? 32 : -16;

  return (
    <motion.div
      initial={{ opacity: 0, y: isCenter ? 28 : 20 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: isCenter ? 28 : 20 }}
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseEnter={() => onHover(block.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        flex: isCenter ? "1.22" : "1",
        minWidth: 0,
        position: "relative",
        marginTop: `${verticalOffset}px`,
        opacity: isDimmed ? 0.42 : 1,
        transition: "opacity 280ms ease",
        zIndex: isHovered ? 3 : isCenter ? 2 : 1,
      }}
    >
      {/* Outer depth layer */}
      <div style={{
        position: "absolute",
        inset: isCenter ? "-6px" : "-4px",
        borderRadius: isCenter ? "28px" : "22px",
        background: isCenter
          ? "linear-gradient(145deg, rgba(99,102,241,0.06) 0%, transparent 60%)"
          : "linear-gradient(145deg, rgba(255,255,255,0.02) 0%, transparent 60%)",
        border: isCenter
          ? "1px solid rgba(99,102,241,0.08)"
          : "1px solid rgba(255,255,255,0.03)",
        pointerEvents: "none",
      }} />

      {/* Main surface */}
      <div style={{
        position: "relative",
        borderRadius: isCenter ? "22px" : "18px",
        padding: isCenter ? "40px 34px 36px" : "30px 26px 28px",
        background: isCenter
          ? isHovered
            ? "linear-gradient(160deg, rgba(99,102,241,0.11) 0%, rgba(79,70,229,0.06) 50%, rgba(255,255,255,0.03) 100%)"
            : "linear-gradient(160deg, rgba(99,102,241,0.08) 0%, rgba(79,70,229,0.04) 50%, rgba(255,255,255,0.02) 100%)"
          : isHovered
            ? "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)"
            : "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: isCenter
          ? isHovered
            ? "1px solid rgba(129,140,248,0.30)"
            : "1px solid rgba(129,140,248,0.18)"
          : isHovered
            ? "1px solid rgba(255,255,255,0.14)"
            : "1px solid rgba(255,255,255,0.07)",
        boxShadow: isCenter
          ? isHovered
            ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 20px 60px rgba(0,0,0,0.36), 0 0 0 1px rgba(99,102,241,0.10)"
            : "inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 40px rgba(0,0,0,0.28), 0 0 0 1px rgba(99,102,241,0.06)"
          : isHovered
            ? "inset 0 1px 0 rgba(255,255,255,0.10), 0 10px 30px rgba(0,0,0,0.26)"
            : "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.18)",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 270ms cubic-bezier(0.22,1,0.36,1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Top shimmer */}
        <span aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: isCenter
            ? "linear-gradient(to right, transparent 0%, rgba(165,180,252,0.35) 50%, transparent 100%)"
            : "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* Center inner glow */}
        {isCenter && (
          <div aria-hidden="true" style={{
            position: "absolute", top: "-60%", left: "50%", transform: "translateX(-50%)",
            width: "100%", height: "220px", borderRadius: "9999px",
            background: "radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        )}

        {/* Label */}
        <div style={{ marginBottom: isCenter ? "16px" : "12px" }}>
          <span style={{
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: isCenter ? "rgba(165,180,252,0.65)" : "rgba(255,255,255,0.28)",
            display: "inline-block",
            paddingBottom: "8px",
            borderBottom: isCenter
              ? "1px solid rgba(129,140,248,0.18)"
              : "1px solid rgba(255,255,255,0.06)",
          }}>
            {block.label}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: isCenter ? "clamp(20px, 2.2vw, 24px)" : "clamp(16px, 1.8vw, 19px)",
          fontWeight: 500,
          letterSpacing: "-0.020em",
          lineHeight: 1.18,
          color: isHovered ? "#ffffff" : "#f0f0f5",
          margin: "0 0 8px",
          transition: "color 220ms ease",
        }}>
          {block.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: isCenter ? "13px" : "12px",
          fontWeight: 300,
          lineHeight: 1.65,
          color: isHovered ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.42)",
          margin: "0 0 28px",
          transition: "color 220ms ease",
        }}>
          {block.description}
        </p>

        {/* Investment — visually dominant */}
        <div style={{
          marginBottom: "28px",
          paddingBottom: "24px",
          borderBottom: isCenter
            ? "1px solid rgba(129,140,248,0.10)"
            : "1px solid rgba(255,255,255,0.05)",
        }}>
          <span style={{
            display: "block",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(165,180,252,0.40)",
            marginBottom: "4px",
          }}>
            Investment
          </span>
          <span style={{
            display: "block",
            fontSize: isCenter ? "clamp(28px, 3.2vw, 38px)" : "clamp(22px, 2.5vw, 30px)",
            fontWeight: 600,
            letterSpacing: "-0.030em",
            lineHeight: 1.0,
            color: isCenter
              ? isHovered ? "rgba(215,220,255,1.0)" : "rgba(200,208,255,0.92)"
              : isHovered ? "rgba(245,245,247,0.92)" : "rgba(245,245,247,0.68)",
            transition: "color 220ms ease",
          }}>
            {block.investment}
          </span>
        </div>

        {/* Bullets */}
        <ul style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: isCenter ? "9px" : "7px",
        }}>
          {block.bullets.map((b) => (
            <li key={b} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                width: isCenter ? "5px" : "4px",
                height: isCenter ? "5px" : "4px",
                borderRadius: "50%",
                flexShrink: 0,
                background: isCenter
                  ? isHovered ? "rgba(165,180,252,0.80)" : "rgba(129,140,248,0.55)"
                  : isHovered ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.20)",
                transition: "background 220ms ease",
              }} />
              <span style={{
                fontSize: isCenter ? "12.5px" : "11.5px",
                fontWeight: 400,
                color: isHovered ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.38)",
                letterSpacing: "0.01em",
                transition: "color 220ms ease",
              }}>
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ─── CTA block ─────────────────────────────────────────────────── */
function CTABlock({ active }: { active: boolean }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
      style={{
        marginTop: "72px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <h3 style={{
        fontSize: "clamp(18px, 2.2vw, 24px)",
        fontWeight: 500,
        letterSpacing: "-0.020em",
        lineHeight: 1.22,
        color: "#f0f0f5",
        margin: 0,
      }}>
        Define your system and scope
      </h3>
      <p style={{
        fontSize: "14px",
        fontWeight: 300,
        lineHeight: 1.65,
        color: "rgba(255,255,255,0.55)",
        margin: "0 0 20px",
        maxWidth: "380px",
      }}>
        We&apos;ll help you map the right approach, timeline, and investment.
      </p>
      <a
        href="#contact"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "14px 28px",
          borderRadius: "12px",
          fontSize: "13px",
          fontWeight: 400,
          letterSpacing: "0.02em",
          textDecoration: "none",
          color: "rgba(255,255,255,0.94)",
          background: hov
            ? "linear-gradient(170deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)"
            : "linear-gradient(170deg, #5b5ef4 0%, #4338ca 100%)",
          boxShadow: hov
            ? "inset 0 1px 0 rgba(255,255,255,0.28), 0 6px 20px -4px rgba(79,70,229,0.55)"
            : "inset 0 1px 0 rgba(255,255,255,0.14)",
          border: hov ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.10)",
          transform: hov ? "scale(1.02)" : "scale(1)",
          transition: "all 260ms cubic-bezier(0.22,1,0.36,1)",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <span aria-hidden="true" style={{
          position: "absolute", top: 0, bottom: 0, width: "60%",
          left: hov ? "120%" : "-60%",
          transform: "skewX(-12deg)",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
          transition: "left 500ms cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
        }} />
        Book a Free Call
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"
          style={{ transform: hov ? "translateX(2px)" : "translateX(0)", transition: "transform 200ms", flexShrink: 0 }}>
          <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </motion.div>
  );
}

/* ─── Main export ───────────────────────────────────────────────── */
export function Pricing() {
  const [hoveredId, setHoveredId] = useState<BlockId | null>(null);
  const [t, setT] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const blocksInView = useInView(blocksRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (!start) start = ts;
      setT((ts - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="investment"
      aria-label="Investment Architecture"
      style={{ padding: "80px 20px 100px", position: "relative", overflow: "hidden" }}
    >
      {/* Background layers */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(6,6,20,0.55) 50%, rgba(5,5,5,0) 100%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      {/* Faint structural horizontal line */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "52%", left: "8%", right: "8%",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(129,140,248,0.05), transparent)",
        pointerEvents: "none", zIndex: 0,
      }} />
      {/* Center radial depth */}
      <div aria-hidden="true" style={{
        position: "absolute",
        left: "50%", top: "52%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "500px",
        borderRadius: "9999px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.055) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "1050px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: "center",
            maxWidth: "620px",
            margin: "0 auto 64px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <span style={{ display: "inline-block", width: "20px", height: "1px", background: "rgba(129,140,248,0.45)" }} />
            <span style={{
              fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(129,140,248,0.70)",
            }}>
              Investment &amp; System Scope
            </span>
            <span style={{ display: "inline-block", width: "20px", height: "1px", background: "rgba(129,140,248,0.45)" }} />
          </div>

          <h2 style={{
            fontSize: "clamp(28px, 3.8vw, 44px)",
            fontWeight: 500,
            letterSpacing: "-0.030em",
            lineHeight: 1.14,
            color: "#f0f0f5",
            margin: 0,
          }}>
            Built for different<br />levels of complexity
          </h2>

          <p style={{
            fontSize: "clamp(14px, 1.4vw, 16px)",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.60)",
            margin: "0 auto",
            maxWidth: "480px",
          }}>
            From focused systems to full-scale platforms, each engagement is structured around your business needs, system complexity, and long-term goals.
          </p>
        </motion.div>

        {/* ── Blocks ── */}
        <div
          ref={blocksRef}
          style={{ position: "relative" }}
        >
          {/* Signal flow layer */}
          <div
            aria-hidden="true"
            className="pricing-signal"
            style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
          >
            <SignalFlow t={t} />
          </div>

          <div
            style={{
              display: "flex",
              gap: "18px",
              alignItems: "flex-start",
              position: "relative",
              zIndex: 1,
            }}
            className="pricing-blocks"
          >
            {BLOCKS.map((block, i) => (
              <SystemBlock
                key={block.id}
                block={block}
                active={blocksInView}
                hoveredId={hoveredId}
                onHover={setHoveredId}
                delay={0.06 + i * 0.10}
                t={t}
              />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div ref={ctaRef}>
          <CTABlock active={ctaInView} />
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .pricing-blocks {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .pricing-blocks > * {
            flex: 1 1 auto !important;
            margin-top: 0 !important;
          }
          .pricing-signal {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
