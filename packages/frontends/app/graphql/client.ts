import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/client-integration-nextjs';
import { headers } from 'next/headers';
import { hasActiveSession } from '@/auth-lib/auth-session';
import { auth } from '@/auth-lib/auth';

interface AuthHeadersTokens {
  'Access-Token': string;
  'ID-Token': string;
}

export const { getClient, query, PreloadQuery } = registerApolloClient(
  async () => {
    const session = await auth();
    const tokens: Partial<AuthHeadersTokens> = hasActiveSession(session)
      ? {
          'Access-Token': session.accessToken ?? '',
          'ID-Token': session.idToken ?? '',
        }
      : {};

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: process.env.GRAPHQL_API_URL || 'http://localhost:9093/graphql',
        credentials: 'include',
        headers: {
          ...headers,
          ...tokens,
        },
      }),
    });
  },
);
