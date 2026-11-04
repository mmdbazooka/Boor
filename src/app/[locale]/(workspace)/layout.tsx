import { notFound } from 'next/navigation';
import { WorkspaceProvider } from '@/components/workspace/workspace-provider';
import { WorkspaceShell } from '@/components/layout/workspace-shell';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <WorkspaceProvider locale={locale}>
      <WorkspaceShell locale={locale} d={getDictionary(locale)}>
        {children}
      </WorkspaceShell>
    </WorkspaceProvider>
  );
}
