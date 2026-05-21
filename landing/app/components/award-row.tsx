type Props = {
  title: string;
  issuer?: string;
  year: string;
};

export function AwardRow({ title, issuer, year }: Props) {
  return (
    <li className="flex items-baseline justify-between gap-3 border-b border-line py-3 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm text-foreground">{title}</p>
        {issuer ? <p className="text-xs text-muted">{issuer}</p> : null}
      </div>
      <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-subtle">
        {year}
      </span>
    </li>
  );
}
