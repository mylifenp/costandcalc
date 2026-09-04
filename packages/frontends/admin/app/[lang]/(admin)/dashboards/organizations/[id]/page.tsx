import { PageTitle } from '@/components/PageTitle';
import { query } from '@/graphql/client';
import { GetOrganizationDocument, GetOrganizationQuery } from '@/graphql/generated/types.generated';
import { Metadata } from 'next';
import MembersList from './components/MembersList';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Organization',
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const organizationId = decodeURIComponent(id);

  const { data } = await query<GetOrganizationQuery>({
    query: GetOrganizationDocument,
    variables: { id: organizationId }
  });

  const organization = data?.organization;

  return (
    <div>
      <PageTitle
        title="Organization"
        items={[{ label: 'Dashboards' }, { label: 'Organizations' }, { label: `${organizationId}`, active: true }]}
      />

      <MembersList
        organizationId={organizationId}
        organizationName={organization?.name ?? undefined}
        organizationAlias={organization?.alias ?? undefined}
        enabled={organization?.enabled}
        members={organization?.members ?? []}
      />
    </div>
  );
};
