import { type Metadata } from 'next';

import { PageTitle } from '@/components/PageTitle';
import { query } from '@/graphql/client';
import { HealthsDocument } from '@/graphql/generated/types.generated';

import { CustomerAcquisitionCard } from './components/CustomerAcquisitionCard';
import { GlobalSaleCard } from './components/GlobalSaleCard';
import { QuickChatCard } from './components/QuickChatCard';
import { RecentOrderCard } from './components/RecentOrderCard';
import { RevenueStatisticCard } from './components/RevenueStatisticCard';
import { StatList } from './components/StatList';

export const metadata: Metadata = {
  title: 'Dashboard - Ecommerce',
};

export const dynamic = 'force-dynamic';

const EcommerceDashboardPage = async () => {
  let data;

  try {
    ({ data } = await query({ query: HealthsDocument }));
  } catch (error) {
    console.error('Health check request failed', error);
  }

  return (
    <>
      <PageTitle title="Business Overview" items={[{ label: 'Dashboards' }, { label: 'Ecommerce', active: true }]} />
      <div className="mt-6">
        {data && Object.entries(data).map(([key, value]) => (
          <div className="flex items-center justify-center gap-2" key={key}>
            <h3>{key}</h3>
            <p>{value.apiStatus}</p>
          </div>
        ))}
        <StatList />
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <RevenueStatisticCard />
          </div>
          <div className="xl:col-span-5">
            <CustomerAcquisitionCard />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-5 2xl:grid-cols-12">
          <div className="xl:col-span-3 2xl:col-span-5">
            <RecentOrderCard />
          </div>
          <div className="xl:col-span-2 2xl:col-span-3">
            <QuickChatCard />
          </div>
          <div className="xl:col-span-3 2xl:col-span-4">
            <GlobalSaleCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default EcommerceDashboardPage;
