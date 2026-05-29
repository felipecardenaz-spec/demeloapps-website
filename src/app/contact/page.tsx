import type { Metadata } from "next";
import { ContactPage } from "@/components/sections/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with DeMeloApps. Tell us about your AI automation, custom software, or mobile app build and we will reply within a business day.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact DeMeloApps",
    description:
      "Start a project with DeMeloApps. Replies within a business day on AI automation, custom software, and mobile apps.",
    type: "website",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact DeMeloApps",
    description:
      "Start a project with DeMeloApps. Replies within a business day on AI automation, custom software, and mobile apps.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <ContactPage />;
}
