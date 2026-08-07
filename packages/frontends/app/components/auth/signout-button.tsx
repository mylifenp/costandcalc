import { signOut } from '@/auth-lib/auth';

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        console.log("SIGNOUT")
        await signOut({
          redirectTo: '/'
        });
      }}
    >
      <button type='submit'>Sign Out</button>
    </form>
  );
}
