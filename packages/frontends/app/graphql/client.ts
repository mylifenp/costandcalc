import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/client-integration-nextjs';
import { hasActiveSession } from '@/auth-lib/auth-session';
import { auth } from '@/auth-lib/auth';
import { headers } from 'next/headers';

interface AuthHeadersTokens {
  'Access-Token': string;
  'ID-Token': string;
}

export const { getClient, query, PreloadQuery } = registerApolloClient(
  async () => {
    const session = await auth();
    const graphqlApiUrl = process.env.GRAPHQL_API_URL;

    if (!graphqlApiUrl) {
      throw new Error('GRAPHQL_API_URL is required to use the GraphQL client');
    }

    const tokens: Partial<AuthHeadersTokens> = hasActiveSession(session)
      ? {
          'Access-Token': session.accessToken ?? '',
          'ID-Token': session.idToken ?? '',
        }
      : {};

    // forward incoming request headers (cookies) when running on server
    let requestHeaders: Record<string, string> = {};
    try {
      // headers() may return a Promise or a plain object depending on Next.js version; await is safe for both
      const hdrs = await headers();
      // entries() may not be typed strictly on ReadonlyHeaders; cast to any for runtime conversion
      requestHeaders = Object.fromEntries((hdrs as any).entries?.() ?? []);
    } catch (e) {
      requestHeaders = {};
    }

    const bearerToken = tokens['Access-Token'] || tokens['ID-Token'] || undefined;
    const outgoingHeaders = {
      ...requestHeaders,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
      ...tokens,
    };

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: graphqlApiUrl,
        credentials: 'include',
        headers: outgoingHeaders,
      }),
    });
  },
);
