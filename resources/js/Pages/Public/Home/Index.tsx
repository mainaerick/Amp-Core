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

function Index(props) {
    return (
        <Guest>
            {/*<main className="flex flex-col min-h-screen">*/}
            <HeroSlider />
            <section className="container mx-auto px-4 py-8 md:py-12">
                <CategoryNavigation />
            </section>
            <section className="container mx-auto mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>

                    <Link href={"/products"}>
                        <Button asChild variant="ghost" className="group" type={"default"} size="large"
                                icon={<ArrowRightOutlined />} iconPosition={"end"}>
                            View All Products
                        </Button>
                    </Link>
                </div>
                <FeaturedProducts />
            </section>
            <section className="container mx-auto mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Our Brands</h2>
                    <Button asChild variant="ghost" className="group" icon={<ArrowRightOutlined />} iconPosition={"end"}>
                        <Link href="/brands">
                            View All Brands
                        </Link>
                    </Button>
                </div>
                <FeaturedBrands />
            </section>
        </Guest>

    );
}

export default Index;
