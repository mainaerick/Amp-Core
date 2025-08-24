import React, { useEffect } from 'react'
import { Button, Form, Input, Select, Space, message, Card } from 'antd'
import { useForm } from '@inertiajs/react'
import { generateSlug } from '@/Pages/Admin/Categories/lib/actions';

type CategoryFormProps = {
    mode: 'create' | 'edit'
    category?: Category
}

const { TextArea } = Input

const CategoryForm: React.FC<CategoryFormProps> = ({ mode, category }) => {
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
    } = useForm<Category|any>({
        name: category?.name || '',
        slug: category?.slug || '',
        description: category?.description || '',
        status: category?.status || 'active',
    })

    // useEffect(() => {
    //     form.setFieldsValue(data)
    // }, [data, form])

    const onFinish = async () => {
        const routeName = mode === 'create' ? 'admin.categories.store' : 'admin.categories.update'
        const url = mode === 'create' ? route(routeName) : route(routeName, category?.id as string)

        const method = mode === 'create' ? post : put

        method(url, {
            onSuccess: () => {
                messageApi.success(`Category ${mode === 'create' ? 'created' : 'updated'} successfully`)
                window.location.href = '/admin/categories'
            },
            onError: (e) => {
                messageApi.error('An error occurred. Please check the form.')
                console.error(e)
            },
        })
    }

    const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        setData('name', name)

        if (mode === 'create' || !data.slug) {
            const slug = await generateSlug(name)
            setData('slug', slug)
            form.setFieldsValue({ slug })
        }
    }

    return (
        <Card title={`${mode === 'create' ? 'Create' : 'Edit'} Category`}>
            {contextHolder}
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={data}

            >
                <Form.Item
                    label="Name"
                    name="name"
                    validateStatus={errors.name && 'error'}
                    help={errors.name}
                    rules={[{ required: true, message: 'Please enter a name' }]}
                >
                    <Input placeholder="Enter category name" onChange={handleNameChange} />
                </Form.Item>

                <Form.Item
                    label="Slug"
                    name="slug"
                    validateStatus={errors.slug && 'error'}
                    help={errors.slug}
                    rules={[
                        { required: true, message: 'Please enter a slug' },
                        {
                            pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                            message: 'Slug must contain only lowercase letters, numbers, and hyphens',
                        },
                    ]}
                >
                    <Input placeholder="enter-slug-here" onChange={(e) => setData("slug", e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    validateStatus={errors.description && 'error'}
                    help={errors.description}
                >
                    <TextArea placeholder="Enter category description" rows={4} onChange={(e) => setData("description", e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="status"
                    validateStatus={errors.status && 'error'}
                    help={errors.status}
                    rules={[{ required: true, message: 'Please select a status' }]}
                >
                    <Select placeholder="Select status" onChange={(value) => setData("status", value)}>
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button
                            type="default"
                            onClick={() => (window.location.href = '/admin/categories')}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" loading={processing}>
                            {mode === 'create' ? 'Create' : 'Update'} Category
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default CategoryForm
