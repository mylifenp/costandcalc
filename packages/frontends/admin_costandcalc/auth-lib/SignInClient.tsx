'use client';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SignInClient() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl') ?? '/';
    void signIn('keycloak', { callbackUrl });
  }, [searchParams]);

  return null;
}
