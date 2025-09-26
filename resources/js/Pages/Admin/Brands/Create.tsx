import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import BrandForm from '@/Pages/Admin/Brands/Components/BrandForm';

function Create(props) {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6">Create Brand</h1>
            <BrandForm mode="create" />
        </AdminLayout>

    );
}

export default Create;
