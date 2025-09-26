import React from 'react';
import BrandForm from '@/Pages/Admin/Brands/Components/BrandForm';
import AdminLayout from '@/Layouts/AdminLayout';

function Edit({brand}) {
    console.log(brand);
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6">Edit Brand</h1>
            <BrandForm mode="edit"  brand={brand}/>
        </AdminLayout>

    );
}

export default Edit;
