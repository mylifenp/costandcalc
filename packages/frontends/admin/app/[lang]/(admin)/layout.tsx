import { type ReactNode } from "react";

import { Footer } from "@/components/admin-layout/Footer";
import { Rightbar } from "@/components/admin-layout/Rightbar";
import { Sidebar } from "@/components/admin-layout/Sidebar";
import { Topbar } from "@/components/admin-layout/Topbar";
import { ISidebarMenuItem } from "@/components/admin-layout/SidebarMenuItem";

import { adminMenuItems } from "./menu";
import { requireAuth } from "@/auth-lib/require-auth";

// Prefix internal menu urls with the active locale (e.g. /en-US/dashboards/ecommerce)
const localizeMenuItems = (items: ISidebarMenuItem[], lang: string): ISidebarMenuItem[] =>
    items.map((item) => ({
        ...item,
        url: item.url?.startsWith("/") ? `/${lang}${item.url}` : item.url,
        children: item.children ? localizeMenuItems(item.children, lang) : undefined,
    }));

const Layout = async ({ children, params }: { children: ReactNode } & LayoutProps<'/[lang]'>) => {
    const { lang } = await params;
    await requireAuth(`/${lang}/dashboards/ecommerce`)
    return (
        <div className="size-full">
            <div className="flex">
                <Sidebar menuItems={localizeMenuItems(adminMenuItems, lang)} />
                <div className="flex h-screen min-w-0 grow flex-col overflow-auto">
                    <Topbar />
                    <div id="layout-content">{children}</div>
                    <Footer />
                </div>
            </div>
            <Rightbar />
        </div>
    );
};

export default Layout;
