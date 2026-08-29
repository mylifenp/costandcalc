'use client';

import { DeactivateOrganizationDocument } from "@/graphql/generated/types.generated";
import { useMutation } from "@apollo/client/react";

interface Props {
  id: string;
}

export const DeactivateOrganization = ({ id }: Props) => {
  const [deactivateOrganization, { loading }] = useMutation(DeactivateOrganizationDocument, {
    variables: { id },
  });

  const handleDeactivateOrganization = async () => {
    try {
      await deactivateOrganization();
    } catch (e) {
      console.error('Deactivate organization failed', e);
    }
  };

  return (
    <button
      className="btn btn-sm btn-error"
      onClick={handleDeactivateOrganization}
      aria-label="Deactivate organization"
      title="Deactivate organization"
      disabled={loading}
    >
      Deactivate
    </button>
  );
};
