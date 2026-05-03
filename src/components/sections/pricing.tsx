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
    cta: "Start a Project",
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
    cta: "Get a Proposal",
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
    cta: "Discuss Your System",
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

/* ─── Card CTA button ───────────────────────────────────────────── */
function CardCTA({ label, featured }: { label: string; featured: boolean }) {
  const [h, setH] = useState(false);

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
        padding: "12px 18px",
        borderRadius: "10px",
        fontSize: "12.5px",
        fontWeight: 400,
        letterSpacing: "0.02em",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
        color: featured
          ? "rgba(255,255,255,0.96)"
          : h ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.50)",
        background: featured
          ? h
            ? "linear-gradient(170deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)"
            : "linear-gradient(170deg, #5b5ef4 0%, #4338ca 100%)"
          : h
            ? "rgba(255,255,255,0.07)"
            : "rgba(255,255,255,0.03)",
        border: featured
          ? h ? "1px solid rgba(255,255,255,0.20)" : "1px solid rgba(129,140,248,0.28)"
          : h ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: featured
          ? h
            ? "inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 16px -4px rgba(79,70,229,0.55)"
            : "inset 0 1px 0 rgba(255,255,255,0.14), 0 2px 8px -2px rgba(79,70,229,0.30)"
          : "none",
        transition: "all 240ms cubic-bezier(0.22,1,0.36,1)",
        whiteSpace: "nowrap",
      }}
    >
      {featured && (
        <span aria-hidden="true" style={{
          position: "absolute", top: 0, bottom: 0, width: "60%",
          left: h ? "120%" : "-60%",
          transform: "skewX(-12deg)",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
          transition: "left 480ms cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
        }} />
      )}
      {label}
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"
        style={{ transform: h ? "translateX(2px)" : "translateX(0)", transition: "transform 200ms", flexShrink: 0 }}>
        <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/* ─── Pricing card ──────────────────────────────────────────────── */
function PricingCard({
  card,
  active,
  hoveredId,
  onHover,
  delay,
}: {
  card: typeof CARDS[number];
  active: boolean;
  hoveredId: CardId | null;
  onHover: (id: CardId | null) => void;
  delay: number;
}) {
  const isHovered = hoveredId === card.id;
  const isDimmed = hoveredId !== null && !isHovered;
  const f = card.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseEnter={() => onHover(card.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        flex: "1 1 0",
        minWidth: 0,
        position: "relative",
        opacity: isDimmed ? 0.88 : 1,
        transition: "opacity 260ms ease",
        zIndex: isHovered ? 3 : f ? 2 : 1,
      }}
    >
      {/* Featured outer gradient ring */}
      {f && (
        <div style={{
          position: "absolute",
          inset: "-1px",
          borderRadius: "24px",
          background: "linear-gradient(145deg, rgba(129,140,248,0.28) 0%, rgba(99,102,241,0.10) 40%, rgba(139,92,246,0.06) 100%)",
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
        padding: "28px 24px 24px",
        background: f
          ? isHovered
            ? "linear-gradient(170deg, rgba(99,102,241,0.14) 0%, rgba(79,70,229,0.08) 40%, rgba(15,15,30,0.95) 100%)"
            : "linear-gradient(170deg, rgba(99,102,241,0.10) 0%, rgba(79,70,229,0.06) 40%, rgba(12,12,26,0.96) 100%)"
          : isHovered
            ? "linear-gradient(170deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 40%, rgba(10,10,20,0.96) 100%)"
            : "linear-gradient(170deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 40%, rgba(8,8,18,0.97) 100%)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: f
          ? isHovered ? "1px solid rgba(129,140,248,0.38)" : "1px solid rgba(129,140,248,0.22)"
          : isHovered ? "1px solid rgba(255,255,255,0.13)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: f
          ? isHovered
            ? "inset 0 1px 0 rgba(255,255,255,0.14), 0 24px 64px rgba(0,0,0,0.40), 0 0 0 1px rgba(99,102,241,0.12)"
            : "inset 0 1px 0 rgba(255,255,255,0.09), 0 14px 44px rgba(0,0,0,0.32), 0 0 0 1px rgba(99,102,241,0.07)"
          : isHovered
            ? "inset 0 1px 0 rgba(255,255,255,0.09), 0 12px 32px rgba(0,0,0,0.28)"
            : "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 18px rgba(0,0,0,0.20)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 260ms cubic-bezier(0.22,1,0.36,1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Top shimmer line */}
        <span aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: f
            ? "linear-gradient(to right, transparent 0%, rgba(165,180,252,0.45) 50%, transparent 100%)"
            : "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* Featured inner glow */}
        {f && (
          <div aria-hidden="true" style={{
            position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)",
            width: "110%", height: "220px", borderRadius: "9999px",
            background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        )}

        {/* Top label */}
        <div style={{ marginBottom: "18px" }}>
          <span style={{
            display: "inline-block",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            padding: "3px 10px",
            borderRadius: "9999px",
            color: f ? "rgba(165,180,252,0.92)" : "rgba(255,255,255,0.38)",
            background: f ? "rgba(99,102,241,0.16)" : "rgba(255,255,255,0.05)",
            border: f ? "1px solid rgba(129,140,248,0.24)" : "1px solid rgba(255,255,255,0.08)",
          }}>
            {card.topLabel}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "clamp(17px, 1.9vw, 21px)",
          fontWeight: 500,
          letterSpacing: "-0.022em",
          lineHeight: 1.18,
          color: isHovered ? "#ffffff" : f ? "rgba(245,245,250,0.96)" : "rgba(240,240,245,0.88)",
          margin: "0 0 6px",
          transition: "color 220ms ease",
        }}>
          {card.title}
        </h3>

        {/* Value proposition */}
        <p style={{
          fontSize: "12.5px",
          fontWeight: 300,
          lineHeight: 1.62,
          color: isHovered ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.42)",
          margin: "0 0 22px",
          transition: "color 220ms ease",
        }}>
          {card.value}
        </p>

        {/* Investment */}
        <div style={{
          padding: "14px 16px",
          borderRadius: "12px",
          background: f ? "rgba(99,102,241,0.11)" : "rgba(255,255,255,0.04)",
          border: f ? "1px solid rgba(129,140,248,0.18)" : "1px solid rgba(255,255,255,0.06)",
          marginBottom: "22px",
          position: "relative",
          overflow: "hidden",
        }}>
          {f && (
            <span aria-hidden="true" style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "1px",
              background: "linear-gradient(to right, transparent, rgba(165,180,252,0.25), transparent)",
              pointerEvents: "none",
            }} />
          )}
          <span style={{
            display: "block",
            fontSize: "8.5px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: f ? "rgba(165,180,252,0.45)" : "rgba(255,255,255,0.25)",
            marginBottom: "4px",
          }}>
            Investment
          </span>
          <span style={{
            fontSize: "clamp(22px, 2.6vw, 30px)",
            fontWeight: 600,
            letterSpacing: "-0.028em",
            lineHeight: 1.0,
            color: f
              ? isHovered ? "rgba(215,222,255,1.0)" : "rgba(200,210,255,0.94)"
              : isHovered ? "rgba(245,245,247,0.92)" : "rgba(245,245,247,0.70)",
            transition: "color 220ms ease",
          }}>
            {card.investment}
          </span>
        </div>

        {/* Best for */}
        <p style={{
          fontSize: "11.5px",
          fontWeight: 400,
          lineHeight: 1.55,
          color: "rgba(255,255,255,0.35)",
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
          listStyle: "none", margin: "0 0 22px", padding: 0,
          display: "flex", flexDirection: "column", gap: "8px",
          flex: 1,
        }}>
          {card.includes.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M2 6L4.5 8.5L10 3.5"
                  stroke={f ? "rgba(165,180,252,0.72)" : "rgba(129,140,248,0.42)"}
                  strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{
                fontSize: "12px",
                fontWeight: 400,
                color: isHovered ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.48)",
                transition: "color 220ms ease",
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
          color: f ? "rgba(165,180,252,0.52)" : "rgba(255,255,255,0.28)",
          margin: "0 0 20px",
          paddingTop: "12px",
          borderTop: f ? "1px solid rgba(129,140,248,0.08)" : "1px solid rgba(255,255,255,0.04)",
        }}>
          {card.outcome}
        </p>

        {/* CTA */}
        <CardCTA label={card.cta} featured={f} />
      </div>
    </motion.div>
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
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div style={{
            marginTop: "16px",
            borderRadius: "18px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "linear-gradient(170deg, rgba(255,255,255,0.04) 0%, rgba(8,8,18,0.96) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}>
            {/* Header row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "14px 24px",
              gap: "12px",
              background: "rgba(255,255,255,0.02)",
            }}
              className="comp-row"
            >
              <div />
              {(["Launch", "Growth", "Advanced"] as const).map((col, i) => (
                <div key={col} style={{
                  fontSize: "9.5px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: i === 1 ? "rgba(165,180,252,0.80)" : "rgba(255,255,255,0.28)",
                  textAlign: "center",
                  padding: i === 1 ? "3px 8px" : "3px 0",
                  borderRadius: i === 1 ? "6px" : "0",
                  background: i === 1 ? "rgba(99,102,241,0.08)" : "transparent",
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
                  gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
                  padding: "12px 24px",
                  gap: "12px",
                  borderBottom: ri < COMPARISON_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  background: ri % 2 === 1 ? "rgba(255,255,255,0.01)" : "transparent",
                  alignItems: "center",
                }}
                className="comp-row"
              >
                <div style={{
                  fontSize: "11.5px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.52)",
                  letterSpacing: "0.01em",
                }}>
                  {row.label}
                </div>
                {([row.launch, row.growth, row.advanced] as const).map((val, ci) => (
                  <div key={ci} style={{
                    fontSize: "11.5px",
                    fontWeight: 300,
                    color: ci === 1 ? "rgba(200,210,255,0.82)" : "rgba(255,255,255,0.42)",
                    textAlign: "center",
                    lineHeight: 1.50,
                    padding: ci === 1 ? "5px 8px" : "0",
                    borderRadius: ci === 1 ? "7px" : "0",
                    background: ci === 1 ? "rgba(99,102,241,0.07)" : "transparent",
                    border: ci === 1 ? "1px solid rgba(129,140,248,0.08)" : "none",
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
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
      style={{
        marginTop: "60px",
        borderRadius: "20px",
        padding: "40px 44px",
        background: "linear-gradient(145deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(129,140,248,0.13)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 10px 36px rgba(0,0,0,0.22)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "32px",
        flexWrap: "wrap",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(to right, transparent, rgba(165,180,252,0.24), transparent)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", top: "-60%", left: "50%", transform: "translateX(-50%)",
        width: "60%", height: "200px", borderRadius: "9999px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ flex: 1, minWidth: "220px", position: "relative", zIndex: 1 }}>
        <h3 style={{
          fontSize: "clamp(17px, 2.1vw, 22px)",
          fontWeight: 500,
          letterSpacing: "-0.020em",
          lineHeight: 1.22,
          color: "#f5f5f7",
          margin: "0 0 8px",
        }}>
          Not sure which system fits your needs?
        </h3>
        <p style={{
          fontSize: "13.5px",
          fontWeight: 300,
          lineHeight: 1.68,
          color: "rgba(255,255,255,0.58)",
          margin: 0,
          maxWidth: "400px",
        }}>
          We&apos;ll help you define the right scope, timeline, and investment.
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
          padding: "14px 28px",
          borderRadius: "12px",
          fontSize: "13.5px",
          fontWeight: 400,
          letterSpacing: "0.02em",
          textDecoration: "none",
          color: "rgba(255,255,255,0.96)",
          background: hov
            ? "linear-gradient(170deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)"
            : "linear-gradient(170deg, #5b5ef4 0%, #4338ca 100%)",
          boxShadow: hov
            ? "inset 0 1px 0 rgba(255,255,255,0.28), 0 8px 24px -4px rgba(79,70,229,0.60)"
            : "inset 0 1px 0 rgba(255,255,255,0.16), 0 4px 14px -4px rgba(79,70,229,0.35)",
          border: hov ? "1px solid rgba(255,255,255,0.20)" : "1px solid rgba(129,140,248,0.28)",
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
        background: "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(6,6,20,0.52) 50%, rgba(5,5,5,0) 100%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        left: "50%", top: "48%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "500px",
        borderRadius: "9999px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.055) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "48%", left: "8%", right: "8%",
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
            color: "rgba(255,255,255,0.58)",
            margin: "0 auto",
            maxWidth: "460px",
          }}>
            Every project is tailored, but these engagement ranges help you understand what level of system fits your goals, complexity, and growth stage.
          </p>
        </motion.div>

        {/* ── Desktop cards ── */}
        <div
          ref={cardsRef}
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "stretch",
          }}
          className="pricing-desktop"
        >
          {CARDS.map((card, i) => (
            <PricingCard
              key={card.id}
              card={card}
              active={cardsInView}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              delay={0.06 + i * 0.09}
            />
          ))}
        </div>

        {/* ── Mobile carousel ── */}
        <div
          ref={cardsRef}
          className="pricing-mobile"
          style={{
            display: "none",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            gap: "12px",
            paddingBottom: "12px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Growth first on mobile */}
          {[CARDS[1], CARDS[0], CARDS[2]].map((card, i) => (
            <div
              key={card.id}
              style={{
                flex: "0 0 85vw",
                maxWidth: "360px",
                scrollSnapAlign: "center",
                position: "relative",
              }}
            >
              <PricingCard
                card={card}
                active={cardsInView}
                hoveredId={null}
                onHover={() => {}}
                delay={0.06 + i * 0.09}
              />
            </div>
          ))}
        </div>

        {/* ── Comparison toggle ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={cardsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.60, delay: 0.38 }}
          style={{ marginTop: "28px", display: "flex", justifyContent: "center" }}
        >
          <button
            onClick={() => setComparisonOpen((v) => !v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "9px 20px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,0.48)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              transition: "color 200ms ease, border-color 200ms ease, background 200ms ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.color = "rgba(255,255,255,0.75)";
              b.style.borderColor = "rgba(255,255,255,0.14)";
              b.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.color = "rgba(255,255,255,0.48)";
              b.style.borderColor = "rgba(255,255,255,0.08)";
              b.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
              style={{ transform: comparisonOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 300ms ease" }}>
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
        .pricing-mobile::-webkit-scrollbar { display: none; }

        @media (max-width: 768px) {
          .pricing-desktop { display: none !important; }
          .pricing-mobile { display: flex !important; }
          .comp-row {
            grid-template-columns: 1fr !important;
          }
          .comp-row > *:first-child {
            font-weight: 600 !important;
            color: rgba(255,255,255,0.60) !important;
            padding-bottom: 6px !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
            margin-bottom: 4px !important;
          }
        }
      `}</style>
    </section>
  );
}
