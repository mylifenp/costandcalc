'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function LastPathTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const search = searchParams ? String(searchParams) : '';
      const full = `${pathname}${search ? '?' + search : ''}`;
      // store in sessionStorage for client-side sign-in flow
      sessionStorage.setItem('nexus:lastPath', full);
      // also set a cookie so server-side code can read it if needed
      document.cookie = `nexus_last_path=${encodeURIComponent(full)}; path=/`;
    } catch (e) {
      // ignore
    }
  }, [pathname, searchParams]);

  return null;
}
