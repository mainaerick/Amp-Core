import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Link, router } from "@inertiajs/react"
import { Pagination } from "antd"
import { Product } from '@/Pages/Admin/Products/Core/_models';



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
                    <Card key={product.id} className="overflow-hidden">
                        <div className="relative h-52 w-full">
                            <img
                                src={
                                    product.images && product.images.length > 0
                                        ? `/storage/${product.images[0].path}`
                                        : "/placeholder.svg"
                                }
                                alt={product.name}
                                className="object-cover w-full h-full transition-transform hover:scale-105"
                            />
                            {product.is_new && <Badge className="absolute top-2 right-2">New</Badge>}
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.short_description}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Button asChild variant="outline" className="w-full">
                                <Link href={`/products/${product.slug}`}>More Info</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>


        </div>
    )
}
