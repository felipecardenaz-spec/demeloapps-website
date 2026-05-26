"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/constants";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "/our-work" },
  { label: "About Us", href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState(pathname);

  const isActive = (href: string) => activeHref === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5">
      <nav
        style={{
          width: "100%",
          maxWidth: "750px",
          borderRadius: "9999px",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.01), rgba(255,255,255,0.02))",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.40), 0 0 40px -12px rgba(99,102,241,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          position: "relative",
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}
          aria-label="DeMeloApps home"
        >
          <div style={{ position: "relative", width: 140, height: 22, flexShrink: 0 }}>
            <Image
              src="/logoDeMeloApps2.svg"
              alt="DeMeloApps logo"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </Link>

        {/* Center nav links — desktop only */}
        <ul
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: "4px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          role="list"
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                style={{
                  display: "inline-block",
                  padding: "6px 16px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                  background: isActive(link.href) ? "rgba(255,255,255,0.08)" : "transparent",
                  color: isActive(link.href) ? "#f5f5f7" : "rgba(255,255,255,0.80)",
                  boxShadow: isActive(link.href) ? "inset 0 1px 0 0 rgba(255,255,255,0.06)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.color = "#f5f5f7";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.80)";
                  }
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: CTA (desktop) + mobile toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {/* CTA Button — desktop only */}
          <div className="hidden md:block">
            <NavCTAButton href={siteConfig.cta.href} label={siteConfig.cta.label} />
          </div>

          {/* Mobile hamburger — hidden on md+ via CSS, not just className */}
          <motion.button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            whileTap={{ scale: 0.92 }}
            className="md:hidden"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "9999px",
              background: mobileOpen ? "rgba(99,102,241,0.14)" : "rgba(255,255,255,0.03)",
              border: mobileOpen
                ? "1px solid rgba(129,140,248,0.32)"
                : "1px solid rgba(255,255,255,0.08)",
              color: mobileOpen ? "#c7d2fe" : "#d4d4d8",
              cursor: "pointer",
              padding: 0,
              transition: "background 0.26s ease, border-color 0.26s ease, color 0.26s ease",
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <MenuIcon open={mobileOpen} />
          </motion.button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-dropdown"
            className="md:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: "16px",
              right: "16px",
              borderRadius: "20px",
              background: "rgba(10,10,12,0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow:
                "0 12px 40px rgba(0,0,0,0.55), 0 0 24px -8px rgba(99,102,241,0.22), inset 0 1px 0 rgba(255,255,255,0.04)",
              padding: "10px",
              transformOrigin: "top center",
              overflow: "hidden",
            }}
          >
            {/* Top shimmer */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(165,180,252,0.30), transparent)",
                pointerEvents: "none",
              }}
            />

            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
              role="list"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.32, delay: 0.10 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => { setActiveHref(link.href); setMobileOpen(false); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "13px 16px",
                      borderRadius: "12px",
                      fontSize: "15px",
                      fontWeight: 400,
                      textDecoration: "none",
                      color: isActive(link.href) ? "#f5f5f7" : "rgba(255,255,255,0.82)",
                      background: isActive(link.href)
                        ? "rgba(99,102,241,0.12)"
                        : "transparent",
                      border: isActive(link.href)
                        ? "1px solid rgba(129,140,248,0.22)"
                        : "1px solid transparent",
                      transition: "background 0.18s ease, color 0.18s ease, border-color 0.18s ease",
                    }}
                  >
                    <span>{link.label}</span>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                      style={{
                        opacity: isActive(link.href) ? 0.70 : 0.30,
                        transition: "opacity 0.2s ease",
                        flexShrink: 0,
                      }}
                    >
                      <path
                        d="M4.5 2.5L8 6L4.5 9.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.34,
                  delay: 0.10 + navLinks.length * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  paddingTop: "6px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  marginTop: "6px",
                }}
              >
                <Link
                  href={siteConfig.cta.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "13px 16px",
                    borderRadius: "12px",
                    fontSize: "15px",
                    fontWeight: 500,
                    textDecoration: "none",
                    color: "white",
                    background: "linear-gradient(170deg, #5b5ef4 0%, #4338ca 100%)",
                    boxShadow:
                      "inset 0 1px 0 0 rgba(255,255,255,0.18), inset 0 -1px 0 0 rgba(0,0,0,0.30), 0 6px 18px -4px rgba(79,70,229,0.45)",
                  }}
                >
                  {siteConfig.cta.label}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── MenuIcon — three lines that morph into an X ── */
function MenuIcon({ open }: { open: boolean }) {
  const transition = { duration: 0.34, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const lineStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "1.5px",
    background: "currentColor",
    borderRadius: "2px",
  };
  return (
    <div style={{ position: "relative", width: 18, height: 14, flexShrink: 0 }}>
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
        transition={transition}
        style={{ ...lineStyle, top: 2 }}
      />
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={transition}
        style={{ ...lineStyle, top: 6 }}
      />
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
        transition={transition}
        style={{ ...lineStyle, top: 10 }}
      />
    </div>
  );
}

/* ── Navbar CTA Button — premium glass sweep animation ── */
function NavCTAButton({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const scale = pressed ? 0.97 : hovered ? 1.03 : 1;

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        padding: "10px 20px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: 400,
        letterSpacing: "0.03em",
        textDecoration: "none",
        color: hovered ? "#ffffff" : "rgba(255,255,255,0.90)",
        background: hovered
          ? "linear-gradient(170deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)"
          : "linear-gradient(170deg, #5b5ef4 0%, #4338ca 100%)",
        boxShadow: hovered
          ? "inset 0 1px 0 0 rgba(255,255,255,0.28), inset 0 -1px 0 0 rgba(0,0,0,0.30), 0 6px 20px -4px rgba(79,70,229,0.55), 0 1px 4px rgba(0,0,0,0.30)"
          : "inset 0 1px 0 0 rgba(255,255,255,0.14), inset 0 -1px 0 0 rgba(0,0,0,0.30)",
        border: hovered ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.10)",
        transform: `scale(${scale})`,
        transition: pressed
          ? "transform 120ms ease, box-shadow 120ms ease"
          : "all 280ms cubic-bezier(0.22,1,0.36,1)",
        position: "relative",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {/* Layer 1: Wide angled light sweep */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "60%",
          left: hovered ? "120%" : "-60%",
          transform: "skewX(-12deg)",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.30) 50%, rgba(255,255,255,0.06) 80%, transparent 100%)",
          transition: "left 550ms cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
        }}
      />
      {/* Layer 2: Secondary trailing glow */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "40%",
          left: hovered ? "130%" : "-40%",
          transform: "skewX(-12deg)",
          background: "linear-gradient(90deg, transparent 0%, rgba(165,180,252,0.12) 50%, transparent 100%)",
          transition: "left 700ms cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
        }}
      />
      {/* Layer 3: Top-edge metallic line */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.40), transparent)",
          pointerEvents: "none",
        }}
      />
      {label}
    </Link>
  );
}
