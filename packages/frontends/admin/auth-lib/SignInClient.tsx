'use client';

import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SignInClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const param = searchParams.get('callbackUrl') ?? '/';
    let callbackUrl = param;

    try {
      const last = sessionStorage.getItem('nexus:lastPath');
      const hasHistory = typeof window !== 'undefined' && window.history.length > 1;

      const isAuthPath = (p: string | null) => !p ? false : p.startsWith('/auth') || p.startsWith('/api/auth');

      if (hasHistory && last && !isAuthPath(last) && last !== '/' && last !== param) {
        // prefer returning to the last visited page when there is navigation history
        callbackUrl = last;
      } else {
        // if nothing useful, default to dashboards
        if (!param || param === '/') callbackUrl = '/dashboards/ecommerce';
      }
    } catch (e) {
      // ignore
    }

    // initiate sign in to provider with the chosen callback
    void signIn('keycloak', { callbackUrl });
  }, [searchParams, router]);

  return null;
}
