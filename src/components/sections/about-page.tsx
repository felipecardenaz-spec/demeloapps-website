"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Footer } from "./footer";

/* ═══════════════════════════════════════════════════════════════════
   AboutPage — DeMelo Apps
   Editorial layout. Inline styles. Dark theme, indigo/violet accents.
   ═══════════════════════════════════════════════════════════════════ */

/* ─── Hero ───────────────────────────────────────────────────────── */
function HeroAbout({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        paddingTop: isMobile ? "120px" : "156px",
        paddingBottom: isMobile ? "60px" : "88px",
        paddingLeft: "24px",
        paddingRight: "24px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? "26px" : "32px",
        position: "relative",
      }}
    >
      {/* Top glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "1000px",
          height: "500px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.12) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Faint dot grid texture — unique to the About hero, sets it apart from Our Work */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(165,180,252,0.07) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          pointerEvents: "none",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 38%, black 15%, transparent 78%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 38%, black 15%, transparent 78%)",
        }}
      />

      {/* H1 — light weight, two-tone with standardized indigo accent */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: isMobile ? "clamp(36px, 9vw, 48px)" : "clamp(48px, 5.4vw, 72px)",
          fontWeight: 300,
          letterSpacing: "-0.038em",
          lineHeight: 1.06,
          color: "#ffffff",
          margin: 0,
          maxWidth: "880px",
          position: "relative",
        }}
      >
        AI software
        <br />
        <span style={{ color: "rgba(129,140,248,0.75)" }}>made in Vancouver.</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: isMobile ? "14.5px" : "clamp(15px, 1.4vw, 16.5px)",
          color: "rgba(255,255,255,0.54)",
          fontWeight: 300,
          lineHeight: 1.72,
          maxWidth: "480px",
          margin: 0,
          position: "relative",
        }}
      >
        We work with growing companies to build AI automation, custom software, and mobile apps. The studio is based in British Columbia, Canada.
      </motion.p>

    </motion.div>
  );
}

/* ─── Story ──────────────────────────────────────────────────────── */
function StorySection({ isMobile }: { isMobile: boolean }) {
  const NUMBERS = [
    { value: "22+", label: "Systems shipped" },
    { value: "4 to 7 wks", label: "Average delivery" },
    { value: "100%", label: "Code stays yours" },
  ];

  return (
    <section
      aria-label="Our Mission"
      style={{
        maxWidth: "1080px",
        margin: "0 auto",
        padding: isMobile ? "44px 24px" : "72px 48px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Heading + body */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(0,0.92fr) minmax(0,1.08fr)",
            gap: isMobile ? "24px" : "64px",
            alignItems: "start",
          }}
        >
          {/* Left: heading */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: 18, height: 1, background: "rgba(129,140,248,0.50)" }} />
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(129,140,248,0.75)",
                }}
              >
                Our Mission
              </span>
            </div>
            <h2
              style={{
                fontSize: isMobile ? "clamp(24px,6.4vw,30px)" : "clamp(28px,3vw,38px)",
                fontWeight: 500,
                letterSpacing: "-0.030em",
                lineHeight: 1.20,
                color: "#f0f0f5",
                margin: 0,
              }}
            >
              Most companies don&apos;t have a people problem. They have a systems
              problem.
            </h2>
          </div>

          {/* Right: body */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <p
              style={{
                fontSize: "14.5px",
                fontWeight: 300,
                lineHeight: 1.82,
                color: "rgba(255,255,255,0.62)",
                margin: 0,
              }}
            >
              Most teams lose hours every week to work software should be
              handling. Copying data between tools. Chasing follow ups.
              Rebuilding the same report every Monday. That lost time adds up,
              and it slowly caps how far a business can grow.
            </p>
            <p
              style={{
                fontSize: "14.5px",
                fontWeight: 300,
                lineHeight: 1.82,
                color: "rgba(255,255,255,0.62)",
                margin: 0,
              }}
            >
              DeMeloApps exists to close that gap. We build AI native software
              that lets a small team run at the scale of a much bigger one. The
              studio is small, founder run, and every project gets measured
              against one thing: the time and money it gives back to the
              business.
            </p>
          </div>
        </div>

        {/* Numbers band */}
        <div style={{ marginTop: isMobile ? "36px" : "52px" }}>
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "stretch",
            }}
          >
            {NUMBERS.map((n, i) => (
              <div key={n.label} style={{ display: "contents" }}>
                <div
                  style={{
                    flex: "1 1 0",
                    padding: isMobile ? "22px 8px" : "30px 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    textAlign: isMobile ? "center" : "left",
                    alignItems: isMobile ? "center" : "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(26px,3vw,34px)",
                      fontWeight: 400,
                      letterSpacing: "-0.025em",
                      color: "#ffffff",
                      lineHeight: 1,
                    }}
                  >
                    {n.value}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 400,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.40)",
                    }}
                  >
                    {n.label}
                  </span>
                </div>
                {i < NUMBERS.length - 1 && (
                  <div
                    aria-hidden="true"
                    style={
                      isMobile
                        ? { height: 1, width: "100%", background: "rgba(255,255,255,0.06)" }
                        : {
                            width: 1,
                            alignSelf: "stretch",
                            background:
                              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.08) 75%, transparent)",
                          }
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Principles ─────────────────────────────────────────────────── */
const PRINCIPLES = [
  {
    index: "01",
    title: "Outcomes over output",
    description:
      "What matters is the result. Hours reclaimed. Revenue earned. Not features shipped or lines of code written.",
  },
  {
    index: "02",
    title: "Built to be owned",
    description:
      "Every line of code, every integration, every workflow we build is yours. No vendor dependencies. Nothing tying you to us. Ever.",
  },
  {
    index: "03",
    title: "Move with intent",
    description:
      "We ship fast, but never carelessly. Speed comes from clarity and a sharp process. Not from cutting corners.",
  },
  {
    index: "04",
    title: "Built to last",
    description:
      "The software we ship is meant to run for years. Documented well, easy to maintain, reliable long after launch day.",
  },
];

function PrincipleCard({ item }: { item: (typeof PRINCIPLES)[number] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: "16px",
        padding: "26px",
        background: hov ? "rgba(99,102,241,0.05)" : "rgba(8,8,18,0.55)",
        border: `1px solid ${hov ? "rgba(129,140,248,0.22)" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hov
          ? "inset 0 1px 0 rgba(255,255,255,0.05), 0 14px 38px rgba(0,0,0,0.30)"
          : "inset 0 1px 0 rgba(255,255,255,0.02)",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.30s cubic-bezier(0.22,1,0.36,1)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(165,180,252,0.14), transparent)",
        }}
      />
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 34,
          height: 34,
          borderRadius: "9px",
          background: hov ? "rgba(99,102,241,0.16)" : "rgba(99,102,241,0.08)",
          border: "1px solid rgba(129,140,248,0.20)",
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "12px",
          fontWeight: 500,
          color: hov ? "rgba(199,210,254,0.95)" : "rgba(165,180,252,0.65)",
          transition: "all 0.30s ease",
        }}
      >
        {item.index}
      </span>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 500,
          letterSpacing: "-0.018em",
          color: "#f0f0f5",
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          fontSize: "13px",
          fontWeight: 300,
          lineHeight: 1.70,
          color: hov ? "rgba(255,255,255,0.66)" : "rgba(255,255,255,0.46)",
          margin: 0,
          transition: "color 0.30s ease",
        }}
      >
        {item.description}
      </p>
    </div>
  );
}

function PrinciplesSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      aria-label="Our Principles"
      style={{
        maxWidth: "1080px",
        margin: "0 auto",
        padding: isMobile ? "44px 24px" : "72px 48px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: 18, height: 1, background: "rgba(129,140,248,0.50)" }} />
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(129,140,248,0.75)",
            }}
          >
            How We Operate
          </span>
        </div>
        <h2
          style={{
            fontSize: isMobile ? "clamp(24px,6.4vw,30px)" : "clamp(28px,3vw,38px)",
            fontWeight: 500,
            letterSpacing: "-0.030em",
            lineHeight: 1.18,
            color: "#f0f0f5",
            margin: 0,
            maxWidth: "520px",
          }}
        >
          Principles we don&apos;t compromise on.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "14px",
        }}
      >
        {PRINCIPLES.map((p) => (
          <PrincipleCard key={p.index} item={p} />
        ))}
      </motion.div>
    </section>
  );
}

/* ─── Capabilities ───────────────────────────────────────────────── */
const CAPABILITIES = [
  {
    group: "AI & Automation",
    items: ["AI Agents", "LLM Pipelines", "Workflow Automation", "Data Extraction", "Process Orchestration"],
  },
  {
    group: "Web & Custom Software",
    items: ["Web Applications", "Internal Tools", "Admin Dashboards", "APIs & Services"],
  },
  {
    group: "Mobile Apps",
    items: ["iOS Apps", "Android Apps", "Cross Platform Apps"],
  },
  {
    group: "Systems & Infrastructure",
    items: ["CRM Integration", "Cloud Deployment", "System Architecture", "Monitoring & Reliability"],
  },
];

function CapabilitiesSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      aria-label="Capabilities"
      style={{
        maxWidth: "1080px",
        margin: "0 auto",
        padding: isMobile ? "44px 24px" : "72px 48px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: 18, height: 1, background: "rgba(129,140,248,0.50)" }} />
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(129,140,248,0.75)",
            }}
          >
            Capabilities
          </span>
        </div>
        <h2
          style={{
            fontSize: isMobile ? "clamp(24px,6.4vw,30px)" : "clamp(28px,3vw,38px)",
            fontWeight: 500,
            letterSpacing: "-0.030em",
            lineHeight: 1.18,
            color: "#f0f0f5",
            margin: 0,
            maxWidth: "560px",
          }}
        >
          What we build.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(8,8,18,0.55)",
          padding: isMobile ? "26px 22px" : "36px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "28px" : "32px 48px",
        }}
      >
        {CAPABILITIES.map((cap) => (
          <div key={cap.group} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "2px",
                  background: "rgba(129,140,248,0.80)",
                  flexShrink: 0,
                }}
              />
              <h3
                style={{
                  fontSize: "13.5px",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  color: "#f0f0f5",
                  margin: 0,
                }}
              >
                {cap.group}
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {cap.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.58)",
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "7px",
                    padding: "6px 12px",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── AboutPage ──────────────────────────────────────────────────── */
export function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(180deg, #0b0918 0%, #08070f 55%, #06060c 100%)",
          position: "relative",
        }}
      >
        <HeroAbout isMobile={isMobile} />
        <StorySection isMobile={isMobile} />
        <PrinciplesSection isMobile={isMobile} />
        <CapabilitiesSection isMobile={isMobile} />
      </div>
      <Footer />
    </>
  );
}
