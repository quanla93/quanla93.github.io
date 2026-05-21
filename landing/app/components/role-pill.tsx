import type { ReactNode } from "react";

type Props = {
  label: string;
  icon?: ReactNode;
};

export function RolePill({ label, icon }: Props) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[12px] font-medium text-foreground">
      {icon ? <span className="text-muted">{icon}</span> : null}
      {label}
    </span>
  );
}
