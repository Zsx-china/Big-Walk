import type { FaqItem } from '../lib/types';

export function Faq({ items }: { items: FaqItem[] }) {
  return <div className="grid gap-3">{items.map((item) => <details key={item.question} className="border-2 border-slate-950 bg-white p-4"><summary className="cursor-pointer font-black text-slate-950">{item.question}</summary><p className="mt-3">{item.answer}</p></details>)}</div>;
}
