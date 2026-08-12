"use client";

import { useEffect, useState } from "react";
import { t } from "@/lib/i18n";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc__title">
        <span className="blaze" style={{ ["--blaze-color" as string]: "var(--primary)" }} aria-hidden="true" />
        {t.common.onThisPage}
      </p>
      <ul className="toc__list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-level={item.level}
              data-active={activeId === item.id || undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
