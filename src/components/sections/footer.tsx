"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ─── Navigation ─────────────────────────────────────────────────── */
const NAV = [
  {
    heading: "Services",
    links: [
      { label: "AI Automation", href: "#services" },
      { label: "Mobile Development", href: "#services" },
      { label: "Web Applications", href: "#services" },
      { label: "CRM & Workflows", href: "#services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Our Work", href: "/our-work" },
      { label: "Investment", href: "#investment" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/* ─── Social icons ───────────────────────────────────────────────── */
const SOCIALS = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
];

/* ─── Sub-components ─────────────────────────────────────────────── */
function SocialBtn({ label, href, icon }: { label: string; href: string; icon: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 36, height: 36,
        borderRadius: "10px",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1px solid rgba(255,255,255,${hov ? 0.14 : 0.07})`,
        background: `rgba(255,255,255,${hov ? 0.07 : 0.03})`,
        color: `rgba(255,255,255,${hov ? 0.90 : 0.42})`,
        textDecoration: "none",
        transition: "all 0.22s ease",
        flexShrink: 0,
      }}
    >
      {icon}
    </a>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <li>
      <a
        href={href}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          fontSize: "13.5px",
          color: hov ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.38)",
          textDecoration: "none",
          fontWeight: 300,
          letterSpacing: "-0.005em",
          transition: "color 0.20s ease",
          display: "inline-flex",
          alignItems: "center",
          gap: hov ? "6px" : "0px",
        }}
      >
        {hov && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M2 8l6-6M3.5 2H8v4.5" stroke="rgba(165,180,252,0.70)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {label}
      </a>
    </li>
  );
}

function BookCallBtn() {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="/contact"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center",
        gap: hov ? "12px" : "9px",
        padding: "14px 32px",
        borderRadius: "100px",
        background: hov
          ? "linear-gradient(170deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)"
          : "linear-gradient(170deg, #5b5ef4 0%, #4338ca 100%)",
        boxShadow: hov
          ? "0 0 40px rgba(99,102,241,0.40), inset 0 1px 0 rgba(255,255,255,0.28)"
          : "0 0 20px rgba(99,102,241,0.20), inset 0 1px 0 rgba(255,255,255,0.14)",
        color: "rgba(255,255,255,0.96)",
        fontSize: "14.5px", fontWeight: 500,
        letterSpacing: "-0.01em",
        textDecoration: "none",
        transition: "all 0.26s ease",
      }}
    >
      Book a free call
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────── */
export function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <footer
      style={{
        width: "100%",
        background: "#0d0c1a",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Top glow separator */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(to right, transparent, rgba(129,140,248,0.30), rgba(165,180,252,0.45), rgba(129,140,248,0.30), transparent)",
      }} />

      {/* Radial glow behind CTA */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "700px", height: "400px",
        background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.10) 0%, transparent 68%)",
        pointerEvents: "none",
      }} />

      {/* Subtle grid pattern */}
      <div className="bg-grid" aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.035 }} />

      {/* Inner container — flex:1 so it fills all available footer height */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 28px",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 1,
      }}>

        {/* ── Closing CTA — flex:1 + centering fills remaining space ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "96px 0 16px" : "108px 0 16px",
            textAlign: "center",
          }}
        >
          <p style={{
            fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.11em",
            textTransform: "uppercase", color: "rgba(129,140,248,0.75)",
            margin: "0 0 12px",
          }}>
            Let's work together
          </p>

          <h2 style={{
            fontSize: isMobile ? "clamp(22px,6vw,30px)" : "clamp(26px,3vw,38px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.32,
            color: "#f5f5f7",
            margin: "0 0 14px",
          }}>
            Ready to automate and grow?
            <br />
            <span style={{ color: "rgba(255,255,255,0.32)", fontWeight: 400 }}>
              Let's build it together.
            </span>
          </h2>

          <p style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.65,
            maxWidth: "360px",
            margin: "0 auto 22px",
            fontWeight: 300,
          }}>
            One free call is all it takes to map out your AI system, software, or mobile app. No commitment needed.
          </p>

          <BookCallBtn />
        </motion.div>

        {/* Separator */}
        <div style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
        }} />

        {/* ── Footer grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr",
          gap: isMobile ? "36px" : "56px",
          padding: isMobile ? "28px 0 20px" : "32px 0 24px",
        }}>

          {/* Brand column */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logoDeMeloApps2.svg"
              alt="DeMeloApps"
              style={{
                height: "26px", width: "auto",
                marginBottom: "16px",
                opacity: 0.88,
                display: "block",
              }}
            />
            <p style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.36)",
              lineHeight: 1.74,
              maxWidth: "260px",
              margin: "0 0 28px",
              fontWeight: 300,
            }}>
              We build AI automation, mobile apps, and custom software that help companies grow without adding headcount.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {SOCIALS.map(s => <SocialBtn key={s.label} {...s} />)}
            </div>
          </div>

          {/* Nav columns */}
          {NAV.map(col => (
            <div key={col.heading}>
              <p style={{
                fontSize: "10.5px",
                fontWeight: 600,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
                margin: "0 0 18px",
              }}>
                {col.heading}
              </p>
              <ul style={{
                listStyle: "none", padding: 0, margin: 0,
                display: "flex", flexDirection: "column", gap: "13px",
              }}>
                {col.links.map(link => <NavLink key={link.label} {...link} />)}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)",
        }} />

        {/* ── Bottom bar ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "space-between",
          flexDirection: isMobile ? "column" : "row",
          gap: "14px",
          padding: isMobile ? "12px 0 20px" : "14px 0 22px",
        }}>
          <p style={{
            fontSize: "11.5px",
            color: "rgba(255,255,255,0.22)",
            margin: 0,
            fontWeight: 300,
            letterSpacing: "0.01em",
          }}>
            © 2026 DeMeloApps. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Service"].map(label => (
              <a
                key={label}
                href="#"
                style={{
                  fontSize: "11.5px",
                  color: "rgba(255,255,255,0.22)",
                  textDecoration: "none",
                  fontWeight: 300,
                  letterSpacing: "0.01em",
                  transition: "color 0.20s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
