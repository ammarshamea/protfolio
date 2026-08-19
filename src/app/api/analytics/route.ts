import { NextRequest, NextResponse } from "next/server";
import { analyticsEventSchema } from "@/lib/schemas/analytics";
import { recordEvent } from "@/lib/analytics";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  if (isRateLimited(`analytics:${ip}`, 60)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = analyticsEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid event." }, { status: 400 });
  }

  await recordEvent({
    ...parsed.data,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  return new NextResponse(null, { status: 204 });
}
