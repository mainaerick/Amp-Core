import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { getCategoryBySlug, getAllCategories } from "@/lib/categories"
import { getProductsByCategory } from "@/lib/products"


interface CategoryPageProps {
    params: {
        category: string
    }
    searchParams: {
        sort?: string
        [key: string]: string | string[] | undefined
    }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const category = getCategoryBySlug(params.category)

    if (!category) {
        return {
            title: "Category Not Found | SoundWave Audio",
        }
    }

    return {
        title: `${category.name} | SoundWave Audio`,
        description: `Browse our collection of premium ${category.name.toLowerCase()} for exceptional audio performance.`,
    }
}

export async function generateStaticParams() {
    const categories = getAllCategories()

    return categories.map((category) => ({
        category: category.slug,
    }))
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const category = getCategoryBySlug(params.category)

    if (!category) {
        notFound()
    }

    const sortOption = searchParams.sort || "featured"
    const products = getProductsByCategory(category.slug, sortOption)

    return (
        <main className="container py-8 md:py-12">
            <div className="flex items-center text-sm mb-6">
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
                <span className="font-medium">{category.name}</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-4 md:mb-0">{category.name}</h1>
                <ProductSort currentSort={sortOption} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                <FilterSidebar category={category.slug} />
                <ProductGrid products={products} />
            </div>
        </main>
    )
}
