import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { isLocale, locales } from '@/i18n/config';
import '@fontsource-variable/manrope';
import '@fontsource-variable/vazirmatn';
import '../globals.css';
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { default: 'Boor — A space for your next big idea', template: '%s · Boor' },
    description:
      locale === 'fa'
        ? 'استودیوی خلاق بور؛ فضایی برای ایده، هویت برند و کمپین بعدی تو.'
        : 'An independent creative studio for your next brand, story, and big idea.',
    icons: { icon: '/icon.svg' },
  };
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <body>
        <a className="skip-link" href="#main-content">
          {locale === 'fa' ? 'رفتن به محتوا' : 'Skip to content'}
        </a>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
