import type { ReactNode } from 'react';

export type MdxComponentMap = Record<string, (props: { children?: ReactNode }) => ReactNode>;

/** Shared extension point for page-specific MDX sections added by later templates. */
export const mdxComponents: MdxComponentMap = {};

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^\s)]+\)|\*\*[^*\n]+\*\*)/g);
  return parts.filter(Boolean).map((part, index) => {
    const link = /^\[([^\]]+)\]\(([^\s)]+)\)$/.exec(part);
    if (link) return <a href={link[2]} key={`${keyPrefix}-${index}`}>{link[1]}</a>;

    const strong = /^\*\*([^*\n]+)\*\*$/.exec(part);
    if (strong) return <strong key={`${keyPrefix}-${index}`}>{strong[1]}</strong>;

    return part;
  });
}

function splitTableRow(line: string): string[] {
  return line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
}

function isTableBlock(lines: string[]): boolean {
  return lines.length >= 2 && /^\s*\|/.test(lines[0]) && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[1]);
}

/**
 * Renders the intentionally small, safe markdown subset used by initial content pages.
 * It never evaluates MDX expressions or imports from content files.
 */
export function renderMdxContent(content: string, headingIds: string[] = []): ReactNode {
  let headingIndex = 0;

  return content.split(/\n\s*\n/).filter(Boolean).map((block, index) => {
    const lines = block.split('\n');
    if (isTableBlock(lines)) {
      const headers = splitTableRow(lines[0]);
      const rows = lines.slice(2).filter((line) => line.trim()).map(splitTableRow);
      return <div className="overflow-x-auto" key={index}><table className="w-full border-collapse text-left text-sm"><thead><tr>{headers.map((cell, cellIndex) => <th className="border-b-2 border-slate-950 px-3 py-2 font-black" key={`table-head-${index}-${cellIndex}`}>{renderInline(cell, `table-head-${index}-${cellIndex}`)}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={`table-row-${index}-${rowIndex}`}>{row.map((cell, cellIndex) => <td className="border-b border-slate-300 px-3 py-2 align-top" key={`table-cell-${index}-${rowIndex}-${cellIndex}`}>{renderInline(cell, `table-cell-${index}-${rowIndex}-${cellIndex}`)}</td>)}</tr>)}</tbody></table></div>;
    }
    const heading = /^(#{1,3})\s+(.+)$/m.exec(block);
    if (heading) {
      const text = heading[2].trim();
      const generatedId = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const id = heading[1].length === 2 ? (headingIds[headingIndex++] ?? generatedId) : generatedId;
      const Tag = `h${heading[1].length}` as 'h1' | 'h2' | 'h3';
      return <Tag id={id} key={index}>{renderInline(text, `heading-${index}`)}</Tag>;
    }
    return <p key={index}>{renderInline(block.replace(/\n/g, ' '), `paragraph-${index}`)}</p>;
  });
}
