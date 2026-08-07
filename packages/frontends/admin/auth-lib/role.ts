import { ROLE } from "@/utils/enums/role";
import { AuthenticatedSessionLike, hasActiveSession } from "./auth-session";

const ROLE_PRIORITY = [ROLE.ADMIN, ROLE.DEALER, ROLE.USER] as const;

export const getRole = (
  roles: readonly string[] | undefined,
  organizations: readonly string[] | undefined,
  organizationName = process.env.ORGANIZATION_NAME || "Administrators",
): ROLE | undefined => {
  if (!organizationName || !roles?.length || !organizations?.length) {
    return undefined;
  }

  const organizationSet = new Set(organizations);
  if (!organizationSet.has(organizationName)) {
    return undefined;
  }

  const roleSet = new Set(roles);
  return ROLE_PRIORITY.find((role) => roleSet.has(role));
};

export const getSessionRole = (
  session: AuthenticatedSessionLike,
): ROLE | undefined => {
  if (!hasActiveSession(session)) {
    return undefined;
  }
  return session.user.role;
};
