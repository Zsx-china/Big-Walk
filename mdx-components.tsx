import type { ReactNode } from 'react';

export type MdxComponentMap = Record<string, (props: { children?: ReactNode }) => ReactNode>;

/** Shared extension point for page-specific MDX sections added by later templates. */
export const mdxComponents: MdxComponentMap = {};

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\[[^\]]+\]\([^\s)]+\))/g);
  return parts.filter(Boolean).map((part, index) => {
    const match = /^\[([^\]]+)\]\(([^\s)]+)\)$/.exec(part);
    if (!match) return part;
    return <a href={match[2]} key={`${keyPrefix}-${index}`}>{match[1]}</a>;
  });
}

/**
 * Renders the intentionally small, safe markdown subset used by initial content pages.
 * It never evaluates MDX expressions or imports from content files.
 */
export function renderMdxContent(content: string, headingIds: string[] = []): ReactNode {
  let headingIndex = 0;

  return content.split(/\n\s*\n/).filter(Boolean).map((block, index) => {
    const heading = /^(#{1,3})\s+(.+)$/m.exec(block);
    if (heading) {
      const text = heading[2].trim();
      const generatedId = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const id = headingIds[headingIndex] ?? generatedId;
      headingIndex += 1;
      const Tag = `h${heading[1].length}` as 'h1' | 'h2' | 'h3';
      return <Tag id={id} key={index}>{renderInline(text, `heading-${index}`)}</Tag>;
    }
    return <p key={index}>{renderInline(block.replace(/\n/g, ' '), `paragraph-${index}`)}</p>;
  });
}
