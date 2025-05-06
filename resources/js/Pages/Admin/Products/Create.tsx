import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import { Link } from '@inertiajs/react';
import { ImageUploader } from '@/Pages/Admin/Products/Components/ImageUploader';
import { SpecificationsEditor } from '@/Pages/Admin/Products/Components/SpecificationsEditor';
import AdminLayout from '@/Layouts/AdminLayout';
function Create(props) {
    return (
        <AdminLayout>
            <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/products">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="images">Images</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Information</CardTitle>
                            <CardDescription>Enter the basic information about the product.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input id="name" placeholder="Enter product name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input id="sku" placeholder="Enter SKU" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="speakers">Speakers</SelectItem>
                                            <SelectItem value="subwoofers">Subwoofers</SelectItem>
                                            <SelectItem value="amplifiers">Amplifiers</SelectItem>
                                            <SelectItem value="accessories">Accessories</SelectItem>
                                            <SelectItem value="car-audio">Car Audio & Video</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="brand">Brand</Label>
                                    <Select>
                                        <SelectTrigger id="brand">
                                            <SelectValue placeholder="Select brand" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="jbl">JBL</SelectItem>
                                            <SelectItem value="alpine">Alpine</SelectItem>
                                            <SelectItem value="pioneer">Pioneer</SelectItem>
                                            <SelectItem value="kenwood">Kenwood</SelectItem>
                                            <SelectItem value="sony">Sony</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="short-description">Short Description</Label>
                                <Textarea id="short-description" placeholder="Enter a short description" className="min-h-[80px]" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="full-description">Full Description</Label>
                                <Textarea
                                    id="full-description"
                                    placeholder="Enter full product description"
                                    className="min-h-[200px]"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price</Label>
                                    <Input id="price" type="number" placeholder="0.00" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sale-price">Sale Price (Optional)</Label>
                                    <Input id="sale-price" type="number" placeholder="0.00" />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="featured" />
                                <Label htmlFor="featured">Featured Product</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="published" defaultChecked />
                                <Label htmlFor="published">Published</Label>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="images">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Images</CardTitle>
                            <CardDescription>
                                Upload images for this product. The first image will be used as the thumbnail.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ImageUploader />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="specifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Specifications</CardTitle>
                            <CardDescription>Add technical specifications for this product.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SpecificationsEditor />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="inventory">
                    <Card>
                        <CardHeader>
                            <CardTitle>Inventory Management</CardTitle>
                            <CardDescription>Manage stock and inventory settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="stock">Stock Quantity</Label>
                                    <Input id="stock" type="number" placeholder="0" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="low-stock">Low Stock Threshold</Label>
                                    <Input id="low-stock" type="number" placeholder="5" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="stock-status">Stock Status</Label>
                                <Select>
                                    <SelectTrigger id="stock-status">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="in-stock">In Stock</SelectItem>
                                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                                        <SelectItem value="on-backorder">On Backorder</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="track-inventory" defaultChecked />
                                <Label htmlFor="track-inventory">Track Inventory</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="allow-backorders" />
                                <Label htmlFor="allow-backorders">Allow Backorders</Label>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                    <Link href="/admin/products">Cancel</Link>
                </Button>
                <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Product
                </Button>
            </div>
        </div>
        </AdminLayout>
    )
}

export default Create;
