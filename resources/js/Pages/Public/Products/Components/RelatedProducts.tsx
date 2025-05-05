import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from '@inertiajs/react';

interface Product {
    id: number
    name: string
    slug: string
    category: string
    image: string
    isNew?: boolean
}

interface RelatedProductsProps {
    products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    return (
        <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                        <div className="relative h-48 w-full">
                            <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}

                                className="object-cover transition-transform hover:scale-105"
                            />
                            {product.isNew && <Badge className="absolute top-2 right-2">New</Badge>}
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Button asChild variant="outline" className="w-full">
                                <Link href={`/products/${product.slug}`}>View Details</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    )
}
