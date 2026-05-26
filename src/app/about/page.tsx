import type { Metadata } from "next";
import { AboutPage } from "@/components/sections/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "DeMelo Apps is an AI-native software studio based in Vancouver, British Columbia, building automation systems, custom software, and mobile apps that help businesses scale.",
};

export default function Page() {
  return <AboutPage />;
}
