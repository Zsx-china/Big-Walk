export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-black tracking-wide text-slate-600">
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;
        return <span key={`${item.label}-${index}`} className="flex items-center gap-2">{!isCurrent && item.href ? <a href={item.href}>{item.label.toUpperCase()}</a> : <span aria-current={isCurrent ? 'page' : undefined}>{item.label.toUpperCase()}</span>}{!isCurrent && <span aria-hidden="true">&gt;</span>}</span>;
      })}
    </nav>
  );
}
