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
    description: "For MVPs, first automations, or one focused workflow.",
    includes: [
      "Discovery & scope",
      "Core build",
      "Essential integrations",
      "Launch support",
    ],
    outcome: "Fast validation with controlled scope.",
    cta: "Start a Project",
    featured: false,
  },
  {
    id: "growth",
    label: "Most Common",
    title: "Growth System",
    investment: "$15k – $40k",
    description: "For connected workflows, dashboards, and AI-assisted operations.",
    includes: [
      "Multi-workflow systems",
      "Dashboards or portals",
      "AI-assisted workflows",
      "Integrations",
    ],
    outcome: "Connected systems that reduce manual work.",
    cta: "Get a Proposal",
    featured: true,
  },
  {
    id: "advanced",
    label: "Custom Ecosystem",
    title: "Advanced System",
    investment: "$40k+",
    description: "For complex platforms, automation ecosystems, and scalable infrastructure.",
    includes: [
      "Custom architecture",
      "AI automation systems",
      "Web + mobile platforms",
      "Complex integrations",
    ],
    outcome: "Built for long-term scale.",
    cta: "Discuss Your System",
    featured: false,
  },
];

const COMPARISON_ROWS = [
  {
    category: "Scope",
    launch: "One workflow or MVP",
    growth: "Connected systems",
    advanced: "Full ecosystem",
  },
  {
    category: "Automation",
    launch: "Focused automation",
    growth: "Multi-step workflows",
    advanced: "Advanced AI operations",
  },
  {
    category: "Integrations",
    launch: "Essential tools",
    growth: "Multiple platforms",
    advanced: "Complex APIs",
  },
  {
    category: "Product",
    launch: "Lean build",
    growth: "Portals + dashboards",
    advanced: "Web + mobile + AI",
  },
  {
    category: "Scale",
    launch: "Expandable base",
    growth: "Built to grow",
    advanced: "Designed for scale",
  },
];

/* ─── Check icon ─────────────────────────────────────────────────── */
function CheckIcon({ featured }: { featured: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"
      style={{ flexShrink: 0, marginTop: "2px" }}>
      <circle cx="7" cy="7" r="6.5"
        fill={featured ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.05)"}
        stroke={featured ? "rgba(99,102,241,0.38)" : "rgba(255,255,255,0.13)"} />
      <path d="M4.5 7L6.2 8.7L9.5 5.3"
        stroke={featured ? "rgba(165,180,252,0.92)" : "rgba(255,255,255,0.55)"}
        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Per-card AI system texture ─────────────────────────────────── */
function CardTexture({ id, featured }: { id: string; featured: boolean }) {
  const c = featured ? "rgba(99,102,241," : "rgba(255,255,255,";
  const baseOp = featured ? 0.10 : 0.05;

  if (id === "launch") {
    return (
      <svg width="160" height="100" viewBox="0 0 160 100" fill="none" aria-hidden="true"
        style={{ position: "absolute", top: 0, right: 0, opacity: baseOp, pointerEvents: "none" }}>
        <path d="M160 0 Q120 25 95 55 Q70 80 30 100" stroke={`${c}1)`} strokeWidth="0.8" strokeLinecap="round" />
        <circle cx="95" cy="55" r="2.5" fill={`${c}0.9)`} />
        <circle cx="125" cy="25" r="1.5" fill={`${c}0.7)`} />
        <circle cx="55" cy="80" r="1.5" fill={`${c}0.7)`} />
        <line x1="95" y1="55" x2="115" y2="45" stroke={`${c}0.5)`} strokeWidth="0.5" strokeDasharray="2 3" />
        <line x1="95" y1="55" x2="75" y2="68" stroke={`${c}0.5)`} strokeWidth="0.5" strokeDasharray="2 3" />
      </svg>
    );
  }
  if (id === "growth") {
    return (
      <svg width="150" height="100" viewBox="0 0 150 100" fill="none" aria-hidden="true"
        style={{ position: "absolute", top: 0, right: 0, opacity: baseOp, pointerEvents: "none" }}>
        <circle cx="130" cy="12" r="55" stroke={`${c}1)`} strokeWidth="0.7" />
        <circle cx="130" cy="12" r="38" stroke={`${c}1)`} strokeWidth="0.55" />
        <circle cx="130" cy="12" r="22" stroke={`${c}1)`} strokeWidth="0.45" />
        <circle cx="130" cy="12" r="7" stroke={`${c}1)`} strokeWidth="0.4" />
        <circle cx="130" cy="12" r="2.5" fill={`${c}0.8)`} />
        <line x1="75" y1="12" x2="123" y2="12" stroke={`${c}0.5)`} strokeWidth="0.5" strokeDasharray="3 4" />
      </svg>
    );
  }
  /* advanced — grid fragment */
  return (
    <svg width="150" height="100" viewBox="0 0 150 100" fill="none" aria-hidden="true"
      style={{ position: "absolute", top: 0, right: 0, opacity: baseOp, pointerEvents: "none" }}>
      {[0, 25, 50, 75, 100, 125, 150].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" stroke={`${c}1)`} strokeWidth="0.4" />
      ))}
      {[0, 25, 50, 75, 100].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="150" y2={y} stroke={`${c}1)`} strokeWidth="0.4" />
      ))}
      <circle cx="100" cy="50" r="4.5" fill={`${c}0.7)`} />
      <circle cx="50" cy="25" r="2.5" fill={`${c}0.5)`} />
      <circle cx="125" cy="75" r="2" fill={`${c}0.5)`} />
      <line x1="50" y1="25" x2="100" y2="50" stroke={`${c}0.4)`} strokeWidth="0.5" />
      <line x1="100" y1="50" x2="125" y2="75" stroke={`${c}0.4)`} strokeWidth="0.5" />
    </svg>
  );
}

/* ─── Plan Card ─────────────────────────────────────────────────── */
function PlanCard({ plan }: { plan: typeof PLANS[0] }) {
  const [hov, setHov] = useState(false);
  const f = plan.featured;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        borderRadius: "20px",
        padding: "26px 24px 24px",
        background: f
          ? hov
            ? "linear-gradient(150deg,rgba(99,102,241,0.15) 0%,rgba(139,92,246,0.08) 40%,rgba(7,7,17,0.97) 100%)"
            : "linear-gradient(150deg,rgba(99,102,241,0.10) 0%,rgba(139,92,246,0.05) 40%,rgba(5,5,14,0.97) 100%)"
          : hov
            ? "linear-gradient(150deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.025) 100%)"
            : "linear-gradient(150deg,rgba(255,255,255,0.045) 0%,rgba(255,255,255,0.015) 100%)",
        border: f
          ? hov ? "1px solid rgba(99,102,241,0.48)" : "1px solid rgba(99,102,241,0.28)"
          : hov ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: f
          ? hov
            ? "inset 0 1px 0 rgba(255,255,255,0.13),0 20px 52px rgba(0,0,0,0.42),0 0 44px rgba(99,102,241,0.12)"
            : "inset 0 1px 0 rgba(255,255,255,0.08),0 12px 32px rgba(0,0,0,0.36),0 0 24px rgba(99,102,241,0.08)"
          : hov
            ? "inset 0 1px 0 rgba(255,255,255,0.10),0 16px 40px rgba(0,0,0,0.34)"
            : "inset 0 1px 0 rgba(255,255,255,0.05),0 6px 20px rgba(0,0,0,0.24)",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        transition: "all 270ms cubic-bezier(0.22,1,0.36,1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Top edge reflection */}
      <span aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: f
          ? `linear-gradient(to right,transparent,rgba(129,140,248,${hov ? 0.60 : 0.40}),transparent)`
          : `linear-gradient(to right,transparent,rgba(255,255,255,${hov ? 0.22 : 0.12}),transparent)`,
        transition: "background 270ms ease",
        pointerEvents: "none",
      }} />

      {/* System texture */}
      <CardTexture id={plan.id} featured={f} />

      {/* Featured corner glow */}
      {f && (
        <div aria-hidden="true" style={{
          position: "absolute", top: "-45px", right: "-25px",
          width: "170px", height: "170px", borderRadius: "50%",
          background: `radial-gradient(ellipse,rgba(99,102,241,${hov ? 0.20 : 0.13}) 0%,transparent 70%)`,
          transition: "background 270ms ease",
          pointerEvents: "none",
        }} />
      )}

      {/* Label + badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <span style={{
          fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: f ? "rgba(165,180,252,0.78)" : "rgba(255,255,255,0.40)",
        }}>
          {plan.label}
        </span>
        {f && (
          <span style={{
            fontSize: "9px", fontWeight: 600, letterSpacing: "0.07em",
            textTransform: "uppercase",
            padding: "3px 9px", borderRadius: "99px",
            background: "rgba(99,102,241,0.18)",
            border: "1px solid rgba(99,102,241,0.36)",
            color: "rgba(165,180,252,0.90)",
          }}>
            Most Common
          </span>
        )}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: "18px", fontWeight: 600, letterSpacing: "-0.02em",
        color: "#f5f5f7", margin: "0 0 6px",
        position: "relative", zIndex: 1,
      }}>
        {plan.title}
      </h3>

      {/* Investment — hero element */}
      <div style={{
        fontSize: "28px", fontWeight: 700, letterSpacing: "-0.03em",
        color: f ? "rgba(199,210,254,0.97)" : "rgba(245,245,247,0.94)",
        margin: "0 0 12px",
        fontVariantNumeric: "tabular-nums",
        lineHeight: 1.1,
        position: "relative", zIndex: 1,
      }}>
        {plan.investment}
      </div>

      {/* Description */}
      <p style={{
        fontSize: "12.5px", fontWeight: 400, lineHeight: 1.62,
        color: "rgba(255,255,255,0.65)", margin: "0 0 18px",
        position: "relative", zIndex: 1,
      }}>
        {plan.description}
      </p>

      {/* Divider */}
      <div style={{
        height: "1px",
        background: f
          ? "linear-gradient(to right,rgba(99,102,241,0.20),rgba(139,92,246,0.10),transparent)"
          : "rgba(255,255,255,0.07)",
        margin: "0 0 18px",
      }} />

      {/* Includes */}
      <div style={{ marginBottom: "20px", position: "relative", zIndex: 1, flex: 1 }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          {plan.includes.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <CheckIcon featured={f} />
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.72)", fontWeight: 400, lineHeight: 1.5 }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Outcome */}
      <p style={{
        fontSize: "11px", fontWeight: 400, lineHeight: 1.55,
        color: f ? "rgba(165,180,252,0.58)" : "rgba(255,255,255,0.36)",
        margin: "0 0 18px",
        fontStyle: "italic",
        position: "relative", zIndex: 1,
        paddingTop: "12px",
        borderTop: f ? "1px solid rgba(99,102,241,0.10)" : "1px solid rgba(255,255,255,0.05)",
      }}>
        {plan.outcome}
      </p>

      {/* CTA */}
      <a
        href="#contact"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          padding: "11px 18px", borderRadius: "11px",
          fontSize: "13px", fontWeight: 500, letterSpacing: "0.01em",
          textDecoration: "none",
          color: f ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.80)",
          background: f
            ? hov
              ? "linear-gradient(170deg,#818cf8 0%,#6366f1 50%,#4f46e5 100%)"
              : "linear-gradient(170deg,#6366f1 0%,#4f46e5 100%)"
            : hov ? "rgba(255,255,255,0.11)" : "rgba(255,255,255,0.06)",
          border: f
            ? hov ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(99,102,241,0.50)"
            : hov ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.11)",
          boxShadow: f
            ? hov
              ? "inset 0 1px 0 rgba(255,255,255,0.20),0 5px 18px rgba(79,70,229,0.42)"
              : "inset 0 1px 0 rgba(255,255,255,0.12)"
            : "none",
          transition: "all 250ms cubic-bezier(0.22,1,0.36,1)",
          position: "relative", zIndex: 1,
        }}
      >
        {plan.cta}
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

/* ─── Comparison Matrix — Desktop ───────────────────────────────── */
function ComparisonDesktop() {
  return (
    <div style={{
      borderRadius: "16px",
      background: "linear-gradient(160deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.015) 100%)",
      border: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      overflow: "hidden",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05),0 8px 32px rgba(0,0,0,0.26)",
    }}>
      {/* Helper text */}
      <div style={{
        padding: "13px 22px",
        borderBottom: "1px solid rgba(255,255,255,0.055)",
        background: "rgba(255,255,255,0.012)",
      }}>
        <p style={{
          fontSize: "11px", fontWeight: 400, lineHeight: 1.55,
          color: "rgba(255,255,255,0.38)", margin: 0, fontStyle: "italic",
        }}>
          A quick way to compare scope, automation depth, and system complexity.
        </p>
      </div>

      {/* Column headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
        padding: "12px 22px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.018)",
      }}>
        <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }} />
        {["Launch", "Growth", "Advanced"].map((col, i) => (
          <span key={col} style={{
            fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: i === 1 ? "rgba(165,180,252,0.82)" : "rgba(255,255,255,0.45)",
            textAlign: "center",
          }}>
            {col}
          </span>
        ))}
      </div>

      {/* Rows */}
      {COMPARISON_ROWS.map((row, idx) => (
        <div
          key={row.category}
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            padding: "12px 22px",
            borderBottom: idx < COMPARISON_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.045)" : "none",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "11.5px", fontWeight: 500, color: "rgba(255,255,255,0.58)" }}>
            {row.category}
          </span>
          <span style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.48)", textAlign: "center", lineHeight: 1.5 }}>
            {row.launch}
          </span>
          <span style={{
            fontSize: "11.5px", color: "rgba(199,210,254,0.82)", textAlign: "center",
            lineHeight: 1.5, fontWeight: 500,
          }}>
            {row.growth}
          </span>
          <span style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.48)", textAlign: "center", lineHeight: 1.5 }}>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <p style={{
        fontSize: "11px", fontWeight: 400, lineHeight: 1.55,
        color: "rgba(255,255,255,0.38)", margin: "0 0 6px", fontStyle: "italic",
      }}>
        A quick way to compare scope, automation depth, and system complexity.
      </p>

      {COMPARISON_ROWS.map((row) => (
        <div
          key={row.category}
          style={{
            borderRadius: "12px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "13px 14px",
          }}
        >
          <p style={{
            fontSize: "10px", fontWeight: 600, letterSpacing: "0.09em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.36)",
            margin: "0 0 9px",
          }}>
            {row.category}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              { label: "Launch", value: row.launch, accent: false },
              { label: "Growth", value: row.growth, accent: true },
              { label: "Advanced", value: row.advanced, accent: false },
            ].map(({ label, value, accent }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                <span style={{
                  fontSize: "10.5px", fontWeight: 600,
                  color: accent ? "rgba(165,180,252,0.75)" : "rgba(255,255,255,0.36)",
                  minWidth: "56px", flexShrink: 0,
                }}>
                  {label}
                </span>
                <span style={{
                  fontSize: "11.5px",
                  color: accent ? "rgba(199,210,254,0.86)" : "rgba(255,255,255,0.60)",
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
      style={{ position: "relative", padding: "96px 20px 112px" }}
    >
      {/* Subtle radial glow centered behind Growth card */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "40%",
        transform: "translate(-50%,-50%)",
        width: "680px", height: "460px", borderRadius: "9999px",
        background: "radial-gradient(ellipse,rgba(99,102,241,0.065) 0%,transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      {/* Faint horizontal light line */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "24%",
        transform: "translateX(-50%)",
        width: "680px", height: "1px",
        background: "linear-gradient(to right,transparent,rgba(255,255,255,0.05),transparent)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "1050px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 60px" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            <span style={{ display: "inline-block", width: "18px", height: "1px", background: "rgba(129,140,248,0.48)" }} />
            <span style={{
              fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "rgba(129,140,248,0.72)",
            }}>
              Investment &amp; Scope
            </span>
            <span style={{ display: "inline-block", width: "18px", height: "1px", background: "rgba(129,140,248,0.48)" }} />
          </div>

          <h2 style={{
            fontSize: "clamp(24px, 3.2vw, 40px)", fontWeight: 500,
            letterSpacing: "-0.028em", lineHeight: 1.18,
            color: "#f0f0f5", margin: "0 0 16px",
          }}>
            Choose the right system level
          </h2>

          <p style={{
            fontSize: "clamp(13.5px, 1.35vw, 15.5px)", fontWeight: 300,
            lineHeight: 1.72, color: "rgba(255,255,255,0.65)",
            maxWidth: "560px", margin: "0 auto",
          }}>
            Clear engagement ranges for AI systems, custom software, and mobile products — tailored to your scope, complexity, and goals.
          </p>
        </motion.div>

        {/* ── Cards — desktop ── */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="inv-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "16px",
            marginBottom: "44px",
            alignItems: "stretch",
          }}
        >
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </motion.div>

        {/* ── Cards — mobile (Growth first) ── */}
        <div
          className="inv-grid-mobile"
          style={{ display: "none", flexDirection: "column", gap: "14px", marginBottom: "44px" }}
        >
          {[PLANS[1], PLANS[0], PLANS[2]].map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* ── Comparison toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.60, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
          style={{ marginBottom: "32px" }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "22px" }}>
            <button
              onClick={() => setComparisonOpen((v) => !v)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "9px 20px", borderRadius: "11px",
                fontSize: "12.5px", fontWeight: 500,
                color: "rgba(255,255,255,0.68)",
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.10)",
                cursor: "pointer",
                transition: "all 200ms ease",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "rgba(255,255,255,0.08)";
                b.style.borderColor = "rgba(255,255,255,0.18)";
                b.style.color = "rgba(255,255,255,0.90)";
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.background = "rgba(255,255,255,0.045)";
                b.style.borderColor = "rgba(255,255,255,0.10)";
                b.style.color = "rgba(255,255,255,0.68)";
              }}
            >
              <svg
                width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"
                style={{ transform: comparisonOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 250ms ease" }}
              >
                <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {comparisonOpen ? "Hide comparison" : "Compare engagement levels"}
            </button>
          </div>

          {/* Comparison panel */}
          <div style={{
            overflow: "hidden",
            maxHeight: comparisonOpen ? "1200px" : "0",
            opacity: comparisonOpen ? 1 : 0,
            transition: "max-height 460ms cubic-bezier(0.22,1,0.36,1),opacity 300ms ease",
          }}>
            <div className="inv-comparison-desktop">
              <ComparisonDesktop />
            </div>
            <div className="inv-comparison-mobile" style={{ display: "none" }}>
              <ComparisonMobile />
            </div>
          </div>
        </motion.div>

        {/* ── Final CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.60, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          style={{
            borderRadius: "18px",
            padding: "36px 28px",
            background: "linear-gradient(160deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.018) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.055),0 8px 28px rgba(0,0,0,0.20)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span aria-hidden="true" style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(to right,transparent,rgba(255,255,255,0.14),transparent)",
            pointerEvents: "none",
          }} />

          <h3 style={{
            fontSize: "clamp(17px, 2vw, 22px)", fontWeight: 500,
            letterSpacing: "-0.02em", color: "#f5f5f7",
            margin: "0 0 8px",
          }}>
            Want help choosing the right scope?
          </h3>
          <p style={{
            fontSize: "13.5px", fontWeight: 300, lineHeight: 1.68,
            color: "rgba(255,255,255,0.58)",
            maxWidth: "420px", margin: "0 auto 24px",
          }}>
            We&apos;ll help you define the best approach before you commit.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "12px 26px", borderRadius: "13px",
              fontSize: "13.5px", fontWeight: 500, letterSpacing: "0.01em",
              textDecoration: "none",
              color: "rgba(255,255,255,0.97)",
              background: "linear-gradient(170deg,#6366f1 0%,#4f46e5 100%)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18),0 5px 18px rgba(79,70,229,0.34)",
              transition: "all 250ms cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "linear-gradient(170deg,#818cf8 0%,#6366f1 50%,#4f46e5 100%)";
              el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.26),0 7px 24px rgba(79,70,229,0.50)";
              el.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "linear-gradient(170deg,#6366f1 0%,#4f46e5 100%)";
              el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.18),0 5px 18px rgba(79,70,229,0.34)";
              el.style.transform = "scale(1)";
            }}
          >
            Book a Free Call
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 899px) {
          .inv-grid { display: none !important; }
          .inv-grid-mobile { display: flex !important; }
          .inv-comparison-desktop { display: none !important; }
          .inv-comparison-mobile { display: block !important; }
        }
        @media (max-width: 767px) {
          .inv-grid-mobile a[href="#contact"] {
            width: 100% !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </section>
  );
}
