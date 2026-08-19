import { NextResponse } from "next/server";
import { getGithubProfile } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  const profile = await getGithubProfile();
  return NextResponse.json(profile);
}
