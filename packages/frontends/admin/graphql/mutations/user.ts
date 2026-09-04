import { gql } from "@apollo/client";

export const ADD_USER_INPUT = gql`
  input AddUserInput {
    username: String!
    email: String!
    enabled: Boolean!
    credentials: [Credential!]
  }
`;

export const CREDENTIAL_INPUT = gql`
  input Credential {
    type: String!
    value: String!
  }
`;
