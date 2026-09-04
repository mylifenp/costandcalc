import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import { auth } from '@/auth-lib/auth';
import { hasActiveSession } from '@/auth-lib/auth-session';
import { ISidebarMenuItem } from '@/components/admin-layout/SidebarMenuItem';
import { isLocale } from '@/i18n';

export const emptyMenu: ISidebarMenuItem[] = [];

export const metadata: Metadata = {
  title: 'Dashboards - Ecommerce',
};
export default async function Page() {
  const session = await auth();

  // Try to read last path saved by the client. This allows returning the user to
  // the page they were using after login/refresh if available. Some runtimes
  // don't expose cookies().get, so parse the Cookie header directly.
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
      // If the last path starts with a locale prefix, ensure we respect it and
      // return to that localized route.
      const segments = lastPath.split('/').filter(Boolean);
      const first = segments[0] ?? null;
      if (first && isLocale(first)) {
        redirect(lastPath);
      }

      // If there was a non-localized lastPath, still allow returning to it.
      // This preserves previous behavior while preferring locale-aware paths.
      redirect(lastPath);
    }

    redirect('/dashboards/ecommerce');
  }
  
  redirect('/auth/login?callbackUrl=/dashboards/ecommerce');
}
