import { Session } from "next-auth";

export const REFRESH_TOKEN_ERROR = "RefreshTokenError" as const;

export type AuthRefreshError = typeof REFRESH_TOKEN_ERROR;

export type AuthenticatedSessionLike = Session | null | undefined;

export const hasActiveSession = (
  session: AuthenticatedSessionLike,
): session is Session & { accessToken: string } => {
  return (
    Boolean(session?.accessToken) && session?.error !== REFRESH_TOKEN_ERROR
  );
};

export const isRefreshTokenError = (error?: string) => {
  return error === REFRESH_TOKEN_ERROR;
};
