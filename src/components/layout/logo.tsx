import Image from "next/image";
import { Link } from "@/i18n/navigation";

export function Logo({
  portrait = "/images/ammar-portrait.png",
  name = "Ammar Shamea",
}: {
  portrait?: string;
  name?: string;
}) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 text-[15px] font-medium tracking-tight text-[var(--foreground)]"
    >
      <Image
        src={portrait}
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 rounded-lg object-cover object-[center_18%]"
      />
      <span className="font-[family-name:var(--font-display)] max-sm:sr-only">
        {name}
      </span>
    </Link>
  );
}
