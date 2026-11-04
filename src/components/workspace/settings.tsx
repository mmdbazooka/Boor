'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Info, ArrowUpRight, UserRound, Globe2 } from 'lucide-react';
import { useWorkspace } from './workspace-provider';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
export function Settings({ locale, d }: { locale: Locale; d: Dictionary }) {
  const { profile, saveProfile } = useWorkspace();
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [language, setLanguage] = useState<Locale>(locale);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const nextName = (name ?? profile.name).trim();
    if (!nextName) {
      setError(d.settings.error);
      return;
    }
    if (!saveProfile({ name: nextName, role: (role ?? profile.role).trim() })) {
      setError(d.settings.storageError);
      return;
    }
    setSaved(true);
    setError('');
    if (language !== locale) router.push(`/${language}/settings`);
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{d.settings.eyebrow}</p>
          <h1>{d.settings.title}</h1>
          <p>{d.settings.description}</p>
        </div>
      </div>
      <form className="settings-form" onSubmit={submit}>
        <section className="panel settings-panel">
          <div className="settings-section-heading">
            <span className="stat-icon">
              <UserRound size={20} />
            </span>
            <div>
              <h2>{d.settings.profile}</h2>
              <p>{d.settings.profileBody}</p>
            </div>
          </div>
          <div className="settings-fields">
            <div className="field">
              <label htmlFor="display-name">{d.settings.name}</label>
              <input
                id="display-name"
                maxLength={50}
                required
                value={name ?? profile.name}
                placeholder={d.workspace.profile}
                onChange={(e) => {
                  setName(e.target.value);
                  setSaved(false);
                }}
              />
            </div>
            <div className="field">
              <label htmlFor="creative-role">{d.settings.role}</label>
              <input
                id="creative-role"
                maxLength={80}
                value={role ?? profile.role}
                placeholder={d.settings.rolePlaceholder}
                onChange={(e) => {
                  setRole(e.target.value);
                  setSaved(false);
                }}
              />
            </div>
          </div>
        </section>
        <section className="panel settings-panel">
          <div className="settings-section-heading">
            <span className="stat-icon">
              <Globe2 size={20} />
            </span>
            <div>
              <h2>{d.settings.preferences}</h2>
              <p>{d.settings.preferencesBody}</p>
            </div>
          </div>
          <div className="field">
            <label htmlFor="language">{d.settings.language}</label>
            <select
              id="language"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value as Locale);
                setSaved(false);
              }}
            >
              <option value="en">English</option>
              <option value="fa">فارسی</option>
            </select>
          </div>
        </section>
        <div className="settings-actions">
          <button type="submit" className="button button-dark">
            {saved ? <Check size={18} /> : <ArrowUpRight size={18} />} {d.settings.save}
          </button>
          <span role="status">{saved ? d.settings.saved : ''}</span>
        </div>
        {error && (
          <p role="alert" className="error-message">
            {error}
          </p>
        )}
      </form>
      <div className="storage-note">
        <Info size={20} />
        <div>
          <h3>{d.settings.storage}</h3>
          <p>{d.settings.storageBody}</p>
        </div>
      </div>
    </>
  );
}
