
import { type Metadata } from "next";
import { headers } from "next/headers";
import { type ReactNode } from "react";
import { Provider } from './provider';
// import "../styles/app.css";
import "@/styles/app.css";

import { auth } from "@/auth-lib/auth";
import { defaultLocale, isLocale } from "@/i18n";

export const metadata: Metadata = {
    title: {
        template: "%s - Nexus",
        default: "",
    },
    description: "Modern admin and client dashboards built with DaisyUI. Clean, responsive, and fully customizable.",
    icons: {
        icon: [
            {
                url: "/images/favicon-light.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/images/favicon-dark.png",
                media: "(prefers-color-scheme: dark)",
            },
        ],
    },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  // Set by proxy.ts for locale-prefixed routes; falls back to the default
  // locale for non-localized routes (/auth/*, /api/*, ...).
  const headerLocale = (await headers()).get("x-locale");
  const lang = headerLocale && isLocale(headerLocale) ? headerLocale : defaultLocale;
    return (
        <html lang={lang} suppressHydrationWarning data-scroll-behavior="smooth" className="group/html">
            <head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script type="text/javascript" src="/js/prefetch-config.js"></script>
            </head>
            <body>
                <Provider session={session}>{children}</Provider>
            </body>
        </html>
    );
}
