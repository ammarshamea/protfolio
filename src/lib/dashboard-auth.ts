"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "dashboard_auth";

export async function authenticateDashboard(formData: FormData) {
  const secret = String(formData.get("secret") ?? "");
  const expected = process.env.DASHBOARD_SECRET;

  if (!expected || secret !== expected) {
    redirect("/dashboard?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  redirect("/dashboard");
}

export async function isDashboardAuthenticated(): Promise<boolean> {
  const expected = process.env.DASHBOARD_SECRET;
  if (!expected) return true;
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === expected;
}
