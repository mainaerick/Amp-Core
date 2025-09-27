import React, { useEffect, useState } from 'react';
import { useForm } from "@inertiajs/react"
import { Button, Form, Input, Select, Upload, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { Brand } from '@/Pages/Admin/Brands/Core/types';

type Props = {
    brand?: Brand
    mode: "create" | "edit"
}

export default function BrandForm({ brand, mode }: Props) {
    const [form] = Form.useForm()
    const { data,
        setData,
        post,
        put,
        processing,
        errors,
    } = useForm<Brand|any>({
        name: brand?.name || "",
        slug: brand?.slug || "",
        description: brand?.description || "",
        status: brand?.status || "active",
        logo: brand?.logo || "",
        logo_file: undefined,
    })



    const handleSubmit = async () => {
        const routeName = mode === 'create' ? 'admin.brands.store' : 'admin.brands.update'
        const url = mode === 'create' ? route(routeName) : route(routeName, brand?.id as string)

        const method = mode === 'create' ? post : put

        method(url, {
            onSuccess: () => {
                message.success(`Brand ${mode === 'create' ? 'created' : 'updated'} successfully`)
            },
            onError: (e) => {
                message.error('An error occurred. Please check the form.')
                console.error(e)
            },
        })
    }
    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={data}>
            <Form.Item name="name" label="Name" required validateStatus={errors.name ? "error" : ""} help={errors.name}>
                <Input onChange={(e) => setData("name", e.target.value)} />
            </Form.Item>

            <Form.Item name="slug" label="Slug" validateStatus={errors.slug ? "error" : ""} help={errors.slug}>
                <Input onChange={(e) => setData("slug", e.target.value)} placeholder="auto-generated if blank" />
            </Form.Item>

            <Form.Item label="Description" name="description">
                <Input.TextArea value={data.description} onChange={(e) => setData("description", e.target.value)} rows={4} />
            </Form.Item>

            <Form.Item label="Status" name="status">
                <Select value={data.status} onChange={(val) => setData("status", val)}>
                    <Select.Option value="active">Active</Select.Option>
                    <Select.Option value="inactive">Inactive</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="Logo" validateStatus={errors.logo ? "error" : ""} help={errors.logo}>
                <Upload
                    beforeUpload={(file) => {
                        setData("logo_file", file)
                        return false // prevent auto upload
                    }}
                    maxCount={1}
                    listType="picture"
                >
                    <Button icon={<UploadOutlined />}>Upload Logo</Button>
                </Upload>
                {data.logo && (
                    <div className="mt-2">
                        <img src={`/storage/${data.logo}`} alt="Brand Logo" className="h-16" />
                    </div>
                )}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={processing}>
                    {mode === "create" ? "Create Brand" : "Update Brand"}
                </Button>
            </Form.Item>
        </Form>
    )
}
