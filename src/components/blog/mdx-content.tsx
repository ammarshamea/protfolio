import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 mb-4 text-2xl font-semibold tracking-tight font-[family-name:var(--font-display)] scroll-mt-28"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-3 text-xl font-semibold tracking-tight font-[family-name:var(--font-display)] scroll-mt-28"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="mb-5 leading-relaxed text-[var(--muted-foreground)]"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="font-medium text-[var(--accent-text)] underline underline-offset-4 hover:no-underline"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mb-5 ms-5 list-disc space-y-2 text-[var(--muted-foreground)]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-5 ms-5 list-decimal space-y-2 text-[var(--muted-foreground)]"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-[var(--foreground)]" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-s-4 border-[var(--accent)] ps-4 italic text-[var(--muted-foreground)]"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-6 overflow-x-auto rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 text-sm [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
      }}
    />
  );
}
