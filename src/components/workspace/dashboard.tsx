'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowUpRight,
  Sparkles,
  Plus,
  ArrowRight,
  FolderOpen,
  Palette,
  Infinity as InfinityIcon,
} from 'lucide-react';
import { useWorkspace } from './workspace-provider';
import { ProjectCard } from './project-card';
import { formatNumber, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
export function Dashboard({ locale, d }: { locale: Locale; d: Dictionary }) {
  const { projects, profile } = useWorkspace();
  const [prompt, setPrompt] = useState('');
  const router = useRouter();
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{d.workspace.date}</p>
          <h1>
            {profile.name
              ? `${locale === 'fa' ? 'سلام' : 'Hello'}, ${profile.name}.`
              : d.workspace.greeting}
          </h1>
          <p>{d.workspace.subtitle}</p>
        </div>
        <Link href={`/${locale}/studio`} className="button button-dark">
          <Plus size={17} />
          {d.common.new}
        </Link>
      </div>
      <section className="dashboard-prompt">
        <div className="prompt-content">
          <span className="spark-badge">
            <Sparkles size={19} />
          </span>
          <h2>{d.workspace.promptTitle}</h2>
          <p>{d.workspace.promptBody}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/${locale}/studio?brief=${encodeURIComponent(prompt)}`);
            }}
          >
            <label className="sr-only" htmlFor="quick-brief">
              {d.studio.brief}
            </label>
            <input
              id="quick-brief"
              maxLength={2000}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={d.workspace.promptPlaceholder}
            />
            <button type="submit" className="button button-dark">
              {d.workspace.promptCta}
              <ArrowUpRight size={18} />
            </button>
          </form>
        </div>
        <div className="prompt-art" aria-hidden="true">
          <div className="prompt-ring" />
          <span>✳</span>
        </div>
      </section>
      <div className="stats-grid">
        {[FolderOpen, Palette, InfinityIcon].map((Icon, i) => (
          <div className="stat-card" key={i}>
            <span className="stat-icon">
              <Icon size={20} />
            </span>
            <div>
              <strong>
                {i === 0
                  ? formatNumber(projects.length, locale)
                  : i === 1
                    ? formatNumber(3, locale)
                    : '∞'}
              </strong>
              <p>{d.workspace.stats[i]}</p>
            </div>
            <ArrowUpRight size={15} className="stat-decoration" />
          </div>
        ))}
      </div>
      <section className="workspace-section">
        <div className="section-title-row">
          <div>
            <h2>{d.workspace.projects}</h2>
            <p>{d.workspace.projectsBody}</p>
          </div>
          <Link href={`/${locale}/library`} className="text-link">
            {d.common.view}
            <ArrowRight size={16} />
          </Link>
        </div>
        {projects.length ? (
          <div className="project-grid">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p.id} project={p} locale={locale} d={d} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Sparkles />
            <h3>{d.common.empty}</h3>
            <Link className="button button-dark" href={`/${locale}/studio`}>
              {d.common.create}
            </Link>
          </div>
        )}
      </section>
      <section className="inspiration-banner">
        <span className="inspiration-symbol">✳</span>
        <div>
          <p className="eyebrow">{d.workspace.inspiration}</p>
          <h2>{d.workspace.inspirationBody}</h2>
        </div>
        <Link
          href={`/${locale}/studio?brief=${encodeURIComponent(locale === 'fa' ? 'یک برند قهوه مستقل برای صبح‌های آرام و آدم‌های کنجکاو.' : 'An independent coffee brand for slow mornings and curious people.')}`}
          className="button button-outline"
        >
          {d.workspace.inspirationCta}
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
