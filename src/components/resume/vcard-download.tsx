"use client";

import { Contact2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateVCard } from "@/lib/vcard";
import { trackEvent } from "@/lib/track";

export function VCardDownload({
  name,
  email,
  phone,
  url,
  title,
  label,
}: {
  name: string;
  email: string;
  phone: string;
  url: string;
  title: string;
  label: string;
}) {
  function handleDownload() {
    const vcard = generateVCard({ name, email, phone, url, title });
    const blob = new Blob([vcard], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name.replace(/\s+/g, "-")}.vcf`;
    link.click();
    URL.revokeObjectURL(link.href);
    trackEvent({ type: "resume_download", label: "vcard" });
  }

  return (
    <Button variant="secondary" onClick={handleDownload}>
      <Contact2 className="h-4 w-4" />
      {label}
    </Button>
  );
}
