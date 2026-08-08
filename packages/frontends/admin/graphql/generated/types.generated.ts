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

export type NotificationHealthStatus = {
  __typename?: 'NotificationHealthStatus';
  apiStatus: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  adminHealth: AdminHealthStatus;
  assetsHealth: AssetsHealthStatus;
  billingHealth: BillingHealthStatus;
  estimationHealth: EstimationHealthStatus;
  hello: Scalars['String']['output'];
  identityHealth: IdentityHealthStatus;
  mediaHealth: MediaHealthStatus;
  notificationHealth: NotificationHealthStatus;
  user: User;
  workHealth: WorkHealthStatus;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type WorkHealthStatus = {
  __typename?: 'WorkHealthStatus';
  apiStatus: Scalars['String']['output'];
};

export type HealthsQueryVariables = Exact<{ [key: string]: never; }>;


export type HealthsQuery = { adminHealth: { apiStatus: string, email: string }, assetsHealth: { apiStatus: string }, billingHealth: { apiStatus: string }, estimationHealth: { apiStatus: string }, identityHealth: { apiStatus: string }, mediaHealth: { apiStatus: string }, notificationHealth: { apiStatus: string }, workHealth: { apiStatus: string } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { hello: string };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { user: { id: string, name: string } };


export const HealthsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"healths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assetsHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"billingHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimationHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"identityHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notificationHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workHealth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiStatus"}}]}}]}}]} as unknown as DocumentNode<HealthsQuery, HealthsQueryVariables>;
export const HelloDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Hello"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hello"}}]}}]} as unknown as DocumentNode<HelloQuery, HelloQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;