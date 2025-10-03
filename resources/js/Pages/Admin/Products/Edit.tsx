import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button"
import AdminLayout from '@/Layouts/AdminLayout';
import CategoryForm from '@/Pages/Admin/Categories/Components/CategoryForm';
import ProductForm from '@/Pages/Admin/Products/Components/ProductForm';
import { Product } from '@/Pages/Admin/Products/Core/_models';
import { Brand } from '@/Pages/Admin/Brands/Core/types';


interface Props {
    auth:any
    category: Category;
    categories:Category[]
    brands:Brand[]
    product:Product
}
function Edit({ auth,product,categories,brands }:Props) {
    console.log(brands)
    return (
        <AdminLayout>
            <div className="flex flex-col gap-6">
                <ProductForm  product={product}  categories={categories} brands={brands}/>
            </div>
        </AdminLayout>

    );
}

export default Edit;
