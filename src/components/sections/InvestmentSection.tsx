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
    description: "For MVPs, first automations, and focused digital products.",
    bestFor: "Validating an idea or automating one critical workflow.",
    includes: [
      "Discovery & scope",
      "Core product or workflow",
      "Essential integrations",
      "Launch-ready delivery",
    ],
    outcome: "Move fast with a clear, focused scope.",
    cta: "Start a Project",
    featured: false,
  },
  {
    id: "growth",
    label: "Most Common",
    title: "Growth System",
    investment: "$15k – $40k",
    description: "For businesses ready to connect workflows and scale operations.",
    bestFor: "Teams that need systems across sales, marketing, and operations.",
    includes: [
      "Multi-workflow automation",
      "Dashboards or portals",
      "AI-assisted processes",
      "Third-party integrations",
      "Launch support",
    ],
    outcome: "Build connected systems that work together.",
    cta: "Get a Proposal",
    featured: true,
  },
  {
    id: "advanced",
    label: "Custom Ecosystem",
    title: "Advanced System",
    investment: "$40k+",
    description: "For complex platforms, AI-enabled operations, and scalable ecosystems.",
    bestFor: "Companies building advanced software, mobile, web, or AI systems.",
    includes: [
      "Custom architecture",
      "AI automation systems",
      "Web and mobile platforms",
      "Complex integrations",
      "Scalable infrastructure",
    ],
    outcome: "Design a system built for long-term scale.",
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
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "1px" }}>
      <circle cx="7" cy="7" r="6.5" fill={featured ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.06)"} stroke={featured ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.12)"} />
      <path d="M4.5 7L6.2 8.7L9.5 5.3" stroke={featured ? "rgba(165,180,252,0.90)" : "rgba(255,255,255,0.55)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Abstract card pattern ─────────────────────────────────────── */
function CardPattern({ featured }: { featured: boolean }) {
  const c = featured ? "rgba(99,102,241," : "rgba(255,255,255,";
  return (
    <svg
      width="120" height="80"
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden="true"
      style={{ position: "absolute", top: 0, right: 0, opacity: featured ? 0.18 : 0.07, pointerEvents: "none" }}
    >
      <circle cx="100" cy="10" r="40" stroke={`${c}1)`} strokeWidth="0.6" />
      <circle cx="100" cy="10" r="28" stroke={`${c}1)`} strokeWidth="0.5" />
      <circle cx="100" cy="10" r="16" stroke={`${c}1)`} strokeWidth="0.4" />
      <circle cx="100" cy="10" r="5" fill={`${c}0.5)`} />
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
        padding: "28px",
        background: f
          ? hovered
            ? "linear-gradient(160deg, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.08) 50%, rgba(10,10,20,0.95) 100%)"
            : "linear-gradient(160deg, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.06) 50%, rgba(8,8,18,0.96) 100%)"
          : hovered
            ? "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)"
            : "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        border: f
          ? hovered
            ? "1px solid rgba(99,102,241,0.45)"
            : "1px solid rgba(99,102,241,0.28)"
          : hovered
            ? "1px solid rgba(255,255,255,0.18)"
            : "1px solid rgba(255,255,255,0.09)",
        boxShadow: f
          ? hovered
            ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 20px 50px rgba(0,0,0,0.40), 0 0 40px rgba(99,102,241,0.12)"
            : "inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 32px rgba(0,0,0,0.35), 0 0 24px rgba(99,102,241,0.08)"
          : hovered
            ? "inset 0 1px 0 rgba(255,255,255,0.10), 0 16px 40px rgba(0,0,0,0.35)"
            : "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.25)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 280ms cubic-bezier(0.22,1,0.36,1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Top shimmer */}
      <span aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: f
          ? "linear-gradient(to right, transparent, rgba(129,140,248,0.50), transparent)"
          : "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)",
        pointerEvents: "none",
      }} />

      {/* Background pattern */}
      <CardPattern featured={f} />

      {/* Top accent glow */}
      {f && (
        <div aria-hidden="true" style={{
          position: "absolute", top: "-40px", right: "-20px",
          width: "160px", height: "160px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
      )}

      {/* Label + badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <span style={{
          fontSize: "10px", fontWeight: 600, letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: f ? "rgba(165,180,252,0.80)" : "rgba(255,255,255,0.45)",
        }}>
          {plan.label}
        </span>
        {f && (
          <span style={{
            fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "3px 9px", borderRadius: "99px",
            background: "rgba(99,102,241,0.18)",
            border: "1px solid rgba(99,102,241,0.35)",
            color: "rgba(165,180,252,0.90)",
          }}>
            Most Common
          </span>
        )}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: "20px", fontWeight: 600, letterSpacing: "-0.02em",
        color: "#f5f5f7", margin: "0 0 6px",
        position: "relative", zIndex: 1,
      }}>
        {plan.title}
      </h3>

      {/* Investment */}
      <div style={{
        fontSize: "32px", fontWeight: 700, letterSpacing: "-0.03em",
        color: f ? "rgba(199,210,254,0.96)" : "rgba(245,245,247,0.96)",
        margin: "0 0 16px",
        fontVariantNumeric: "tabular-nums",
        position: "relative", zIndex: 1,
      }}>
        {plan.investment}
      </div>

      {/* Description */}
      <p style={{
        fontSize: "13px", fontWeight: 400, lineHeight: 1.65,
        color: "rgba(255,255,255,0.70)", margin: "0 0 20px",
        position: "relative", zIndex: 1,
      }}>
        {plan.description}
      </p>

      {/* Divider */}
      <div style={{
        height: "1px",
        background: f ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.07)",
        margin: "0 0 20px",
      }} />

      {/* Best for */}
      <div style={{ marginBottom: "20px", position: "relative", zIndex: 1 }}>
        <span style={{
          fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: f ? "rgba(165,180,252,0.60)" : "rgba(255,255,255,0.35)",
          display: "block", marginBottom: "6px",
        }}>
          Best for
        </span>
        <p style={{
          fontSize: "12px", fontWeight: 400, lineHeight: 1.6,
          color: "rgba(255,255,255,0.75)", margin: 0,
        }}>
          {plan.bestFor}
        </p>
      </div>

      {/* Includes */}
      <div style={{ marginBottom: "24px", position: "relative", zIndex: 1, flex: 1 }}>
        <span style={{
          fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: f ? "rgba(165,180,252,0.60)" : "rgba(255,255,255,0.35)",
          display: "block", marginBottom: "10px",
        }}>
          Includes
        </span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          {plan.includes.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <CheckIcon featured={f} />
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.78)", fontWeight: 400, lineHeight: 1.5 }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Outcome */}
      <p style={{
        fontSize: "11px", fontWeight: 400, lineHeight: 1.6,
        color: f ? "rgba(165,180,252,0.65)" : "rgba(255,255,255,0.40)",
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
          color: f ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.85)",
          background: f
            ? hovered
              ? "linear-gradient(170deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)"
              : "linear-gradient(170deg, #6366f1 0%, #4f46e5 100%)"
            : hovered
              ? "rgba(255,255,255,0.12)"
              : "rgba(255,255,255,0.07)",
          border: f
            ? hovered ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(99,102,241,0.50)"
            : hovered ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.12)",
          boxShadow: f && hovered ? "0 6px 20px rgba(79,70,229,0.40)" : "none",
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
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      overflow: "hidden",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.25)",
    }}>
      {/* Header row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
        padding: "16px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
      }}>
        <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          Category
        </span>
        {["Launch", "Growth", "Advanced"].map((col, i) => (
          <span key={col} style={{
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
            color: i === 1 ? "rgba(165,180,252,0.80)" : "rgba(255,255,255,0.50)",
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
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            padding: "14px 24px",
            borderBottom: idx < COMPARISON_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.65)" }}>
            {row.category}
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", textAlign: "center", lineHeight: 1.5 }}>
            {row.launch}
          </span>
          <span style={{
            fontSize: "12px", color: "rgba(199,210,254,0.80)", textAlign: "center", lineHeight: 1.5,
            fontWeight: 500,
          }}>
            {row.growth}
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", textAlign: "center", lineHeight: 1.5 }}>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {COMPARISON_ROWS.map((row) => (
        <div
          key={row.category}
          style={{
            borderRadius: "14px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "16px",
          }}
        >
          <p style={{
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.40)",
            margin: "0 0 12px",
          }}>
            {row.category}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { label: "Launch", value: row.launch, accent: false },
              { label: "Growth", value: row.growth, accent: true },
              { label: "Advanced", value: row.advanced, accent: false },
            ].map(({ label, value, accent }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                <span style={{
                  fontSize: "11px", fontWeight: 600, color: accent ? "rgba(165,180,252,0.75)" : "rgba(255,255,255,0.40)",
                  minWidth: "60px", flexShrink: 0,
                }}>
                  {label}
                </span>
                <span style={{
                  fontSize: "12px", color: accent ? "rgba(199,210,254,0.85)" : "rgba(255,255,255,0.65)",
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
      {/* Background glows */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "30%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "500px", borderRadius: "9999px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "0",
        transform: "translateX(-50%)",
        width: "600px", height: "1px",
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "1050px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
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
            color: "#f0f0f5", margin: "0 0 16px",
          }}>
            Choose the right system for your stage
          </h2>

          <p style={{
            fontSize: "clamp(14px, 1.4vw, 16px)", fontWeight: 300,
            lineHeight: 1.72, color: "rgba(255,255,255,0.70)",
            maxWidth: "580px", margin: "0 auto",
          }}>
            Every engagement is tailored, but these ranges help you understand what level of system fits your goals, complexity, and growth stage.
          </p>
        </motion.div>

        {/* Cards grid — desktop */}
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
          }}
        >
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </motion.div>

        {/* Cards — mobile (Growth first) */}
        <div
          className="investment-grid-mobile"
          style={{ display: "none", flexDirection: "column", gap: "16px", marginBottom: "48px" }}
        >
          {[PLANS[1], PLANS[0], PLANS[2]].map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Comparison toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          style={{ marginBottom: "32px" }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <button
              onClick={() => setComparisonOpen((v) => !v)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "10px 20px", borderRadius: "12px",
                fontSize: "13px", fontWeight: 500,
                color: "rgba(255,255,255,0.75)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                cursor: "pointer",
                transition: "all 220ms ease",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.09)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.20)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.92)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
              }}
            >
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
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
            transition: "max-height 450ms cubic-bezier(0.22,1,0.36,1), opacity 300ms ease",
          }}>
            {/* Desktop comparison */}
            <div className="comparison-desktop">
              <ComparisonDesktop />
            </div>
            {/* Mobile comparison */}
            <div className="comparison-mobile" style={{ display: "none" }}>
              <ComparisonMobile />
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          style={{
            borderRadius: "20px",
            padding: "40px 32px",
            background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.20)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top shimmer */}
          <span aria-hidden="true" style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.14), transparent)",
            pointerEvents: "none",
          }} />

          <h3 style={{
            fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 500,
            letterSpacing: "-0.02em", color: "#f5f5f7",
            margin: "0 0 10px",
          }}>
            Not sure where your project fits?
          </h3>
          <p style={{
            fontSize: "14px", fontWeight: 300, lineHeight: 1.7,
            color: "rgba(255,255,255,0.65)",
            maxWidth: "480px", margin: "0 auto 28px",
          }}>
            Book a free call and we&apos;ll help define the right scope, timeline, and investment range.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "13px 28px", borderRadius: "14px",
              fontSize: "14px", fontWeight: 500, letterSpacing: "0.01em",
              textDecoration: "none",
              color: "rgba(255,255,255,0.96)",
              background: "linear-gradient(170deg, #6366f1 0%, #4f46e5 100%)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 6px 20px rgba(79,70,229,0.35)",
              transition: "all 260ms cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "linear-gradient(170deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)";
              el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.28), 0 8px 28px rgba(79,70,229,0.50)";
              el.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "linear-gradient(170deg, #6366f1 0%, #4f46e5 100%)";
              el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.18), 0 6px 20px rgba(79,70,229,0.35)";
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
          .investment-grid-mobile > * a[href="#contact"] {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
