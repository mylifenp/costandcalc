import { gql } from "@apollo/client";
import { DOMAIN_FRAGMENT } from "./domain";
import { GROUP_FRAGMENT } from "./group";

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
    groups {
      ...GroupFragment
    }
  }
  ${DOMAIN_FRAGMENT}
  ${GROUP_FRAGMENT}
`;
