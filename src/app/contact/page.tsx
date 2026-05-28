import type { Metadata } from "next";
import { ContactPage } from "@/components/sections/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with DeMelo Apps. Tell us about your AI automation, custom software, or mobile app build and we will reply within a business day.",
  openGraph: {
    title: "Contact DeMelo Apps",
    description:
      "Start a project. AI automation, custom software, and mobile apps for growing companies. Replies within a business day.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <ContactPage />;
}
