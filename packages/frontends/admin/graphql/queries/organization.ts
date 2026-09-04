import { gql } from "@apollo/client";
import { ORGANIZATION_FRAGMENT, USER_FRAGMENT } from "../fragments";

export const GET_ORGANIZATIONS = gql`
  query GetOrganizations {
    organizations {
      ...OrganizationFragment
    }
  }
  ${ORGANIZATION_FRAGMENT}
`;


export const GET_ORGANIZATION = gql`
  query GetOrganization($id: ID!) {
    organization(id: $id) {
      ...OrganizationFragment
      members {
        ...UserFragment
      }
    }
  }
  ${ORGANIZATION_FRAGMENT}
  ${USER_FRAGMENT}
`;
