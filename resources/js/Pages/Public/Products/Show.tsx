import Guest from '@/Layouts/GuestLayout';
import ProductDemo from '@/Pages/Public/Products/Components/ProductDemo';
import ProductDescription from '@/Pages/Public/Products/Components/ProductDescription';
import ProductFeatures from '@/Pages/Public/Products/Components/ProductFeatures';
import ProductGallery from '@/Pages/Public/Products/Components/ProductGallery';
import ProductSpecs from '@/Pages/Public/Products/Components/ProductSpecs';
import RelatedProducts from '@/Pages/Public/Products/Components/RelatedProducts';
import WhereToBuy from '@/Pages/Public/Products/Components/WhereToBuy';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Product } from '@/Pages/Admin/Products/Core/_models';

export default function ProductPage() {
    const { props } = usePage<{
        product: Product;
        relatedProducts: Product[];
        category:Category
    }>();

    const { product, relatedProducts,category } = props;

    console.log(product)
    return (
        <Guest>
            <main className="container mx-auto min-h-screen px-4 py-8 md:py-12">
                {/* Breadcrumb */}
                <div className="mb-6 flex items-center text-sm">
                    <Link
                        href="/"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Home
                    </Link>
                    <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
                    {category && (
                        <>
                            <Link
                                href={`/categories/${category.slug}`}
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {category.name}
                            </Link>
                            <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
                        </>
                    )}
                    <span className="font-medium">{product.name}</span>
                </div>

                {/* Main product */}
                <div className="mb-12 grid gap-12 md:grid-cols-2">
                    <ProductGallery
                        images={product.images.map((img) => `/storage/${img.path}`)}
                    />

                    <div>
                        <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
                        <p className="mb-6 text-lg text-muted-foreground">
                            {product.short_description}
                        </p>

                        <ProductFeatures features={product.features || []} />
                        <ProductDescription description={product.description} />
                        <WhereToBuy />
                    </div>
                </div>

                <ProductSpecs specs={product.specs || []} />

                {product.demo_video && <ProductDemo videoUrl={product.demo_video} />}

                {relatedProducts.length > 0 && (
                    <RelatedProducts products={relatedProducts} />
                )}
            </main>
        </Guest>
    );
}
