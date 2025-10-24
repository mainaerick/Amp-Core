import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from '@inertiajs/react';
import { Product } from '@/Pages/Admin/Products/Core/_models';
import ProductCard from '@/Pages/Public/Products/Components/ProductCard';



interface RelatedProductsProps {
    products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    return (
        <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard product={product}/>
                ))}
            </div>
        </section>
    )
}
