import React from 'react';
import HeroSlider from '@/Pages/Public/Home/Components/HeroSlider';
import SiteHeader from '@/Components/SiteHeader';
import Guest from '@/Layouts/GuestLayout';
import { Button, Image } from 'antd';
import CategoryNavigation from '@/Pages/Public/Home/Components/CategoryNavigation';
import FeaturedProducts from '@/Pages/Public/Home/Components/FeaturedProducts';
import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { ArrowRightOutlined } from '@ant-design/icons';
import FeaturedBrands from '@/Pages/Public/Home/Components/FeaturedBrands';
import { Brand } from '@/Pages/Admin/Brands/Core/types';
import { Product } from '@/Pages/Admin/Products/Core/_models';

type Props = {
    categories: Category[]
    featured_products: Product[]
    brands: Brand[]
}
function Index({ categories, featured_products, brands }: Props) {

    return (
        <Guest>
            <HeroSlider />

            {/* Categories */}
            <section className="container mx-auto px-4 py-8 md:py-12">
                <CategoryNavigation categories={categories} />
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
                    <Link href={"/products"}>
                        <Button type="default" size="large" icon={<ArrowRightOutlined />}>
                            View All Products
                        </Button>
                    </Link>
                </div>
                <FeaturedProducts products={featured_products} />
            </section>

            {/* Featured Brands */}
            <section className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Our Brands</h2>
                    <Link href={"/brands"}>
                        <Button type="default" size="large" icon={<ArrowRightOutlined />}>
                            View All Brands
                        </Button>
                    </Link>
                </div>
                <FeaturedBrands brands={brands} />
            </section>
        </Guest>

    );
}

export default Index;
