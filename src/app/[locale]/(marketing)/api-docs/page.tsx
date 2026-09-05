import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { getOpenApiSpec } from "@/lib/openapi";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.apiDocs" });
  return generatePageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/api-docs",
    locale,
  });
}

const METHOD_VARIANT = {
  get: "success",
  post: "accent",
} as const;

export default async function ApiDocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const ta = await getTranslations({ locale, namespace: "pages.apiDocs" });
  const spec = getOpenApiSpec();
  const entries = Object.entries(spec.paths);

  return (
    <>
      <PageHeader
        eyebrow={ta("eyebrow")}
        title={ta("title")}
        subtitle={ta("subtitle")}
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("footer.apiDocs") },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-2xl space-y-6">
          {entries.map(([path, methods]) =>
            Object.entries(methods).map(([method, operation]) => (
              <GlassCard key={`${method}-${path}`} hover={false}>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant={
                      METHOD_VARIANT[method as keyof typeof METHOD_VARIANT] ??
                      "default"
                    }
                    className="uppercase"
                  >
                    {method}
                  </Badge>
                  <code className="font-mono text-sm">/api{path}</code>
                </div>
                <h2 className="mt-3 font-semibold">{operation.summary}</h2>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                  {operation.description}
                </p>
                <dl className="mt-4 space-y-1.5 text-sm">
                  {Object.entries(operation.responses).map(
                    ([status, response]) => (
                      <div key={status} className="flex gap-2">
                        <dt className="font-mono text-[var(--muted-foreground)]">
                          {status}
                        </dt>
                        <dd>{response.description}</dd>
                      </div>
                    ),
                  )}
                </dl>
              </GlassCard>
            )),
          )}
        </div>
      </Section>
    </>
  );
}
