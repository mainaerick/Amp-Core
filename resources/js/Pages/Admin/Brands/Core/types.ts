export interface Brand {
    id: string
    name: string
    slug: string
    logo?: string
    description?: string
    status: "active" | "inactive"
    products_count?: number
}
