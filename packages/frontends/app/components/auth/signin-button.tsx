import { signIn } from '@/auth-lib/auth';

export function SignIn({ provider = 'keycloak', redirect='/' }: { provider: string, redirect: string }) {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(provider, { redirectTo: redirect });
      }}
    >
      <button type='submit'>Sign in</button>
    </form>
  );
}
