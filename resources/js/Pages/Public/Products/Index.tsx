import Guest from "@/Layouts/GuestLayout"
import { Head, Link, router } from '@inertiajs/react';
import { Pagination, Select, Input } from "antd"
import ProductGrid from "@/Pages/Public/Products/Components/ProductGrid"
import FilterSidebar from "@/Pages/Public/Products/Components/FilterSidebar"
import { Product } from '@/Pages/Admin/Products/Core/_models';

type Props = {
    products: {
        data: Product[]
        current_page: number
        last_page: number
        per_page: number
        total: number

    }
    filters: Record<string, any>
    categories: { id: string; name: string }[]
    brands: { id: string; name: string }[]
}

export default function Index({ products, filters, categories, brands }: Props) {
    const handleSortChange = (val: string) => {
        router.get(
            route("products.index"),
            { ...filters, sort: val },
            { preserveState: true, replace: true }
        )
    }

    const handlePageChange = (page: number) => {
        router.get(
            route("products.index"),
            { ...filters, page },
            { preserveState: true, replace: true }
        )
    }

    return (
        <Guest>
            <Head title="Products" />
            <main className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-4 md:mb-0">
                        All Products
                    </h1>
                    <Select
                        placeholder="Sort By"
                        value={filters.sort || undefined}
                        onChange={handleSortChange}
                        style={{ width: 200 }}
                    >
                        <Select.Option value="featured">Featured</Select.Option>
                        <Select.Option value="price-asc">Price: Low → High</Select.Option>
                        <Select.Option value="price-desc">Price: High → Low</Select.Option>
                    </Select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
                    {/* Filters Sidebar */}
                    <FilterSidebar
                        category="all"
                        filters={filters}
                        availableBrands={brands}
                    />

                    {/* Products Grid */}
                    <div className="flex flex-col gap-8">
                        <ProductGrid products={products} categorySlug="all" filters={filters} />
                        <div className="flex justify-center">
                            <Pagination
                                current={products.current_page}
                                total={products.total}
                                pageSize={products.per_page}
                                onChange={handlePageChange}
                                showSizeChanger={false}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </Guest>
    )
}
