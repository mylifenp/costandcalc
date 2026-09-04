/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddOrganizationInput = {
  alias: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  enabled: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type AddOrganizationMemberInput = {
  organizationId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type AddOrganizationMemberPayload = {
  __typename?: 'AddOrganizationMemberPayload';
  success: Scalars['Boolean']['output'];
};

export type AddUserInput = {
  credentials: Array<Credential>;
  email: Scalars['String']['input'];
  enabled: Scalars['Boolean']['input'];
  username: Scalars['String']['input'];
};

export type AdminHealthStatus = {
  __typename?: 'AdminHealthStatus';
  apiStatus: Scalars['String']['output'];
  email: Scalars['String']['output'];
};

export type AssetsHealthStatus = {
  __typename?: 'AssetsHealthStatus';
  apiStatus: Scalars['String']['output'];
};

export type BillingHealthStatus = {
  __typename?: 'BillingHealthStatus';
  apiStatus: Scalars['String']['output'];
};

export type Credential = {
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Domain = {
  __typename?: 'Domain';
  name: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type EstimationHealthStatus = {
  __typename?: 'EstimationHealthStatus';
  apiStatus: Scalars['String']['output'];
};

export type Group = {
  __typename?: 'Group';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  members?: Maybe<Array<Member>>;
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  subGroupCount?: Maybe<Scalars['Int']['output']>;
};

export type IdentityHealthStatus = {
  __typename?: 'IdentityHealthStatus';
  apiStatus: Scalars['String']['output'];
};

export type MediaHealthStatus = {
  __typename?: 'MediaHealthStatus';
  apiStatus: Scalars['String']['output'];
};

export type Member = {
  __typename?: 'Member';
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateOrganization: Organization;
  addOrganizationMember: AddOrganizationMemberPayload;
  addUser: User;
  createOrganization: OrganizationCreateConfirmation;
  deactivateOrganization: Organization;
  removeOrganizationMember: RemoveOrganizationMemberPayload;
  updateOrganization: Organization;
};


export type MutationActivateOrganizationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAddOrganizationMemberArgs = {
  input: AddOrganizationMemberInput;
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationCreateOrganizationArgs = {
  input: AddOrganizationInput;
};


export type MutationDeactivateOrganizationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveOrganizationMemberArgs = {
  input: RemoveOrganizationMemberInput;
};


export type MutationUpdateOrganizationArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOrganizationInput;
};

export type NotificationHealthStatus = {
  __typename?: 'NotificationHealthStatus';
  apiStatus: Scalars['String']['output'];
};

export type Organization = {
  __typename?: 'Organization';
  alias: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  domains: Array<Domain>;
  enabled: Scalars['Boolean']['output'];
  groups?: Maybe<Array<Group>>;
  id: Scalars['ID']['output'];
  members?: Maybe<Array<Member>>;
  name: Scalars['String']['output'];
};

export type OrganizationCreateConfirmation = {
  __typename?: 'OrganizationCreateConfirmation';
  name: Scalars['String']['output'];
  success: Status;
};

export type Query = {
  __typename?: 'Query';
  adminHealth: AdminHealthStatus;
  assetsHealth: AssetsHealthStatus;
  billingHealth: BillingHealthStatus;
  estimationHealth: EstimationHealthStatus;
  identityHealth: IdentityHealthStatus;
  mediaHealth: MediaHealthStatus;
  notificationHealth: NotificationHealthStatus;
  organization: Organization;
  organizations: Array<Organization>;
  user: User;
  users: Array<User>;
  workHealth: WorkHealthStatus;
};


export type QueryOrganizationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type RemoveOrganizationMemberInput = {
  organizationId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type RemoveOrganizationMemberPayload = {
  __typename?: 'RemoveOrganizationMemberPayload';
  success: Scalars['Boolean']['output'];
};

export enum Status {
  Failed = 'FAILED',
  Success = 'SUCCESS'
}

export type UpdateOrganizationInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type WorkHealthStatus = {
  __typename?: 'WorkHealthStatus';
  apiStatus: Scalars['String']['output'];
};

export type AddOrganizationInput = {
  alias: string;
  description?: string | null | undefined;
  enabled: boolean;
  name: string;
};

export type Status =
  | 'FAILED'
  | 'SUCCESS';

export type DomainFragmentFragment = { name: string, verified: boolean };

export type GroupFragmentFragment = { id: string, name: string, path: string | null, parentId: string | null, subGroupCount: number | null };

export type MemberFragmentFragment = { id: string, username: string, email: string, firstName: string | null, lastName: string | null, emailVerified: boolean, enabled: boolean };

export type OrganizationFragmentFragment = { id: string, name: string, alias: string, enabled: boolean, description: string | null, domains: Array<{ name: string, verified: boolean }>, groups: Array<{ id: string, name: string, path: string | null, parentId: string | null, subGroupCount: number | null }> | null };

export type UserFragmentFragment = { id: string, username: string, email: string, firstName: string | null, lastName: string | null, emailVerified: boolean, enabled: boolean };

export type CreateOrganizationMutationVariables = Exact<{
  input: AddOrganizationInput;
}>;


export type CreateOrganizationMutation = { createOrganization: { name: string, success: Status } };

export type ActivateOrganizationMutationVariables = Exact<{
  id: string | number;
}>;


export type ActivateOrganizationMutation = { activateOrganization: { id: string, name: string, alias: string, enabled: boolean, description: string | null, domains: Array<{ name: string, verified: boolean }>, groups: Array<{ id: string, name: string, path: string | null, parentId: string | null, subGroupCount: number | null }> | null } };

export type DeactivateOrganizationMutationVariables = Exact<{
  id: string | number;
}>;


export type DeactivateOrganizationMutation = { deactivateOrganization: { id: string, name: string, alias: string, enabled: boolean, description: string | null, domains: Array<{ name: string, verified: boolean }>, groups: Array<{ id: string, name: string, path: string | null, parentId: string | null, subGroupCount: number | null }> | null } };

export type HealthsQueryVariables = Exact<{ [key: string]: never; }>;


export type HealthsQuery = { adminHealth: { apiStatus: string, email: string }, assetsHealth: { apiStatus: string }, billingHealth: { apiStatus: string }, estimationHealth: { apiStatus: string }, identityHealth: { apiStatus: string }, mediaHealth: { apiStatus: string }, notificationHealth: { apiStatus: string }, workHealth: { apiStatus: string } };

export type GetOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationsQuery = { organizations: Array<{ id: string, name: string, alias: string, enabled: boolean, description: string | null, domains: Array<{ name: string, verified: boolean }>, groups: Array<{ id: string, name: string, path: string | null, parentId: string | null, subGroupCount: number | null }> | null }> };

export type GetOrganizationQueryVariables = Exact<{
  id: string | number;
}>;


export type GetOrganizationQuery = { organization: { id: string, name: string, alias: string, enabled: boolean, description: string | null, members: Array<{ id: string, username: string, email: string, firstName: string | null, lastName: string | null, emailVerified: boolean, enabled: boolean }> | null, domains: Array<{ name: string, verified: boolean }>, groups: Array<{ id: string, name: string, path: string | null, parentId: string | null, subGroupCount: number | null }> | null } };

export type GetUserQueryVariables = Exact<{
  id: string | number;
}>;


export type GetUserQuery = { user: { id: string, username: string } };

export const MemberFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]} as unknown as DocumentNode<MemberFragmentFragment, unknown>;
export const DomainFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DomainFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Domain"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}}]} as unknown as DocumentNode<DomainFragmentFragment, unknown>;
export const GroupFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"subGroupCount"}}]}}]} as unknown as DocumentNode<GroupFragmentFragment, unknown>;
export const OrganizationFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Organization"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DomainFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DomainFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Domain"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"subGroupCount"}}]}}]} as unknown as DocumentNode<OrganizationFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const CreateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddOrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const ActivateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activateOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DomainFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Domain"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"subGroupCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Organization"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DomainFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}}]}}]}}]} as unknown as DocumentNode<ActivateOrganizationMutation, ActivateOrganizationMutationVariables>;
export const DeactivateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeactivateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deactivateOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DomainFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Domain"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"subGroupCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Organization"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DomainFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}}]}}]}}]} as unknown as DocumentNode<DeactivateOrganizationMutation, DeactivateOrganizationMutationVariables>;
export const HealthsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"healths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assetsHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"billingHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimationHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"identityHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notificationHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}}]}}]} as unknown as DocumentNode<HealthsQuery, HealthsQueryVariables>;
export const GetOrganizationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DomainFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Domain"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"subGroupCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Organization"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DomainFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}}]}}]}}]} as unknown as DocumentNode<GetOrganizationsQuery, GetOrganizationsQueryVariables>;
export const GetOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationFragment"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DomainFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Domain"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"subGroupCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Organization"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DomainFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]} as unknown as DocumentNode<GetOrganizationQuery, GetOrganizationQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;