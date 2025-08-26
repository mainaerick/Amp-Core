import React from "react"
import { useForm, Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import AdminLayout from "@/Layouts/AdminLayout"
import { ImageUploader } from "@/Pages/Admin/Products/Components/ImageUploader"
import { SpecificationsEditor } from "@/Pages/Admin/Products/Components/SpecificationsEditor"
import ProductForm from '@/Pages/Admin/Products/Components/ProductForm';

type ProductFormProps = {
    product?: any // product when editing
    categories: { id: string; name: string }[]
    brands: { id: string; name: string }[]
}

function Create({ product, categories, brands }: ProductFormProps) {
    const { data, setData, post, put, processing, errors } = useForm<any>({
        name: product?.name || "",
        sku: product?.sku || "",
        category_id: product?.category_id || "",
        brand_id: product?.brand_id || "",
        short_description: product?.short_description || "",
        description: product?.description || "",
        price: product?.price || "",
        sale_price: product?.sale_price || "",
        featured: product?.featured || false,
        published: product?.published ?? true,
        stock: product?.stock || 0,
        low_stock: product?.low_stock || 5,
        stock_status: product?.stock_status || "in-stock",
        track_inventory: product?.track_inventory ?? true,
        allow_backorders: product?.allow_backorders ?? false,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (product) {
            put(route("products.update", product.id))
        } else {
            post(route("products.store"))
        }
    }

    return (
        <AdminLayout>
            <ProductForm categories={categories} brands={[]}/>
        </AdminLayout>
    )
}

export default Create
