"use client";

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { SetContextLink } from '@apollo/client/link/context';
import { useMemo, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_API_URL || 'http://localhost:9093/graphql',
  credentials: 'include',
});

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  const client = useMemo(() => {
    const authLink = new SetContextLink((prevContext) => {
      const tokenHeaders: Record<string, string> = session?.accessToken
        ? {
            'Access-Token': session.accessToken,
            'ID-Token': session.idToken ?? '',
          }
        : {};

      return {
        headers: {
          ...(prevContext?.headers ?? {}),
          ...tokenHeaders,
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [session]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
