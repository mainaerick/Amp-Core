import { useState } from "react"
import { Button, Drawer, Switch, Select } from "antd"
import { Filter } from "lucide-react"
import { router } from "@inertiajs/react"

export default function MoreFilters({ filters }) {
    const [open, setOpen] = useState(false)

    const handleFilterChange = (key: string, value: any) => {
        router.get(
            route("admin.products.index"),
            { ...filters, [key]: value },
            { preserveState: true, replace: true }
        )
    }

    return (
        <>
            <Button variant="outline" size="small" className="h-9" onClick={() => setOpen(true)}>
                <Filter className="mr-2 h-4 w-4" />
                More Filters
            </Button>

            <Drawer
                title="More Filters"
                open={open}
                onClose={() => setOpen(false)}
                width={360}
            >
                <div className="space-y-6">
                    {/* Featured Filter */}
                    <div>
                        <label>Featured Only</label>
                        <Switch
                            checked={!!filters.is_featured}
                            onChange={(val) => handleFilterChange("is_featured", val)}
                        />
                    </div>

                    {/* Published Filter */}
                    <div>
                        <label>Published Only</label>
                        <Switch
                            checked={!!filters.is_published}
                            onChange={(val) => handleFilterChange("is_published", val)}
                        />
                    </div>

                </div>
            </Drawer>
        </>
    )
}
