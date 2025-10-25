import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { Product } from "@/Pages/Admin/Products/Core/_models";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    // Extract main image safely
    const mainImage =
        product.images && product.images.length > 0 && product.images[0].path.length > 0 ? `/storage/${product.images[0].path}` : "/placeholder.svg"

    // Derived display values
    const hasSale = product.sale_price && product.sale_price < product.price!;
    const priceDisplay = hasSale ? product.sale_price : product.price;
    const stockLabel =
        product.stock_status === "in-stock"
            ? "In Stock"
            : product.stock_status === "out-of-stock"
                ? "Out of Stock"
                : "On Backorder";

    const stockColor =
        product.stock_status === "in-stock"
            ? "bg-green-100 text-green-700"
            : product.stock_status === "on-backorder"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700";

    return (
        <Card
            key={product.id}
            onClick={() => router.visit(`/products/${product.slug}`)}
            className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg"
        >
            {/* ---------- Image Section ---------- */}
            <div className="relative h-52 w-full overflow-hidden">
                <img
                    src={mainImage}
                    alt={product.name}
                    loading="lazy"
                    className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
                />

                {/* Dynamic badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {/*{product.is_new && <Badge>New</Badge>}*/}
                    {/*{product.is_featured && <Badge variant="secondary">Featured</Badge>}*/}
                </div>

                <Badge className={`absolute bottom-2 right-2 ${stockColor}`}>
                    {stockLabel}
                </Badge>
            </div>

            {/* ---------- Content ---------- */}
            <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.short_description}
                </p>

                {/* Pricing section */}
                {priceDisplay ? (
                    <div className="mt-2">
            <span className="text-lg font-semibold text-primary">
              KSH{Number(priceDisplay).toFixed(2)}
            </span>
                        {hasSale && (
                            <span className="ml-2 text-sm text-muted-foreground line-through">
                KSH{Number(product.price).toFixed(2)}
              </span>
                        )}
                    </div>
                ) : (
                    <span className="text-sm text-gray-500 italic">Price on request</span>
                )}
            </CardContent>

            {/* ---------- Footer ---------- */}
            <CardFooter className="p-4 pt-0">
                <Button asChild variant="outline" className="w-full">
                    <Link href={`/products/${product.slug}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
