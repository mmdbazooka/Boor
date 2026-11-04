'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { LocaleSwitch } from '@/components/ui/locale-switch';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
export function MarketingNav({ locale, labels }: { locale: Locale; labels: Dictionary['nav'] }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="marketing-header">
      <div className="container nav-inner">
        <Logo href={`/${locale}`} />
        <nav className={`marketing-links ${open ? 'is-open' : ''}`} aria-label={labels.home}>
          <a onClick={() => setOpen(false)} href="#platform">
            {labels.platform}
          </a>
          <a onClick={() => setOpen(false)} href="#showcase">
            {labels.showcase}
          </a>
          <a onClick={() => setOpen(false)} href="#process">
            {labels.process}
          </a>
        </nav>
        <div className="nav-actions">
          <LocaleSwitch locale={locale} />
          <Link className="button button-dark nav-cta" href={`/${locale}/dashboard`}>
            {labels.open}
            <ArrowUpRight size={17} />
          </Link>
          <button
            className="icon-button mobile-menu"
            aria-label={open ? labels.close : labels.menu}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
