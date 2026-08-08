import { query } from "@/graphql/client";
import { HealthsDocument } from "@/graphql/generated/types.generated";

export const dynamic = "force-dynamic";

export default async function Page() {
  let data;

  try {
    ({ data } = await query({ query: HealthsDocument }));
  } catch (error) {
    console.error('Health check request failed', error);

    return (
      <div>
        <h1>Healths</h1>
        <p>Health checks are currently unavailable.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Healths</h1>
      {data && Object.entries(data).map(([key, value]) => (
        <div className="flex items-center justify-center gap-2" key={key}>
          <h3>{key}</h3>
          <p>{value.apiStatus}</p>
        </div>
      ))}
    </div>
  );
}
