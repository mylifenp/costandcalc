'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { locales, localeNames, isLocale, defaultLocale } from '@/i18n';

export const LocaleSwitcher = () => {
  const pathname = usePathname() ?? '/';
  const segments = pathname.split('/').filter(Boolean);

  let currentLocale = defaultLocale;
  let pathWithoutLocale = pathname;

  if (segments.length > 0 && isLocale(segments[0])) {
    currentLocale = segments[0] as (typeof locales)[number];
    pathWithoutLocale = '/' + segments.slice(1).join('/');
  } else {
    pathWithoutLocale = pathname;
  }

  if (!pathWithoutLocale) pathWithoutLocale = '/';

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
        <span className="iconify lucide--languages size-4" />
        <span className="ml-2">{currentLocale}</span>
      </div>

      <ul tabIndex={0} className="dropdown-content menu bg-base-100 border-base-300 rounded-box z-10 w-44 border p-2 shadow">
        {locales.map((locale) => (
          <li key={locale}>
            <Link href={`/${locale}${pathWithoutLocale}`} className={locale === currentLocale ? 'active' : ''}>
              {localeNames[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
