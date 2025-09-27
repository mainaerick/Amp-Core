import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button, Input, Select } from "antd";
import { Plus, Search, Filter } from "lucide-react";
import { CategoriesTable } from '@/Pages/Admin/Categories/Components/CategoriesTable';
import AdminLayout from '@/Layouts/AdminLayout';

function Index({ auth, categories, filters }) {
    const handleFilterChange = (key: string, value: any) => {
        router.get(
            route("admin.categories.index"),
            { ...filters, [key]: value },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AdminLayout>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <Button size="small" onClick={() => router.get(route("admin.categories.create"))} className="h-9">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                    </Button>
                </div>

                {/* Filters Toolbar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input.Search
                            placeholder="Search categories..."
                            defaultValue={filters.search}
                            onPressEnter={(e) => handleFilterChange("search", e.currentTarget.value)}
                            onClear={() => handleFilterChange("search", undefined)}
                            allowClear
                        />
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex items-center space-x-2">
                            <Select
                                placeholder="Filter by Status"
                                style={{ width: 200 }}
                                value={filters.status || undefined}
                                onChange={(val) => handleFilterChange("status", val)}
                                allowClear
                            >
                                <Select.Option value="active">Active</Select.Option>
                                <Select.Option value="inactive">Inactive</Select.Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <CategoriesTable data={categories.data} />
            </div>
        </AdminLayout>
    );
}

export default Index;
