import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_API_URL || 'http://localhost:9093/graphql',
  documents: ['graphql/**/*.{ts,tsx,graphql,gql}'],
  generates: {
    'graphql/generated/types.generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        scalars: {
          DateTime: 'string',
          DateTimeZ: 'string',
          Upload: 'File',
          JSON: 'any',
        },
        withHooks: false,
        apolloReactHooksImportFrom: '@apollo/client/react',
      },
    },
  },
};

export default config;
