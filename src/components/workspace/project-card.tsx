import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Artwork } from '@/components/brand/artwork';
import { projectTypes, type Project } from '@/lib/projects';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
export function ProjectCard({
  project,
  locale,
  d,
}: {
  project: Project;
  locale: Locale;
  d: Dictionary;
}) {
  return (
    <Link
      className="project-card"
      href={`/${locale}/library?project=${encodeURIComponent(project.id)}`}
    >
      <Artwork mood={project.mood} name={project.name} />
      <div className="project-card-body">
        <div>
          <h3>{project.name}</h3>
          <p>{d.studio.types[projectTypes.indexOf(project.type)]}</p>
        </div>
        <ArrowUpRight size={19} />
      </div>
      <div className="project-card-foot">
        <span>{project.sample ? d.library.sample : d.library.personal}</span>
        <time dateTime={project.createdAt}>
          {new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
            month: 'short',
            day: 'numeric',
          }).format(new Date(project.createdAt))}
        </time>
      </div>
    </Link>
  );
}
