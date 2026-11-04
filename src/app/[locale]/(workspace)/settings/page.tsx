import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Settings } from '@/components/workspace/settings';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fa' ? 'تنظیمات' : 'Settings' };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Settings locale={locale} d={getDictionary(locale)} />;
}
