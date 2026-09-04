import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import { auth } from '@/auth-lib/auth';
import { hasActiveSession } from '@/auth-lib/auth-session';

// local copy of supported locales — keep in sync with admin i18n if you add more
const LOCALES = ['en-US', 'de-DE'];
const isLocale = (value?: string | null) => Boolean(value && LOCALES.includes(value));

export const metadata: Metadata = {
  title: 'Dashboards - Ecommerce',
};
export default async function Page() {
  const session = await auth();

  // parse cookie header to get last path (some runtimes don't support cookies().get)
  const hdrs = await headers();
  const cookieHeader = hdrs.get('cookie') ?? '';
  const parseCookie = (name: string) => {
    if (!cookieHeader) return undefined;
    const match = cookieHeader.split(';').map((s: string) => s.trim()).find((c: string) => c.startsWith(name + '='));
    if (!match) return undefined;
    return decodeURIComponent(match.split('=').slice(1).join('='));
  };
  const lastPath = parseCookie('nexus_last_path');

  if (hasActiveSession(session)) {
    if (lastPath && lastPath !== '/' && !lastPath.startsWith('/auth') && lastPath.startsWith('/')) {
      const segments = lastPath.split('/').filter(Boolean);
      const first = segments[0] ?? null;
      if (first && isLocale(first)) {
        redirect(lastPath);
      }

      redirect(lastPath);
    }

    redirect('/dashboards/ecommerce');
  }
  
  redirect('/auth/login?callbackUrl=/dashboards/ecommerce');
}
