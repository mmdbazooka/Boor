import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Dashboard } from '@/components/workspace/dashboard';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fa' ? 'نمای کلی' : 'Dashboard' };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Dashboard locale={locale} d={getDictionary(locale)} />;
}
