interface Category {
    id: number
    name: string
    slug: string
    description: string
}

const categories: Category[] = [
    {
        id: 1,
        name: "Speakers",
        slug: "speakers",
        description: "High-performance speakers for every venue and application",
    },
    {
        id: 2,
        name: "Subwoofers",
        slug: "subwoofers",
        description: "Premium subwoofers designed for deep, powerful bass",
    },
    {
        id: 3,
        name: "Amplifiers",
        slug: "amplifiers",
        description: "Powerful amplifiers for crystal-clear sound reproduction",
    },
    {
        id: 4,
        name: "Accessories",
        slug: "accessories",
        description: "Essential accessories to complete your audio setup",
    },
    {
        id: 5,
        name: "Car Audio & Video",
        slug: "car-audio",
        description: "Premium audio and video solutions for your vehicle",
    },
]

export function getAllCategories() {
    return categories
}

export function getCategoryBySlug(slug: string) {
    return categories.find((category) => category.slug === slug)
}
