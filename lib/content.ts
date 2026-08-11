import { readFile } from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';

import { isSupportedLocale, type Locale } from '../i18n/config';
import { pageSlugs, type PageDocument, type PageFrontmatter, type PageSlug } from './types';

export { pageSlugs, type PageDocument, type PageFrontmatter, type PageSlug } from './types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function assertText(value: unknown, field: string): asserts value is string {
  if (!hasText(value)) throw new Error(`Invalid frontmatter: ${field} must be a non-empty string`);
}

function assertArray(value: unknown, field: string): asserts value is unknown[] {
  if (!Array.isArray(value)) throw new Error(`Invalid frontmatter: ${field} must be an array`);
}

function assertRecords(value: unknown, field: string, fields: string[]): asserts value is Record<string, unknown>[] {
  assertArray(value, field);
  for (const [index, item] of value.entries()) {
    if (!isRecord(item)) throw new Error(`Invalid frontmatter: ${field}[${index}] must be an object`);
    for (const itemField of fields) assertText(item[itemField], `${field}[${index}].${itemField}`);
  }
}

function validateFrontmatter(value: unknown): PageFrontmatter {
  if (!isRecord(value)) throw new Error('Invalid frontmatter: expected an object');
  for (const field of ['title', 'description', 'eyebrow', 'updatedAt']) assertText(value[field], field);

  assertRecords(value.toc, 'toc', ['id', 'label']);
  if (!isRecord(value.heroCard)) throw new Error('Invalid frontmatter: heroCard must be an object');
  assertText(value.heroCard.title, 'heroCard.title');
  assertText(value.heroCard.description, 'heroCard.description');
  assertRecords(value.heroCard.statusCards, 'heroCard.statusCards', ['label', 'value', 'detail']);
  assertRecords(value.faqs, 'faqs', ['question', 'answer']);
  assertRecords(value.steps, 'steps', ['title', 'description']);
  assertRecords(value.relatedLinks, 'relatedLinks', ['slug', 'label', 'description']);

  for (const link of value.relatedLinks) {
    if (!pageSlugs.includes(link.slug as PageSlug)) {
      throw new Error(`Invalid frontmatter: relatedLinks slug ${String(link.slug)} is not supported`);
    }
  }

  return value as unknown as PageFrontmatter;
}

function isPageSlug(value: string): value is PageSlug {
  return pageSlugs.includes(value as PageSlug);
}

export function getPageSlugs(): PageSlug[] {
  return [...pageSlugs];
}

export async function getPage(locale: Locale, slug: PageSlug): Promise<PageDocument> {
  if (!isSupportedLocale(locale) || !isPageSlug(slug)) {
    throw new Error('Unsupported locale or page slug');
  }

  const filePath = path.join(process.cwd(), 'content', locale, `${slug}.mdx`);
  const source = await readFile(filePath, 'utf8');
  const parsed = matter(source);

  return { locale, slug, frontmatter: validateFrontmatter(parsed.data), content: parsed.content.trim() };
}
