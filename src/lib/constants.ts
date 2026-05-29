/**
 * Site-wide constants and configuration.
 * Single source of truth for brand info, navigation, and metadata.
 */

export const siteConfig = {
  name: "DeMeloApps",
  shortName: "DeMeloApps",
  legalName: "DeMeloApps",
  tagline: "AI software made in Vancouver",
  description:
    "DeMeloApps is an AI software studio in Vancouver. We design and build custom AI automation, business software, and mobile apps for growing companies.",
  url: "https://demeloapps.com",
  locale: "en_US",
  cta: {
    label: "Book a Free Call",
    href: "/contact",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
