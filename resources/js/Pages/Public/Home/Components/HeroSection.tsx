import React from 'react';
import { Button } from "@/components/ui/button"
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
function HeroSection() {
    return (
        <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-muted">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Premium Audio Equipment for Professionals
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                Discover our collection of high-quality speakers, cabinets, amplifiers, and accessories
                                designed for
                                musicians, sound engineers, and audio enthusiasts.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button asChild size="lg">
                                <Link href="/products">
                                    Browse Products
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="relative h-[300px] md:h-[400px] lg:h-full">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1681400648913-ed4da66955dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNwZWFrZXJ8ZW58MHx8MHx8fDA%3D"
                            alt="Premium audio equipment"
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
