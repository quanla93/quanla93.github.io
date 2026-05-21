import type { ReactNode } from "react";

type Props = {
  name: string;
  icon?: ReactNode;
};

export function TechChip({ name, icon }: Props) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-foreground transition-colors hover:border-line-strong">
      {icon ? <span className="text-muted">{icon}</span> : null}
      {name}
    </span>
  );
}
