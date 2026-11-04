'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Sparkles,
  FolderOpen,
  Settings2,
  ArrowUpRight,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { LocaleSwitch } from '@/components/ui/locale-switch';
import { useWorkspace } from '@/components/workspace/workspace-provider';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
export function WorkspaceShell({
  locale,
  d,
  children,
}: {
  locale: Locale;
  d: Dictionary;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { profile } = useWorkspace();
  const items = [
    { path: 'dashboard', label: d.nav.overview, icon: LayoutGrid },
    { path: 'studio', label: d.nav.studio, icon: Sparkles },
    { path: 'library', label: d.nav.library, icon: FolderOpen },
    { path: 'settings', label: d.nav.settings, icon: Settings2 },
  ];
  return (
    <div className="workspace-shell">
      {open && (
        <button
          className="sidebar-backdrop"
          onClick={() => setOpen(false)}
          aria-label={d.nav.close}
        />
      )}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <Logo href={`/${locale}`} />
          <button
            className="icon-button mobile-menu"
            onClick={() => setOpen(false)}
            aria-label={d.nav.close}
          >
            <X size={20} />
          </button>
        </div>
        <p className="eyebrow sidebar-label">{d.workspace.label}</p>
        <nav aria-label={d.nav.open}>
          {items.map((item) => (
            <Link
              onClick={() => setOpen(false)}
              key={item.path}
              href={`/${locale}/${item.path}`}
              className={`sidebar-link ${path.endsWith(item.path) ? 'active' : ''}`}
              aria-current={path.endsWith(item.path) ? 'page' : undefined}
            >
              <item.icon size={19} />
              {item.label}
              {path.endsWith(item.path) && <span className="active-dot" />}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="plan-card">
            <Sparkles size={24} />
            <h3>{d.workspace.plan}</h3>
            <p>{d.workspace.planBody}</p>
            <Link href={`/${locale}/studio`} onClick={() => setOpen(false)}>
              {d.workspace.planCta}
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <Link
            className="profile-link"
            href={`/${locale}/settings`}
            onClick={() => setOpen(false)}
          >
            <span className="avatar">{profile.name ? profile.name[0].toUpperCase() : 'B'}</span>
            <span>
              <strong>{profile.name || d.workspace.profile}</strong>
              <small>{profile.role || d.workspace.profileRole}</small>
            </span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </aside>
      <div className="workspace-body">
        <header className="workspace-header">
          <div className="workspace-breadcrumb">
            <button
              className="icon-button mobile-menu"
              aria-label={d.nav.menu}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <Menu size={21} />
            </button>
            <span>Boor</span>
            <span className="breadcrumb-slash">/</span>
            <strong>{items.find((x) => path.endsWith(x.path))?.label}</strong>
          </div>
          <div className="nav-actions">
            <span className="demo-pill">
              <span className="status-dot" />
              {d.common.demoLabel}
            </span>
            <LocaleSwitch locale={locale} />
          </div>
        </header>
        <main id="main-content" className="workspace-main">
          {children}
        </main>
        <footer className="workspace-footer">
          <span>{d.landing.footerNote}</span>
          <span>BOOR® — {locale === 'fa' ? '۲۰۲۶' : '2026'}</span>
        </footer>
      </div>
    </div>
  );
}
