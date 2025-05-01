import { getFeaturedProducts } from '@/Pages/Public/Home/lib/products.ts';
import { Badge, Card } from 'antd';
import ProductCard from '@/Components/ProductCard';


export default function FeaturedProducts() {
    const featuredProducts = getFeaturedProducts(4)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
                <ProductCard product={product}/>
            ))}
        </div>
    )
}
