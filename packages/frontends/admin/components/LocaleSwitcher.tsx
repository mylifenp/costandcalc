"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { localeNames, locales } from "@/i18n";

// Switches the locale prefix of the current path, e.g.
// /en-US/apps/ecommerce/products -> /de-DE/apps/ecommerce/products
export const LocaleSwitcher = () => {
    const pathname = usePathname();
    const [, currentLocale, ...rest] = pathname.split("/");
    const pathWithoutLocale = `/${rest.join("/")}`;

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
                <span className="iconify lucide--languages size-4" />
                {currentLocale}
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 border-base-300 rounded-box z-10 w-44 border p-2 shadow">
                {locales.map((locale) => (
                    <li key={locale}>
                        <Link href={`/${locale}${pathWithoutLocale}`} className={locale === currentLocale ? "active" : ""}>
                            {localeNames[locale]}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
