"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const ITEMS = [
  {
    index: "01",
    title: "Fast Delivery",
    badge: "4 to 7 Weeks",
    description:
      "Production grade AI systems shipped in weeks, not quarters. Speed without compromising quality.",
  },
  {
    index: "02",
    title: "Native AI",
    badge: "Built Into the Core",
    description:
      "AI engineered into the foundation of every system. Not bolted on. Not an afterthought.",
  },
  {
    index: "03",
    title: "Full Code Ownership",
    badge: "Yours to Keep",
    description:
      "Every line of code, integration, and workflow belongs to you. No platform fees. No vendor lockouts.",
  },
  {
    index: "04",
    title: "Outcomes Over Output",
    badge: "Measured Returns",
    description:
      "Success measured by what matters: hours reclaimed, pipeline converted, revenue generated.",
  },
];

/* ─── Row ────────────────────────────────────────────────────────── */
function Row({
  item,
  rowIndex,
  active,
}: {
  item: (typeof ITEMS)[number];
  rowIndex: number;
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1], delay: 0.12 + rowIndex * 0.09 }}
    >
      {/* Separator */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background: hovered
            ? "linear-gradient(to right, rgba(99,102,241,0.40), rgba(129,140,248,0.18) 60%, transparent)"
            : "rgba(255,255,255,0.07)",
          transition: "background 0.38s ease",
        }}
      />

      {/* Content row */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          gap: "28px",
          padding: "30px 0 30px 0",
          cursor: "default",
        }}
      >
        {/* Left accent bar */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-28px",
            top: 0,
            bottom: 0,
            width: "2px",
            borderRadius: "0 2px 2px 0",
            background: hovered ? "rgba(99,102,241,0.65)" : "transparent",
            transition: "background 0.35s ease",
          }}
        />

        {/* Index */}
        <span
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "10.5px",
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: hovered ? "rgba(165,180,252,0.75)" : "rgba(129,140,248,0.35)",
            flexShrink: 0,
            paddingTop: "2px",
            minWidth: "22px",
            transition: "color 0.30s ease",
          }}
        >
          {item.index}
        </span>

        {/* Text */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "7px" }}>
          <h3
            style={{
              fontSize: "clamp(15px, 1.6vw, 17px)",
              fontWeight: 500,
              letterSpacing: "-0.016em",
              color: hovered ? "#ffffff" : "rgba(245,245,247,0.85)",
              lineHeight: 1.25,
              margin: 0,
              transition: "color 0.28s ease",
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 300,
              lineHeight: 1.68,
              color: hovered ? "rgba(255,255,255,0.68)" : "rgba(255,255,255,0.44)",
              margin: 0,
              transition: "color 0.28s ease",
              maxWidth: "540px",
            }}
          >
            {item.description}
          </p>
        </div>

        {/* Badge */}
        <div
          style={{
            flexShrink: 0,
            alignSelf: "flex-start",
            padding: "5px 14px",
            borderRadius: "9999px",
            background: hovered ? "rgba(99,102,241,0.10)" : "rgba(255,255,255,0.025)",
            border: hovered
              ? "1px solid rgba(129,140,248,0.30)"
              : "1px solid rgba(255,255,255,0.07)",
            transition: "all 0.30s ease",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.05em",
              color: hovered ? "rgba(199,210,254,0.95)" : "rgba(255,255,255,0.38)",
              whiteSpace: "nowrap",
              transition: "color 0.28s ease",
            }}
          >
            {item.badge}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */
export function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="why-us"
      aria-label="Why Choose DeMeloApps"
      style={{ padding: "80px 24px 96px", position: "relative" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          width: "660px",
          height: "480px",
          background: "radial-gradient(ellipse, rgba(79,70,229,0.055) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          position: "relative",
          paddingLeft: "28px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "60px", display: "flex", flexDirection: "column", gap: "14px" }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                display: "inline-block",
                width: "18px",
                height: "1px",
                background: "rgba(129,140,248,0.50)",
              }}
            />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(129,140,248,0.75)",
              }}
            >
              Why Choose DeMeloApps
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontSize: "clamp(28px, 3.8vw, 46px)",
              fontWeight: 500,
              letterSpacing: "-0.032em",
              lineHeight: 1.14,
              color: "#f0f0f5",
              margin: 0,
            }}
          >
            Engineered for outcomes.
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontSize: "clamp(13.5px, 1.3vw, 15px)",
              fontWeight: 300,
              lineHeight: 1.72,
              color: "rgba(255,255,255,0.55)",
              margin: 0,
              maxWidth: "440px",
            }}
          >
            Custom AI software built to deliver measurable business outcomes.
          </p>
        </motion.div>

        {/* Rows */}
        <div>
          {ITEMS.map((item, i) => (
            <Row key={item.index} item={item} rowIndex={i} active={inView} />
          ))}
          {/* Closing line */}
          <div
            aria-hidden="true"
            style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
          />
        </div>
      </div>
    </section>
  );
}
