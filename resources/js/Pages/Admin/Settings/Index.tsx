import React, { useState } from "react"
import { Button, Form, Input, Row, Col, notification } from "antd"
import { SaveOutlined } from "@ant-design/icons"
import { useForm as useInertiaForm } from "@inertiajs/react"
import AdminLayout from "@/Layouts/AdminLayout"

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"

interface SettingsProps {
    settings: any
}

const SettingsIndex: React.FC<SettingsProps> = ({ settings }) => {
    const { data, setData, post, processing } = useInertiaForm<any>({
        general: {
            storeName: settings.general?.storeName || "",
            storeUrl: settings.general?.storeUrl || "",
            storeDescription: settings.general?.storeDescription || "",
            // adminEmail: settings.general?.adminEmail || "",
            // country: settings.general?.country || "us",
            // currency: settings.general?.currency || "usd",
            // timezone: settings.general?.timezone || "est",
            // maintenanceMode: settings.general?.maintenanceMode || false,
        },
        store: {
            productsPerPage: settings.store?.productsPerPage || 12,
            defaultSort: settings.store?.defaultSort || "featured",
            showOutOfStock: settings.store?.showOutOfStock || true,
            enableReviews: settings.store?.enableReviews || true,
            enableWishlist: settings.store?.enableWishlist || true,
        },
        contact: {
            companyName: settings.contact?.companyName || "",
            phone: settings.contact?.phone || "",
            email: settings.contact?.email || "",
            address: settings.contact?.address || "",
        },
    })

    const [currentTab, setCurrentTab] = useState("general")

    const onFinish = (values: any) => {
        post(route("admin.settings.update", { section: currentTab }), {
            onSuccess: () => {
                notification.success({
                    message: "Settings Updated",
                    description: `${currentTab} settings updated successfully.`,
                })
            },
            onError: () => {
                notification.error({
                    message: "Error",
                    description: "Failed to update settings.",
                })
            },
        })
    }

    return (
        <AdminLayout>
            <Tabs
                defaultValue="general"
                value={currentTab}
                onValueChange={setCurrentTab}
                className="space-y-4"
            >
                {/* --- Tab Header --- */}
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="store">Store</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>

                {/* --- General Settings --- */}
                <TabsContent value="general">
                    <Form
                        layout="vertical"
                        initialValues={data.general}
                        onFinish={(values) => onFinish({ general: values })}
                    >
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="storeName"
                                    label="Store Name"
                                    rules={[{ required: true, message: "Please input the store name!" }]}
                                >
                                    <Input
                                        value={data.general.storeName}
                                        onChange={(e) => setData("general.storeName", e.target.value)}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="storeUrl"
                                    label="Store URL"
                                    rules={[{ required: true, type: "url", message: "Enter a valid URL" }]}
                                >
                                    <Input
                                        value={data.general.storeUrl}
                                        onChange={(e) => setData("general.storeUrl", e.target.value)}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item name="storeDescription" label="Store Description">
                                    <Input.TextArea
                                        rows={3}
                                        value={data.general.storeDescription}
                                        onChange={(e) =>
                                            setData("general.storeDescription", e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={processing && currentTab === "general"}
                                icon={<SaveOutlined />}
                            >
                                Save General Settings
                            </Button>
                        </Form.Item>
                    </Form>
                </TabsContent>

                {/* --- Store Settings --- */}
                <TabsContent value="store">
                    <Form
                        layout="vertical"
                        initialValues={data.store}
                        onFinish={(values) => onFinish({ store: values })}
                    >
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="productsPerPage"
                                    label="Products Per Page"
                                    rules={[{ required: true, type: "number", message: "Enter a number" }]}
                                >
                                    <Input
                                        type="number"
                                        value={data.store.productsPerPage}
                                        onChange={(e) =>
                                            setData("store.productsPerPage", Number(e.target.value))
                                        }
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item name="defaultSort" label="Default Sort">
                                    <Input
                                        value={data.store.defaultSort}
                                        onChange={(e) =>
                                            setData("store.defaultSort", e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={processing && currentTab === "store"}
                                icon={<SaveOutlined />}
                            >
                                Save Store Settings
                            </Button>
                        </Form.Item>
                    </Form>
                </TabsContent>

                {/* --- Contact Settings --- */}
                <TabsContent value="contact">
                    <Form
                        layout="vertical"
                        initialValues={data.contact}
                        onFinish={(values) => onFinish({ contact: values })}
                    >
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item name="companyName" label="Company Name">
                                    <Input
                                        value={data.contact.companyName}
                                        onChange={(e) =>
                                            setData("contact.companyName", e.target.value)
                                        }
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item name="phone" label="Phone">
                                    <Input
                                        value={data.contact.phone}
                                        onChange={(e) => setData("contact.phone", e.target.value)}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item name="email" label="Email">
                                    <Input
                                        value={data.contact.email}
                                        onChange={(e) => setData("contact.email", e.target.value)}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item name="address" label="Address">
                                    <Input
                                        value={data.contact.address}
                                        onChange={(e) => setData("contact.address", e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={processing && currentTab === "contact"}
                                icon={<SaveOutlined />}
                            >
                                Save Contact Settings
                            </Button>
                        </Form.Item>
                    </Form>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    )
}

export default SettingsIndex
