'use client';
import { AuthSessionWatcher } from '@/components/auth/AuthSessionWatcher';
import { ConfigProvider } from '@/contexts/config';
import { ApolloWrapper } from '@/graphql/client-side';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export function Provider({
  children,
  session,
}: {
  children: ReactNode;
  session?: Session | null;
}) {
  return (
    <SessionProvider session={session} basePath="/auth">
      <AuthSessionWatcher />
      <ApolloWrapper>
        <ConfigProvider>{children}</ConfigProvider>
      </ApolloWrapper>
    </SessionProvider>
  );
}
