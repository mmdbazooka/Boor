'use client';
import { createContext, useContext, useSyncExternalStore, useMemo } from 'react';
import { moods, projectTypes, sampleProjects, type Project } from '@/lib/projects';
import type { Locale } from '@/i18n/config';
interface Profile {
  name: string;
  role: string;
}
interface StoredState {
  projects: Project[];
  removed: string[];
  profile: Profile;
}
const empty: StoredState = { projects: [], removed: [], profile: { name: '', role: '' } };
const KEY = 'boor-workspace-v1';
const EVENT = 'boor-workspace-change';
function isProject(value: unknown): value is Project {
  if (!value || typeof value !== 'object') return false;
  const p = value as Project;
  return (
    ['id', 'name', 'brief', 'audience', 'createdAt'].every(
      (k) => typeof p[k as keyof Project] === 'string',
    ) &&
    projectTypes.includes(p.type) &&
    moods.includes(p.mood) &&
    ['en', 'fa'].includes(p.locale) &&
    Number.isFinite(Date.parse(p.createdAt))
  );
}
function read(raw: string | null): StoredState {
  try {
    const data = JSON.parse(raw || '{}');
    return {
      projects: Array.isArray(data.projects) ? data.projects.filter(isProject).slice(0, 200) : [],
      removed: Array.isArray(data.removed)
        ? data.removed.filter((x: unknown) => typeof x === 'string')
        : [],
      profile: {
        name: typeof data.profile?.name === 'string' ? data.profile.name : '',
        role: typeof data.profile?.role === 'string' ? data.profile.role : '',
      },
    };
  } catch {
    return empty;
  }
}
function snapshot() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
function subscribe(cb: () => void) {
  window.addEventListener('storage', cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener('storage', cb);
    window.removeEventListener(EVENT, cb);
  };
}
function write(update: (s: StoredState) => StoredState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(update(read(snapshot()))));
    window.dispatchEvent(new Event(EVENT));
    return true;
  } catch {
    return false;
  }
}
interface WorkspaceValue {
  projects: Project[];
  profile: Profile;
  saveProject: (p: Project) => boolean;
  removeProject: (id: string) => boolean;
  saveProfile: (p: Profile) => boolean;
}
const WorkspaceContext = createContext<WorkspaceValue | null>(null);
export function WorkspaceProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  const value = useMemo<WorkspaceValue>(() => {
    const state = read(raw);
    return {
      projects: [...state.projects, ...sampleProjects(locale)].filter(
        (p) => !state.removed.includes(p.id),
      ),
      profile: state.profile,
      saveProject: (p) =>
        write((s) => ({ ...s, projects: [p, ...s.projects.filter((x) => x.id !== p.id)] })),
      removeProject: (id) =>
        write((s) => ({
          ...s,
          projects: s.projects.filter((p) => p.id !== id),
          removed: [...s.removed, id],
        })),
      saveProfile: (profile) => write((s) => ({ ...s, profile })),
    };
  }, [raw, locale]);
  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}
export function useWorkspace() {
  const value = useContext(WorkspaceContext);
  if (!value) throw new Error('WorkspaceProvider is required');
  return value;
}
