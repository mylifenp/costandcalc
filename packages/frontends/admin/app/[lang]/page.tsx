import type { Metadata } from 'next';
import Link from 'next/link';

import { auth } from '@/auth-lib/auth';
import { hasActiveSession } from '@/auth-lib/auth-session';
import { Topbar } from '@/components/admin-layout/Topbar';

import { getDictionary } from './dictionaries';

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return { title: dict.landing.metaTitle };
}

export default async function LandingPage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const session = await auth();
  const authenticated = hasActiveSession(session);

  const dashboardHref = `/${lang}/dashboards/ecommerce`;
  const loginHref = `/auth/login?callbackUrl=${encodeURIComponent(dashboardHref)}`;

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar
        publicMode
        loginHref={loginHref}
        dashboardHref={dashboardHref}
        loginLabel={dict.landing.login}
        dashboardLabel={dict.landing.openDashboard}
      />

      <main className="flex grow items-center justify-center px-4">
        <div className="hero py-16 sm:py-24">
          <div className="hero-content text-center">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold sm:text-5xl">{dict.landing.welcomeTitle}</h1>
              <p className="text-base-content/70 py-6 sm:text-lg">{dict.landing.welcomeSubtitle}</p>
              <Link href={authenticated ? dashboardHref : loginHref} className="btn btn-primary">
                {authenticated ? dict.landing.openDashboard : dict.landing.login}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
