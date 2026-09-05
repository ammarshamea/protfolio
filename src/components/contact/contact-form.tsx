"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/schemas/contact";
import { trackEvent } from "@/lib/track";

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    const staticHost = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
    try {
      if (staticHost) {
        const subject = encodeURIComponent(
          values.subject || `Portfolio contact — ${values.name}`,
        );
        const body = encodeURIComponent(
          `${values.message}\n\n— ${values.name}\n${values.email}`,
        );
        window.open(
          `mailto:ammarshamea03@gmail.com?subject=${subject}&body=${body}`,
          "_self",
        );
        trackEvent({ type: "cta_click", label: "contact_form_mailto" });
        setStatus("success");
        reset();
        return;
      }
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Request failed");
      trackEvent({ type: "cta_click", label: "contact_form_submit" });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot field — hidden from real users, catches basic bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("company")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <Input
            id="name"
            placeholder={t("namePlaceholder")}
            className="mt-2"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-xs text-[var(--danger)]">
              {t("validationRequired")}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            className="mt-2"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p id="email-error" className="mt-1.5 text-xs text-[var(--danger)]">
              {t("validationEmail")}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <Label htmlFor="subject">{t("subject")}</Label>
        <Input
          id="subject"
          placeholder={t("subjectPlaceholder")}
          className="mt-2"
          aria-invalid={!!errors.subject}
          {...register("subject")}
        />
      </div>

      <div>
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          placeholder={t("messagePlaceholder")}
          className="mt-2"
          rows={6}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {isSubmitting ? t("sending") : t("submit")}
      </Button>

      <div role="status" aria-live="polite">
        {status === "success" ? (
          <p className="flex items-center gap-2 text-sm text-[var(--success)]">
            <CheckCircle2 className="h-4 w-4" /> {t("success")}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="flex items-center gap-2 text-sm text-[var(--danger)]">
            <AlertCircle className="h-4 w-4" /> {t("error")}
          </p>
        ) : null}
      </div>
    </form>
  );
}
