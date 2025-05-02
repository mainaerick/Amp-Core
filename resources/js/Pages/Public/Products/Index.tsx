import { ChevronRight } from "lucide-react"
import { getAllCategories, getCategoryBySlug } from '@/Pages/Public/lib/categories';
import { getProductsByCategory } from '@/Pages/Public/lib/products';
import { Link } from '@inertiajs/react';
import ProductSort from '@/Pages/Public/Products/Components/ProductSort';
import FilterSidebar from '@/Pages/Public/Products/Components/FilterSidebar';
import ProductGrid from '@/Pages/Public/Products/Components/ProductGrid';
import Guest from '@/Layouts/GuestLayout';

interface CategoryPageProps {
    params: {
        category: string
    }
    searchParams: {
        sort?: string
        [key: string]: string | string[] | undefined
    }
}

// export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
//     const category = getCategoryBySlug(params.category)
//
//     if (!category) {
//         return {
//             title: "Category Not Found | SoundWave Audio",
//         }
//     }
//
//     return {
//         title: `${category.name} | SoundWave Audio`,
//         description: `Browse our collection of premium ${category.name.toLowerCase()} for exceptional audio performance.`,
//     }
// }

export async function generateStaticParams() {
    const categories = getAllCategories()

    return categories.map((category) => ({
        category: category.slug,
    }))
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const category = getCategoryBySlug("speakers")

    // if (!category) {
    //     notFound()
    // }

    const sortOption =  "featured"
    const products = getProductsByCategory(category.slug, sortOption)

    return (
        <Guest>
            <main className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
                <div className="flex items-center text-sm mb-6">
                    <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
                    <span className="font-medium">{category.name}</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-4 md:mb-0">{category.name}</h1>
                    <ProductSort />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
                    <FilterSidebar  category={"speakers"}/>
                    <ProductGrid  products={products}/>
                </div>
            </main>
        </Guest>

    )
}
