import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Library } from '@/components/workspace/library';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fa' ? 'پروژه\u200cهای من' : 'Library' };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Library locale={locale} d={getDictionary(locale)} />;
}
