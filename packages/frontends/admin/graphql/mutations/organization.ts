import { gql } from "@apollo/client";
import { ORGANIZATION_FRAGMENT } from "../fragments";

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($input: AddOrganizationInput!) {
    createOrganization(input: $input) {
      name
      success
    }
  }
`;

export const ACTIVATE_ORGANIZATION = gql`
  mutation ActivateOrganization($id: ID!) {
    activateOrganization(id: $id) {
      ...OrganizationFragment
    }
  }
  ${ORGANIZATION_FRAGMENT}
`;


export const DEACTIVATE_ORGANIZATION = gql`
  mutation DeactivateOrganization($id: ID!) {
    deactivateOrganization(id: $id) {
      ...OrganizationFragment
    }
  }
  ${ORGANIZATION_FRAGMENT}
`;
