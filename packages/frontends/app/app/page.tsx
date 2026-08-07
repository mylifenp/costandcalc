import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/auth-lib/auth';
import { hasActiveSession } from '@/auth-lib/auth-session';
import { ISidebarMenuItem } from '@/components/admin-layout/SidebarMenuItem';

export const emptyMenu: ISidebarMenuItem[] = [];

export const metadata: Metadata = {
  title: 'Dashboards - Ecommerce',
};
export default async function Page() {
  const session = await auth();
  if (hasActiveSession(session)) {
    redirect("/dashboards/ecommerce");
  }
  
  redirect('/auth/login?callbackUrl=/dashboards/ecommerce');
}
