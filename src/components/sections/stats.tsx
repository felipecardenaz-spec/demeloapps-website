"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 22,  suffix: "+", label: "Projects Built",  duration: 900  },
  { value: 5.4, suffix: "K", label: "Hours Saved",     duration: 2000 },
  { value: 38,  suffix: "+", label: "Tasks Automated", duration: 1100 },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const raf   = useRef<number>(0);
  const t0    = useRef<number | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!active || fired.current) return;
    fired.current = true;
    function tick(ts: number) {
      if (t0.current === null) t0.current = ts;
      const p = Math.min((ts - t0.current) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const v = e * target;
      setCount(Number.isInteger(target) ? Math.round(v) : Math.round(v * 10) / 10);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, duration]);

  return count;
}

function StatItem({
  value, suffix, label, duration, index, active, isMobile,
}: {
  value: number; suffix: string; label: string;
  duration: number; index: number; active: boolean; isMobile: boolean;
}) {
  const count   = useCountUp(value, duration, active);
  const display = Number.isInteger(count) ? count : count.toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.06 + index * 0.14 }}
      style={{
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: isMobile ? "40px 24px" : "52px 44px",
        position: "relative",
        textAlign: "center",
      }}
    >
      {/* Per-stat ambient glow */}
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 55% 55% at 50% 45%, rgba(99,102,241,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Label — above number, acts as field caption */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.28 + index * 0.14 }}
        style={{
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(129,140,248,0.75)",
          marginBottom: "20px",
          display: "block",
          position: "relative",
        }}
      >
        {label}
      </motion.span>

      {/* Number + suffix */}
      <span style={{
        fontSize: "clamp(34px, 4.2vw, 50px)",
        fontWeight: 700,
        letterSpacing: "-0.05em",
        lineHeight: 1,
        background: "linear-gradient(160deg, #ffffff 0%, rgba(199,210,254,0.88) 55%, rgba(129,140,248,0.60) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontVariantNumeric: "tabular-nums",
        display: "block",
        position: "relative",
      }}>
        {display}{suffix}
      </span>

      {/* Animated accent bar */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={active ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.55 + index * 0.14 }}
        style={{
          marginTop: "24px",
          height: "2px",
          width: "32px",
          background: "linear-gradient(to right, rgba(99,102,241,0.90), rgba(165,180,252,0.40))",
          borderRadius: "999px",
          transformOrigin: "left center",
          position: "relative",
        }}
      />
    </motion.div>
  );
}

export function Stats() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      ref={ref}
      aria-label="DeMeloApps by the Numbers"
      style={{ padding: "16px 24px 96px", position: "relative" }}
    >
      {/* Section-wide ambient glow */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%,-50%)",
        width: "700px", height: "340px",
        background: "radial-gradient(ellipse, rgba(79,70,229,0.03) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "820px", margin: "0 auto", position: "relative" }}>

        {/* Top hairline rule */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(99,102,241,0.32) 25%, rgba(165,180,252,0.42) 50%, rgba(99,102,241,0.32) 75%, transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Stats row */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "stretch",
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ display: "contents" }}>
              <StatItem
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                duration={s.duration}
                index={i}
                active={inView}
                isMobile={isMobile}
              />
              {i < STATS.length - 1 && (
                <div aria-hidden="true" style={
                  isMobile
                    ? {
                        height: "1px",
                        width: "100%",
                        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 50%, transparent)",
                        alignSelf: "stretch",
                        flexShrink: 0,
                      }
                    : {
                        width: "1px",
                        flexShrink: 0,
                        alignSelf: "stretch",
                        background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent)",
                      }
                } />
              )}
            </div>
          ))}
        </div>

        {/* Bottom hairline rule */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(99,102,241,0.18) 25%, rgba(99,102,241,0.24) 50%, rgba(99,102,241,0.18) 75%, transparent)",
            transformOrigin: "center",
          }}
        />

      </div>
    </section>
  );
}
