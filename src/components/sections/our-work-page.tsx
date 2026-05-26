"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Footer } from "./footer";

/* ═══════════════════════════════════════════════════════════════════
   OurWorkPage — Case Studies
   Editorial layout. Inline styles. Dark theme, indigo/violet accents.
   ═══════════════════════════════════════════════════════════════════ */

/* ─── Data ───────────────────────────────────────────────────────── */
interface Project {
  num: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  img: string;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    num: "01",
    tag: "Startup MVP",
    title: "Traderly",
    headline: "Trading Dashboard",
    description:
      "Traderly is a platform designed to help users track investments and manage day trading activities in a simple and structured way. Originally developed for a group of students exploring financial markets, the tool provides portfolio control, performance monitoring, and insights to support learning and decision making in trading.",
    img: "/images/work/traderly.webp",
    accent: "129,140,248",
  },
  {
    num: "02",
    tag: "Enterprise Solution",
    title: "The Kits Pace",
    headline: "Ecommerce Platform",
    description:
      "We built an integrated ecommerce management platform that centralizes sales, customers, and inventory in real time. With automated workflows and actionable analytics, The Kits Pace gains full visibility and control over its online operations, improving efficiency, decision making, and sales performance.",
    img: "/images/work/thekitspace.webp",
    accent: "129,140,248",
  },
  {
    num: "03",
    tag: "Startup MVP",
    title: "SummitFlow",
    headline: "Project Management SaaS",
    description:
      "SummitFlow is a project management platform designed to simplify team collaboration and task organization. For this project, we developed an interactive, navigable prototype to help validate the concept and user experience before moving into full development.",
    img: "/images/work/summitflow.webp",
    accent: "129,140,248",
  },
  {
    num: "04",
    tag: "Startup MVP",
    title: "EduSphere",
    headline: "Community Manager",
    description:
      "EduSphere is a student community platform built to connect learners, centralize campus events, and enhance engagement. For this project, we developed an interactive, navigable prototype as part of the MVP Starter to validate the concept and test usability before full development.",
    img: "/images/work/edusphere.avif",
    accent: "129,140,248",
  },
  {
    num: "05",
    tag: "Startup MVP",
    title: "StatKick",
    headline: "Soccer Platform",
    description:
      "StatKick is a sports tech platform where players upload their game clips and receive AI generated performance stats such as overall score, pass accuracy, and shooting metrics. Scouts can search and evaluate players through advanced analytics, making talent discovery faster and data driven.",
    img: "/images/work/statkick.avif",
    accent: "129,140,248",
  },
];

/* ─── HeroSection ────────────────────────────────────────────────── */
function HeroSection({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{
        paddingTop: isMobile ? "122px" : "156px",
        paddingBottom: isMobile ? "60px" : "84px",
        position: "relative",
      }}
    >
      {/* Top radial glow — centered on viewport */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "1000px",
          height: "520px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.10) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Faint horizontal scan lines — distinct from About's dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(165,180,252,0.025) 3px, rgba(165,180,252,0.025) 4px)",
          pointerEvents: "none",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 10%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 10%, transparent 75%)",
        }}
      />

      {/* Editorial layout — content aligned with case studies grid below */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          gap: isMobile ? "22px" : "28px",
          position: "relative",
        }}
      >
        {/* Left-side accent rule + index — editorial section marker */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: "11px",
              letterSpacing: "0.20em",
              color: "rgba(129,140,248,0.75)",
              fontWeight: 400,
            }}
          >
            /05
          </span>
          <span
            aria-hidden="true"
            style={{
              width: 40,
              height: 1,
              background: "rgba(129,140,248,0.45)",
            }}
          />
        </motion.div>

        {/* H1 — light weight, two-tone with standardized indigo accent */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: isMobile ? "clamp(40px, 9.5vw, 52px)" : "clamp(56px, 6vw, 86px)",
            fontWeight: 300,
            letterSpacing: "-0.040em",
            lineHeight: 1.04,
            color: "#ffffff",
            margin: 0,
            position: "relative",
            maxWidth: "920px",
          }}
        >
          Work that moves
          <br />
          <span style={{ color: "rgba(129,140,248,0.75)" }}>the needle.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: isMobile ? "14.5px" : "clamp(15px, 1.4vw, 16.5px)",
            color: "rgba(255,255,255,0.52)",
            fontWeight: 300,
            lineHeight: 1.72,
            maxWidth: "460px",
            margin: 0,
            position: "relative",
          }}
        >
          Real systems built for real businesses. Every project here replaced
          manual work, not just improved it.
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ─── ImageFrame ─────────────────────────────────────────────────── */
function MockupFrame({
  project,
  aspectRatio,
}: {
  project: Project;
  aspectRatio: string;
}) {
  const [hov, setHov] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const a = project.accent;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid rgba(${a},${hov ? 0.28 : 0.14})`,
        background: "rgba(8,8,18,0.85)",
        boxShadow: hov
          ? `0 30px 80px -20px rgba(0,0,0,0.55), 0 0 50px -10px rgba(${a},0.18)`
          : `0 18px 50px -20px rgba(0,0,0,0.40), 0 0 30px -15px rgba(${a},0.08)`,
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.img}
        alt={project.title}
        onLoad={() => setLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          opacity: loaded ? 1 : 0,
          transform: hov ? "scale(1.04)" : "scale(1)",
          transition:
            "transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.40s ease",
        }}
      />

      {/* Accent tint */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, rgba(${a},0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ─── ProjectRow ─────────────────────────────────────────────────── */
function ProjectRow({
  project,
  index,
  isMobile,
}: {
  project: Project;
  index: number;
  isMobile: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const a = project.accent;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      style={{ position: "relative" }}
    >
      {/* Section divider */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right,transparent,rgba(255,255,255,0.08),transparent)",
          marginBottom: isMobile ? "40px" : "60px",
        }}
      />

      {/* ── MOBILE layout ── */}
      {isMobile && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Tag + number */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "9.5px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(129,140,248,0.75)",
                background: `rgba(${a},0.08)`,
                border: `1px solid rgba(${a},0.18)`,
                padding: "5px 12px",
                borderRadius: "100px",
              }}
            >
              {project.tag}
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.14)",
                fontFamily: "'Courier New', Courier, monospace",
                letterSpacing: "0.10em",
              }}
            >
              {project.num}
            </span>
          </div>

          {/* Title + headline */}
          <div>
            <h2
              style={{
                fontSize: "clamp(28px,8vw,40px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                color: "#ffffff",
                margin: "0 0 10px",
              }}
            >
              {project.title}
            </h2>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: 1.50,
                color: "rgba(129,140,248,0.75)",
                margin: 0,
              }}
            >
              {project.headline}
            </p>
          </div>

          {/* Mockup */}
          <MockupFrame project={project} aspectRatio="16/9" />

          {/* Description */}
          <p
            style={{
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: 1.80,
              color: "rgba(255,255,255,0.42)",
              margin: 0,
            }}
          >
            {project.description}
          </p>

          <div style={{ height: "16px" }} />
        </div>
      )}

      {/* ── DESKTOP layout ── */}
      {!isMobile && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "72px",
            alignItems: "start",
            paddingBottom: "64px",
          }}
        >
          {/* Left: text content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Tag + number */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span
                style={{
                  fontSize: "9.5px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(129,140,248,0.75)",
                  background: `rgba(${a},0.08)`,
                  border: `1px solid rgba(${a},0.18)`,
                  padding: "5px 14px",
                  borderRadius: "100px",
                }}
              >
                {project.tag}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.14)",
                  fontFamily: "'Courier New', Courier, monospace",
                  letterSpacing: "0.10em",
                }}
              >
                {project.num}
              </span>
            </div>

            {/* Title + headline */}
            <div>
              <h2
                style={{
                  fontSize: "clamp(36px,3.2vw,54px)",
                  fontWeight: 400,
                  letterSpacing: "-0.034em",
                  lineHeight: 1.06,
                  color: "#ffffff",
                  margin: "0 0 14px",
                }}
              >
                {project.title}
              </h2>
              <p
                style={{
                  fontSize: "clamp(15px,1.3vw,18px)",
                  fontWeight: 300,
                  lineHeight: 1.48,
                  color: "rgba(129,140,248,0.75)",
                  margin: 0,
                }}
              >
                {project.headline}
              </p>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: "14px",
                fontWeight: 300,
                lineHeight: 1.82,
                color: "rgba(255,255,255,0.42)",
                margin: 0,
              }}
            >
              {project.description}
            </p>

          </div>

          {/* Right: image */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <MockupFrame project={project} aspectRatio="4/3" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ─── ProjectsSection ────────────────────────────────────────────── */
function ProjectsSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      aria-label="Case Studies"
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: isMobile ? "0 20px" : "0 48px",
        boxSizing: "border-box",
      }}
    >
      {PROJECTS.map((project, index) => (
        <ProjectRow
          key={project.num}
          project={project}
          index={index}
          isMobile={isMobile}
        />
      ))}
    </section>
  );
}

/* ─── OurWorkPage ────────────────────────────────────────────────── */
export function OurWorkPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <div style={{ background: "#080812" }}>
        <HeroSection isMobile={isMobile} />
        <ProjectsSection isMobile={isMobile} />
      </div>
      <Footer />
    </>
  );
}
