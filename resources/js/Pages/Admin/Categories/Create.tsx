import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button"
import AdminLayout from '@/Layouts/AdminLayout';
import CategoryForm from '@/Pages/Admin/Categories/Components/CategoryForm';
function Create() {
    return (
        <AdminLayout>
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/categories">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">Add New Category</h1>
                </div>

                <CategoryForm mode="create" />
            </div>
        </AdminLayout>

    );
}

export default Create;
