'use client';

import { ActivateOrganizationDocument } from "@/graphql/generated/types.generated";
import { useMutation } from "@apollo/client/react";

interface Props {
  id: string;
}

export const ActivateOrganization = ({ id }: Props) => {
  const [activateOrganization, { loading }] = useMutation(ActivateOrganizationDocument, {
    variables: { id },
  });

  const handleActivateOrganization = async () => {
    try {
      await activateOrganization();
    } catch (e) {
      // error handled by Apollo; keep UI responsive
      console.error('Activate organization failed', e);
    }
  };

  return (
    <button
      className="btn btn-sm btn-primary"
      onClick={handleActivateOrganization}
      aria-label="Activate organization"
      title="Activate organization"
      disabled={loading}
    >
      Activate
    </button>
  );
};
