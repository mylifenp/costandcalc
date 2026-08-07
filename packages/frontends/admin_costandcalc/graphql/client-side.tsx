import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { SetContextLink } from '@apollo/client/link/context';
import { useMemo, ReactNode } from 'react';

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_API_URL || 'http://localhost:9093/graphql',
});

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const client = useMemo(() => {
    const authLink = new SetContextLink(({ headers }) => {
      return {
        headers: {
          ...headers,
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
