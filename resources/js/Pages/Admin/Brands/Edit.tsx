import React from 'react';
import BrandForm from '@/Pages/Admin/Brands/Components/BrandForm';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

function Edit({brand}) {
    console.log(brand);
    return (
        <AdminLayout>
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/brands">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">Update Brand</h1>
                </div>
                <BrandForm mode="edit"  brand={brand}/></div>
        </AdminLayout>

    );
}

export default Edit;
