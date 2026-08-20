import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/schemas/contact";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form submission.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ success: true });
  }

  const { name, email, subject, message } = parsed.data;
  const contactTo =
    process.env.CONTACT_TO_EMAIL ?? "ammarshamea03@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: contactTo,
          reply_to: email,
          subject: `[Portfolio] ${subject}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Resend responded with ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to send email via Resend:", error);
      return NextResponse.json(
        {
          error:
            "Message could not be sent. Please try WhatsApp or email directly.",
        },
        { status: 502 },
      );
    }
  } else {
    console.info(
      "[contact] RESEND_API_KEY not set — logging submission instead:",
      { name, email, subject, message, to: contactTo },
    );
  }

  return NextResponse.json({ success: true });
}
