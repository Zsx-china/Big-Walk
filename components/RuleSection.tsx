export function RuleSection({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return <section className="border-t-2 border-slate-950 pt-4"><h3 className="text-xl font-black text-slate-950"><span className="mr-3 text-amber-600">{String(number).padStart(2, '0')}</span>{title}</h3><div className="mt-2">{children}</div></section>;
}
