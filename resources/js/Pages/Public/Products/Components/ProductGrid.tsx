import Link from "next/link"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Product {
    id: number
    name: string
    slug: string
    category: string
    shortDescription: string
    image: string
    isNew?: boolean
}

interface ProductGridProps {
    products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                        <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                        />
                        {product.isNew && <Badge className="absolute top-2 right-2">New</Badge>}
                    </div>
                    <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.shortDescription}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <Button asChild variant="outline" className="w-full">
                            <Link href={`/products/${product.slug}`}>More Info</Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
