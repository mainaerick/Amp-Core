import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from '@inertiajs/react';
import { ProductsTable } from '@/Pages/Admin/Products/Components/ProductsTable';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index() {
    return (
        <AdminLayout>
            <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <Button asChild>
                    <Link href="/admin/products/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="search" placeholder="Search products..." className="h-9" />
                    <Button type="submit" size="sm" variant="secondary">
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Search</span>
                    </Button>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex items-center space-x-2">
                        <Select defaultValue="all">
                            <SelectTrigger className="h-9 w-[180px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="speakers">Speakers</SelectItem>
                                <SelectItem value="subwoofers">Subwoofers</SelectItem>
                                <SelectItem value="amplifiers">Amplifiers</SelectItem>
                                <SelectItem value="accessories">Accessories</SelectItem>
                                <SelectItem value="car-audio">Car Audio & Video</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select defaultValue="in-stock">
                            <SelectTrigger className="h-9 w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="in-stock">In Stock</SelectItem>
                                <SelectItem value="low-stock">Low Stock</SelectItem>
                                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button variant="outline" size="sm" className="h-9">
                        <Filter className="mr-2 h-4 w-4" />
                        More Filters
                    </Button>
                </div>
            </div>

            <ProductsTable />
        </div>
        </AdminLayout>
    )
}
