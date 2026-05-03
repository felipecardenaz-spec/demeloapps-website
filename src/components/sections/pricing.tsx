"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Data ──────────────────────────────────────────────────────── */
const LEVELS = [
  {
    id: "launch",
    label: "Level 01",
    title: "Launch System",
    investment: "$5k – $15k",
    description: "For MVPs, focused automation, and lean digital products.",
    bestFor: "Validating an idea or automating one important workflow.",
    includes: ["MVP builds", "Core automation", "Essential integrations"],
    badge: null,
    size: "compact" as const,
  },
  {
    id: "growth",
    label: "Level 02",
    title: "Growth System",
    investment: "$15k – $40k",
    description: "For connected workflows, dashboards, and AI-assisted operations.",
    bestFor: "Businesses ready to connect sales, marketing, and operations.",
    includes: ["Multi-workflow systems", "Dashboards and portals", "AI-assisted workflows", "Integrations"],
    badge: "Most common",
    size: "featured" as const,
  },
  {
    id: "advanced",
    label: "Level 03",
    title: "Advanced Systems",
    investment: "$40k+",
    description: "For complex platforms, automation ecosystems, and scalable infrastructure.",
    bestFor: "Companies building full product ecosystems or advanced AI operations.",
    includes: ["Custom architecture", "AI systems", "Complex platforms"],
    badge: null,
    size: "deep" as const,
  },
] as const;

type LevelId = typeof LEVELS[number]["id"];
type LevelSize = typeof LEVELS[number]["size"];

/* ─── Animated signal along pathway ────────────────────────────── */
function PathwaySignal({ t, activeId }: { t: number; activeId: LevelId | null }) {
  const progress = (t * 0.14) % 1;
  const x = progress * 100;
  const opacity = activeId ? 0.55 : 0.28;

  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, overflow: "visible" }}
      preserveAspectRatio="none"
    >
      {/* Main pathway line */}
      <line x1="0%" y1="50%" x2="100%" y2="50%"
        stroke="rgba(129,140,248,0.08)" strokeWidth="1.2" strokeDasharray="5 10" />
      {/* Solid segments between modules */}
      <line x1="28%" y1="50%" x2="36%" y2="50%"
        stroke={`rgba(129,140,248,${activeId === "launch" || activeId === "growth" ? 0.22 : 0.10})`}
        strokeWidth="1" />
      <line x1="64%" y1="50%" x2="72%" y2="50%"
        stroke={`rgba(129,140,248,${activeId === "growth" || activeId === "advanced" ? 0.22 : 0.10})`}
        strokeWidth="1" />
      {/* Junction nodes */}
      <circle cx="36%" cy="50%" r="3" fill="rgba(129,140,248,0.20)" />
      <circle cx="64%" cy="50%" r="3" fill="rgba(129,140,248,0.20)" />
      {/* Scope arrow label */}
      <text x="50%" y="calc(50% + 14px)" textAnchor="middle" fontSize="7"
        fill="rgba(129,140,248,0.25)" fontFamily="monospace" letterSpacing="0.08em">
        SCOPE INCREASES →
      </text>
      {/* Animated signal dot */}
      <circle cx={`${x}%`} cy="50%" r="3"
        fill={`rgba(165,180,252,${opacity})`}
        style={{ filter: "blur(0.5px)" }}
      />
    </svg>
  );
}

/* ─── Stacked layers visual (Advanced) ─────────────────────────── */
function StackedLayers() {
  return (
    <div style={{ position: "relative", height: "32px", marginBottom: "16px" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${i * 4}px`,
          top: `${i * 5}px`,
          right: `${-i * 4}px`,
          height: "10px",
          borderRadius: "4px",
          background: `rgba(139,92,246,${0.08 - i * 0.02})`,
          border: `1px solid rgba(139,92,246,${0.14 - i * 0.04})`,
        }} />
      ))}
    </div>
  );
}

/* ─── Level module ──────────────────────────────────────────────── */
function LevelModule({
  level,
  active,
  activeId,
  onHover,
  delay,
}: {
  level: typeof LEVELS[number];
  active: boolean;
  activeId: LevelId | null;
  onHover: (id: LevelId | null) => void;
  delay: number;
}) {
  const isFeatured = level.size === "featured";
  const isDeep = level.size === "deep";
  const isCompact = level.size === "compact";
  const isDimmed = activeId !== null && activeId !== level.id;
  const isHovered = activeId === level.id;

  /* Vertical positioning */
  const marginTop = isCompact ? "28px" : isDeep ? "-12px" : "0";

  return (
    <motion.div
      initial={{ opacity: 0, y: isFeatured ? 30 : 20 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: isFeatured ? 30 : 20 }}
      transition={{ duration: 0.80, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseEnter={() => onHover(level.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        flex: isFeatured ? "1.28" : isDeep ? "1.08" : "1",
        minWidth: 0,
        position: "relative",
        marginTop,
        opacity: isDimmed ? 0.38 : 1,
        transition: "opacity 260ms ease",
        zIndex: isHovered ? 4 : isFeatured ? 3 : 2,
      }}
    >
      {/* Outer halo (featured only) */}
      {isFeatured && (
        <div style={{
          position: "absolute",
          inset: "-8px",
          borderRadius: "30px",
          background: "linear-gradient(145deg, rgba(99,102,241,0.07) 0%, transparent 55%)",
          border: "1px solid rgba(99,102,241,0.07)",
          pointerEvents: "none",
        }} />
      )}

      {/* Deep stacked shadow layers (advanced) */}
      {isDeep && (
        <>
          <div style={{
            position: "absolute",
            inset: "6px", top: "10px",
            borderRadius: "20px",
            background: "rgba(139,92,246,0.04)",
            border: "1px solid rgba(139,92,246,0.06)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            inset: "3px", top: "5px",
            borderRadius: "20px",
            background: "rgba(139,92,246,0.05)",
            border: "1px solid rgba(139,92,246,0.08)",
            pointerEvents: "none",
          }} />
        </>
      )}

      {/* Main module surface */}
      <div style={{
        position: "relative",
        borderRadius: isFeatured ? "24px" : "18px",
        padding: isFeatured ? "36px 30px 32px" : isDeep ? "28px 24px 26px" : "24px 22px 22px",
        background: isFeatured
          ? isHovered
            ? "linear-gradient(155deg, rgba(99,102,241,0.13) 0%, rgba(79,70,229,0.07) 45%, rgba(255,255,255,0.03) 100%)"
            : "linear-gradient(155deg, rgba(99,102,241,0.09) 0%, rgba(79,70,229,0.05) 45%, rgba(255,255,255,0.02) 100%)"
          : isDeep
            ? isHovered
              ? "linear-gradient(155deg, rgba(139,92,246,0.09) 0%, rgba(255,255,255,0.04) 100%)"
              : "linear-gradient(155deg, rgba(139,92,246,0.05) 0%, rgba(255,255,255,0.02) 100%)"
            : isHovered
              ? "linear-gradient(155deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)"
              : "linear-gradient(155deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: isFeatured
          ? isHovered ? "1px solid rgba(129,140,248,0.32)" : "1px solid rgba(129,140,248,0.18)"
          : isDeep
            ? isHovered ? "1px solid rgba(167,139,250,0.22)" : "1px solid rgba(167,139,250,0.10)"
            : isHovered ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: isFeatured
          ? isHovered
            ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 64px rgba(0,0,0,0.38), 0 0 0 1px rgba(99,102,241,0.10)"
            : "inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 44px rgba(0,0,0,0.30), 0 0 0 1px rgba(99,102,241,0.06)"
          : isHovered
            ? "inset 0 1px 0 rgba(255,255,255,0.10), 0 10px 30px rgba(0,0,0,0.26)"
            : "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.18)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 270ms cubic-bezier(0.22,1,0.36,1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Top shimmer */}
        <span aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: isFeatured
            ? "linear-gradient(to right, transparent, rgba(165,180,252,0.40), transparent)"
            : "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)",
          pointerEvents: "none",
        }} />

        {/* Featured inner glow */}
        {isFeatured && (
          <div aria-hidden="true" style={{
            position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)",
            width: "110%", height: "220px", borderRadius: "9999px",
            background: "radial-gradient(ellipse, rgba(99,102,241,0.11) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        )}

        {/* Badge */}
        {level.badge && (
          <div style={{ marginBottom: "14px" }}>
            <span style={{
              display: "inline-block",
              fontSize: "8.5px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "3px 10px",
              borderRadius: "9999px",
              color: "rgba(165,180,252,0.90)",
              background: "rgba(99,102,241,0.14)",
              border: "1px solid rgba(129,140,248,0.22)",
            }}>
              {level.badge}
            </span>
          </div>
        )}

        {/* Label */}
        <span style={{
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: isFeatured ? "rgba(165,180,252,0.55)" : "rgba(255,255,255,0.22)",
          display: "block",
          marginBottom: "8px",
        }}>
          {level.label}
        </span>

        {/* Title */}
        <h3 style={{
          fontSize: isFeatured ? "clamp(19px, 2.1vw, 23px)" : "clamp(15px, 1.7vw, 18px)",
          fontWeight: 500,
          letterSpacing: "-0.020em",
          lineHeight: 1.18,
          color: isHovered ? "#ffffff" : "#f0f0f5",
          margin: "0 0 8px",
          transition: "color 220ms ease",
        }}>
          {level.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: isFeatured ? "12.5px" : "11.5px",
          fontWeight: 300,
          lineHeight: 1.65,
          color: isHovered ? "rgba(255,255,255,0.68)" : "rgba(255,255,255,0.38)",
          margin: "0 0 22px",
          transition: "color 220ms ease",
        }}>
          {level.description}
        </p>

        {/* Investment */}
        <div style={{
          marginBottom: "22px",
          paddingBottom: "20px",
          borderBottom: isFeatured
            ? "1px solid rgba(129,140,248,0.12)"
            : "1px solid rgba(255,255,255,0.05)",
        }}>
          <span style={{
            display: "block",
            fontSize: "8.5px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(165,180,252,0.35)",
            marginBottom: "3px",
          }}>
            Investment
          </span>
          <span style={{
            display: "block",
            fontSize: isFeatured ? "clamp(26px, 3vw, 36px)" : "clamp(20px, 2.4vw, 28px)",
            fontWeight: 600,
            letterSpacing: "-0.030em",
            lineHeight: 1.0,
            color: isFeatured
              ? isHovered ? "rgba(215,220,255,1.0)" : "rgba(200,208,255,0.92)"
              : isHovered ? "rgba(245,245,247,0.90)" : "rgba(245,245,247,0.65)",
            transition: "color 220ms ease",
          }}>
            {level.investment}
          </span>
        </div>

        {/* Stacked layers visual for Advanced */}
        {isDeep && <StackedLayers />}

        {/* Includes */}
        <ul style={{
          listStyle: "none", margin: 0, padding: 0,
          display: "flex", flexDirection: "column",
          gap: isFeatured ? "8px" : "6px",
        }}>
          {level.includes.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span style={{
                width: isFeatured ? "5px" : "4px",
                height: isFeatured ? "5px" : "4px",
                borderRadius: "50%",
                flexShrink: 0,
                background: isFeatured
                  ? isHovered ? "rgba(165,180,252,0.80)" : "rgba(129,140,248,0.50)"
                  : isDeep
                    ? isHovered ? "rgba(167,139,250,0.70)" : "rgba(167,139,250,0.30)"
                    : isHovered ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.18)",
                transition: "background 220ms ease",
              }} />
              <span style={{
                fontSize: isFeatured ? "12px" : "11px",
                fontWeight: 400,
                color: isHovered ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0.35)",
                transition: "color 220ms ease",
              }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ─── Insight panel ─────────────────────────────────────────────── */
function InsightPanel({ active }: { active: boolean }) {
  const rows = [
    { level: "Launch", text: "One focused workflow or product" },
    { level: "Growth", text: "Connected systems across teams" },
    { level: "Advanced", text: "Full ecosystem with deeper automation" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1], delay: 0.20 }}
      style={{
        marginTop: "48px",
        borderRadius: "18px",
        padding: "28px 32px",
        background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px 40px",
        position: "relative",
        overflow: "hidden",
      }}
      className="insight-panel"
    >
      <span aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.10), transparent)",
        pointerEvents: "none",
      }} />

      {/* Left: title + text */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h4 style={{
          fontSize: "14px",
          fontWeight: 500,
          letterSpacing: "-0.015em",
          color: "#f0f0f5",
          margin: 0,
        }}>
          What changes between levels?
        </h4>
        <p style={{
          fontSize: "12.5px",
          fontWeight: 300,
          lineHeight: 1.68,
          color: "rgba(255,255,255,0.50)",
          margin: 0,
        }}>
          Each level increases in workflow depth, integration requirements, automation complexity, and product scale.
        </p>
      </div>

      {/* Right: comparison rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {rows.map((row, i) => (
          <div key={row.level} style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 12px",
            borderRadius: "10px",
            background: i === 1 ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.02)",
            border: i === 1 ? "1px solid rgba(129,140,248,0.10)" : "1px solid rgba(255,255,255,0.04)",
          }}>
            <span style={{
              fontSize: "8.5px",
              fontWeight: 600,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: i === 1 ? "rgba(165,180,252,0.65)" : "rgba(255,255,255,0.25)",
              flexShrink: 0,
              minWidth: "52px",
            }}>
              {row.level}
            </span>
            <span style={{
              fontSize: "12px",
              fontWeight: 300,
              color: i === 1 ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.45)",
              lineHeight: 1.5,
            }}>
              {row.text}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Mobile level card ─────────────────────────────────────────── */
function MobileLevelCard({
  level,
  active,
  delay,
  t,
}: {
  level: typeof LEVELS[number];
  active: boolean;
  delay: number;
  t: number;
}) {
  const isFeatured = level.size === "featured";
  const isDeep = level.size === "deep";

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}
    >
      {/* Left: vertical connector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: "6px" }}>
        <div style={{
          width: isFeatured ? "10px" : "7px",
          height: isFeatured ? "10px" : "7px",
          borderRadius: "50%",
          background: isFeatured ? "rgba(129,140,248,0.85)" : "rgba(255,255,255,0.25)",
          border: isFeatured ? "1px solid rgba(165,180,252,0.55)" : "1px solid rgba(255,255,255,0.12)",
          boxShadow: isFeatured ? "0 0 10px rgba(99,102,241,0.40)" : "none",
          flexShrink: 0,
        }} />
        <div style={{
          width: "1px",
          flex: 1,
          minHeight: "32px",
          background: isFeatured
            ? "linear-gradient(to bottom, rgba(129,140,248,0.30), rgba(129,140,248,0.06))"
            : "linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0.02))",
          marginTop: "6px",
        }} />
      </div>

      {/* Right: module */}
      <div style={{
        flex: 1,
        borderRadius: isFeatured ? "20px" : "16px",
        padding: isFeatured ? "24px 20px" : "18px 16px",
        background: isFeatured
          ? "linear-gradient(155deg, rgba(99,102,241,0.09) 0%, rgba(79,70,229,0.05) 50%, rgba(255,255,255,0.02) 100%)"
          : isDeep
            ? "linear-gradient(155deg, rgba(139,92,246,0.05) 0%, rgba(255,255,255,0.02) 100%)"
            : "linear-gradient(155deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isFeatured
          ? "1px solid rgba(129,140,248,0.18)"
          : isDeep
            ? "1px solid rgba(167,139,250,0.10)"
            : "1px solid rgba(255,255,255,0.07)",
        boxShadow: isFeatured
          ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 32px rgba(0,0,0,0.28)"
          : "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 14px rgba(0,0,0,0.18)",
        position: "relative",
        overflow: "hidden",
        marginBottom: "4px",
      }}>
        <span aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: isFeatured
            ? "linear-gradient(to right, transparent, rgba(165,180,252,0.30), transparent)"
            : "linear-gradient(to right, transparent, rgba(255,255,255,0.10), transparent)",
          pointerEvents: "none",
        }} />

        {/* Badge */}
        {level.badge && (
          <span style={{
            fontSize: "8px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "2px 8px",
            borderRadius: "9999px",
            color: "rgba(165,180,252,0.90)",
            background: "rgba(99,102,241,0.14)",
            border: "1px solid rgba(129,140,248,0.22)",
            marginBottom: "10px",
            display: "block",
          }}>
            {level.badge}
          </span>
        )}

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "12px" }}>
          <div>
            <span style={{
              fontSize: "8.5px", fontWeight: 600, letterSpacing: "0.14em",
              textTransform: "uppercase", color: isFeatured ? "rgba(165,180,252,0.55)" : "rgba(255,255,255,0.22)",
              display: "block", marginBottom: "4px",
            }}>
              {level.label}
            </span>
            <h3 style={{
              fontSize: isFeatured ? "17px" : "15px",
              fontWeight: 500, letterSpacing: "-0.018em",
              lineHeight: 1.20, color: "#f5f5f7", margin: 0,
            }}>
              {level.title}
            </h3>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <span style={{
              fontSize: "8px", fontWeight: 600, letterSpacing: "0.10em",
              textTransform: "uppercase", color: "rgba(165,180,252,0.35)",
              display: "block", marginBottom: "2px",
            }}>
              Investment
            </span>
            <span style={{
              fontSize: isFeatured ? "20px" : "17px",
              fontWeight: 600, letterSpacing: "-0.025em",
              color: isFeatured ? "rgba(200,208,255,0.92)" : "rgba(245,245,247,0.70)",
            }}>
              {level.investment}
            </span>
          </div>
        </div>

        <p style={{
          fontSize: "12px", fontWeight: 300, lineHeight: 1.65,
          color: "rgba(255,255,255,0.50)", margin: "0 0 14px",
        }}>
          {level.description}
        </p>

        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "5px" }}>
          {level.includes.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{
                width: "4px", height: "4px", borderRadius: "50%", flexShrink: 0,
                background: isFeatured ? "rgba(129,140,248,0.50)" : "rgba(255,255,255,0.18)",
              }} />
              <span style={{ fontSize: "11px", fontWeight: 400, color: "rgba(255,255,255,0.45)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ─── CTA strip ─────────────────────────────────────────────────── */
function CTAStrip({ active }: { active: boolean }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
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
          Book a free call and we&apos;ll help define the right scope, timeline, and investment range.
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
  const [activeId, setActiveId] = useState<LevelId | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [t, setT] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathwayRef = useRef<HTMLDivElement>(null);
  const insightRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const pathwayInView = useInView(pathwayRef, { once: true, margin: "-60px" });
  const insightInView = useInView(insightRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

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

  /* Mobile order: growth first, then launch, then advanced */
  const mobileOrder = [
    LEVELS.find((l) => l.id === "growth")!,
    LEVELS.find((l) => l.id === "launch")!,
    LEVELS.find((l) => l.id === "advanced")!,
  ];

  return (
    <section
      ref={sectionRef}
      id="investment"
      aria-label="Investment Architecture"
      style={{ padding: "80px 20px 100px", position: "relative", overflow: "hidden" }}
    >
      {/* Background */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(6,6,20,0.55) 50%, rgba(5,5,5,0) 100%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "900px", height: "500px",
        borderRadius: "9999px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 65%)",
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
            Choose the right level of<br />system for your stage
          </h2>

          <p style={{
            fontSize: "clamp(14px, 1.4vw, 16px)",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.60)",
            margin: "0 auto",
            maxWidth: "480px",
          }}>
            Every engagement is tailored, but most projects fall into one of three levels based on scope, complexity, and the outcomes your business needs.
          </p>
        </motion.div>

        {/* ── Desktop pathway ── */}
        {!isMobile && (
          <div ref={pathwayRef} style={{ position: "relative" }}>
            {/* Pathway signal layer */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
              <PathwaySignal t={t} activeId={activeId} />
            </div>

            <div style={{
              display: "flex",
              gap: "18px",
              alignItems: "flex-start",
              position: "relative",
              zIndex: 1,
            }}>
              {LEVELS.map((level, i) => (
                <LevelModule
                  key={level.id}
                  level={level}
                  active={pathwayInView}
                  activeId={activeId}
                  onHover={setActiveId}
                  delay={0.06 + i * 0.10}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Mobile pathway ── */}
        {isMobile && (
          <div ref={pathwayRef} style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {mobileOrder.map((level, i) => (
              <MobileLevelCard
                key={level.id}
                level={level}
                active={pathwayInView}
                delay={0.06 + i * 0.10}
                t={t}
              />
            ))}
          </div>
        )}

        {/* ── Insight panel ── */}
        <div ref={insightRef}>
          <InsightPanel active={insightInView} />
        </div>

        {/* ── CTA ── */}
        <div ref={ctaRef}>
          <CTAStrip active={ctaInView} />
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .insight-panel {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
