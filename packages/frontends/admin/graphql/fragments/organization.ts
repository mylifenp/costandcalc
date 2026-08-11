import { gql } from "@apollo/client";
import { DOMAIN_FRAGMENT } from "./domain";

export const ORGANIZATION_FRAGMENT = gql`
  fragment OrganizationFragment on Organization {
    id
    name
    alias
    enabled
    description
    domains {
      ...DomainFragment
    }
  }
  ${DOMAIN_FRAGMENT}
`;
