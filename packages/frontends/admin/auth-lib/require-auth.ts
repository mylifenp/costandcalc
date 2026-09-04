import { redirect } from "next/navigation";

import { hasActiveSession } from "@/auth-lib/auth-session";
import { auth } from "@/auth-lib/auth";

export const requireAuth = async (callbackUrl = "/dashboards/ecommerce") => {
  const session = await auth();

  if (!hasActiveSession(session)) {
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return session;
};
