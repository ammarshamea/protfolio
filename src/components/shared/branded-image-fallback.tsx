import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]",
  "from-[var(--accent-secondary)] via-[var(--accent)] to-[var(--accent-tertiary)]",
  "from-[var(--accent-tertiary)] via-[var(--accent)] to-[var(--accent-secondary)]",
];

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function BrandedImageFallback({
  title,
  stack,
  className,
}: {
  title: string;
  stack: string[];
  className?: string;
}) {
  const gradient = GRADIENTS[hashString(title) % GRADIENTS.length];

  return (
    <div
      className={cn(
        "relative flex aspect-video w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-center",
        gradient,
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)]" />
      <p className="relative font-[family-name:var(--font-display)] text-2xl font-semibold text-white drop-shadow-sm sm:text-3xl">
        {title}
      </p>
      <div className="relative flex flex-wrap justify-center gap-2">
        {stack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
