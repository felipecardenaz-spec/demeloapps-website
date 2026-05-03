"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Data ──────────────────────────────────────────────────────── */
const CARDS = [
  {
    id: "launch",
    topLabel: "Focused Start",
    title: "Launch System",
    value: "Validate an idea or automate one critical workflow.",
    investment: "$5k – $15k",
    bestFor: "MVPs, first automations, and lean digital products.",
    includes: [
      "Discovery & scope",
      "Core product or workflow",
      "Essential integrations",
      "Launch-ready delivery",
    ],
    outcome: "Best when you need to move fast with a focused scope.",
    cta: "Start with Launch",
    featured: false,
  },
  {
    id: "growth",
    topLabel: "Most Common",
    title: "Growth System",
    value: "Connect workflows across teams and scale operations.",
    investment: "$15k – $40k",
    bestFor: "Growing companies ready for connected systems.",
    includes: [
      "Multi-workflow automation",
      "Dashboards or portals",
      "AI-assisted processes",
      "Third-party integrations",
      "Launch support",
    ],
    outcome: "Best when your business needs systems that work together.",
    cta: "Explore Growth",
    featured: true,
  },
  {
    id: "advanced",
    topLabel: "Custom Ecosystem",
    title: "Advanced System",
    value: "Build scalable platforms with deeper automation.",
    investment: "$40k+",
    bestFor: "Complex platforms, mobile/web ecosystems, and advanced AI operations.",
    includes: [
      "Custom architecture",
      "AI automation systems",
      "Web and mobile platforms",
      "Complex integrations",
      "Scalable infrastructure",
    ],
    outcome: "Best when you need a complete system built for long-term scale.",
    cta: "Plan Advanced",
    featured: false,
  },
] as const;

type CardId = typeof CARDS[number]["id"];

const COMPARISON_ROWS = [
  {
    label: "Typical scope",
    launch: "One product or workflow",
    growth: "Connected business systems",
    advanced: "Full platform ecosystem",
  },
  {
    label: "Automation depth",
    launch: "Focused automation",
    growth: "Multi-step workflows",
    advanced: "Advanced AI operations",
  },
  {
    label: "Integrations",
    launch: "Essential tools",
    growth: "Multiple platforms",
    advanced: "Complex APIs and infrastructure",
  },
  {
    label: "Product complexity",
    launch: "Lean MVP or workflow",
    growth: "Portals, dashboards, workflows",
    advanced: "Web, mobile, AI systems",
  },
  {
    label: "Delivery focus",
    launch: "Speed and validation",
    growth: "Scale and efficiency",
    advanced: "Architecture and long-term growth",
  },
  {
    label: "Ongoing scalability",
    launch: "Expandable foundation",
    growth: "Built to grow",
    advanced: "Designed for scale",
  },
] as const;

/* ─── Pricing card ──────────────────────────────────────────────── */
function PricingCard({
  card,
  active,
  hoveredId,
  onHover,
  delay,
  mobileOrder,
}: {
  card: typeof CARDS[number];
  active: boolean;
  hoveredId: CardId | null;
  onHover: (id: CardId | null) => void;
  delay: number;
  mobileOrder?: number;
}) {
  const isHovered = hoveredId === card.id;
  const isDimmed = hoveredId !== null && !isHovered;
  const f = card.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseEnter={() => onHover(card.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        flex: "1 1 0",
        minWidth: 0,
        position: "relative",
        opacity: isDimmed ? 0.82 : 1,
        transition: "opacity 240ms ease",
        zIndex: isHovered ? 2 : f ? 1 : 0,
        order: mobileOrder,
      }}
    >
      {/* Featured outer ring */}
      {f && (
        <div style={{
          position: "absolute",
          inset: "-1px",
          borderRadius: "23px",
          background: "linear-gradient(145deg, rgba(129,140,248,0.22) 0%, rgba(99,102,241,0.08) 50%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />
      )}

      {/* Card surface */}
      <div style={{
        position: "relative",
        zIndex: 1,
        height: "100%",
        borderRadius: "22px",
        padding: f ? "28px 26px 26px" : "26px 24px 24px",
        background: f
          ? isHovered
            ? "linear-gradient(155deg, rgba(99,102,241,0.12) 0%, rgba(79,70,229,0.07) 50%, rgba(255,255,255,0.03) 100%)"
            : "linear-gradient(155deg, rgba(99,102,241,0.09) 0%, rgba(79,70,229,0.05) 50%, rgba(255,255,255,0.02) 100%)"
          : isHovered
            ? "linear-gradient(155deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)"
            : "linear-gradient(155deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: f
          ? isHovered ? "1px solid rgba(129,140,248,0.35)" : "1px solid rgba(129,140,248,0.22)"
          : isHovered ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: f
          ? isHovered
            ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 20px 56px rgba(0,0,0,0.36), 0 0 0 1px rgba(99,102,241,0.10)"
            : "inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 40px rgba(0,0,0,0.28), 0 0 0 1px rgba(99,102,241,0.06)"
          : isHovered
            ? "inset 0 1px 0 rgba(255,255,255,0.10), 0 10px 28px rgba(0,0,0,0.24)"
            : "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.18)",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 260ms cubic-bezier(0.22,1,0.36,1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Top shimmer */}
        <span aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: f
            ? "linear-gradient(to right, transparent, rgba(165,180,252,0.40), transparent)"
            : "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)",
          pointerEvents: "none",
        }} />

        {/* Featured inner glow */}
        {f && (
          <div aria-hidden="true" style={{
            position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)",
            width: "100%", height: "200px", borderRadius: "9999px",
            background: "radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        )}

        {/* Top label */}
        <div style={{ marginBottom: "16px" }}>
          <span style={{
            display: "inline-block",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "3px 10px",
            borderRadius: "9999px",
            color: f ? "rgba(165,180,252,0.90)" : "rgba(255,255,255,0.40)",
            background: f ? "rgba(99,102,241,0.14)" : "rgba(255,255,255,0.05)",
            border: f ? "1px solid rgba(129,140,248,0.22)" : "1px solid rgba(255,255,255,0.08)",
          }}>
            {card.topLabel}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "clamp(17px, 1.9vw, 21px)",
          fontWeight: 500,
          letterSpacing: "-0.020em",
          lineHeight: 1.18,
          color: isHovered ? "#ffffff" : "#f0f0f5",
          margin: "0 0 6px",
          transition: "color 200ms ease",
        }}>
          {card.title}
        </h3>

        {/* Value proposition */}
        <p style={{
          fontSize: "12.5px",
          fontWeight: 300,
          lineHeight: 1.60,
          color: isHovered ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.45)",
          margin: "0 0 20px",
          transition: "color 200ms ease",
        }}>
          {card.value}
        </p>

        {/* Investment */}
        <div style={{
          padding: "14px 16px",
          borderRadius: "12px",
          background: f ? "rgba(99,102,241,0.10)" : "rgba(255,255,255,0.04)",
          border: f ? "1px solid rgba(129,140,248,0.16)" : "1px solid rgba(255,255,255,0.06)",
          marginBottom: "20px",
        }}>
          <span style={{
            display: "block",
            fontSize: "8.5px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(165,180,252,0.40)",
            marginBottom: "3px",
          }}>
            Investment
          </span>
          <span style={{
            fontSize: "clamp(22px, 2.6vw, 30px)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.0,
            color: f
              ? isHovered ? "rgba(215,220,255,1.0)" : "rgba(200,208,255,0.92)"
              : isHovered ? "rgba(245,245,247,0.90)" : "rgba(245,245,247,0.72)",
            transition: "color 200ms ease",
          }}>
            {card.investment}
          </span>
        </div>

        {/* Best for */}
        <p style={{
          fontSize: "11.5px",
          fontWeight: 400,
          lineHeight: 1.55,
          color: "rgba(255,255,255,0.38)",
          margin: "0 0 18px",
          fontStyle: "italic",
        }}>
          {card.bestFor}
        </p>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: f ? "rgba(129,140,248,0.10)" : "rgba(255,255,255,0.05)",
          marginBottom: "16px",
        }} />

        {/* Includes */}
        <ul style={{
          listStyle: "none", margin: "0 0 20px", padding: 0,
          display: "flex", flexDirection: "column", gap: "7px",
          flex: 1,
        }}>
          {card.includes.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M2 6L4.5 8.5L10 3.5"
                  stroke={f ? "rgba(165,180,252,0.70)" : "rgba(129,140,248,0.45)"}
                  strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{
                fontSize: "12px",
                fontWeight: 400,
                color: isHovered ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.50)",
                transition: "color 200ms ease",
              }}>
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Outcome */}
        <p style={{
          fontSize: "11px",
          fontWeight: 300,
          lineHeight: 1.55,
          color: f ? "rgba(165,180,252,0.55)" : "rgba(255,255,255,0.30)",
          margin: "0 0 20px",
          paddingTop: "12px",
          borderTop: f ? "1px solid rgba(129,140,248,0.08)" : "1px solid rgba(255,255,255,0.04)",
        }}>
          {card.outcome}
        </p>

        {/* CTA */}
        <CTAButton label={card.cta} featured={f} hovered={isHovered} />
      </div>
    </motion.div>
  );
}

/* ─── CTA button ────────────────────────────────────────────────── */
function CTAButton({ label, featured, hovered }: { label: string; featured: boolean; hovered: boolean }) {
  const [h, setH] = useState(false);
  const active = h || hovered;

  return (
    <a
      href="#contact"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        padding: "11px 18px",
        borderRadius: "10px",
        fontSize: "12.5px",
        fontWeight: 400,
        letterSpacing: "0.02em",
        textDecoration: "none",
        color: featured
          ? active ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.85)"
          : active ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.45)",
        background: featured
          ? active
            ? "linear-gradient(170deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)"
            : "linear-gradient(170deg, #5b5ef4 0%, #4338ca 100%)"
          : active
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.04)",
        border: featured
          ? active ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(129,140,248,0.22)"
          : active ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: featured && active
          ? "inset 0 1px 0 rgba(255,255,255,0.20), 0 4px 14px -4px rgba(79,70,229,0.50)"
          : "none",
        transition: "all 240ms cubic-bezier(0.22,1,0.36,1)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {label}
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"
        style={{ transform: active ? "translateX(2px)" : "translateX(0)", transition: "transform 200ms", flexShrink: 0 }}>
        <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/* ─── Comparison panel ──────────────────────────────────────────── */
function ComparisonPanel({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="comparison"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div style={{
            marginTop: "16px",
            borderRadius: "18px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>
            {/* Header row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "14px 20px",
              gap: "12px",
            }}
              className="comparison-grid"
            >
              <div />
              {["Launch", "Growth", "Advanced"].map((col, i) => (
                <div key={col} style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: i === 1 ? "rgba(165,180,252,0.75)" : "rgba(255,255,255,0.30)",
                  textAlign: "center",
                }}>
                  {col}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {COMPARISON_ROWS.map((row, ri) => (
              <div
                key={row.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
                  padding: "13px 20px",
                  gap: "12px",
                  borderBottom: ri < COMPARISON_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  background: ri % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                }}
                className="comparison-grid"
              >
                <div style={{
                  fontSize: "11.5px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.01em",
                  display: "flex",
                  alignItems: "center",
                }}>
                  {row.label}
                </div>
                {[row.launch, row.growth, row.advanced].map((val, ci) => (
                  <div key={ci} style={{
                    fontSize: "11.5px",
                    fontWeight: 300,
                    color: ci === 1 ? "rgba(200,208,255,0.80)" : "rgba(255,255,255,0.45)",
                    textAlign: "center",
                    lineHeight: 1.50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: ci === 1 ? "4px 8px" : "0",
                    borderRadius: ci === 1 ? "6px" : "0",
                    background: ci === 1 ? "rgba(99,102,241,0.06)" : "transparent",
                  }}>
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Final CTA ─────────────────────────────────────────────────── */
function FinalCTA({ active }: { active: boolean }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
      style={{
        marginTop: "56px",
        borderRadius: "20px",
        padding: "36px 40px",
        background: "linear-gradient(145deg, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.04) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(129,140,248,0.12)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.20)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "28px",
        flexWrap: "wrap",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(to right, transparent, rgba(165,180,252,0.22), transparent)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", top: "-60%", left: "50%", transform: "translateX(-50%)",
        width: "60%", height: "200px", borderRadius: "9999px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ flex: 1, minWidth: "220px", position: "relative", zIndex: 1 }}>
        <h3 style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          fontWeight: 500,
          letterSpacing: "-0.018em",
          lineHeight: 1.25,
          color: "#f5f5f7",
          margin: "0 0 6px",
        }}>
          Not sure where your project fits?
        </h3>
        <p style={{
          fontSize: "13.5px",
          fontWeight: 300,
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.60)",
          margin: 0,
          maxWidth: "420px",
        }}>
          Book a free call and we&apos;ll help you define the right scope, timeline, and investment range.
        </p>
      </div>

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
          padding: "13px 26px",
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
          flexShrink: 0,
          zIndex: 1,
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
  const [hoveredId, setHoveredId] = useState<CardId | null>(null);
  const [comparisonOpen, setComparisonOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  /* Mobile order: growth first */
  const mobileOrderMap: Record<CardId, number> = { growth: 0, launch: 1, advanced: 2 };

  return (
    <section
      ref={sectionRef}
      id="investment"
      aria-label="Investment and Scope"
      style={{ padding: "80px 20px 100px", position: "relative", overflow: "hidden" }}
    >
      {/* Background */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(6,6,20,0.50) 50%, rgba(5,5,5,0) 100%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        left: "50%", top: "48%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "500px",
        borderRadius: "9999px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "48%", left: "10%", right: "10%",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(129,140,248,0.05), transparent)",
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
            maxWidth: "600px",
            margin: "0 auto 56px",
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
              Investment &amp; Scope
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
            Choose the right system<br />for your stage
          </h2>

          <p style={{
            fontSize: "clamp(14px, 1.4vw, 16px)",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.60)",
            margin: "0 auto",
            maxWidth: "460px",
          }}>
            Every project is tailored, but these engagement ranges help you understand what level of system fits your goals, complexity, and growth stage.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div
          ref={cardsRef}
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "stretch",
          }}
          className="pricing-cards"
        >
          {CARDS.map((card, i) => (
            <PricingCard
              key={card.id}
              card={card}
              active={cardsInView}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              delay={0.06 + i * 0.09}
              mobileOrder={mobileOrderMap[card.id]}
            />
          ))}
        </div>

        {/* ── Comparison toggle ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={cardsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.60, delay: 0.40 }}
          style={{ marginTop: "28px", display: "flex", justifyContent: "center" }}
        >
          <button
            onClick={() => setComparisonOpen((v) => !v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 18px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,0.50)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              transition: "all 220ms ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.14)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.50)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
              style={{ transform: comparisonOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 280ms ease" }}>
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {comparisonOpen ? "Hide comparison" : "Compare engagement levels"}
          </button>
        </motion.div>

        {/* ── Comparison panel ── */}
        <ComparisonPanel open={comparisonOpen} />

        {/* ── Final CTA ── */}
        <div ref={ctaRef}>
          <FinalCTA active={ctaInView} />
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .pricing-cards {
            flex-direction: column !important;
          }
          .pricing-cards > * {
            order: var(--mobile-order, 0);
          }
          .comparison-grid {
            grid-template-columns: 1fr !important;
          }
          .comparison-grid > *:first-child {
            font-weight: 600 !important;
            color: rgba(255,255,255,0.60) !important;
            padding-bottom: 4px !important;
          }
        }
      `}</style>
    </section>
  );
}
