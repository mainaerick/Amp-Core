import React, { useEffect } from 'react';
import { useForm, Link } from "@inertiajs/react"
import { ArrowLeft, Save } from "lucide-react"
import { message } from "antd"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ImageUploader } from "@/Pages/Admin/Products/Components/ImageUploader"
import { SpecificationsEditor } from "@/Pages/Admin/Products/Components/SpecificationsEditor"
import { Product } from "@/Pages/Admin/Products/Core/_models"
import { Brand } from "@/Pages/Admin/Brands/Core/types"

type ProductFormProps = {
    product?: Product
    categories: { id: string; name: string }[]
    brands: Brand[]
}

function ProductForm({ product, categories, brands }: ProductFormProps) {
    const mode = product ? "edit" : "create"

    const { data, setData, post, processing, errors } = useForm<Product | any>({
        name: product?.name || "",
        category_id: product?.category_id || "",
        brand_id: product?.brand_id || "",
        short_description: product?.short_description || "",
        description: product?.description || "",
        price: product?.price || "",
        sale_price: product?.sale_price || "",
        is_featured: product?.is_featured || false,
        is_published: product?.is_published ?? true,
        stock_quantity: product?.stock_quantity || 0,
        specs: product?.specs || [],
        low_stock_threshold: product?.low_stock_threshold || 5,
        stock_status: product?.stock_status || "in-stock",
        track_inventory: product?.track_inventory ?? true,
        allow_backorders: product?.allow_backorders ?? false,

        images: product
            ? product.images.map((img: any) => `/storage/${img.path}`)
            : [],

        existing_images: product
            ? product.images.map((img: any) => img.path)
            : [],

        _method: mode === "edit" ? "put" : "post",
    })


    useEffect(() => {
        console.log(data)
    }, [data]);
    const onFinish = () => {
        const routeName =
            mode === "create" ? "admin.products.store" : "admin.products.update"
        const url =
            mode === "create"
                ? route(routeName)
                : route(routeName, product?.id as string)

        const inertiaMethod = post
        const formData = new FormData()

        if (mode === "edit") {
            formData.append("_method", "PUT")
        }

        Object.entries(data).forEach(([key, value]) => {
            if (value === undefined || value === null) return

            if (key === "images" && Array.isArray(value)) {
                value.forEach((file, index) => {
                    if (file instanceof File) {
                        formData.append(`images[${index}]`, file)
                    } else if (typeof file === "string") {
                        const rawPath = file.replace(/^\/storage\//, "")
                        formData.append(`existing_images[${index}]`, rawPath)
                    }
                })
            } else if (Array.isArray(value) || typeof value === "object") {
                formData.append(key, JSON.stringify(value))
            } else {
                formData.append(key, String(value))
            }
        })

        inertiaMethod(url, {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                message.success(
                    `Product ${mode === "create" ? "created" : "updated"} successfully`
                )
            },
            onError: (e) => {
                message.error("An error occurred. Please check the form.")
                console.error(e)
            },
        })
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); onFinish() }}>
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/products">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {product ? "Edit Product" : "Add New Product"}
                    </h1>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="general" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="images">Images</TabsTrigger>
                        <TabsTrigger value="specifications">Specifications</TabsTrigger>
                        <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    </TabsList>

                    {/* General */}
                    <TabsContent value="general">
                        <Card>
                            <CardHeader>
                                <CardTitle>General Information</CardTitle>
                                <CardDescription>Enter product details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Product Name</Label>
                                    <Input value={data.name} onChange={(e) => setData("name", e.target.value)} />
                                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                                </div>

                                <div>
                                    <Label>SKU</Label>
                                    <Input value={data.sku} onChange={(e) => setData("sku", e.target.value)} />
                                </div>

                                <div>
                                    <Label>Category</Label>
                                    <Select onValueChange={(val) => setData("category_id", val)} defaultValue={data.category_id}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((c) => (
                                                <SelectItem key={c.id} value={c.id}>
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Brand</Label>
                                    <Select onValueChange={(val) => setData("brand_id", val)} defaultValue={data.brand_id}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select brand" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {brands.map((b) => (
                                                <SelectItem key={b.id} value={b.id}>
                                                    {b.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Short Description</Label>
                                    <Textarea value={data.short_description} onChange={(e) => setData("short_description", e.target.value)} />
                                </div>

                                <div>
                                    <Label>Full Description</Label>
                                    <Textarea value={data.description} onChange={(e) => setData("description", e.target.value)} />
                                </div>

                                <div>
                                    <Label>Price</Label>
                                    <Input type="number" value={data.price} onChange={(e) => setData("price", e.target.value)} />
                                </div>

                                <div>
                                    <Label>Sale Price</Label>
                                    <Input type="number" value={data.sale_price} onChange={(e) => setData("sale_price", e.target.value)} />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Switch checked={data.is_featured} onCheckedChange={(val) => setData("is_featured", val)} />
                                    <Label>Featured Product</Label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Switch checked={data.is_published} onCheckedChange={(val) => setData("is_published", val)} />
                                    <Label>Published</Label>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Images */}
                    <TabsContent value="images">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Images</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ImageUploader value={data.images} onChange={(files) => {setData("images", files)
                                    // keep only raw DB paths for backend
                                    const existing = files
                                        .filter((f): f is string => typeof f === "string") // type guard
                                        .map(f => f.replace(/^\/storage\//, ""));
                                    setData("existing_images", existing);
                                }} multiple maxFiles={5} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Specifications */}
                    <TabsContent value="specifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>Specifications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SpecificationsEditor specifications={data.specs} onChange={(specs) => setData("specs", specs)} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Inventory */}
                    <TabsContent value="inventory">
                        <Card>
                            <CardHeader>
                                <CardTitle>Inventory</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <Label>Stock Quantity</Label>
                                    <Input type="number" value={data.stock_quantity} onChange={(e) => setData("stock_quantity", e.target.value)} />
                                </div>

                                <div>
                                    <Label>Low Stock Threshold</Label>
                                    <Input type="number" value={data.low_stock_threshold} onChange={(e) => setData("low_stock_threshold", e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/admin/products">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={processing}>
                        <Save className="mr-2 h-4 w-4" />
                        {mode === "create" ? "Save Product" : "Update Product"}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default ProductForm
