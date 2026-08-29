import { PageTitle } from "@/components/PageTitle";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Users"
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const userId = decodeURIComponent(id);
  return (
    <div>
      <PageTitle
        title="User"
        items={[{ label: 'Dashboards' }, { label: 'Users' }, { label: `${userId}`, active: true }]}
      />
      <div>{userId}</div>
    </div>
  );
}
