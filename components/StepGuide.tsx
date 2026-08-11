import type { StepItem } from '../lib/types';

export function StepGuide({ steps }: { steps: StepItem[] }) {
  return <ol className="grid gap-4">{steps.map((step, index) => <li key={step.title} className="grid gap-3 border-t-2 border-slate-950 pt-4 sm:grid-cols-[3rem_1fr]"><span className="text-2xl font-black text-amber-600">{String(index + 1).padStart(2, '0')}</span><div><h3 className="font-black text-slate-950">{step.title}</h3><p className="mt-1">{step.description}</p></div></li>)}</ol>;
}
