import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';

import { defaultLocale, isLocale, locales } from '@/i18n';

// Pick the best supported locale from the request's Accept-Language header.
function getLocale(request: NextRequest): string {
  const headers = {
    'accept-language': request.headers.get('accept-language') ?? defaultLocale,
  };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, [...locales], defaultLocale);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const locale = pathname.split('/')[1];
  if (isLocale(locale)) {
    // Pass the active locale to the root layout (html lang attribute)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', locale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Redirect if there is no locale in the pathname
  // e.g. incoming request is /products -> /en-US/products
  const detectedLocale = getLocale(request);
  request.nextUrl.pathname = `/${detectedLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal paths, API routes, auth routes (Auth.js basePath),
    // health checks, and files (public assets like /images, /js, favicon.ico)
    '/((?!api|auth|healths|_next|.*\\..*).*)',
  ],
};
