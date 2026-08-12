export default function FAQList({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={i} {...(i === 0 ? { open: true } : {})}>
          <summary>{item.q}</summary>
          <div className="faq__body">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
