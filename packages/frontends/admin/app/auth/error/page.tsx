'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const errorMessages: Record<string, { title: string; description: string }> = {
	AccessDenied: {
		title: 'Access denied',
		description: 'Your Keycloak account is not allowed to access this application.',
	},
	Configuration: {
		title: 'Authentication is unavailable',
		description: 'The authentication service is not configured correctly. Please contact support.',
	},
	OAuthAccountNotLinked: {
		title: 'Account is not linked',
		description: 'This Keycloak account is not linked to an existing application account.',
	},
	OAuthCallback: {
		title: 'Keycloak sign-in failed',
		description: 'Keycloak could not complete the authentication callback. Please try again.',
	},
	OAuthSignin: {
		title: 'Could not contact Keycloak',
		description: 'The sign-in request could not be started. Please try again.',
	},
	Verification: {
		title: 'Verification failed',
		description: 'The authentication verification could not be completed. Please try again.',
	},
};

export default function AuthError() {
	const searchParams = useSearchParams();
	const errorCode = searchParams.get('error') ?? 'Default';
	const error = errorMessages[errorCode] ?? {
		title: 'Authentication failed',
		description: 'We could not sign you in. Please try again.',
	};

	return (
		<main className="bg-base-200 flex min-h-screen items-center justify-center px-4">
			<section className="bg-base-100 rounded-box w-full max-w-md p-8 text-center shadow-sm">
				<div className="text-error bg-error/10 mx-auto flex size-14 items-center justify-center rounded-full">
					<span className="iconify lucide--shield-alert size-7" aria-hidden="true" />
				</div>
				<p className="text-base-content/50 mt-6 text-xs font-semibold tracking-widest uppercase">
					Authentication error
				</p>
				<h1 className="mt-2 text-2xl font-semibold">{error.title}</h1>
				<p className="text-base-content/60 mt-3 text-sm leading-6">{error.description}</p>
				<p className="text-base-content/40 mt-4 font-mono text-xs">Error code: {errorCode}</p>
				<Link className="btn btn-primary mt-6 w-full" href="/auth/login?callbackUrl=/dashboards/ecommerce">
					Try again
				</Link>
				<Link className="btn btn-ghost mt-2 w-full" href="/">
					Return home
				</Link>
			</section>
		</main>
	);
}