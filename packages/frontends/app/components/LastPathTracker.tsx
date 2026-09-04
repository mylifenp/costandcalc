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
      sessionStorage.setItem('nexus:lastPath', full);
      document.cookie = `nexus_last_path=${encodeURIComponent(full)}; path=/`;
    } catch (e) {
      // ignore
    }
  }, [pathname, searchParams]);

  return null;
}
