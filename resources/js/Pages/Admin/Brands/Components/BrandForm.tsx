import React from 'react';
import { useForm } from "@inertiajs/react"
import { Button, Form, Input, Select, Upload, message, Card } from 'antd';
import { UploadOutlined } from "@ant-design/icons"
import { Brand } from '@/Pages/Admin/Brands/Core/types';

type Props = {
    brand?: Brand
    mode: "create" | "edit"
}

export default function BrandForm({ brand, mode }: Props) {
    const [form] = Form.useForm()
    const { data, setData, post, processing, errors } = useForm<Brand|any>({
        name: brand?.name || "",
        slug: brand?.slug || "",
        description: brand?.description || "",
        status: brand?.status || "active",
        logo: brand?.logo || "",
        logo_file: undefined,
        _method: mode === "create" ? "POST" : "PUT"
    })

    // ... in BrandForm.tsx

    const handleSubmit = async () => {
        const routeName = mode === "create" ? "admin.brands.store" : "admin.brands.update"
        const url = mode === "create" ? route(routeName) : route(routeName, brand?.id as string)

        // The method to send the request (always post for file uploads)
        const inertiaMethod = post // ALWAYS USE POST

        const formData = new FormData()

        //Add method spoofing for updates!
        if (mode === "edit") {
            formData.append('_method', 'PUT') // FOR METHOD SPOOFING
        }

        Object.entries(data).forEach(([key, value]) => {
            // Skip adding the logo_file as a string if it's undefined, null, or is a File to prevent it from being added as "[object File]" string.
            if (value !== undefined && value !== null) {
                // When using PUT/PATCH with file uploads, Inertia recommends sending a POST request with the _method field.
                // We ensure files are passed correctly, and for other values, we convert them to strings.
                formData.append(key, value instanceof File ? value : String(value))
            }
        })

        inertiaMethod(url, {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                message.success(`Brand ${mode === "create" ? "created" : "updated"} successfully`)
            },
            onError: (e) => {
                message.error("An error occurred. Please check the form.")
                console.error(e)
            },
        })
    }

    return (
        <Card title={`${mode === "create" ? "Create" : "Edit"} Brand`}>
            <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={data}>
                <Form.Item
                    label="Name"
                    name='name'
                    validateStatus={errors.name ? "error" : ""}
                    help={errors.name}
                >
                    <Input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Slug"
                    validateStatus={errors.slug ? "error" : ""}
                    help={errors.slug}
                >
                    <Input
                        value={data.slug}
                        onChange={(e) => setData("slug", e.target.value)}
                        placeholder="auto-generated if blank"
                    />
                </Form.Item>

                <Form.Item label="Description">
                    <Input.TextArea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        rows={4}
                    />
                </Form.Item>

                <Form.Item label="Status">
                    <Select
                        value={data.status}
                        onChange={(val) => setData("status", val)}
                    >
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Logo"
                    validateStatus={errors.logo_file ? "error" : ""}
                    help={errors.logo_file}
                >
                    <Upload
                        beforeUpload={(file) => {
                            if (file instanceof File) {
                                setData("logo_file", file) // ✅ raw File
                            } else if ((file as any).originFileObj) {
                                setData("logo_file", (file as any).originFileObj) // ✅ fallback
                            }
                            return false
                        }}
                        maxCount={1}
                        listType="picture"
                        accept="image/*"
                    >
                        <Button icon={<UploadOutlined />}>Upload Logo</Button>
                    </Upload>

                    {/* Show preview for existing logo */}
                    {brand?.logo && !data.logo_file && (
                        <div className="mt-2">
                            <img
                                src={`/storage/${brand.logo}`}
                                alt="Brand Logo"
                                className="h-16"
                            />
                        </div>
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={processing}>
                        {mode === "create" ? "Create Brand" : "Update Brand"}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
