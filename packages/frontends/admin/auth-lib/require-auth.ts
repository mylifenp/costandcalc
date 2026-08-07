import { redirect } from "next/navigation";

import { hasActiveSession } from "@/auth-lib/auth-session";
import { auth } from "@/auth-lib/auth";

export const requireAuth = async () => {
  const session = await auth();

  if (!hasActiveSession(session)) {
    redirect("/auth/login?callbackUrl=/dashboards/ecommerce");
  }

  return session;
};
