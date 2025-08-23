import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CategoriesTable } from '@/Pages/Admin/Categories/Components/CategoriesTable';
import AdminLayout from '@/Layouts/AdminLayout';

function Index({ auth, categories }) {
    console.log(categories)
    return (
        <AdminLayout>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <Button asChild>
                        <Link href="/admin/categories/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Category
                        </Link>
                    </Button>
                </div>

                <CategoriesTable  data={categories}/>
            </div>
        </AdminLayout>

    );
}

export default Index;
