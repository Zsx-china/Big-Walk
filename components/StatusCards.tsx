import type { StatusCard } from '../lib/types';

export function StatusCards({ cards }: { cards: StatusCard[] }) {
  return (
    <section aria-label="Wiki status" className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} data-testid="status-card" className="border-2 border-slate-950 bg-white p-5 shadow-[4px_4px_0_0_#1e293b]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-600">{card.label}</p>
            <p className="mt-2 text-4xl font-black tracking-tighter text-slate-950">{card.value}</p>
            <p className="mt-2 text-sm font-medium text-slate-700">{card.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
