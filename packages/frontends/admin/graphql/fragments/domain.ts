import { gql } from "@apollo/client";

export const DOMAIN_FRAGMENT = gql`
  fragment DomainFragment on Domain {
    name
    verified
  }
`;
