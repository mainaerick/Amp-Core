import { ChevronRight } from "lucide-react"
import { getProductBySlug, getRelatedProducts } from '@/Pages/Public/lib/products';
import { getCategoryBySlug } from '@/Pages/Public/lib/categories';
import { Link } from '@inertiajs/react';
import RelatedProducts from '@/Pages/Public/Products/Components/RelatedProducts';
import ProductDemo from '@/Pages/Public/Products/Components/ProductDemo';
import ProductSpecs from '@/Pages/Public/Products/Components/ProductSpecs';
import WhereToBuy from '@/Pages/Public/Products/Components/WhereToBuy';
import ProductGallery from '@/Pages/Public/Products/Components/ProductGallery';
import ProductFeatures from '@/Pages/Public/Products/Components/ProductFeatures';
import ProductDescription from '@/Pages/Public/Products/Components/ProductDescription';
import Guest from '@/Layouts/GuestLayout';


interface ProductPageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<any> {
    const product = getProductBySlug(params.slug)

    if (!product) {
        return {
            title: "Product Not Found | SoundWave Audio",
        }
    }

    return {
        title: `${product.name} | SoundWave Audio`,
        description: product.shortDescription,
    }
}

export default function ProductPage({ params }: ProductPageProps) {
    const product = getProductBySlug("pro-series-500w-speaker")

    if (!product) {
        // notFound()
    }

    const category = getCategoryBySlug(product ? product.category :'')
    const relatedProducts = getRelatedProducts(product ? product.category :'', product ? product.id :0)

    // Example features - in a real app, these would come from the product data
    const features = [
        "High-quality components for superior sound reproduction",
        "Durable construction for long-lasting performance",
        "Versatile connectivity options for easy integration",
        "Energy-efficient design for reduced power consumption",
        "Compact form factor without compromising on sound quality",
    ]

    // Example demo video URL - in a real app, this would come from the product data
    const demoVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"

    return (
        <Guest>
            <main className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
            <div className="flex items-center text-sm mb-6">
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
                <Link href={`/${'category' in product ? product.category :''}`} className="text-muted-foreground hover:text-foreground transition-colors">
                    {category?.name}
                </Link>
                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
                <span className="font-medium">{'name' in product ? product.name :''}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
                <ProductGallery images={'images' in product ? product.images :''} />

                <div>
                    <h1 className="text-3xl font-bold mb-2">{'name' in product ? product.name :''}</h1>
                    <p className="text-lg text-muted-foreground mb-6">{'shortDescription' in product ? product.shortDescription :''}</p>

                    <ProductFeatures features={features} />

                    <ProductDescription description={'description' in product ? product.description :''} />

                    <WhereToBuy />
                </div>
            </div>

            <ProductSpecs specs={'specs' in product ? product.specs :''} />

            <ProductDemo videoUrl={demoVideoUrl} />

            {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
        </main></Guest>
    )
}
