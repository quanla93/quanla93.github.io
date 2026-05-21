import type { ReactNode } from "react";

type Props = {
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  location?: string;
  tags?: string[];
  children: ReactNode;
};

export function ExperienceCard({
  company,
  companyUrl,
  role,
  period,
  location,
  tags,
  children,
}: Props) {
  return (
    <article className="rounded-lg border border-line bg-surface p-4 md:p-5">
      <header className="flex flex-col gap-1 border-b border-line pb-3">
        <div className="flex items-baseline justify-between gap-3">
          {companyUrl ? (
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-foreground link-underline"
            >
              {company}
            </a>
          ) : (
            <span className="text-sm font-semibold text-foreground">{company}</span>
          )}
          <span className="font-mono text-[11px] uppercase tracking-wider text-subtle">
            {period}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="text-muted">{role}</span>
          {location ? (
            <span className="font-mono text-[11px] text-subtle">{location}</span>
          ) : null}
        </div>
      </header>

      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted [&_strong]:font-medium [&_strong]:text-foreground">
        {children}
      </ul>

      {tags && tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-subtle"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-subtle">
      {children}
    </li>
  );
}
