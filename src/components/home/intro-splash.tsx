"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { withBasePath } from "@/lib/site-config";
import { EASE_PREMIUM } from "@/lib/animations";

export const INTRO_STORAGE_KEY = "intro-played-v2";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasSeenIntro() {
  try {
    return window.localStorage.getItem(INTRO_STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

function rememberIntro() {
  try {
    window.localStorage.setItem(INTRO_STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
}

function CinematicSplash({
  locale,
  onDone,
}: {
  locale: string;
  onDone: () => void;
}) {
  const t = useTranslations("hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(true);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    rememberIntro();
    onDone();
  }, [onDone]);

  useEffect(() => {
    const video = videoRef.current;
    if (!useVideo || !video) return;
    video.currentTime = 0;
    video.play().catch(() => setUseVideo(false));
  }, [useVideo]);

  useEffect(() => {
    if (useVideo) return;
    const timer = window.setTimeout(finish, 6400);
    return () => window.clearTimeout(timer);
  }, [useVideo, finish]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-start overflow-hidden bg-[#12100E] text-[#FFFBF2]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: EASE_PREMIUM }}
      role="dialog"
      aria-modal="true"
      aria-label={t("introTitle")}
    >
      {useVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={withBasePath(`/videos/intro-${locale}-poster.jpg`)}
          playsInline
          autoPlay
          muted={false}
          preload="auto"
          onEnded={finish}
          onError={() => setUseVideo(false)}
        >
          <source
            src={withBasePath(`/videos/intro-${locale}.webm`)}
            type="video/webm"
          />
          <source
            src={withBasePath(`/videos/intro-${locale}.mp4`)}
            type="video/mp4"
          />
        </video>
      ) : (
        <FallbackReel locale={locale} />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35" />

      <div className="relative z-10 flex w-full flex-col gap-5 px-6 pb-28 pt-10 sm:px-10 sm:pb-16">
        <p className="font-[family-name:var(--font-display)] text-[11px] font-medium uppercase italic text-[#E4C98A]">
          {t("eyebrow")}
        </p>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-semibold leading-[0.9] tracking-tight text-[#FFEEC8]">
            {t("introTitle")}
          </h2>
          <p className="mt-3 max-w-xl text-[length:var(--text-body-lg)] text-[#FFEEC8]/75">
            {t("introSubtitle")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            size="lg"
            variant="outline"
            className="pointer-events-auto border-[#FFEEC8]/35 bg-transparent text-[#FFEEC8]"
            onClick={finish}
          >
            {t("introSkip")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function FallbackReel({ locale }: { locale: string }) {
  const frames = [
    { src: "/images/ammar-portrait.png", duration: 2.1 },
    { src: "/projects/covers/clyx-order.png", duration: 2.1 },
    { src: "/projects/covers/nawa-holding.png", duration: 2.2 },
  ];

  return (
    <div className="absolute inset-0">
      {frames.map((frame, index) => (
        <motion.img
          key={frame.src}
          src={withBasePath(frame.src)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [1.08, 1.02, 1.14] }}
          transition={{
            duration: 6.2,
            times: [0, 0.08, 0.78, 1],
            delay: index * 2.05,
            ease: EASE_PREMIUM,
          }}
          style={{ objectPosition: locale === "ar" ? "center 18%" : "center" }}
        />
      ))}
    </div>
  );
}

function subscribeIntro(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function introSnapshot() {
  return prefersReducedMotion() || hasSeenIntro() ? "done" : "playing";
}

function introServerSnapshot() {
  return "done";
}

export function IntroGate({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  const stored = useSyncExternalStore(
    subscribeIntro,
    introSnapshot,
    introServerSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);
  const phase = dismissed ? "done" : stored;

  return (
    <>
      {children}
      <AnimatePresence>
        {phase === "playing" ? (
          <CinematicSplash locale={locale} onDone={() => setDismissed(true)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

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
            poster={withBasePath(`/videos/intro-${locale}-poster.jpg`)}
            playsInline
            controls
            preload="metadata"
          >
            <source
              src={withBasePath(`/videos/intro-${locale}.webm`)}
              type="video/webm"
            />
            <source
              src={withBasePath(`/videos/intro-${locale}.mp4`)}
              type="video/mp4"
            />
          </video>
        </DialogContent>
      </Dialog>
    </>
  );
}
