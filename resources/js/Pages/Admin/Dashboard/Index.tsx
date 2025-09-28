import React from "react"
import AdminLayout from "@/Layouts/AdminLayout"
import { Card, Col, Row, Table, Tag, Button, Space } from "antd"
import { Link } from "@inertiajs/react"
import {
    ShoppingCartOutlined,
    AppstoreOutlined,
    TagsOutlined,
    WarningOutlined,
    PlusOutlined,
} from "@ant-design/icons"

type Props = {
    stats: {
        products: number
        categories: number
        brands: number
        low_stock: number
    }
    recent_products: any[]
    recent_categories: any[]
    recent_brands: any[]
}

export default function Index({ stats, recent_products, recent_categories, recent_brands }: Props) {
    const productColumns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Price", dataIndex: "price", key: "price" },
        {
            title: "Stock Status",
            dataIndex: "stock_status",
            key: "stock_status",
            render: (status: string) => (
                <Tag color={status === "in-stock" ? "green" : status === "out-of-stock" ? "red" : "orange"}>
                    {status.replace("-", " ").toUpperCase()}
                </Tag>
            ),
        },
    ]

    const categoryColumns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Status", dataIndex: "status", key: "status" },
    ]

    const brandColumns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Status", dataIndex: "status", key: "status" },
    ]

    return (
        <AdminLayout>
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                {/* ✅ Quick Action Buttons */}
                <Space>
                    <Link href={route("admin.products.create")}>
                        <Button type="primary" icon={<PlusOutlined />}>Add Product</Button>
                    </Link>
                    <Link href={route("admin.categories.create")}>
                        <Button type="default" icon={<PlusOutlined />}>Add Category</Button>
                    </Link>
                    <Link href={route("admin.brands.create")}>
                        <Button type="dashed" icon={<PlusOutlined />}>Add Brand</Button>
                    </Link>
                </Space>
            </div>

            {/* Stats Cards */}
            <Row gutter={16} className="mb-6">
                <Col span={6}>
                    <Card>
                        <ShoppingCartOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
                        <h3>Products</h3>
                        <p className="text-xl font-bold">{stats.products}</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <AppstoreOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
                        <h3>Categories</h3>
                        <p className="text-xl font-bold">{stats.categories}</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <TagsOutlined style={{ fontSize: "24px", color: "#fa8c16" }} />
                        <h3>Brands</h3>
                        <p className="text-xl font-bold">{stats.brands}</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <WarningOutlined style={{ fontSize: "24px", color: "#ff4d4f" }} />
                        <h3>Low Stock</h3>
                        <p className="text-xl font-bold">{stats.low_stock}</p>
                    </Card>
                </Col>
            </Row>

            {/* Recent Tables */}
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Recent Products" bordered={false}>
                        <Table columns={productColumns} dataSource={recent_products} rowKey="id" pagination={false} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Recent Categories" bordered={false}>
                        <Table columns={categoryColumns} dataSource={recent_categories} rowKey="id" pagination={false} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Recent Brands" bordered={false}>
                        <Table columns={brandColumns} dataSource={recent_brands} rowKey="id" pagination={false} />
                    </Card>
                </Col>
            </Row>
        </AdminLayout>
    )
}
