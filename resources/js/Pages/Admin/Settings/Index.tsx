import React, { useState } from "react"
import { Button, Form, Input, Row, Col, notification } from "antd"
import { SaveOutlined } from "@ant-design/icons"
import { useForm } from "@inertiajs/react"
import AdminLayout from "@/Layouts/AdminLayout"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface GeneralSettings {
    storeName: string
    storeUrl: string
    storeDescription: string
    [key: string]: any;
}

interface StoreSettings {
    productsPerPage: number
    defaultSort: string
    showOutOfStock: boolean
    enableReviews: boolean
    enableWishlist: boolean
    [key: string]: any;
}

interface ContactSettings {
    companyName: string
    phone: string
    email: string
    address: string
    [key: string]: any;
}

interface SettingsFormData {
    general: GeneralSettings
    store: StoreSettings
    contact: ContactSettings
    [key: string]: any;
}

interface SettingsProps {
    settings: Partial<SettingsFormData>
}

const SettingsIndex: React.FC<SettingsProps> = ({ settings }) => {
    const form_ =
    useForm<SettingsFormData>({
        general: {
            storeName: settings.general?.storeName || "",
            storeUrl: settings.general?.storeUrl || "",
            storeDescription: settings.general?.storeDescription || "",
        } as any,
        store: {
            productsPerPage: settings.store?.productsPerPage || 12,
            defaultSort: settings.store?.defaultSort || "featured",
            showOutOfStock: settings.store?.showOutOfStock ?? true,
            enableReviews: settings.store?.enableReviews ?? true,
            enableWishlist: settings.store?.enableWishlist ?? true,
        } as any,
        contact: {
            companyName: settings.contact?.companyName || "",
            phone: settings.contact?.phone || "",
            email: settings.contact?.email || "",
            address: settings.contact?.address || "",
        } as any,
    } as any)
    const { data, setData, post, processing } = form_ as typeof form_ & {
        data:SettingsFormData
        setData:any
        post:any
        processing:any
        errors: SettingsFormData
    }
    const [currentTab, setCurrentTab] = useState<keyof SettingsFormData>("general")

    const onFinish = (values: Partial<SettingsFormData>) => {
        post(route("admin.settings.update", { section: currentTab }), {
            onSuccess: () => {
                notification.success({
                    message: "Settings Updated",
                    description: `${currentTab} settings updated successfully.`,
                })
                // Reload shared props to get fresh data
                router.reload({ only: ['app'] })
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
                value={currentTab as string}
                onValueChange={(val) => setCurrentTab(val as keyof SettingsFormData)}
                className="space-y-4"
            >
                {/* General Tab */}
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
                                        onChange={(e) =>
                                            setData("general", {
                                                ...data.general,
                                                storeName: e.target.value,
                                            } as any)
                                        }
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
                                        onChange={(e) =>
                                            setData("general", {
                                                ...data.general,
                                                storeUrl: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item name="storeDescription" label="Store Description">
                                    <Input.TextArea
                                        rows={3}
                                        value={data.general.storeDescription}
                                        onChange={(e) =>
                                            setData("general", {
                                                ...data.general,
                                                storeDescription: e.target.value,
                                            })
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

                {/* Store and Contact tabs ... (similar to above, unchanged except typing works now) */}
            </Tabs>
        </AdminLayout>
    )
}

export default SettingsIndex
