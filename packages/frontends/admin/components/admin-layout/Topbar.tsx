'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { isRefreshTokenError } from '@/auth-lib/auth-session';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';

import { TopbarLanguageMenu } from './TopbarLanguageMenu';
import { TopbarNotificationButton } from './TopbarNotificationButton';
import { TopbarProfileMenu } from './TopbarProfileMenu';
import { TopbarSearchButton } from './TopbarSearchButton';

type ITopbar = {
  /** Public variant for the landing page: brand on the left, and a
   *  login/dashboard button instead of the profile dropdown menu.
   *  No sidebar toggles (there is no sidebar on public pages). */
  publicMode?: boolean;
  loginHref?: string;
  dashboardHref?: string;
  loginLabel?: string;
  dashboardLabel?: string;
};

export const Topbar = ({
  publicMode = false,
  loginHref = '/auth/login',
  dashboardHref = '/',
  loginLabel = 'Login',
  dashboardLabel = 'Dashboard',
}: ITopbar) => {
  const { data: session, status } = useSession();

  const authenticated = !isRefreshTokenError(session?.error) && (Boolean(session) ?? status === 'authenticated');

  if (publicMode) {
    return (
      <div role="navigation" aria-label="Navbar" className="flex items-center justify-between px-3" id="layout-topbar">
        <div className="inline-flex items-center gap-3">
          <Link href="/" aria-label="Home" className="px-1 py-2 inline-flex">
            <Logo />
          </Link>
        </div>
        <div className="inline-flex items-center gap-0.5">
          <TopbarLanguageMenu />
          <ThemeToggle className="btn btn-sm btn-circle btn-ghost" />
          {authenticated ? (
            <Link href={dashboardHref} className="btn btn-primary btn-sm ms-1">
              {dashboardLabel}
            </Link>
          ) : (
            <Link href={loginHref} className="btn btn-primary btn-sm ms-1">
              {loginLabel}
            </Link>
          )}
        </div>
      </div>
    );
  }

  const onAuthenticated = (
    <div role="navigation" aria-label="Navbar" className="flex items-center justify-between px-3" id="layout-topbar">
      <div className="inline-flex items-center gap-3">
        <label
          className="btn btn-square btn-ghost btn-sm group-has-[[id=layout-sidebar-hover-trigger]:checked]/html:hidden"
          aria-label="Leftmenu toggle"
          htmlFor="layout-sidebar-toggle-trigger">
          <span className="iconify lucide--menu size-5" />
        </label>
        <label
          className="btn btn-square btn-ghost btn-sm hidden group-has-[[id=layout-sidebar-hover-trigger]:checked]/html:flex"
          aria-label="Leftmenu toggle"
          htmlFor="layout-sidebar-hover-trigger">
          <span className="iconify lucide--menu size-5" />
        </label>
        <TopbarSearchButton />
      </div>
      <div className="inline-flex items-center gap-0.5">
        <TopbarLanguageMenu />
        <ThemeToggle className="btn btn-sm btn-circle btn-ghost" />
        <label htmlFor="layout-rightbar-drawer" className="btn btn-circle btn-ghost btn-sm drawer-button">
          <span className="iconify lucide--settings-2 size-4.5" />
        </label>
        <TopbarNotificationButton />
        <TopbarProfileMenu />
      </div>
    </div>
  );

  const onSignIn = (
     <div role="navigation" aria-label="Navbar" className="flex items-center justify-between px-3" id="layout-topbar">
      <div className="inline-flex items-center gap-3">
      </div>
      <div className="inline-flex items-center gap-0.5">
        <TopbarProfileMenu />
      </div>
    </div>
  )

  return <>{ authenticated ? onAuthenticated : onSignIn}</>;
};
