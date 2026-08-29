import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

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
  // the page they were using after login/refresh if available.
  const lastPathCookie = cookies().get('nexus_last_path')?.value;
  const lastPath = lastPathCookie ? decodeURIComponent(lastPathCookie) : undefined;

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
