import React from "react"
import { Table, Button, Space } from "antd"
import { Link } from "@inertiajs/react"
import AdminLayout from "@/Layouts/AdminLayout"
import { Brand } from '@/Pages/Admin/Brands/Core/types';
import { BrandsTable } from '@/Pages/Admin/Brands/Components/BrandsTable';

type Props = { brands: { data: Brand[] } }

export default function Index({ brands }: Props) {
    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Slug", dataIndex: "slug", key: "slug" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Products", dataIndex: "products_count", key: "products_count" },
        {
            title: "Actions",
            render: (_: any, brand: Brand) => (
                <Space>
                    <Link href={route("admin.brands.edit", brand.id)}>
                        <Button type="link">Edit</Button>
                    </Link>
                </Space>
            ),
        },
    ]

    return (
        <AdminLayout>
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Brands</h1>
                <Link href={route("admin.brands.create")}>
                    <Button type="primary">Add Brand</Button>
                </Link>
            </div>

            <BrandsTable  data={brands.data}/>
        </AdminLayout>
    )
}
