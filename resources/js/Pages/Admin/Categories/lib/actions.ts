"use server"

import { z } from "zod"

// Category schema for validation

// Mock database operations
// In a real application, these would interact with your database
let categories = [
    {
        id: "CAT-1",
        name: "Speakers",
        slug: "speakers",
        description: "High-quality audio speakers for various applications",
        products: 24,
        status: "active",
    },
    {
        id: "CAT-2",
        name: "Subwoofers",
        slug: "subwoofers",
        description: "Powerful subwoofers for deep bass reproduction",
        products: 18,
        status: "active",
    },
    {
        id: "CAT-3",
        name: "Amplifiers",
        slug: "amplifiers",
        description: "Audio amplifiers for enhanced sound quality",
        products: 15,
        status: "active",
    },
    {
        id: "CAT-4",
        name: "Accessories",
        slug: "accessories",
        description: "Audio accessories and components",
        products: 32,
        status: "active",
    },
    {
        id: "CAT-5",
        name: "Car Audio & Video",
        slug: "car-audio-video",
        description: "Audio and video solutions for vehicles",
        products: 27,
        status: "active",
    },
    {
        id: "CAT-6",
        name: "Home Theater",
        slug: "home-theater",
        description: "Complete home theater systems and components",
        products: 12,
        status: "inactive",
    },
    {
        id: "CAT-7",
        name: "Headphones",
        slug: "headphones",
        description: "Premium headphones for immersive audio experience",
        products: 0,
        status: "inactive",
    },
]

export async function getCategories() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return categories
}

export async function getCategory(id: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    const category = categories.find((cat) => cat.id === id)

    if (!category) {
        throw new Error(`Category with ID ${id} not found`)
    }

    return category
}


export async function generateSlug(name: string) {
    return name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
}
