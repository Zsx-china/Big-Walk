import Link from "next/link";
import Contours from "./Contours";
import RouteMap from "./RouteMap";
import NightSky from "./NightSky";
import TerrainRidge from "./TerrainRidge";
import GrainTexture from "./GrainTexture";
import { t } from "@/lib/i18n";
import { GAME_STATS } from "@/lib/game-data";

export default function Hero() {
  const { hero } = t;
  return (
    <section className="hero">
      <NightSky className="hero__sky" />
      <Contours variant="hero" className="hero__contours" />
      <TerrainRidge className="hero__ridges" />
      <GrainTexture className="hero__grain" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="shell hero__grid">
        <div>
          <p className="eyebrow hero__eyebrow">{hero.eyebrow}</p>
          <h1 className="hero__title">
            {hero.titleLine1}
            <br />
            <span className="route-strike">{hero.titleLine2}</span>
          </h1>
          <p className="hero__sub hero-rise hero-rise--2">{hero.sub}</p>
          <div className="hero__actions hero-rise hero-rise--3">
            <Link href="/start-here" className="btn btn--primary">
              {hero.ctaPrimary}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/database" className="btn btn--ghost">
              {hero.ctaSecondary}
            </Link>
          </div>
          <div className="stat-band hero-rise hero-rise--4">
            {GAME_STATS.map((s) => (
              <div className="stat-band__item" key={s.labelKey}>
                <div className="stat-band__value">{s.value}</div>
                <div className="stat-band__label">{hero[s.labelKey]}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__map hero-rise hero-rise--3">
          <RouteMap label={hero.mapLabel} />
          <span className="hero__waypoint" style={{ top: "22%", left: "-4%" }}>
            WP-01 · Camp
          </span>
          <span className="hero__waypoint" style={{ bottom: "10%", right: "-2%" }}>
            Summit · End
          </span>
        </div>
      </div>
    </section>
  );
}
