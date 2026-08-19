import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getProject } from "@/lib/content/projects";
import { ogSize, ogContainerStyle, OgLogo } from "../shared";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? "";
  const project = getProject(slug);

  const title = project?.title ?? "Project";
  const tagline = project?.tagline ?? "";
  const stack = project?.stack.slice(0, 4) ?? [];

  return new ImageResponse(
    <div style={ogContainerStyle}>
      <OgLogo />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 950,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.7)",
            maxWidth: 850,
          }}
        >
          {tagline}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {stack.map((tech) => (
            <div
              key={tech}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.25)",
                fontSize: 20,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>,
    { ...ogSize },
  );
}
