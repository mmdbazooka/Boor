import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  MoveUpRight,
  Aperture,
  Component,
  Command,
} from 'lucide-react';
import { Artwork } from '@/components/brand/artwork';
import { Logo, Mark } from '@/components/brand/logo';
import { MarketingNav } from '@/components/layout/marketing-nav';
import { sampleProjects } from '@/lib/projects';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
export function Landing({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const icons = [Aperture, Component, Command];
  return (
    <>
      <MarketingNav locale={locale} labels={d.nav} />
      <main id="main-content">
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              {d.hero.eyebrow}
            </p>
            <h1>
              {d.hero.title1}
              <br />
              {d.hero.title2} <em>{d.hero.title3}</em>
              <span className="heading-spark">✳</span>
            </h1>
            <p className="hero-description">{d.hero.description}</p>
            <div className="hero-actions">
              <Link href={`/${locale}/studio`} className="button button-dark button-large">
                {d.hero.cta}
                <ArrowUpRight size={20} />
              </Link>
              <a className="text-link" href="#showcase">
                {d.hero.secondary}
                <ArrowUpRight size={18} />
              </a>
            </div>
            <p className="hero-note">
              <span className="tiny-check">✓</span>
              {d.hero.note}
            </p>
            <div className="hero-bottom">
              <a href="#platform">
                <ArrowDown size={15} />
                {d.hero.scroll}
              </a>
              <span>{d.hero.edition}</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-art">
              <div className="hero-art-top">
                <span>{d.hero.artLabel}</span>
                <Mark className="mini-mark" />
              </div>
              <h2>{d.hero.artTitle}</h2>
              <div className="hero-sculpture">
                <div className="arch arch-back" />
                <div className="arch arch-front" />
                <div className="lime-sphere" />
                <div className="sphere-shadow" />
              </div>
              <div className="hero-art-bottom">
                <span>{d.hero.artTag}</span>
                <ArrowUpRight size={18} />
              </div>
            </div>
            <div className="floating-note">
              <div className="spark-box">
                <Sparkles size={21} />
              </div>
              <span>{d.hero.floating}</span>
              <span className="floating-dot" />
            </div>
            <div className="visual-caption">
              <span>IMAGINED WITH BOOR</span>
              <span>01 — ∞</span>
            </div>
          </div>
        </section>
        <section className="trust-strip">
          <div className="container">
            <p>{d.hero.trust}</p>
            <div>
              {d.hero.trustItems.map((item, i) => (
                <span key={item}>
                  {i === 0 ? (
                    <Aperture />
                  ) : i === 1 ? (
                    <Command />
                  ) : i === 2 ? (
                    <Component />
                  ) : (
                    <Sparkles />
                  )}
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
        <section id="platform" className="section container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{d.landing.featuresEyebrow}</p>
              <h2>{d.landing.featuresTitle}</h2>
            </div>
            <p>{d.landing.featuresDescription}</p>
          </div>
          <div className="feature-grid">
            {d.landing.features.map((f, i) => {
              const Icon = icons[i];
              return (
                <article className="feature-card" key={f.tag}>
                  <div className={`feature-illustration feature-illustration-${i}`}>
                    <Icon size={64} strokeWidth={1} />
                    {i === 0 && (
                      <>
                        <span className="idea-chip">
                          {locale === 'fa' ? 'چی می‌شد اگر؟' : 'what if?'}
                        </span>
                        <span className="idea-dot" />
                      </>
                    )}
                    {i === 1 && (
                      <div className="color-dots">
                        <i />
                        <i />
                        <i />
                      </div>
                    )}
                  </div>
                  <p className="eyebrow">{f.tag}</p>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section id="showcase" className="showcase-section">
          <div className="container section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{d.landing.showcaseEyebrow}</p>
                <h2>{d.landing.showcaseTitle}</h2>
              </div>
              <p>{d.landing.showcaseDescription}</p>
            </div>
            <div className="showcase-grid">
              {sampleProjects(locale).map((p, i) => (
                <Link
                  className="showcase-card"
                  href={`/${locale}/library?project=${p.id}`}
                  key={p.id}
                >
                  <Artwork mood={p.mood} name={p.name} />
                  <div className="showcase-card-caption">
                    <div>
                      <h3>{p.name}</h3>
                      <p>{d.studio.types[i]}</p>
                    </div>
                    <span className="circle-arrow" aria-label={d.landing.sample}>
                      <ArrowUpRight size={21} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section id="process" className="section container process-section">
          <p className="eyebrow">{d.landing.stepsEyebrow}</p>
          <h2>{d.landing.stepsTitle}</h2>
          <div className="steps-grid">
            {d.landing.steps.map((s, i) => (
              <article key={s.title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="container cta-section">
          <span className="cta-spark">✳</span>
          <div>
            <p className="eyebrow">
              {locale === 'fa' ? 'کمی بور. کلی امکان.' : 'A LITTLE BOOR. A LOT OF POSSIBILITY.'}
            </p>
            <h2>{d.landing.ctaTitle}</h2>
            <p>{d.landing.ctaBody}</p>
            <Link href={`/${locale}/studio`} className="button button-dark button-large">
              {d.hero.cta}
              <MoveUpRight size={20} />
            </Link>
          </div>
          <span className="cta-orbit" />
        </section>
      </main>
      <footer className="container footer">
        <div>
          <Logo href={`/${locale}`} />
          <p>{d.landing.footerNote}</p>
        </div>
        <div className="footer-links">
          <Link href={`/${locale}/dashboard`}>
            {d.nav.open}
            <ArrowUpRight size={16} />
          </Link>
          <span>{d.landing.footerCopyright}</span>
          <span>{d.landing.footerDemo}</span>
        </div>
      </footer>
    </>
  );
}
