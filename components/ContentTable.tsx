export type ContentTableRow = { label: string; value: string };

export function ContentTable({ rows }: { rows: ContentTableRow[] }) {
  return <dl className="divide-y-2 divide-slate-200 border-2 border-slate-950 bg-white">{rows.map((row) => <div key={row.label} className="grid gap-1 p-4 sm:grid-cols-3"><dt className="font-black text-slate-950">{row.label}</dt><dd className="sm:col-span-2">{row.value}</dd></div>)}</dl>;
}
