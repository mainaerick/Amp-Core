import {
    Button,
    Input,
    Select,
} from 'antd';
import { Plus, Search, Filter } from "lucide-react"
import {  SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link, router } from '@inertiajs/react';
import { ProductsTable } from '@/Pages/Admin/Products/Components/ProductsTable';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({products,filters}) {
    const handleFilterChange = (key: string, value: any) => {
        router.get(
            route("admin.products.index"),
            { ...filters, [key]: value },
            { preserveState: true, replace: true }
        );
    };
    return (
        <AdminLayout>
            <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <Button asChild>
                    <Link href="/admin/products/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input.Search
                        placeholder="Search products..."
                        defaultValue={filters.search}
                        onPressEnter={(e) => handleFilterChange("search", e.target.value)}
                        onClear={(e) => handleFilterChange("search", undefined)}
                        allowClear
                    />
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

            <ProductsTable  paginated_data={products}/>
        </div>
        </AdminLayout>
    )
}
