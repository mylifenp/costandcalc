'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Member } from '@/graphql/generated/types.generated';
import { ActivateOrganization } from './ActivateOrganization';
import { DeactivateOrganization } from './DeactivateOrganization';
import Link from 'next/link';

type Props = {
  members: Member[];
  organizationId: string;
  organizationName?: string | null;
  organizationAlias?: string | null;
  enabled?: boolean | null;
};

export default function MembersList({
  members,
  organizationId,
  organizationName,
  organizationAlias,
  enabled,
}: Props) {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;

    return members.filter((member) => {
      const fullName = [member.firstName, member.lastName].filter(Boolean).join(' ').toLowerCase();
      const username = (member.username ?? '').toLowerCase();
      const email = (member.email ?? '').toLowerCase();

      return (
        username.includes(q) ||
        email.includes(q) ||
        fullName.includes(q)
      );
    });
  }, [search, members]);

  return (
    <>
      <div className="mt-6 flex items-start justify-between gap-4">
        <div className="flex-1 flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            title="Go back"
            className="btn btn-ghost border-base-300 btn-sm btn-square"
          >
            <span className="iconify lucide--chevron-left size-4" />
          </button>

          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-3">
              <span>{organizationName ?? organizationId}</span>

              <span>
                {enabled ? (
                  <DeactivateOrganization id={organizationId} />
                ) : (
                  <ActivateOrganization id={organizationId} />
                )}
              </span>
            </h2>
            <p className="text-sm text-base-content/60">{organizationAlias ?? ''}</p>
          </div>
        </div>

        <div className="w-full max-w-xs">
          <label className="input input-sm flex items-center">
            <span className="iconify lucide--search text-base-content/80 size-3.5" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members"
              aria-label="Search members"
              className="ml-2 w-full bg-transparent focus:outline-none"
            />
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-6xl">
          {filtered && filtered.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filtered.map((member) => {
                const name = [member.firstName, member.lastName].filter(Boolean).join(' ') || member.username;
                const initials = ((member.firstName?.[0] ?? member.username?.[0] ?? '') + (member.lastName?.[0] ?? '')).toUpperCase();

                return (
                  <div key={member.id} className="card bg-base-100 shadow w-full">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-4 w-full">
                        <div className="avatar shrink-0">
                          <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center uppercase">
                            {initials}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{name}</h3>
                          <p className="text-sm text-base-content/70 truncate">{member.email}</p>
                        </div>

                        <div className="ml-4 flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            {member.enabled ? (
                              <span className="badge badge-success">Active</span>
                            ) : (
                              <span className="badge">Disabled</span>
                            )}

                            {member.emailVerified ? (
                              <span className="badge badge-primary">Verified</span>
                            ) : (
                              <span className="badge">Unverified</span>
                            )}
                          </div>
                          <Link className='btn btn-primary btn-sm' href={`/pages/users/${member.id}`}>View</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-base-content/60">
              {members && members.length > 0 ? 'No members match your search.' : 'No members found.'}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
