import { TechChip } from "./tech-chip";

type Props = {
  label: string;
  items: string[];
};

export function StackGroup({ label, items }: Props) {
  return (
    <div className="grid gap-2 border-b border-line py-3 last:border-b-0 md:grid-cols-[110px_1fr] md:items-start md:gap-4">
      <span className="font-mono text-[11px] uppercase tracking-wider text-subtle md:pt-1">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((it) => (
          <TechChip key={it} name={it} />
        ))}
      </div>
    </div>
  );
}
