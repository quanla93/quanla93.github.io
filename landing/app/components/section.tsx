import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  meta?: string;
  children: ReactNode;
};

export function Section({ id, title, meta, children }: Props) {
  return (
    <section id={id} className="mt-14 first:mt-0">
      <div className="mb-5 flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {meta ? (
          <span className="font-mono text-[11px] uppercase tracking-wider text-subtle">
            {meta}
          </span>
        ) : null}
      </div>
      <div>{children}</div>
    </section>
  );
}
