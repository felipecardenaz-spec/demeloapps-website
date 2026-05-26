/**
 * Site-wide constants and configuration.
 * Single source of truth for brand info, navigation, and metadata.
 */

export const siteConfig = {
  name: "DeMelo Apps",
  description:
    "Custom AI automation, mobile app development, and business software for startups and growing companies. DeMelo Apps builds scalable digital systems that replace manual work and accelerate growth.",
  url: "https://demeloapps.com",
  cta: {
    label: "Book a Free Call",
    href: "#contact",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
