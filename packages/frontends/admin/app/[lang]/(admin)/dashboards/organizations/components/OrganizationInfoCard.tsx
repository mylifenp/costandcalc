'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client/react';
import Link from 'next/link';

import { GetOrganizationsDocument } from '@/graphql/generated/types.generated';

export const OrganizationInfoCard = () => {
  const { data, loading, error } = useQuery(
    GetOrganizationsDocument,
    { fetchPolicy: 'cache-and-network' },
  );

  const [search, setSearch] = useState('');

  const organizations = data?.organizations ?? [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return organizations;

    return organizations.filter((org) => {
      const name = (org.name ?? '').toLowerCase();
      const alias = (org.alias ?? '').toLowerCase();
      const description = (org.description ?? '').toLowerCase();
      const domains = (org.domains ?? []).map(d => d.name.toLowerCase()).join(' ');

      return (
        name.includes(q) ||
        alias.includes(q) ||
        description.includes(q) ||
        domains.includes(q)
      );
    });
  }, [search, organizations]);

  if (loading) return <div className="mt-6 text-center">Loading...</div>;
  if (error) return <div className="mt-6 text-center">Error: {error.message}</div>;

  return (
    <div className="mt-6 flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="card bg-base-100 w-full shadow">
          <div className="card-body">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-medium">Organizations</h2>

              <div className="w-full max-w-xs">
                <label className="input input-sm flex items-center">
                  <span className="iconify lucide--search text-base-content/80 size-3.5" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search organizations"
                    aria-label="Search organizations"
                    className="ml-2 w-full bg-transparent focus:outline-none"
                  />
                </label>
              </div>
            </div>

            <div className="mt-4">
              {filtered && filtered.length > 0 ? (
                <div className="flex flex-col divide-y divide-base-200">
                  {filtered.map((organization) => (
                    <div key={organization.id} className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-lg font-medium truncate ${organization.enabled ? 'text-primary' : 'text-base-content/60'}`}>
                            {organization.name}
                          </h3>
                          <p className="text-sm text-base-content/70 truncate">{organization.alias}</p>
                          {organization.description && (
                            <p className="text-sm text-base-content/60 mt-1 truncate">{organization.description}</p>
                          )}

                          <div className="mt-2 flex flex-wrap gap-2">
                            {organization?.domains?.map((domain) => (
                              <span key={domain.name} className="badge badge-primary">{domain.name}</span>
                            ))}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {organization?.groups?.map((group) => (
                              <span key={group.name} className="badge badge-primary">{group.name}</span>
                            ))}
                          </div>
                        </div>

                        <div className="shrink-0">
                          <Link
                            href={`/dashboards/organizations/${encodeURIComponent(organization.id)}`}
                            className="btn btn-primary btn-sm"
                          >
                            Enter
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-base-content/60">No organizations found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
