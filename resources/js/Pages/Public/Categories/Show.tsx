import React from "react"
import { Link, router } from "@inertiajs/react"
import { ChevronRight } from "lucide-react"
import Guest from "@/Layouts/GuestLayout"
import ProductSort from "@/Pages/Public/Products/Components/ProductSort"
import FilterSidebar from "@/Pages/Public/Products/Components/FilterSidebar"
import ProductGrid from "@/Pages/Public/Products/Components/ProductGrid"
import { Product } from '@/Pages/Admin/Products/Core/_models';
import { Pagination } from 'antd';

type Props = {
    category: Category
    products: {
        data: Product[]
        current_page: number
        last_page: number
        per_page: number
        total: number
    },availableBrands:any[]
    filters: Record<string, any>
}

export default function Show({ category, products, availableBrands,filters }: Props) {
    const handleSortChange = (sort: string) => {
        router.get(route("categories.show", category.slug), { ...filters, sort }, { preserveState: true })
    }
    const handlePageChange = (page: number) => {
        router.get(
            route("categories.show", category.slug),
            { ...filters, page },
            { preserveState: true, replace: true }
        )
    }
    return (
        <Guest>
            <main className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
                {/* Breadcrumbs */}
                <div className="flex items-center text-sm mb-6">
                    <Link href="/" className="text-muted-foreground hover:text-foreground">
                        Home
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
                    <span className="font-medium">{category.name}</span>
                </div>

                {/* Heading + Sort */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <h1 className="text-3xl font-bold">{category.name}</h1>
                    <ProductSort value={filters.sort} onChange={handleSortChange} />
                </div>

                {/* Filters + Product Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    <FilterSidebar category={category.slug} filters={filters} availableBrands={availableBrands} />

                    <div className="flex flex-col gap-8">
                    <ProductGrid products={products} categorySlug={category.slug} filters={filters} />
                    {/* Pagination */}
                    <div className="flex justify-center">
                        <Pagination
                            current={products.current_page}
                            total={products.total}
                            pageSize={products.per_page}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                        />
                    </div></div>
                </div>
            </main>
        </Guest>
    )
}
