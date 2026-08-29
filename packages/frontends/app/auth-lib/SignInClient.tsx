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
        callbackUrl = last;
      } else {
        if (!param || param === '/') callbackUrl = '/dashboards/ecommerce';
      }
    } catch (e) {
      // ignore
    }

    void signIn('keycloak', { callbackUrl });
  }, [searchParams, router]);

  return null;
}
