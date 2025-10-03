import React from "react"
import { useForm, Link } from "@inertiajs/react"
import AdminLayout from "@/Layouts/AdminLayout"
import ProductForm from '@/Pages/Admin/Products/Components/ProductForm';
import { Brand } from '@/Pages/Admin/Brands/Core/types';

type ProductFormProps = {
    product?: any // product when editing
    categories: Category[]
    brands: Brand[]
}

function Create({ product, categories, brands }: ProductFormProps) {

    return (
        <AdminLayout>
            <ProductForm categories={categories} brands={brands}/>
        </AdminLayout>
    )
}

export default Create
