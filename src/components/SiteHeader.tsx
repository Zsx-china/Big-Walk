"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_SECTIONS, SITE } from "@/lib/site";
import { t } from "@/lib/i18n";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (section: string) =>
    pathname === `/${section}` || pathname.startsWith(`/${section}/`);

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href="/" className="site-header__brand" onClick={() => setOpen(false)}>
          <span className="blaze" aria-hidden="true" />
          <span>
            {SITE.name}
            <small>{SITE.tagline}</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label={t.nav.primaryLabel}>
          {NAV_SECTIONS.map((s) => (
            <Link key={s.key} href={`/${s.key}`} aria-current={isActive(s.key) || undefined}>
              <span className="blaze" style={{ ["--blaze-color" as string]: s.color }} aria-hidden="true" />
              {s.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__cta">
          <Link href="/start-here" className="btn btn--primary">
            {t.nav.cta}
          </Link>
        </div>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </div>

      <nav
        id="mobile-nav"
        className="mobile-nav"
        data-open={open}
        aria-label={t.nav.mobileLabel}
      >
        {NAV_SECTIONS.map((s) => (
          <Link key={s.key} href={`/${s.key}`} onClick={() => setOpen(false)}>
            <span className="blaze" style={{ ["--blaze-color" as string]: s.color }} aria-hidden="true" />
            {s.label}
          </Link>
        ))}
        <Link href="/start-here" onClick={() => setOpen(false)}>
          <span className="blaze" style={{ ["--blaze-color" as string]: "var(--primary)" }} aria-hidden="true" />
          {t.nav.cta}
        </Link>
      </nav>
    </header>
  );
}
