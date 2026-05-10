"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/* ─── Data ──────────────────────────────────────────────────────── */
const PLANS = [
  {
    id: "launch",
    label: "Focused Start",
    title: "Launch System",
    investment: "$5k – $15k",
    valueLine: "Validate an idea or automate one high-impact workflow.",
    bestFor: "MVPs, first automations, and lean product builds.",
    includes: [
      "Discovery & scope",
      "Core workflow or product",
      "Essential integrations",
      "Launch-ready delivery",
    ],
    outcome: "Move fast with a focused, controlled scope.",
    cta: "Start a Project",
    featured: false,
  },
  {
    id: "growth",
    label: "Most Common",
    title: "Growth System",
    investment: "$15k – $40k",
    valueLine: "Connect workflows, dashboards, and AI-assisted processes.",
    bestFor: "Growing teams ready to scale sales, marketing, or operations.",
    includes: [
      "Multi-workflow automation",
      "Dashboards or portals",
      "AI-assisted workflows",
      "Third-party integrations",
      "Launch support",
    ],
    outcome: "Build connected systems that reduce manual work.",
    cta: "Get a Proposal",
    featured: true,
  },
  {
    id: "advanced",
    label: "Custom Ecosystem",
    title: "Advanced System",
    investment: "$40k+",
    valueLine: "Build scalable platforms with advanced automation.",
    bestFor: "Complex web, mobile, AI, and operational ecosystems.",
    includes: [
      "Custom architecture",
      "AI automation systems",
      "Web and mobile platforms",
      "Complex integrations",
      "Scalable infrastructure",
    ],
    outcome: "Design a system built for long-term growth.",
    cta: "Discuss Your System",
    featured: false,
  },
];

const COMPARISON_ROWS = [
  {
    category: "Typical scope",
    launch: "One product or workflow",
    growth: "Connected business systems",
    advanced: "Full platform ecosystem",
  },
  {
    category: "Automation depth",
    launch: "Focused automation",
    growth: "Multi-step workflows",
    advanced: "Advanced AI operations",
  },
  {
    category: "Integrations",
    launch: "Essential tools",
    growth: "Multiple platforms",
    advanced: "Complex APIs and infrastructure",
  },
  {
    category: "Product complexity",
    launch: "Lean MVP or workflow",
    growth: "Portals, dashboards, workflows",
    advanced: "Web, mobile, AI systems",
  },
  {
    category: "Delivery focus",
    launch: "Speed and validation",
    growth: "Scale and efficiency",
    advanced: "Architecture and long-term growth",
  },
  {
    category: "Scalability",
    launch: "Expandable foundation",
    growth: "Built to grow",
    advanced: "Designed for scale",
  },
];

/* ─── Check icon ─────────────────────────────────────────────────── */
function CheckIcon({ featured }: { featured: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
      style={{ flexShrink: 0, marginTop: "2px" }}>
      <circle cx="7" cy="7" r="6.5"
        fill={featured ? "rgba(99,102,241,0.20)" : "rgba(255,255,255,0.06)"}
        stroke={featured ? "rgba(99,102,241,0.40)" : "rgba(255,255,255,0.14)"} />
      <path d="M4.5 7L6.2 8.7L9.5 5.3"
        stroke={featured ? "rgba(165,180,252,0.95)" : "rgba(255,255,255,0.60)"}
        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Abstract system texture per card ──────────────────────────── */
function CardTexture({ featured, id }: { featured: boolean; id: string }) {
  const accent = featured ? "rgba(99,102,241," : "rgba(255,255,255,";
  const op = featured ? 0.22 : 0.06;

  if (id === "launch") {
    /* Signal path — faint curved line + dots */
    return (
      <svg width="140" height="90" viewBox="0 0 140 90" fill="none" aria-hidden="true"
        style={{ position: "absolute", top: 0, right: 0, opacity: op, pointerEvents: "none" }}>
        <path d="M140 0 Q100 30 80 60 Q60 80 20 90" stroke={`${accent}1)`} strokeWidth="0.7" strokeLinecap="round" />
        <circle cx="80" cy="60" r="2.5" fill={`${accent}0.8)`} />
        <circle cx="110" cy="28" r="1.5" fill={`${accent}0.6)`} />
        <circle cx="50" cy="76" r="1.5" fill={`${accent}0.6)`} />
      </svg>
    );
  }
  if (id === "growth") {
    /* Concentric arcs — system core */
    return (
      <svg width="130" height="90" viewBox="0 0 130 90" fill="none" aria-hidden="true"
        style={{ position: "absolute", top: 0, right: 0, opacity: op, pointerEvents: "none" }}>
        <circle cx="115" cy="10" r="50" stroke={`${accent}1)`} strokeWidth="0.6" />
        <circle cx="115" cy="10" r="34" stroke={`${accent}1)`} strokeWidth="0.5" />
        <circle cx="115" cy="10" r="18" stroke={`${accent}1)`} strokeWidth="0.4" />
        <circle cx="115" cy="10" r="5" fill={`${accent}0.7)`} />
        <line x1="65" y1="10" x2="110" y2="10" stroke={`${accent}0.5)`} strokeWidth="0.5" strokeDasharray="3 4" />
      </svg>
    );
  }
  /* advanced — grid fragment */
  return (
    <svg width="130" height="90" viewBox="0 0 130 90" fill="none" aria-hidden="true"
      style={{ position: "absolute", top: 0, right: 0, opacity: op, pointerEvents: "none" }}>
      {[0, 20, 40, 60, 80, 100, 120].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="90" stroke={`${accent}1)`} strokeWidth="0.4" />
      ))}
      {[0, 20, 40, 60, 80].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="130" y2={y} stroke={`${accent}1)`} strokeWidth="0.4" />
      ))}
      <circle cx="80" cy="40" r="4" fill={`${accent}0.6)`} />
      <circle cx="40" cy="20" r="2" fill={`${accent}0.4)`} />
      <circle cx="100" cy="60" r="2" fill={`${accent}0.4)`} />
    </svg>
  );
}

/* ─── Plan Card ─────────────────────────────────────────────────── */
function PlanCard({ plan }: { plan: typeof PLANS[0] }) {
  const [hovered, setHovered] = useState(false);
  const f = plan.featured;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "22px",
        padding: "28px 26px 26px",
        background: f
          ? hovered
            ? "linear-gradient(155deg, rgba(99,102,241,0.16) 0%, rgba(139,92,246,0.09) 45%, rgba(8,8,18,0.97) 100%)"
            : "linear-gradient(155deg, rgba(99,102,241,0.11) 0%, rgba(139,92,246,0.06) 45%, rgba(6,6,16,0.97) 100%)"
          : hovered
            ? "linear-gradient(155deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)"
            : "linear-gradient(155deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        border: f
          ? hovered
            ? "1px solid rgba(99,102,241,0.50)"
            : "1px solid rgba(99,102,241,0.30)"
          : hovered
            ? "1px solid rgba(255,255,255,0.20)"
            : "1px solid rgba(255,255,255,0.09)",
        boxShadow: f
          ? hovered
            ? "inset 0 1px 0 rgba(255,255,255,0.14), 0 24px 56px rgba(0,0,0,0.42), 0 0 48px rgba(99,102,241,0.14)"
            : "inset 0 1px 0 rgba(255,255,255,0.09), 0 14px 36px rgba(0,0,0,0.38), 0 0 28px rgba(99,102,241,0.09)"
          : hovered
            ? "inset 0 1px 0 rgba(255,255,255,0.11), 0 18px 44px rgba(0,0,0,0.36)"
            : "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.26)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 280ms cubic-bezier(0.22,1,0.36,1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
      }}
    >
      {/* Top edge reflection */}
      <span aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: hovered ? "1px" : "1px",
        background: f
          ? `linear-gradient(to right, transparent, rgba(129,140,248,${hovered ? 0.65 : 0.45}), transparent)`
          : `linear-gradient(to right, transparent, rgba(255,255,255,${hovered ? 0.24 : 0.14}), transparent)`,
        transition: "background 280ms ease",
        pointerEvents: "none",
      }} />

      {/* System texture */}
      <CardTexture featured={f} id={plan.id} />

      {/* Top accent glow — featured only */}
      {f && (
        <div aria-hidden="true" style={{
          position: "absolute", top: "-50px", right: "-30px",
          width: "180px", height: "180px", borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(99,102,241,${hovered ? 0.22 : 0.15}) 0%, transparent 70%)`,
          transition: "background 280ms ease",
          pointerEvents: "none",
        }} />
      )}

      {/* Label row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
        <span style={{
          fontSize: "10px", fontWeight: 600, letterSpacing: "0.11em",
          textTransform: "uppercase",
          color: f ? "rgba(165,180,252,0.80)" : "rgba(255,255,255,0.42)",
        }}>
          {plan.label}
        </span>
        {f && (
          <span style={{
            fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.07em",
            textTransform: "uppercase",
            padding: "3px 10px", borderRadius: "99px",
            background: "rgba(99,102,241,0.20)",
            border: "1px solid rgba(99,102,241,0.38)",
            color: "rgba(165,180,252,0.92)",
          }}>
            Most Common
          </span>
        )}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: "19px", fontWeight: 600, letterSpacing: "-0.022em",
        color: "#f5f5f7", margin: "0 0 8px",
        position: "relative", zIndex: 1,
      }}>
        {plan.title}
      </h3>

      {/* Investment — hero element */}
      <div style={{
        fontSize: "30px", fontWeight: 700, letterSpacing: "-0.032em",
        color: f ? "rgba(199,210,254,0.97)" : "rgba(245,245,247,0.95)",
        margin: "0 0 10px",
        fontVariantNumeric: "tabular-nums",
        position: "relative", zIndex: 1,
        lineHeight: 1.1,
      }}>
        {plan.investment}
      </div>

      {/* Value line */}
      <p style={{
        fontSize: "13px", fontWeight: 400, lineHeight: 1.6,
        color: "rgba(255,255,255,0.68)", margin: "0 0 20px",
        position: "relative", zIndex: 1,
      }}>
        {plan.valueLine}
      </p>

      {/* Divider */}
      <div style={{
        height: "1px",
        background: f
          ? "linear-gradient(to right, rgba(99,102,241,0.22), rgba(139,92,246,0.12), transparent)"
          : "rgba(255,255,255,0.07)",
        margin: "0 0 20px",
      }} />

      {/* Best for */}
      <div style={{ marginBottom: "18px", position: "relative", zIndex: 1 }}>
        <span style={{
          fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.09em",
          textTransform: "uppercase",
          color: f ? "rgba(165,180,252,0.58)" : "rgba(255,255,255,0.32)",
          display: "block", marginBottom: "6px",
        }}>
          Best for
        </span>
        <p style={{
          fontSize: "12px", fontWeight: 400, lineHeight: 1.6,
          color: "rgba(255,255,255,0.72)", margin: 0,
        }}>
          {plan.bestFor}
        </p>
      </div>

      {/* Includes */}
      <div style={{ marginBottom: "22px", position: "relative", zIndex: 1, flex: 1 }}>
        <span style={{
          fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.09em",
          textTransform: "uppercase",
          color: f ? "rgba(165,180,252,0.58)" : "rgba(255,255,255,0.32)",
          display: "block", marginBottom: "10px",
        }}>
          Includes
        </span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
          {plan.includes.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
              <CheckIcon featured={f} />
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.76)", fontWeight: 400, lineHeight: 1.5 }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Outcome */}
      <p style={{
        fontSize: "11px", fontWeight: 400, lineHeight: 1.6,
        color: f ? "rgba(165,180,252,0.62)" : "rgba(255,255,255,0.38)",
        margin: "0 0 20px",
        fontStyle: "italic",
        position: "relative", zIndex: 1,
      }}>
        {plan.outcome}
      </p>

      {/* CTA */}
      <a
        href="#contact"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          padding: "12px 20px", borderRadius: "12px",
          fontSize: "13px", fontWeight: 500, letterSpacing: "0.01em",
          textDecoration: "none",
          color: f ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.82)",
          background: f
            ? hovered
              ? "linear-gradient(170deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)"
              : "linear-gradient(170deg, #6366f1 0%, #4f46e5 100%)"
            : hovered
              ? "rgba(255,255,255,0.13)"
              : "rgba(255,255,255,0.07)",
          border: f
            ? hovered ? "1px solid rgba(255,255,255,0.24)" : "1px solid rgba(99,102,241,0.52)"
            : hovered ? "1px solid rgba(255,255,255,0.24)" : "1px solid rgba(255,255,255,0.13)",
          boxShadow: f
            ? hovered
              ? "inset 0 1px 0 rgba(255,255,255,0.22), 0 6px 22px rgba(79,70,229,0.44)"
              : "inset 0 1px 0 rgba(255,255,255,0.14)"
            : "none",
          transition: "all 260ms cubic-bezier(0.22,1,0.36,1)",
          position: "relative", zIndex: 1,
        }}
      >
        {plan.cta}
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

/* ─── Comparison — Desktop ──────────────────────────────────────── */
function ComparisonDesktop() {
  return (
    <div style={{
      borderRadius: "18px",
      background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
      border: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      overflow: "hidden",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.28)",
    }}>
      {/* Intro note */}
      <div style={{
        padding: "14px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.015)",
      }}>
        <p style={{
          fontSize: "11.5px", fontWeight: 400, lineHeight: 1.6,
          color: "rgba(255,255,255,0.42)", margin: 0, fontStyle: "italic",
        }}>
          Use this as a guide. Final scope depends on your goals, workflows, integrations, and timeline.
        </p>
      </div>

      {/* Header row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.7fr 1fr 1fr 1fr",
        padding: "14px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
      }}>
        <span style={{
          fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.09em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.32)",
        }}>
          Category
        </span>
        {["Launch", "Growth", "Advanced"].map((col, i) => (
          <span key={col} style={{
            fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: i === 1 ? "rgba(165,180,252,0.82)" : "rgba(255,255,255,0.48)",
            textAlign: "center",
          }}>
            {col}
          </span>
        ))}
      </div>

      {/* Data rows */}
      {COMPARISON_ROWS.map((row, idx) => (
        <div
          key={row.category}
          style={{
            display: "grid",
            gridTemplateColumns: "1.7fr 1fr 1fr 1fr",
            padding: "13px 24px",
            borderBottom: idx < COMPARISON_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.62)" }}>
            {row.category}
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.50)", textAlign: "center", lineHeight: 1.5 }}>
            {row.launch}
          </span>
          <span style={{
            fontSize: "12px", color: "rgba(199,210,254,0.82)", textAlign: "center",
            lineHeight: 1.5, fontWeight: 500,
          }}>
            {row.growth}
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.50)", textAlign: "center", lineHeight: 1.5 }}>
            {row.advanced}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Comparison — Mobile ───────────────────────────────────────── */
function ComparisonMobile() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Intro note */}
      <p style={{
        fontSize: "11.5px", fontWeight: 400, lineHeight: 1.6,
        color: "rgba(255,255,255,0.40)", margin: "0 0 4px", fontStyle: "italic",
      }}>
        Use this as a guide. Final scope depends on your goals, workflows, integrations, and timeline.
      </p>

      {COMPARISON_ROWS.map((row) => (
        <div
          key={row.category}
          style={{
            borderRadius: "14px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "14px 16px",
          }}
        >
          <p style={{
            fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.09em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.38)",
            margin: "0 0 10px",
          }}>
            {row.category}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {[
              { label: "Launch", value: row.launch, accent: false },
              { label: "Growth", value: row.growth, accent: true },
              { label: "Advanced", value: row.advanced, accent: false },
            ].map(({ label, value, accent }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                <span style={{
                  fontSize: "11px", fontWeight: 600,
                  color: accent ? "rgba(165,180,252,0.78)" : "rgba(255,255,255,0.38)",
                  minWidth: "58px", flexShrink: 0,
                }}>
                  {label}
                </span>
                <span style={{
                  fontSize: "12px",
                  color: accent ? "rgba(199,210,254,0.88)" : "rgba(255,255,255,0.62)",
                  textAlign: "right", lineHeight: 1.5,
                  fontWeight: accent ? 500 : 400,
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────── */
export function InvestmentSection() {
  const [comparisonOpen, setComparisonOpen] = useState(false);

  return (
    <section
      id="investment"
      aria-label="Investment & Scope"
      style={{ position: "relative", padding: "100px 20px 120px" }}
    >
      {/* Background — subtle radial behind Growth (center) */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "38%",
        transform: "translate(-50%, -50%)",
        width: "700px", height: "480px", borderRadius: "9999px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      {/* Faint horizontal light line near top of card area */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "22%",
        transform: "translateX(-50%)",
        width: "700px", height: "1px",
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.055), transparent)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "1050px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "64px", maxWidth: "720px", margin: "0 auto 64px" }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "18px" }}>
            <span style={{ display: "inline-block", width: "20px", height: "1px", background: "rgba(129,140,248,0.50)" }} />
            <span style={{
              fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "rgba(129,140,248,0.75)",
            }}>
              Investment &amp; Scope
            </span>
            <span style={{ display: "inline-block", width: "20px", height: "1px", background: "rgba(129,140,248,0.50)" }} />
          </div>

          <h2 style={{
            fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 500,
            letterSpacing: "-0.028em", lineHeight: 1.18,
            color: "#f0f0f5", margin: "0 0 18px",
          }}>
            Find the right system for your next stage
          </h2>

          <p style={{
            fontSize: "clamp(14px, 1.4vw, 16px)", fontWeight: 300,
            lineHeight: 1.74, color: "rgba(255,255,255,0.68)",
            maxWidth: "600px", margin: "0 auto",
          }}>
            From focused launches to full-scale platforms, our engagement ranges help you understand what level of system fits your goals, complexity, and growth path.
          </p>
        </motion.div>

        {/* ── Cards — desktop (3 columns) ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.10 }}
          className="investment-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "18px",
            marginBottom: "48px",
            alignItems: "stretch",
          }}
        >
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </motion.div>

        {/* ── Cards — mobile (Growth first) ── */}
        <div
          className="investment-grid-mobile"
          style={{ display: "none", flexDirection: "column", gap: "16px", marginBottom: "48px" }}
        >
          {[PLANS[1], PLANS[0], PLANS[2]].map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* ── Comparison toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
          style={{ marginBottom: "36px" }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <button
              onClick={() => setComparisonOpen((v) => !v)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "10px 22px", borderRadius: "12px",
                fontSize: "13px", fontWeight: 500,
                color: "rgba(255,255,255,0.72)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.11)",
                cursor: "pointer",
                transition: "all 220ms ease",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "rgba(255,255,255,0.09)";
                b.style.borderColor = "rgba(255,255,255,0.20)";
                b.style.color = "rgba(255,255,255,0.92)";
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "rgba(255,255,255,0.05)";
                b.style.borderColor = "rgba(255,255,255,0.11)";
                b.style.color = "rgba(255,255,255,0.72)";
              }}
            >
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
                style={{ transform: comparisonOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 260ms ease" }}
              >
                <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {comparisonOpen ? "Hide comparison" : "Compare engagement levels"}
            </button>
          </div>

          {/* Comparison panel */}
          <div style={{
            overflow: "hidden",
            maxHeight: comparisonOpen ? "1400px" : "0",
            opacity: comparisonOpen ? 1 : 0,
            transition: "max-height 480ms cubic-bezier(0.22,1,0.36,1), opacity 320ms ease",
          }}>
            <div className="comparison-desktop">
              <ComparisonDesktop />
            </div>
            <div className="comparison-mobile" style={{ display: "none" }}>
              <ComparisonMobile />
            </div>
          </div>
        </motion.div>

        {/* ── Final CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.20 }}
          style={{
            borderRadius: "20px",
            padding: "40px 32px",
            background: "linear-gradient(160deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.22)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span aria-hidden="true" style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.16), transparent)",
            pointerEvents: "none",
          }} />

          <h3 style={{
            fontSize: "clamp(18px, 2.2vw, 23px)", fontWeight: 500,
            letterSpacing: "-0.02em", color: "#f5f5f7",
            margin: "0 0 10px",
          }}>
            Need help choosing the right scope?
          </h3>
          <p style={{
            fontSize: "14px", fontWeight: 300, lineHeight: 1.72,
            color: "rgba(255,255,255,0.62)",
            maxWidth: "480px", margin: "0 auto 28px",
          }}>
            We&apos;ll help you map your goals, define the right system, and understand the investment range before you commit.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "13px 28px", borderRadius: "14px",
              fontSize: "14px", fontWeight: 500, letterSpacing: "0.01em",
              textDecoration: "none",
              color: "rgba(255,255,255,0.97)",
              background: "linear-gradient(170deg, #6366f1 0%, #4f46e5 100%)",
              border: "1px solid rgba(255,255,255,0.13)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20), 0 6px 22px rgba(79,70,229,0.36)",
              transition: "all 260ms cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "linear-gradient(170deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)";
              el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.28), 0 8px 28px rgba(79,70,229,0.52)";
              el.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "linear-gradient(170deg, #6366f1 0%, #4f46e5 100%)";
              el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.20), 0 6px 22px rgba(79,70,229,0.36)";
              el.style.transform = "scale(1)";
            }}
          >
            Book a Free Call
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 899px) {
          .investment-grid { display: none !important; }
          .investment-grid-mobile { display: flex !important; }
          .comparison-desktop { display: none !important; }
          .comparison-mobile { display: block !important; }
        }
        @media (max-width: 767px) {
          .investment-grid-mobile a[href="#contact"] {
            width: 100% !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </section>
  );
}
