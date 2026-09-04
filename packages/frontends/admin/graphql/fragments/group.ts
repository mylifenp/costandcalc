import { gql } from "@apollo/client";

export const GROUP_FRAGMENT = gql`
  fragment GroupFragment on Group {
    id
    name
    path
    parentId
    subGroupCount
  }
`;
