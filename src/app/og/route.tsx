import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { ogSize, ogContainerStyle, OgLogo } from "./shared";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Ammar Shamea";
  const subtitle =
    searchParams.get("subtitle") ?? "Flutter & Full Stack Developer";

  return new ImageResponse(
    <div style={ogContainerStyle}>
      <OgLogo />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
          {subtitle}
        </div>
      </div>
    </div>,
    { ...ogSize },
  );
}
