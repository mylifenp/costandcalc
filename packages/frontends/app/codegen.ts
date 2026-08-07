import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_API_URL || "http://localhost:9093/graphql",
  documents: ["graphql/**/*.{ts,tsx,graphql,gql}"],
  generates: {
    ".graphql/generated/types.generated.ts": {
      plugins: ["typescript", 'typescript-operations', 'typescript-react-apollo'],
      config: {
        scalars: {
          DateTime: "string",
          DateTimeZ: "string",
          Upload: "File",
          JSON: "any",
        },
      },
    },
    // "packages/frontends/app/graphql/generated/": {
    //   preset: "near-operation-file",
    //   presetConfig: {
    //     extension: ".generated.ts",
    //     baseTypesPath: "types.generated.ts",
    //   },
    //   plugins: ["typescript-operations", "typed-document-node"],
    // },
    // "./graphql.schema.json": {
    //   plugins: ["introspection"],
    // },
  },
};

export default config;
