import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Studio } from '@/components/workspace/studio';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fa' ? 'استودیوی خلاق' : 'Studio' };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Studio locale={locale} d={getDictionary(locale)} />;
}
