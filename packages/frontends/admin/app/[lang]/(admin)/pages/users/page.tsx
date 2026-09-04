import { PageTitle } from "@/components/PageTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users"
}

const UsersPage = () => {
  return (
    <div>
      <PageTitle
        title="Users Overview"
        items={[{ label: 'Dashboards' }, { label: 'Organizations', active: true }]}
      />
    </div>
  );
}

export default UsersPage;
