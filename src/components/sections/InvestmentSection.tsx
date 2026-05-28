"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   InvestmentSection — Editorial pricing layout

   Single font family (inherited Inter from body — no overrides).
   Maximum font-weight: 600. No bold prices, no gradients on text.

   Structure:
     1. Section header (eyebrow + headline + subtext)
     2. Three rich tier cards (label, price, timeline, best-for, includes, CTA)
     3. Collapsible "Compare all features" toggle + detailed matrix
     4. Closing CTA banner (free discovery call)
   ═══════════════════════════════════════════════════════════════════ */

/* ─── Tier data ──────────────────────────────────────────────────── */
const TIERS = [
  {
    id: "foundation",
    label: "Foundation",
    tagline: "Start lean. Prove the concept.",
    investment: "$5k – $15k",
    timeline: "4 – 7 weeks",
    bestFor: "Startups & lean teams validating an idea or shipping a focused MVP.",
    includes: [
      "Strategic discovery & system scoping",
      "One core workflow or MVP product",
      "Up to 3 essential integrations",
      "Launch deployment & documentation",
      "Post-launch QA & full handoff",
    ],
    cta: "Start your foundation",
    featured: false,
  },
  {
    id: "growth",
    label: "Growth",
    tagline: "Connect, automate, compound.",
    investment: "$15k – $40k",
    timeline: "2 – 4 months",
    bestFor: "Growing companies connecting tools and automating real operations.",
    includes: [
      "Multi-workflow system architecture",
      "Custom dashboard or client portal",
      "AI-assisted automation workflows",
      "Multi-platform integrations (5+ tools)",
      "30 days of post-launch support",
      "Performance monitoring setup",
    ],
    cta: "Build my growth system",
    featured: true,
  },
  {
    id: "ecosystem",
    label: "Ecosystem",
    tagline: "Build the platform that scales you.",
    investment: "$40k+",
    timeline: "5+ months",
    bestFor: "Established teams scaling complex AI platforms & multi-product systems.",
    includes: [
      "Custom architecture & infrastructure",
      "Advanced AI agents & automation",
      "Web + mobile + admin platforms",
      "Complex API & data layer integrations",
      "Dedicated technical lead",
      "Ongoing partnership available",
    ],
    cta: "Design my ecosystem",
    featured: false,
  },
] as const;

/* ─── Comparison matrix ──────────────────────────────────────────── */
const COMPARISON = [
  {
    category: "Project scope",
    foundation: "Single system or MVP",
    growth: "Connected operations & workflows",
    ecosystem: "Multi-system platform",
  },
  {
    category: "Team size fit",
    foundation: "Founders & lean teams (1–10)",
    growth: "Growing teams (10–50)",
    ecosystem: "Established orgs (50+)",
  },
  {
    category: "Technology stack",
    foundation: "Modern lean stack",
    growth: "Full-stack + AI/ML tooling",
    ecosystem: "Custom infrastructure & AI/ML",
  },
  {
    category: "AI capabilities",
    foundation: "Focused feature (optional)",
    growth: "AI-assisted workflows",
    ecosystem: "Custom AI agents & models",
  },
  {
    category: "Deliverables",
    foundation: "Web app or workflow system",
    growth: "Dashboard + automated workflows",
    ecosystem: "Web + mobile + admin platforms",
  },
  {
    category: "Integrations",
    foundation: "1 – 3 essential tools",
    growth: "Multi-platform (5+ tools)",
    ecosystem: "Custom APIs & data pipelines",
  },
  {
    category: "Support window",
    foundation: "Launch support + handoff",
    growth: "30 days post-launch",
    ecosystem: "Ongoing partnership",
  },
  {
    category: "Typical outcome",
    foundation: "Validate fast, iterate later",
    growth: "Automate ops, scale output",
    ecosystem: "Build a proprietary platform",
  },
] as const;

/* ─── Icons ──────────────────────────────────────────────────────── */
function CheckIcon({ featured }: { featured: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
      style={{ flexShrink: 0, marginTop: "3px" }}>
      <circle cx="7" cy="7" r="6.4"
        fill={featured ? "rgba(99,102,241,0.14)" : "rgba(255,255,255,0.04)"}
        stroke={featured ? "rgba(129,140,248,0.38)" : "rgba(255,255,255,0.14)"}
        strokeWidth="0.9" />
      <path d="M4.4 7L6.2 8.8L9.6 5.3"
        stroke={featured ? "rgba(199,210,254,0.95)" : "rgba(255,255,255,0.66)"}
        strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 280ms cubic-bezier(0.22,1,0.36,1)",
      }}>
      <path d="M2.8 5L7 9.2L11.2 5"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Tier card ──────────────────────────────────────────────────── */
function TierCard({ tier }: { tier: typeof TIERS[number] }) {
  const [hov, setHov] = useState(false);
  const f = tier.featured;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="inv-card"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: "18px",
        padding: "32px 28px 28px",
        background: f
          ? "linear-gradient(180deg,rgba(99,102,241,0.060) 0%,rgba(99,102,241,0.015) 60%,rgba(255,255,255,0.010) 100%)"
          : "rgba(255,255,255,0.022)",
        border: f
          ? "1px solid rgba(129,140,248,0.34)"
          : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: f
          ? "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 28px rgba(0,0,0,0.20)"
          : "inset 0 1px 0 rgba(255,255,255,0.03), 0 4px 14px rgba(0,0,0,0.14)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition:
          "transform 280ms cubic-bezier(0.22,1,0.36,1), background 280ms ease, border-color 280ms ease, box-shadow 280ms ease",
      }}
    >
      {/* Featured tag */}
      {f && (
        <div style={{
          position: "absolute", top: "-10px", left: "50%",
          transform: "translateX(-50%)",
          fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "4px 12px", borderRadius: "999px",
          background: "linear-gradient(180deg,rgba(99,102,241,0.95) 0%,rgba(79,70,229,0.95) 100%)",
          color: "rgba(255,255,255,0.96)",
          boxShadow: "0 4px 14px rgba(79,70,229,0.40)",
          whiteSpace: "nowrap",
        }}>
          Most Popular
        </div>
      )}

      {/* Tier label */}
      <span style={{
        fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: f ? "rgba(165,180,252,0.85)" : "rgba(255,255,255,0.48)",
        marginBottom: "10px",
      }}>
        {tier.label}
      </span>

      {/* Tagline */}
      <p style={{
        fontSize: "14px", fontWeight: 400, lineHeight: 1.45,
        color: "rgba(245,245,247,0.94)", margin: "0 0 22px",
        letterSpacing: "-0.005em",
      }}>
        {tier.tagline}
      </p>

      {/* Price block */}
      <div style={{
        display: "flex", alignItems: "baseline", flexWrap: "wrap",
        gap: "8px", marginBottom: "6px",
      }}>
        <span style={{
          fontSize: "32px", fontWeight: 500, letterSpacing: "-0.030em",
          lineHeight: 1.05, color: "rgba(245,245,247,0.98)",
          fontVariantNumeric: "tabular-nums",
        }}>
          {tier.investment}
        </span>
      </div>

      {/* Timeline meta */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        color: "rgba(255,255,255,0.50)",
        fontSize: "12.5px", fontWeight: 400,
        marginBottom: "22px",
      }}>
        <ClockIcon />
        <span>{tier.timeline}</span>
      </div>

      {/* Best for block */}
      <div style={{
        padding: "12px 14px",
        borderRadius: "10px",
        background: f ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.025)",
        border: f ? "1px solid rgba(129,140,248,0.16)" : "1px solid rgba(255,255,255,0.05)",
        marginBottom: "22px",
      }}>
        <p style={{
          fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: f ? "rgba(165,180,252,0.75)" : "rgba(255,255,255,0.45)",
          margin: "0 0 6px",
        }}>
          Best for
        </p>
        <p style={{
          fontSize: "12.5px", fontWeight: 400, lineHeight: 1.55,
          color: "rgba(255,255,255,0.74)", margin: 0,
        }}>
          {tier.bestFor}
        </p>
      </div>

      {/* What's included */}
      <p style={{
        fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.45)",
        margin: "0 0 14px",
      }}>
        What&apos;s included
      </p>

      <ul style={{
        listStyle: "none", margin: 0, padding: 0,
        display: "flex", flexDirection: "column", gap: "10px",
        flex: 1, marginBottom: "26px",
      }}>
        {tier.includes.map((item) => (
          <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <CheckIcon featured={f} />
            <span style={{
              fontSize: "13px", fontWeight: 400, lineHeight: 1.5,
              color: "rgba(255,255,255,0.78)",
            }}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA — full width */}
      <a
        href="/contact"
        className="inv-cta"
        data-featured={f ? "true" : "false"}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "8px",
          padding: "13px 20px",
          borderRadius: "12px",
          fontSize: "13.5px", fontWeight: 500, letterSpacing: "0.005em",
          textDecoration: "none",
          color: f ? "rgba(255,255,255,0.98)" : "rgba(245,245,247,0.92)",
          background: f
            ? "linear-gradient(170deg,#6366f1 0%,#4f46e5 100%)"
            : "rgba(255,255,255,0.06)",
          border: f
            ? "1px solid rgba(129,140,248,0.50)"
            : "1px solid rgba(255,255,255,0.14)",
          boxShadow: f
            ? "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 16px rgba(79,70,229,0.32)"
            : "inset 0 1px 0 rgba(255,255,255,0.04)",
          transition:
            "background 220ms ease, border-color 220ms ease, box-shadow 220ms ease, transform 220ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {tier.cta}
        <ArrowIcon size={12} />
      </a>
    </div>
  );
}

/* ─── Comparison matrix — desktop ────────────────────────────────── */
function ComparisonDesktop() {
  return (
    <div style={{
      borderRadius: "16px",
      background: "rgba(255,255,255,0.014)",
      border: "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      overflow: "hidden",
    }}>
      {/* Header row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
        padding: "18px 26px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.012)",
      }}>
        <span style={{
          fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.42)",
        }}>
          Feature
        </span>
        {(["Foundation", "Growth", "Ecosystem"] as const).map((col, i) => (
          <span key={col} style={{
            fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: i === 1 ? "rgba(165,180,252,0.88)" : "rgba(255,255,255,0.48)",
            textAlign: "center",
          }}>
            {col}
          </span>
        ))}
      </div>

      {/* Body rows */}
      {COMPARISON.map((row, idx) => (
        <div
          key={row.category}
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            padding: "16px 26px",
            borderBottom: idx < COMPARISON.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            alignItems: "center",
            position: "relative",
          }}
        >
          <span style={{
            fontSize: "13px", fontWeight: 500,
            color: "rgba(255,255,255,0.62)",
          }}>
            {row.category}
          </span>
          <span style={{
            fontSize: "13px", fontWeight: 400, lineHeight: 1.5,
            color: "rgba(255,255,255,0.74)", textAlign: "center",
          }}>
            {row.foundation}
          </span>
          <span style={{
            fontSize: "13px", fontWeight: 500, lineHeight: 1.5,
            color: "rgba(129,140,248,0.75)", textAlign: "center",
          }}>
            {row.growth}
          </span>
          <span style={{
            fontSize: "13px", fontWeight: 400, lineHeight: 1.5,
            color: "rgba(255,255,255,0.74)", textAlign: "center",
          }}>
            {row.ecosystem}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Comparison matrix — mobile ─────────────────────────────────── */
function ComparisonMobile() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {COMPARISON.map((row) => (
        <div
          key={row.category}
          style={{
            borderRadius: "12px",
            background: "rgba(255,255,255,0.022)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "16px 18px",
          }}
        >
          <p style={{
            fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.46)",
            margin: "0 0 12px",
          }}>
            {row.category}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {([
              { label: "Foundation", value: row.foundation, accent: false },
              { label: "Growth",     value: row.growth,     accent: true  },
              { label: "Ecosystem",  value: row.ecosystem,  accent: false },
            ] as const).map(({ label, value, accent }) => (
              <div key={label} style={{
                display: "grid",
                gridTemplateColumns: "96px 1fr",
                alignItems: "baseline", gap: "12px",
              }}>
                <span style={{
                  fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: accent ? "rgba(165,180,252,0.78)" : "rgba(255,255,255,0.42)",
                }}>
                  {label}
                </span>
                <span style={{
                  fontSize: "13px", lineHeight: 1.55,
                  color: accent ? "rgba(207,217,255,0.94)" : "rgba(255,255,255,0.74)",
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

/* ─── Main section ───────────────────────────────────────────────── */
export function InvestmentSection() {
  const [compareOpen, setCompareOpen] = useState(false);

  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const toggleRef  = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  const headerInView  = useInView(headerRef,  { once: true, margin: "-60px" });
  const gridInView    = useInView(gridRef,    { once: true, margin: "-60px" });
  const toggleInView  = useInView(toggleRef,  { once: true, margin: "-40px" });
  const ctaInView     = useInView(ctaRef,     { once: true, margin: "-40px" });

  return (
    <section
      id="investment"
      aria-label="Investment & Engagement"
      style={{ position: "relative", padding: "112px 20px 120px", overflow: "hidden" }}
    >
      {/* Atmospheric backdrop — quiet, on-brand */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "30%",
        transform: "translate(-50%,-50%)",
        width: "780px", height: "440px", borderRadius: "9999px",
        background: "radial-gradient(ellipse,rgba(99,102,241,0.060) 0%,transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "16%",
        transform: "translateX(-50%)",
        width: "580px", height: "1px",
        background: "linear-gradient(to right,transparent,rgba(255,255,255,0.05),transparent)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "1120px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ─── Header ─── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 22 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 64px" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            marginBottom: "20px",
          }}>
            <span style={{ display: "inline-block", width: "20px", height: "1px", background: "rgba(129,140,248,0.48)" }} />
            <span style={{
              fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "rgba(129,140,248,0.75)",
            }}>
              Investment &amp; Engagement
            </span>
            <span style={{ display: "inline-block", width: "20px", height: "1px", background: "rgba(129,140,248,0.48)" }} />
          </div>

          <h2 style={{
            fontSize: "clamp(28px, 3.6vw, 42px)", fontWeight: 500,
            letterSpacing: "-0.028em", lineHeight: 1.16,
            color: "#f0f0f5", margin: "0 0 18px",
          }}>
            Transparent pricing for custom software & AI systems
          </h2>

          <p style={{
            fontSize: "clamp(14px, 1.4vw, 16px)", fontWeight: 400,
            lineHeight: 1.7, color: "rgba(255,255,255,0.66)",
            maxWidth: "560px", margin: "0 auto",
          }}>
            Three engagement tiers designed around real project scope, from focused MVPs to
            full multi-product ecosystems. Pick the level that fits where your business is going.
          </p>
        </motion.div>

        {/* ─── Tier cards: desktop ─── */}
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0, y: 24 }}
          animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          className="inv-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            alignItems: "stretch",
            marginBottom: "48px",
          }}
        >
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </motion.div>

        {/* ─── Tier cards: mobile (natural order — Growth stays in middle) ─── */}
        <div
          className="inv-grid-mobile"
          style={{ display: "none", flexDirection: "column", gap: "20px", marginBottom: "44px" }}
        >
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* ─── Compare toggle ─── */}
        <motion.div
          ref={toggleRef}
          initial={{ opacity: 0, y: 14 }}
          animate={toggleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}
        >
          <button
            onClick={() => setCompareOpen((v) => !v)}
            aria-expanded={compareOpen}
            aria-controls="inv-comparison-panel"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "12px 22px", borderRadius: "12px",
              fontSize: "13.5px", fontWeight: 500, letterSpacing: "0.005em",
              color: compareOpen ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.74)",
              background: compareOpen ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.030)",
              border: compareOpen ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(255,255,255,0.10)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              transition:
                "background 220ms ease, border-color 220ms ease, color 220ms ease, transform 220ms cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget;
              b.style.background = "rgba(255,255,255,0.08)";
              b.style.borderColor = "rgba(255,255,255,0.20)";
              b.style.color = "rgba(255,255,255,0.94)";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget;
              b.style.background = compareOpen ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.030)";
              b.style.borderColor = compareOpen ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.10)";
              b.style.color = compareOpen ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.74)";
            }}
          >
            <span>{compareOpen ? "Hide detailed comparison" : "Compare all features"}</span>
            <ChevronIcon open={compareOpen} />
          </button>
        </motion.div>

        {/* ─── Comparison panel (collapsible) ─── */}
        <div id="inv-comparison-panel">
          <AnimatePresence initial={false}>
            {compareOpen && (
              <motion.div
                key="comparison"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.3, ease: "easeOut" },
                }}
                style={{ overflow: "hidden", marginBottom: "56px" }}
              >
                <div style={{ paddingTop: "8px" }}>
                  <div className="inv-compare-desktop">
                    <ComparisonDesktop />
                  </div>
                  <div className="inv-compare-mobile" style={{ display: "none" }}>
                    <ComparisonMobile />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Closing CTA banner ─── */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 18 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
          style={{
            marginTop: compareOpen ? "16px" : "56px",
            transition: "margin-top 500ms cubic-bezier(0.22,1,0.36,1)",
            position: "relative",
            borderRadius: "18px",
            padding: "36px 32px",
            background:
              "linear-gradient(170deg,rgba(99,102,241,0.045) 0%,rgba(99,102,241,0.012) 50%,rgba(255,255,255,0.015) 100%)",
            border: "1px solid rgba(129,140,248,0.18)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 28px rgba(0,0,0,0.18)",
            overflow: "hidden",
          }}
        >
          {/* Top reflection */}
          <span aria-hidden="true" style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(to right,transparent,rgba(165,180,252,0.36),transparent)",
            pointerEvents: "none",
          }} />

          <div
            className="inv-banner-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "28px",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{
                fontSize: "clamp(18px, 2.2vw, 22px)", fontWeight: 500,
                letterSpacing: "-0.018em", lineHeight: 1.3,
                color: "rgba(245,245,247,0.96)", margin: "0 0 8px",
              }}>
                Not sure which tier fits your project?
              </h3>
              <p style={{
                fontSize: "14px", fontWeight: 400, lineHeight: 1.65,
                color: "rgba(255,255,255,0.66)", margin: 0,
                maxWidth: "560px",
              }}>
                Every engagement starts with a free 30-minute scoping call. We&apos;ll review your
                goals, recommend the right tier, and outline a clear path forward. No commitment required.
              </p>
            </div>

            <a
              href="/contact"
              className="inv-banner-cta"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 24px", borderRadius: "12px",
                fontSize: "13.5px", fontWeight: 500, letterSpacing: "0.005em",
                color: "rgba(255,255,255,0.98)",
                textDecoration: "none",
                background: "linear-gradient(170deg,#6366f1 0%,#4f46e5 100%)",
                border: "1px solid rgba(129,140,248,0.50)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 16px rgba(79,70,229,0.34)",
                whiteSpace: "nowrap",
                transition:
                  "background 220ms ease, box-shadow 220ms ease, transform 220ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              Book a free call
              <ArrowIcon size={12} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* ─── Styles ─── */}
      <style>{`
        /* Cards — hover */
        .inv-card:hover {
          background: rgba(255,255,255,0.034);
          border-color: rgba(255,255,255,0.14);
        }

        /* CTA hover */
        .inv-cta[data-featured="true"]:hover {
          background: linear-gradient(170deg,#818cf8 0%,#6366f1 50%,#4f46e5 100%) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 6px 22px rgba(79,70,229,0.50) !important;
        }
        .inv-cta[data-featured="false"]:hover {
          background: rgba(255,255,255,0.10) !important;
          border-color: rgba(255,255,255,0.22) !important;
        }

        /* Banner CTA hover */
        .inv-banner-cta:hover {
          background: linear-gradient(170deg,#818cf8 0%,#6366f1 50%,#4f46e5 100%) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 6px 22px rgba(79,70,229,0.50) !important;
          transform: translateY(-1px);
        }

        /* Responsive */
        @media (max-width: 899px) {
          .inv-grid             { display: none !important; }
          .inv-grid-mobile      { display: flex !important; }
          .inv-compare-desktop  { display: none !important; }
          .inv-compare-mobile   { display: block !important; }
        }
        @media (max-width: 720px) {
          .inv-banner-grid {
            grid-template-columns: 1fr !important;
            gap: 22px !important;
            text-align: center;
          }
          .inv-banner-cta { justify-self: center; width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
