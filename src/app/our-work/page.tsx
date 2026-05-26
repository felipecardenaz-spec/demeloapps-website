import type { Metadata } from "next";
import { OurWorkPage } from "@/components/sections/our-work-page";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Case studies from DeMelo Apps — AI automation, mobile apps, and custom software that deliver measurable results for startups and growing businesses.",
};

export default function Page() {
  return <OurWorkPage />;
}
