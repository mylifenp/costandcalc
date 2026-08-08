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
      const hdrs = await headers();
      requestHeaders = Object.fromEntries((hdrs as any).entries?.() ?? []);
    } catch (e) {
      requestHeaders = {};
    }

    const loggingFetch = async (input: any, init?: any) => {
      // eslint-disable-next-line no-console
      console.debug('[ApolloFetchDebug][request]', { url: String(input), method: init?.method ?? 'POST', initHeaders: init?.headers });
      const res = await fetch(input, init);
      const contentType = res.headers?.get?.('content-type') ?? '';
      if (!contentType.includes('application/json')) {
        const text = await res.clone().text();
        // eslint-disable-next-line no-console
        console.error('[ApolloFetchDebug] Non-JSON response from GraphQL server', {
          url: String(input),
          status: res.status,
          statusText: res.statusText,
          contentType,
          bodyPreview: text.slice(0, 1000),
        });
      }
      return res;
    };

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
        fetch: loggingFetch,
        headers: outgoingHeaders,
      }),
    });
  },
);
