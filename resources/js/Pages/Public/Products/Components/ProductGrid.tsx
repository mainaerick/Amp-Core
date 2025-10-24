import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Link, router } from "@inertiajs/react"
import { Pagination } from "antd"
import { Product } from '@/Pages/Admin/Products/Core/_models';
import ProductCard from '@/Pages/Public/Products/Components/ProductCard';



interface ProductGridProps {
    products: {
        data: Product[]
        current_page: number
        last_page: number
        per_page: number
        total: number

    }
    categorySlug?: string
    filters?: Record<string, any>
}

export default function ProductGrid({ products, categorySlug, filters = {} }: ProductGridProps) {
    if (products.data.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
            </div>
        )
    }

    console.log(products)


    return (
        <div className="flex flex-col gap-8">
            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.data.map((product) => (
                    <ProductCard product={product}/>
                ))}
            </div>


        </div>
    )
}
