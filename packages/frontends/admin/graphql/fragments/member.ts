import { gql } from "@apollo/client";

export const MEMBER_FRAGMENT = gql`
  fragment MemberFragment on Member {
    id
    username
    email
    firstName
    lastName
    emailVerified
    enabled
  }
`;
