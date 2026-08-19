export default function OfflinePage() {
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
        <div
          style={{
            textAlign: "center",
            maxWidth: "28rem",
            padding: "0 1.5rem",
          }}
        >
          <p style={{ fontSize: "1.25rem", fontWeight: 600 }}>
            You&apos;re offline
          </p>
          <p style={{ marginTop: "0.75rem", color: "#a1a1aa" }}>
            This page isn&apos;t cached for offline use. Reconnect and try again
            — pages you&apos;ve already visited will keep working without a
            connection.
          </p>
          {/* This route has no locale/router context, so a plain anchor is deliberate. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/en"
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              color: "#7c3aed",
            }}
          >
            Go to homepage
          </a>
        </div>
      </body>
    </html>
  );
}
