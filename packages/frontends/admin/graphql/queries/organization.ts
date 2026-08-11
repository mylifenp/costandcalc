import { gql } from "@apollo/client";
import { ORGANIZATION_FRAGMENT } from "../fragments";

export const GET_ORGANIZATIONS = gql`
  query GetOrganizations {
    organizations {
      ...OrganizationFragment
    }
  }
  ${ORGANIZATION_FRAGMENT}
`;
