"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/track";

export function PrintButton({ label }: { label: string }) {
  function handlePrint() {
    trackEvent({ type: "resume_download", label: "print" });
    window.print();
  }

  return (
    <Button variant="secondary" onClick={handlePrint} className="no-print">
      <Printer className="h-4 w-4" />
      {label}
    </Button>
  );
}
