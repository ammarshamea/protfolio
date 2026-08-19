export const ogSize = { width: 1200, height: 630 };

export const ogContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  padding: 80,
  background: "#050816",
  backgroundImage:
    "radial-gradient(circle at 15% 15%, rgba(79,70,229,0.55), transparent 55%), radial-gradient(circle at 85% 85%, rgba(6,182,212,0.35), transparent 55%)",
  color: "white",
  fontFamily: "sans-serif",
};

export function OgLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: 14,
          background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        AS
      </div>
      <span style={{ fontSize: 24, fontWeight: 600 }}>Ammar Shamea</span>
    </div>
  );
}
