type JsonLd = Record<string, unknown>;

/** Renders JSON-LD while escaping characters that could end the script element. */
export function StructuredData({ data }: { data: JsonLd }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
