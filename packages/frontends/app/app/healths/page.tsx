import { query } from "@/graphql/client";
import { HealthsDocument } from "@/graphql/generated/types.generated";

export default async function Page() {
  const { data } = await query({ query: HealthsDocument });
  return (
    <div>
      <h1>Healths</h1>
      {Object.entries(data).map(([key, value]) => (
        <div className="flex items-center justify-center gap-2" key={key}>
          <h3>{key}</h3>
          <p>{value.apiStatus}</p>
        </div>
      ))}
    </div>
  );
}
