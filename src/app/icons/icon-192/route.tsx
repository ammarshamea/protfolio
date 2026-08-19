import { ImageResponse } from "next/og";

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
        fontSize: 88,
        fontWeight: 700,
        fontFamily: "sans-serif",
      }}
    >
      AS
    </div>,
    { width: 192, height: 192 },
  );
}
