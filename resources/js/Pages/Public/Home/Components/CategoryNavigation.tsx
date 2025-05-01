import React from 'react';
import { Col, Row,Image } from 'antd';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

const categories = [
    {
        name: "Speakers",
        image: "https://plus.unsplash.com/premium_photo-1681400648913-ed4da66955dd?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29vZmVyfGVufDB8fDB8fHww",
        href: "/speakers",
        description: "High-performance speakers for every venue",
    },
    {
        name: "Subwoofers",
        image: "https://plus.unsplash.com/premium_photo-1681400648913-ed4da66955dd?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29vZmVyfGVufDB8fDB8fHww",
        href: "/subwoofers",
        description: "Deep, powerful bass response",
    },
    {
        name: "Amplifiers",
        image: "https://plus.unsplash.com/premium_photo-1681400648913-ed4da66955dd?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29vZmVyfGVufDB8fDB8fHww",
        href: "/amplifiers",
        description: "Clean power for your audio system",
    },
    {
        name: "Accessories",
        image: "https://plus.unsplash.com/premium_photo-1681400648913-ed4da66955dd?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29vZmVyfGVufDB8fDB8fHww",
        href: "/accessories",
        description: "Complete your audio setup",
    },
    {
        name: "Car Audio & Video",
        image: "https://plus.unsplash.com/premium_photo-1681400648913-ed4da66955dd?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29vZmVyfGVufDB8fDB8fHww",
        href: "/car-audio",
        description: "Premium sound for your vehicle",
    },
]
function CategoryNavigation(props) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
                <Link
                    key={category.name}
                    href={category.href}
                    className="group relative overflow-hidden rounded-lg h-60 flex items-end bg-black p-6 no-underline"
                >
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src={category.image || "/placeholder.svg"}
                            alt={category.name}
                            fill
                            className="object-cover opacity-70 transition-transform group-hover:scale-110 group-hover:opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-200 mb-2">{category.description}</p>
                        <span className="inline-flex items-center text-sm font-medium text-primary">
              Explore
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default CategoryNavigation;
