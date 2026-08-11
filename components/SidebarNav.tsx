import type { TableOfContentsItem } from '../lib/types';

export function SidebarNav({ items }: { items: TableOfContentsItem[] }) {
  return (
    <nav aria-label="On this page" className="border-2 border-slate-950 bg-white p-4">
      <h2 className="text-sm font-black tracking-wide text-slate-950">ON THIS PAGE</h2>
      <ol className="mt-3 grid gap-2 text-sm font-bold">
        {items.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}
      </ol>
    </nav>
  );
}
