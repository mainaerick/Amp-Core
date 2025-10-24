import ProductCard from '@/Pages/Public/Products/Components/ProductCard';

type Props = { products: any[] }

export default function FeaturedProducts({ products }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard product={product}/>
            ))}
        </div>
    )
}
