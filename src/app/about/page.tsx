import type { Metadata } from "next";
import { AboutPage } from "@/components/sections/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet DeMeloApps. A small software studio in Vancouver building AI automation, custom software, and mobile apps for growing companies.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About DeMeloApps",
    description:
      "A small software studio in Vancouver building AI automation, custom software, and mobile apps for growing companies.",
    type: "website",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About DeMeloApps",
    description:
      "A small software studio in Vancouver building AI automation, custom software, and mobile apps for growing companies.",
  },
};

export default function Page() {
  return <AboutPage />;
}
