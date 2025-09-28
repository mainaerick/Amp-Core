import { useState } from "react"
import { router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select } from "antd"

type Props = {
    category: string
    filters: Record<string, any>
    availableBrands: { id: string; name: string }[]
}

export default function FilterSidebar({ category, filters, availableBrands }: Props) {
    const [priceRange, setPriceRange] = useState([
        Number(filters.min_price || 0),
        Number(filters.max_price || 2000),
    ])
    const [selectedBrands, setSelectedBrands] = useState<string[]>(filters.brands || [])
    const [stockStatus, setStockStatus] = useState(filters.stock_status || "")

    const applyFilters = () => {
        router.get(
            route("categories.show", category),
            {
                ...filters,
                min_price: priceRange[0],
                max_price: priceRange[1],
                brands: selectedBrands,
                stock_status: stockStatus,
            },
            { preserveState: true, replace: true }
        )
    }

    const resetFilters = () => {
        router.get(route("categories.show", category))
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset
                </Button>
            </div>

            {/* Price */}
            <div>
                <h3 className="text-sm font-medium mb-3">Price Range</h3>
                <Slider
                    max={2000}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-sm mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            {/* Brands */}
            <div>
                <h3 className="text-sm font-medium mb-3">Brands</h3>
                <div className="space-y-2">
                    {availableBrands.map((brand) => (
                        <div key={brand.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`brand-${brand.id}`}
                                checked={selectedBrands.includes(brand.id)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setSelectedBrands([...selectedBrands, brand.id])
                                    } else {
                                        setSelectedBrands(selectedBrands.filter((b) => b !== brand.id))
                                    }
                                }}
                            />
                            <Label htmlFor={`brand-${brand.id}`}>{brand.name}</Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stock Status */}
            <div>
                <h3 className="text-sm font-medium mb-3">Stock Status</h3>
                <Select
                    style={{ width: "100%" }}
                    placeholder="Select stock status"
                    value={stockStatus || undefined}
                    onChange={setStockStatus}
                    allowClear
                >
                    <Select.Option value="in-stock">In Stock</Select.Option>
                    <Select.Option value="out-of-stock">Out of Stock</Select.Option>
                    <Select.Option value="on-backorder">On Backorder</Select.Option>
                </Select>
            </div>

            <Button className="w-full" onClick={applyFilters}>
                Apply Filters
            </Button>
        </div>
    )
}
