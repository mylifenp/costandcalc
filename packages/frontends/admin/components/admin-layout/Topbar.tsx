'use client';
import { useSession } from 'next-auth/react';

import { isRefreshTokenError } from '@/auth-lib/auth-session';
import { ThemeToggle } from '@/components/ThemeToggle';

import { TopbarLanguageMenu } from './TopbarLanguageMenu';
import { TopbarNotificationButton } from './TopbarNotificationButton';
import { TopbarProfileMenu } from './TopbarProfileMenu';
import { TopbarSearchButton } from './TopbarSearchButton';

export const Topbar = () => {
  const { data: session, status } = useSession();

  const authenticated = !isRefreshTokenError(session?.error) && (Boolean(session) ?? status === 'authenticated');

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
