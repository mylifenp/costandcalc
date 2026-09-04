"use client";

// import { HelloQuery, HelloQueryVariables } from "@/graphql/generated/types.generated";
// import { GetUserQuery, GetUserQueryVariables } from "@/graphql/generated/types.generated";
// import { HELLO } from "@/graphql/queries/hello";
// import { GET_USER } from "@/graphql/queries/user";
// import { useQuery } from "@apollo/client/react";
import { FC } from "react";

interface Props { }

export const User: FC<Props> = () => {
  // const { data, loading, error } = useQuery<HelloQuery, HelloQueryVariables>(HELLO, {
  //   fetchPolicy: 'cache-first',
  // });

  // console.log("DATA", data, { loading, error });
  return (
    <div>
      {/*{data ? <div>{data.hello}</div>: <div>NO DATA</div>}*/}
    </div>
  );
};
