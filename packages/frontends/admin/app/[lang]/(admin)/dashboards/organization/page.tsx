import { Metadata } from 'next';
import { PageTitle } from '@/components/PageTitle';
import { OrganizationInfoCard } from './components/OrganizationInfoCard';

export const metadata: Metadata = {
  title: 'Dashboard - Organization',
};

const OrganizationDashboardPage = () => {

  return (
    <div>
      <PageTitle
        title="Organization Overview"
        items={[{ label: 'Dashboards' }, { label: 'Organization', active: true }]}
      />
      <OrganizationInfoCard />
    </div>
  );
};

export default OrganizationDashboardPage;
