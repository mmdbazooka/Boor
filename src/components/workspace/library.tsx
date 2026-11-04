'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, Search, FolderOpen, Trash2 } from 'lucide-react';
import { useWorkspace } from './workspace-provider';
import { ProjectCard } from './project-card';
import { ConceptResult } from './concept-result';
import { Dialog } from '@/components/ui/dialog';
import { projectTypes } from '@/lib/projects';
import { formatNumber, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
export function Library({ locale, d }: { locale: Locale; d: Dictionary }) {
  const { projects, removeProject } = useWorkspace();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState('');
  const search = useSearchParams();
  const router = useRouter();
  const selected = projects.find((p) => p.id === search.get('project'));
  const filtered = projects.filter(
    (p) =>
      (filter === 'all' || p.type === filter) &&
      `${p.name} ${p.brief}`.toLocaleLowerCase(locale).includes(query.toLocaleLowerCase(locale)),
  );
  function close() {
    router.replace(`/${locale}/library`, { scroll: false });
    setConfirm(false);
    setError('');
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{d.library.eyebrow}</p>
          <h1>{d.library.title}</h1>
          <p>{d.library.description}</p>
        </div>
        <Link className="button button-dark" href={`/${locale}/studio`}>
          <Plus size={18} />
          {d.common.new}
        </Link>
      </div>
      <div className="library-toolbar">
        <div className="filter-tabs" aria-label={d.common.all}>
          {['all', ...projectTypes].map((f, i) => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {d.library.filters[i]}
              {i === 0 && <span>{formatNumber(projects.length, locale)}</span>}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={17} />
          <span className="sr-only">{d.common.search}</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={d.common.search}
          />
        </label>
      </div>
      {filtered.length ? (
        <div className="project-grid library-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} locale={locale} d={d} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FolderOpen size={40} strokeWidth={1} />
          <h2>{projects.length ? d.common.noResults : d.common.empty}</h2>
          {!projects.length && (
            <>
              <p>{d.common.emptyBody}</p>
              <Link className="button button-dark" href={`/${locale}/studio`}>
                {d.common.create}
              </Link>
            </>
          )}
        </div>
      )}
      {selected && (
        <Dialog title={d.library.detail} closeLabel={d.common.close} onClose={close}>
          <ConceptResult project={selected} locale={locale} d={d} />
          <div className="delete-area">
            {confirm ? (
              <>
                <h3>{d.library.deleteTitle}</h3>
                <p>{d.library.deleteBody}</p>
                <div className="flex gap-3">
                  <button
                    className="button button-danger"
                    onClick={() => {
                      if (removeProject(selected.id)) close();
                      else setError(d.settings.storageError);
                    }}
                  >
                    {d.library.deleteConfirm}
                  </button>
                  <button className="button button-outline" onClick={() => setConfirm(false)}>
                    {d.common.cancel}
                  </button>
                </div>
              </>
            ) : (
              <button className="delete-button" onClick={() => setConfirm(true)}>
                <Trash2 size={16} />
                {d.common.remove}
              </button>
            )}
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
          </div>
        </Dialog>
      )}
    </>
  );
}
