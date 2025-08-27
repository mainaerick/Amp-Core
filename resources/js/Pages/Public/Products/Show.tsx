import Guest from '@/Layouts/GuestLayout';
import { getCategoryBySlug } from '@/Pages/Public/lib/categories';
import {
    getProductBySlug,
    getRelatedProducts,
} from '@/Pages/Public/lib/products';
import ProductDemo from '@/Pages/Public/Products/Components/ProductDemo';
import ProductDescription from '@/Pages/Public/Products/Components/ProductDescription';
import ProductFeatures from '@/Pages/Public/Products/Components/ProductFeatures';
import ProductGallery from '@/Pages/Public/Products/Components/ProductGallery';
import ProductSpecs from '@/Pages/Public/Products/Components/ProductSpecs';
import RelatedProducts from '@/Pages/Public/Products/Components/RelatedProducts';
import WhereToBuy from '@/Pages/Public/Products/Components/WhereToBuy';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

interface ProductPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({
    params,
}: ProductPageProps): Promise<any> {
    const product = getProductBySlug(params.slug);

    if (!product) {
        return {
            title: 'Product Not Found | SoundWave Audio',
        };
    }

    return {
        title: `${product.name} | SoundWave Audio`,
        description: product.shortDescription,
    };
}

export default function ProductPage({ params }: ProductPageProps) {
    const product = getProductBySlug('pro-series-500w-speaker');

    if (!product) {
        // notFound()
    }

    const category = getCategoryBySlug(product ? product.category : '');
    const relatedProducts = getRelatedProducts(
        product ? product.category : '',
        product ? product.id : 0,
    );

    // Example features - in a real app, these would come from the product data
    const features = [
        'High-quality components for superior sound reproduction',
        'Durable construction for long-lasting performance',
        'Versatile connectivity options for easy integration',
        'Energy-efficient design for reduced power consumption',
        'Compact form factor without compromising on sound quality',
    ];

    // Example demo video URL - in a real app, this would come from the product data
    const demoVideoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

    return (
        <Guest>
            <main className="container mx-auto min-h-screen px-4 py-8 md:py-12">
                <div className="mb-6 flex items-center text-sm">
                    <Link
                        href="/"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Home
                    </Link>
                    <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
                    <Link
                        href={`/${'category' in product ? product.category : ''}`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {category?.name}
                    </Link>
                    <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                        {'name' in product ? product.name : ''}
                    </span>
                </div>

                <div className="mb-12 grid gap-12 md:grid-cols-2">
                    <ProductGallery
                        images={'images' in product ? product.images : ''}
                    />

                    <div>
                        <h1 className="mb-2 text-3xl font-bold">
                            {'name' in product ? product.name : ''}
                        </h1>
                        <p className="mb-6 text-lg text-muted-foreground">
                            {'shortDescription' in product
                                ? product.shortDescription
                                : ''}
                        </p>

                        <ProductFeatures features={features} />

                        <ProductDescription
                            description={
                                'description' in product
                                    ? product.description
                                    : ''
                            }
                        />

                        <WhereToBuy />
                    </div>
                </div>

                <ProductSpecs specs={'specs' in product ? product.specs : ''} />

                <ProductDemo videoUrl={demoVideoUrl} />

                {relatedProducts.length > 0 && (
                    <RelatedProducts products={relatedProducts} />
                )}
            </main>
        </Guest>
    );
}
