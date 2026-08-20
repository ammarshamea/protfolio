"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export function IntroPlayer({
  locale,
  label,
}: {
  locale: string;
  label: string;
}) {
  const t = useTranslations("hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (open) {
      video.currentTime = 0;
      video.play().catch(() => undefined);
      return;
    }
    video.pause();
  }, [open]);

  return (
    <>
      <Button size="lg" variant="secondary" onClick={() => setOpen(true)}>
        <Play className="h-4 w-4" />
        {label}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent solid className="max-w-4xl overflow-hidden p-0">
          <DialogTitle className="sr-only">{t("introTitle")}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("introSubtitle")}
          </DialogDescription>
          <video
            ref={videoRef}
            className="aspect-video w-full bg-black object-cover"
            poster={`/videos/intro-${locale}-poster.jpg`}
            playsInline
            controls
            preload="metadata"
          >
            <source src={`/videos/intro-${locale}.webm`} type="video/webm" />
            <source src={`/videos/intro-${locale}.mp4`} type="video/mp4" />
          </video>
        </DialogContent>
      </Dialog>
    </>
  );
}
