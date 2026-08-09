"use client";

import { HelloQuery, HelloQueryVariables } from "@/graphql/generated/types.generated";
import { HELLO } from "@/graphql/queries/hello";
import { useQuery } from "@apollo/client/react";
import { FC } from "react";

interface Props { }

export const User: FC<Props> = () => {
  const { data, loading, error } = useQuery<HelloQuery, HelloQueryVariables>(HELLO, {
    fetchPolicy: 'cache-first',
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <div>
      {data ? <div>{data.hello}</div>: <div>NO DATA</div>}
    </div>
  );
};
