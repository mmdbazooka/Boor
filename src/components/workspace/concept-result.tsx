'use client';
import { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { Artwork } from '@/components/brand/artwork';
import { direction, downloadProject, exportText, type Project } from '@/lib/projects';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
export function ConceptResult({
  project,
  locale,
  d,
}: {
  project: Project;
  locale: Locale;
  d: Dictionary;
}) {
  const content = direction(project, locale);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(exportText(project, locale));
      setCopied(true);
      setError('');
    } catch {
      setError(d.studio.copyError);
    }
  }
  return (
    <div className="concept-result">
      <Artwork mood={project.mood} name={project.name} className="result-art" />
      <div className="result-content">
        <p className="eyebrow">{d.studio.result}</p>
        <h2>{project.name}</h2>
        <div className="result-section">
          <h3>{d.studio.palette}</h3>
          <div className="palette">
            {content.colors.map((color) => (
              <div key={color}>
                <span style={{ background: color }} />
                <code>{color}</code>
              </div>
            ))}
          </div>
        </div>
        <div className="result-section">
          <h3>{d.studio.strategy}</h3>
          <p className="whitespace-pre-line">{content.strategy}</p>
        </div>
        <div className="result-section">
          <h3>{d.studio.voice}</h3>
          <p>{content.voice}</p>
        </div>
        <div className="result-section">
          <h3>{d.studio.next}</h3>
          <ol>
            {content.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="result-actions">
          <button
            className="button button-outline"
            onClick={() => downloadProject(project, locale)}
          >
            <Download size={16} />
            {d.common.download}
          </button>
          <button className="button button-ghost" onClick={copy}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span aria-live="polite">{copied ? d.studio.copied : d.studio.copy}</span>
          </button>
        </div>
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
