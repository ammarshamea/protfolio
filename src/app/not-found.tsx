export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#050816",
          color: "#fff",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "1.25rem", fontWeight: 600 }}>Page not found</p>
          {/* This root boundary has no locale/router context, so a plain anchor is deliberate. */}
          {}
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/en`}
            style={{ color: "#7c3aed" }}
          >
            Go to homepage
          </a>
        </div>
      </body>
    </html>
  );
}
