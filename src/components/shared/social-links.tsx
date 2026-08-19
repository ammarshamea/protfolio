import { FaGithub, FaLinkedin, FaWhatsapp, FaCodeBranch } from "react-icons/fa";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  socials: {
    github: string;
    codeberg: string;
    linkedin: string;
    whatsapp: string;
    email: string;
  };
  variant?: "hero" | "footer";
  className?: string;
}

export function SocialLinks({
  socials,
  variant = "hero",
  className,
}: SocialLinksProps) {
  const links = [
    { href: socials.github, label: "GitHub", icon: FaGithub },
    { href: socials.linkedin, label: "LinkedIn", icon: FaLinkedin },
    { href: socials.codeberg, label: "Codeberg", icon: FaCodeBranch },
    { href: socials.whatsapp, label: "WhatsApp", icon: FaWhatsapp },
    { href: socials.email, label: "Email", icon: Mail },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          aria-label={label}
          className={cn(
            "flex items-center justify-center rounded-full border border-[var(--surface-border)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5",
            variant === "hero" ? "h-11 w-11" : "h-9 w-9",
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
