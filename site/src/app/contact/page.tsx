import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <PagePlaceholder
      eyebrow="Get in Touch"
      title="Contact Us"
      description="A contact form and society details will live here — send the Contact design whenever it's ready."
    />
  );
}
