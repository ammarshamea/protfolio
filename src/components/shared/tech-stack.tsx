import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TechStack({
  technologies,
  className,
}: {
  technologies: string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {technologies.map((tech) => (
        <Badge key={tech} variant="default">
          {tech}
        </Badge>
      ))}
    </div>
  );
}
