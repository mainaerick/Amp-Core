// resources/js/Models/Product.ts

export interface Specification {
    name: string
    value: string
}

export interface Product {
    id: number
    name: string
    slug: string
    category_id: string
    brand_id?: string
    dealer_id?: string | null

    short_description: string
    description: string

    price?: number | null
    sale_price?: number | null

    images: any[] // stored as JSON in DB
    specs: Specification[] // stored as JSON in DB
    features?: string[] | null
    demo_video?: string | null

    stock_quantity: number
    low_stock_threshold: number
    stock_status: "in-stock" | "out-of-stock" | "on-backorder"
    track_inventory: boolean
    allow_backorders: boolean

    is_new: boolean
    is_featured: boolean
    is_published: boolean

    created_at: string
    updated_at: string
}
