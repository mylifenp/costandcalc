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

export type AddBookInput = {
  author: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type AddOrganizationInput = {
  realm: Scalars['String']['input'];
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

export type Book = {
  __typename?: 'Book';
  author: Scalars['String']['output'];
  title: Scalars['String']['output'];
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

export type IdentityHealthStatus = {
  __typename?: 'IdentityHealthStatus';
  apiStatus: Scalars['String']['output'];
};

export type MediaHealthStatus = {
  __typename?: 'MediaHealthStatus';
  apiStatus: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook: Book;
  addUser: User;
  createOrganization: Organization;
};


export type MutationAddBookArgs = {
  input: AddBookInput;
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationCreateOrganizationArgs = {
  input: AddOrganizationInput;
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
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  adminHealth: AdminHealthStatus;
  assetsHealth: AssetsHealthStatus;
  billingHealth: BillingHealthStatus;
  book: Book;
  books: Array<Book>;
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
  id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  token: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type WorkHealthStatus = {
  __typename?: 'WorkHealthStatus';
  apiStatus: Scalars['String']['output'];
};

export type DomainFragmentFragment = { name: string, verified: boolean };

export type OrganizationFragmentFragment = { id: string, name: string, alias: string, enabled: boolean, description: string | null, domains: Array<{ name: string, verified: boolean }> };

export type HealthsQueryVariables = Exact<{ [key: string]: never; }>;


export type HealthsQuery = { adminHealth: { apiStatus: string, email: string }, assetsHealth: { apiStatus: string }, billingHealth: { apiStatus: string }, estimationHealth: { apiStatus: string }, identityHealth: { apiStatus: string }, mediaHealth: { apiStatus: string }, notificationHealth: { apiStatus: string }, workHealth: { apiStatus: string } };

export type GetOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationsQuery = { organizations: Array<{ id: string, name: string, alias: string, enabled: boolean, description: string | null, domains: Array<{ name: string, verified: boolean }> }> };

export type GetUserQueryVariables = Exact<{
  id: string | number;
}>;


export type GetUserQuery = { user: { id: string, username: string } };

export const DomainFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DomainFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Domain"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}}]} as unknown as DocumentNode<DomainFragmentFragment, unknown>;
export const OrganizationFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Organization"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DomainFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DomainFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Domain"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}}]} as unknown as DocumentNode<OrganizationFragmentFragment, unknown>;
export const HealthsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"healths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assetsHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"billingHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimationHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"identityHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notificationHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}}]}}]} as unknown as DocumentNode<HealthsQuery, HealthsQueryVariables>;
export const GetOrganizationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DomainFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Domain"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Organization"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DomainFragment"}}]}}]}}]} as unknown as DocumentNode<GetOrganizationsQuery, GetOrganizationsQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;