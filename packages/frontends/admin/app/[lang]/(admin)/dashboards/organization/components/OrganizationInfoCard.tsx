'use client';

import { useQuery } from '@apollo/client/react';

import { GetOrganizationsQuery, GetOrganizationsQueryVariables } from '@/graphql/generated/types.generated';
import { GET_ORGANIZATIONS } from '@/graphql/queries';

export const OrganizationInfoCard = () => {
  const { data, loading, error } = useQuery<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GET_ORGANIZATIONS, {
    fetchPolicy: 'cache-and-network',
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex justify-between gap-2">
      {data?.organizations.map((organization) => {
        return (
          <div key={organization.id} className="card bg-base-100 w-full shadow-sm">
            <div className="card-body">
              <h2 className="card-title">
                {organization.name}({organization.alias})
              </h2>
              <p>{organization.description}</p>
              {organization?.domains.map((domain) => {
                return (
                  <div key={domain.name} className="badge badge-primary">
                    {domain.name}
                  </div>
                );
              })}
              <div className="card-actions justify-end">
                <span className="btn btn-primary">
                  <button className='btn btn-primary'>Enter</button>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
