import Link from "next/link";
import Contours from "./Contours";
import { ABOUT, SECTIONS, SITE } from "@/lib/site";
import { t } from "@/lib/i18n";

const EXTERNAL = [
  { label: "Steam store page", href: "https://store.steampowered.com/app/1478500/Big_Walk/" },
  { label: "House House", href: "https://househou.se/" },
  { label: "Panic", href: "https://panic.com/" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Contours variant="band" className="site-footer__contours" />
      <div className="shell">
        <div className="site-footer__main">
          <div>
            <div className="site-footer__brand">
              <span className="blaze" aria-hidden="true" />
              {SITE.name}
            </div>
            <p className="site-footer__blurb">{t.footer.blurb}</p>
            <p className="site-footer__note">{t.footer.note}</p>
            <p className="site-footer__made">{t.footer.madeBy}</p>
          </div>

          <div className="site-footer__col">
            <h4>{t.footer.sections}</h4>
            <ul>
              {SECTIONS.map((s) => (
                <li key={s.key}>
                  <Link href={`/${s.key}`}>{s.label}</Link>
                </li>
              ))}
              <li>
                <Link href={`/${ABOUT.key}`}>{ABOUT.label}</Link>
              </li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h4>{t.footer.startHere}</h4>
            <ul>
              <li>
                <Link href="/start-here/what-is-big-walk">What is Big Walk?</Link>
              </li>
              <li>
                <Link href="/start-here/beginner-guide">Beginner guide</Link>
              </li>
              <li>
                <Link href="/database/systems-crossplay">Crossplay &amp; join codes</Link>
              </li>
              <li>
                <Link href="/guides/red-bridge-puzzle">Lower the red bridge</Link>
              </li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h4>{t.footer.official}</h4>
            <ul>
              {EXTERNAL.map((e) => (
                <li key={e.href}>
                  <a href={e.href} target="_blank" rel="noopener noreferrer">
                    {e.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>{t.footer.copyright}</span>
          <span>
            {t.footer.lastUpdated}{" "}
            <time dateTime="2026-08-13">{t.footer.updatedDate}</time>
          </span>
        </div>
      </div>
    </footer>
  );
}
