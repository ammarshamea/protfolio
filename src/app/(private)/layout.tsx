import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Link from "next/link";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${sora.variable}`}
    >
      <body className="antialiased">
        <header className="border-b border-[var(--surface-border)] bg-[var(--surface)] px-6 py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link
              href="/dashboard"
              className="font-semibold font-[family-name:var(--font-display)]"
            >
              Private tools
            </Link>
            <Link
              href="/en"
              className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent-text)]"
            >
              Back to site
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
