'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, ArrowUpRight, Check, LoaderCircle, Bookmark, Aperture } from 'lucide-react';
import { useWorkspace } from './workspace-provider';
import { ConceptResult } from './concept-result';
import { moods, projectTypes, type Mood, type Project, type ProjectType } from '@/lib/projects';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
export function Studio({ locale, d }: { locale: Locale; d: Dictionary }) {
  const params = useSearchParams();
  const { saveProject, projects } = useWorkspace();
  const [name, setName] = useState('');
  const [brief, setBrief] = useState(params.get('brief')?.slice(0, 2000) || '');
  const [audience, setAudience] = useState('');
  const [type, setType] = useState<ProjectType>('identity');
  const [mood, setMood] = useState<Mood>('minimal');
  const [result, setResult] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function generate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || brief.trim().length < 12) {
      setError(d.studio.error);
      return;
    }
    setError('');
    setLoading(true);
    timer.current = setTimeout(() => {
      setResult({
        id: crypto.randomUUID(),
        name: name.trim(),
        brief: brief.trim(),
        audience: audience.trim(),
        type,
        mood,
        locale,
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      resultRef.current?.focus({ preventScroll: true });
    }, 1200);
  }
  const saved = !!result && projects.some((p) => p.id === result.id);
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{d.studio.eyebrow}</p>
          <h1>{d.studio.title}</h1>
          <p>{d.studio.description}</p>
        </div>
        <span className="page-heading-spark">✳</span>
      </div>
      <div className="studio-grid">
        <form className="studio-form panel" onSubmit={generate}>
          <fieldset disabled={loading}>
            <div className="field">
              <label htmlFor="project-name">
                {d.studio.name}
                <span>*</span>
              </label>
              <input
                id="project-name"
                maxLength={60}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={d.studio.namePlaceholder}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="project-brief">
                {d.studio.brief}
                <span>*</span>
              </label>
              <textarea
                id="project-brief"
                rows={5}
                maxLength={2000}
                minLength={12}
                required
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder={d.studio.placeholder}
                aria-describedby="brief-hint"
              />
              <small id="brief-hint">{d.studio.briefHint}</small>
            </div>
            <div className="field">
              <label htmlFor="project-type">{d.studio.type}</label>
              <select
                id="project-type"
                value={type}
                onChange={(e) => setType(e.target.value as ProjectType)}
              >
                {projectTypes.map((t, i) => (
                  <option value={t} key={t}>
                    {d.studio.types[i]}
                  </option>
                ))}
              </select>
            </div>
            <fieldset className="mood-field">
              <legend>{d.studio.mood}</legend>
              <div className="mood-options">
                {moods.map((m, i) => (
                  <label key={m} className={`mood-option ${mood === m ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="mood"
                      value={m}
                      checked={mood === m}
                      onChange={() => setMood(m)}
                    />
                    <span className={`mood-dot mood-${m}`} />
                    {d.studio.moods[i]}
                    {mood === m && <Check size={13} />}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor="audience">{d.studio.audience}</label>
              <input
                id="audience"
                value={audience}
                maxLength={150}
                onChange={(e) => setAudience(e.target.value)}
                placeholder={d.studio.audiencePlaceholder}
              />
            </div>
          </fieldset>
          {error && (
            <p role="alert" className="error-message">
              {error}
            </p>
          )}
          <button disabled={loading} className="button button-dark generate-button" type="submit">
            {loading ? <LoaderCircle className="animate-spin" size={18} /> : <Sparkles size={18} />}
            <span aria-live="polite">
              {loading ? d.studio.generating : result ? d.studio.regenerate : d.studio.generate}
            </span>
            {!loading && <ArrowUpRight size={18} />}
          </button>
          <p className="demo-disclaimer">{d.studio.demo}</p>
        </form>
        <div className="studio-canvas" ref={resultRef} tabIndex={-1} aria-busy={loading}>
          {loading ? (
            <div className="canvas-empty" role="status">
              <Aperture className="animate-spin" size={72} strokeWidth={1} />
              <h2>{d.studio.generating}</h2>
              <div className="loading-track">
                <span />
              </div>
            </div>
          ) : result ? (
            <>
              <ConceptResult project={result} locale={locale} d={d} />
              <button
                className={`button ${saved ? 'button-outline' : 'button-lime'} save-concept`}
                disabled={saved}
                onClick={() => {
                  if (!saveProject(result)) setError(d.settings.storageError);
                }}
              >
                {saved ? <Check size={18} /> : <Bookmark size={18} />}
                <span aria-live="polite">{saved ? d.studio.saved : d.studio.save}</span>
              </button>
            </>
          ) : (
            <div className="canvas-empty">
              <div className="canvas-symbol">
                <Aperture size={92} strokeWidth={0.65} />
                <span>✳</span>
              </div>
              <p className="eyebrow">{d.studio.canvasLabel}</p>
              <h2>{d.studio.canvasTitle}</h2>
              <p>{d.studio.canvasBody}</p>
              <div className="canvas-chips">
                <span>01</span>
                <i />
                <span>∞</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
