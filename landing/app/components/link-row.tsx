import { ArrowRightIcon, ArrowUpRightIcon } from "./icons";

type Props = {
  path: string;
  description: string;
  href: string;
  external?: boolean;
};

export function LinkRow({ path, description, href, external }: Props) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <div className="group flex items-center justify-between gap-4 rounded-lg border border-line bg-surface px-4 py-3 transition-all hover:border-line-strong">
        <div className="flex min-w-0 items-baseline gap-3">
          <span className="font-mono text-sm font-medium text-foreground">{path}</span>
          <span className="truncate text-sm text-muted">{description}</span>
        </div>
        <span className="shrink-0 text-subtle transition-all group-hover:text-foreground group-hover:translate-x-0.5">
          {external ? <ArrowUpRightIcon /> : <ArrowRightIcon />}
        </span>
      </div>
    </a>
  );
}
