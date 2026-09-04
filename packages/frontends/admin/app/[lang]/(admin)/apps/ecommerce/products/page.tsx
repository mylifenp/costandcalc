import type { Metadata } from "next";

import { PageTitle } from "@/components/PageTitle";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

import { getDictionary } from "@/app/[lang]/dictionaries";

import { ProductTable } from "./ProductTable";

export const metadata: Metadata = {
    title: "Products - Ecommerce",
};

const EcommerceProducts = async ({ params }: PageProps<'/[lang]'>) => {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>
            <PageTitle
                title={dict.products.title}
                items={[{ label: dict.products.breadcrumbSection }, { label: dict.products.title, active: true }]}
                centerItem={<LocaleSwitcher />}
            />

            <div className="mt-6">
                <ProductTable />
            </div>
        </>
    );
};

export default EcommerceProducts;
