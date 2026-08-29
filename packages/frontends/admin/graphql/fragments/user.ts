import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on Member {
    id
    username
    email
    firstName
    lastName
    emailVerified
    enabled
  }
`;
