import type { ReactNode } from "react";
import { ArrowUpRightIcon, ArrowRightIcon } from "./icons";

type Props = {
  name: string;
  description: string;
  tags: string[];
  href?: string;
  external?: boolean;
  badge?: ReactNode;
};

export function ProjectRow({ name, description, tags, href, external, badge }: Props) {
  const inner = (
    <article className="group flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 transition-all hover:border-line-strong hover:shadow-[0_1px_0_0_var(--line-strong)] md:p-5">
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="font-mono text-sm font-medium text-foreground">{name}</h3>
            {badge ? (
              <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-subtle">
                {badge}
              </span>
            ) : null}
          </div>
        </div>
        {href ? (
          <span className="mt-0.5 text-subtle transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            {external ? <ArrowUpRightIcon /> : <ArrowRightIcon />}
          </span>
        ) : null}
      </header>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-subtle"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );

  if (!href) return inner;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="block"
    >
      {inner}
    </a>
  );
}
