import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import { Product } from '@/Pages/Admin/Products/Core/_models';


interface Props {
    product:Product
}
function ProductCard({ product }:Props) {
    return (
        <Card key={product.id} className="overflow-hidden" onClick={()=>router.visit(`/products/${product.slug}`)}>
            <div className="relative h-52 w-full">
                <img
                    src={
                        product.images && product.images.length > 0 && product.images[0].path.length > 0
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
    );
}

export default ProductCard;
