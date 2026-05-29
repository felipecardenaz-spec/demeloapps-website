import type { Metadata } from "next";
import { OurWorkPage } from "@/components/sections/our-work-page";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Case studies from DeMeloApps. AI automation, custom software, and mobile apps shipped end to end for startups and growing companies.",
  alternates: {
    canonical: "/our-work",
  },
  openGraph: {
    title: "Our Work — DeMeloApps",
    description:
      "Case studies from DeMeloApps. AI automation, custom software, and mobile apps shipped end to end.",
    type: "website",
    url: "/our-work",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work — DeMeloApps",
    description:
      "Case studies from DeMeloApps. AI automation, custom software, and mobile apps shipped end to end.",
  },
};

export default function Page() {
  return <OurWorkPage />;
}
