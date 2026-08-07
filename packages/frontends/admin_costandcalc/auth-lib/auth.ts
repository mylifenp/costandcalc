import NextAuth, { DefaultSession, Profile } from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';
import { AuthRefreshError, REFRESH_TOKEN_ERROR } from './auth-session';
import { JWT } from 'next-auth/jwt';
import { getRole } from './role';
import { ROLE } from '@/utils/enums/role';



async function refreshTokens(token: JWT): Promise<JWT> {
  if (!token.refreshToken) {
    return {
      ...token,
      accessToken: undefined,
      idToken: undefined,
      refreshToken: undefined,
      expires_at: undefined,
      expires: undefined,
      error: REFRESH_TOKEN_ERROR,
    };
  }

  try {
    const url = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: (token.refreshToken as string) || "",
        client_id: process.env.KEYCLOAK_CLIENT_ID!,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
        scope: process.env.KEYCLOAK_SCOPE || "openid email roles organization",
      }),
    });
    const refreshedTokens = await response.json();
    if (!response.ok) {
      throw refreshedTokens;
    }
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      idToken: refreshedTokens.id_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      expires: new Date(
        Date.now() +
          (!refreshedTokens.expires_in ? 0 : refreshedTokens.expires_in * 1000),
      ),
      expires_at:
        Date.now() +
        (!refreshedTokens.expires_in ? 0 : refreshedTokens.expires_in * 1000),
      error: undefined,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      accessToken: undefined,
      idToken: undefined,
      refreshToken: undefined,
      expires_at: undefined,
      expires: undefined,
      error: REFRESH_TOKEN_ERROR,
    };
  }
}

const nextAuth = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
  providers: [
    Keycloak({
      id: 'keycloak',
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
      authorization: {
        params: {
          scope: process.env.KEYCLOAK_SCOPE ?? 'openid email roles organization',
        },
      },
    }),
  ],
  basePath: "/auth",
  pages: {
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === '/middleware-example') return !!auth;
      return true;
    },
    jwt({ token, trigger, session, account, profile }) {
      if (trigger === 'update') token.name = session.user.name;
      if (profile) {
        const p: Profile = profile;
        if (p.roles) token.roles = p.roles as string[];
        if (p.organizations) token.organizations = p.organizations as string[];
      }
      if (account && account.provider === "keycloak") {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
        token.error = undefined;
        token.expires_at =
          Date.now() +
          (!account.expires_in ? 0 : Number(account.expires_in) * 1000);
        token.expires = new Date(token.expires_at as number);
        if (account.id_token) {
          const payload = JSON.parse(
            Buffer.from(account.id_token.split(".")[1], "base64").toString(),
          );
          token.locale = payload.locale;
        }

        return token;
      }

      if (token.error === REFRESH_TOKEN_ERROR) {
        return token;
      }

      if (!token.expires_at || (typeof token.expires_at === 'number' && Date.now() < token.expires_at)) {
        return token;
      }

      return refreshTokens(token);
    },
    async session({ session, token }) {
      // if (token?.accessToken) session.accessToken = token.accessToken;

      // return session;
      const user = session.user ?? {};

      return {
        ...session,
        accessToken: token.accessToken,
        idToken: token.idToken,
        refreshToken: token.refreshToken,
        expires_at: token.expires_at,
        expires: token.expires,
        locale: token.locale as string | undefined,
        error: token.error,
        user: {
          ...user,
          role: getRole(token.roles, token.organizations),
        },
      };
    },
  },
  experimental: { enableWebAuthn: true },
  secret: process.env.ADMIN_AUTH_SECRET ?? process.env.NEXTADMIN_AUTH_SECRET,
});

type AuthMiddleware = typeof nextAuth["auth"];

export const { handlers, signIn, signOut } = nextAuth;
export const auth: AuthMiddleware = nextAuth.auth;

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    idToken?: string;
    expires_at?: number;
    expires?: Date;
    refreshToken?: string;
    locale?: string;
    error?: AuthRefreshError;
    user: {
      role?: ROLE;
    } & DefaultSession["user"];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    expires_at?: number;
    expires?: Date;
    refreshToken?: string;
    locale?: string;
    error?: AuthRefreshError;
    role?: ROLE;
    roles?: string[];
    organizations?: string[];
  }
}
