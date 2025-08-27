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
import MoreFilters from '@/Pages/Admin/Products/Components/MoreFilters';

export default function Index({products,categories,filters}) {
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
                <Button size="small" onClick={()=>router.get(route("admin.products.create"))}  className={"h-9"}                                                                                                                                           >
                    {/*<Link href="/admin/products/create">*/}
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    {/*</Link>*/}
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
                        <Select
                            placeholder="Filter by Category"
                            style={{ width: 200 }}
                            value={filters.category || undefined}
                            onChange={(val) => handleFilterChange("category", val)}
                            allowClear
                        >
                            {categories.map((cat) => (
                                <Select.Option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select
                            placeholder="Stock Status"
                            style={{ width: 200 }}
                            value={filters.stock_status || undefined}
                            onChange={(val) => handleFilterChange("stock_status", val)}
                            allowClear
                        >
                            <Select.Option value="in-stock">In Stock</Select.Option>
                            <Select.Option value="out-of-stock">Out of Stock</Select.Option>
                            <Select.Option value="on-backorder">On Backorder</Select.Option>
                        </Select>
                    </div>
                    <MoreFilters filters={filters}/>
                </div>
            </div>

            <ProductsTable paginated_data={products}/>
        </div>
        </AdminLayout>
    )
}
