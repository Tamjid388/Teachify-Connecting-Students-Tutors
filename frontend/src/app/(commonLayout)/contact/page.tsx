import type { Metadata } from "next";
import { Contact } from "@/components/modules/contact/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Teachify team for support, partnerships, or general questions.",
};

export default function ContactPage() {
  return <Contact />;
}
