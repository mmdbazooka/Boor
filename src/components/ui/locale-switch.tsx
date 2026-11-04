'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Globe2 } from 'lucide-react';
import type { Locale } from '@/i18n/config';
export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const search = useSearchParams();
  const next = locale === 'en' ? 'fa' : 'en';
  return (
    <Link
      className="locale-switch"
      href={`${pathname.replace(/^\/(en|fa)(?=\/|$)/, `/${next}`)}${search.size ? `?${search.toString()}` : ''}`}
      lang={next}
      aria-label={next === 'fa' ? 'تغییر زبان به فارسی' : 'Switch to English'}
    >
      <Globe2 size={16} />
      <span>{next === 'fa' ? 'فارسی' : 'EN'}</span>
    </Link>
  );
}
