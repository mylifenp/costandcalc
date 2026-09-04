import { Metadata } from 'next';
import { PageTitle } from '@/components/PageTitle';
import { OrganizationInfoCard } from './components/OrganizationInfoCard';
import { AddOrganization } from './components/AddOrganization';

export const metadata: Metadata = {
  title: 'Dashboard - Organizations',
};

const OrganizationDashboardPage = () => {


  return (
    <div>
      <PageTitle
        title="Organizations Overview"
        items={[{ label: 'Dashboards' }, { label: 'Organizations', active: true }]}
      />
      <AddOrganization />
      <OrganizationInfoCard />
    </div>
  );
};

export default OrganizationDashboardPage;
