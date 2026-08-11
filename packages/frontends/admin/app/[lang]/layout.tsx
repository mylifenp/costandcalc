import { type ReactNode } from "react";

import { locales } from "@/i18n";

// Pre-render the supported locales (/en-US/..., /de-DE/...)
export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({ children }: { children: ReactNode }) {
    return children;
}
