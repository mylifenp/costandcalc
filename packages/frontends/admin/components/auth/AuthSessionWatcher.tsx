'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

import { isRefreshTokenError } from '@/auth-lib/auth-session';

export const AuthSessionWatcher = () => {
  const { data: session, status } = useSession();
  const hasTriggeredLogout = useRef(false);

  useEffect(() => {
    if (
      status !== 'authenticated' ||
      !isRefreshTokenError(session?.error) ||
      hasTriggeredLogout.current
    ) {
      return;
    }

    hasTriggeredLogout.current = true;
    void signOut({ redirectTo: '/' });
  }, [session?.error, status]);

  return null;
};
