export function EvidenceQuote({ children, label = 'EVIDENCE REVIEWED · AUGUST 6, 2026' }: { children: React.ReactNode; label?: string }) {
  return <figure className="border-l-4 border-amber-500 bg-amber-50 p-5"><blockquote className="font-semibold text-slate-950">{children}</blockquote><figcaption className="mt-3 text-xs font-black tracking-wide text-slate-600">{label}</figcaption></figure>;
}
