import Image from "next/image";
import { cn } from "@/lib/utils";
import { BrandedImageFallback } from "@/components/shared/branded-image-fallback";

export function ProjectCover({
  title,
  stack,
  coverImage,
  className,
}: {
  title: string;
  stack: string[];
  coverImage?: string;
  className?: string;
}) {
  if (!coverImage) {
    return (
      <BrandedImageFallback title={title} stack={stack} className={className} />
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg bg-[var(--muted)]",
        className,
      )}
    >
      <Image
        src={coverImage}
        alt={title}
        fill
        className="object-contain p-6"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
