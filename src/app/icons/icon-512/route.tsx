import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
        color: "white",
        fontSize: 232,
        fontWeight: 700,
        fontFamily: "sans-serif",
      }}
    >
      AS
    </div>,
    { width: 512, height: 512 },
  );
}
