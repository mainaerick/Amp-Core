import React from 'react'
import { Button, Form, Input, Select, Space, message, Card, Upload } from 'antd'
import { useForm } from '@inertiajs/react'
import { UploadOutlined } from '@ant-design/icons'
import { generateSlug } from '@/Pages/Admin/Categories/lib/actions';

type CategoryFormProps = {
    mode: 'create' | 'edit'
    category?: Category
}

const { TextArea } = Input

const CategoryForm: React.FC<CategoryFormProps> = ({ mode, category }) => {
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()

    const { data, setData, post, processing, errors } = useForm<any>({
        name: category?.name || '',
        slug: category?.slug || '',
        description: category?.description || '',
        status: category?.status || 'active',
        logo: category?.logo || '',
        logo_file: null,
        _method: mode === 'edit' ? 'put' : post, // spoof PUT for Laravel
    })

    const onFinish = () => {
        const routeName = mode === 'create' ? 'admin.categories.store' : 'admin.categories.update'
        const url = mode === "create" ? route(routeName) : route(routeName, category?.id as string)

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
                message.success(`Category ${mode === "create" ? "created" : "updated"} successfully`)
            },
            onError: (e) => {
                message.error("An error occurred. Please check the form.")
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
                    <TextArea
                        placeholder="Enter category description"
                        rows={4}
                        onChange={(e) => setData("description", e.target.value)}
                    />
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

                {/* ✅ Logo Upload */}
                <Form.Item
                    label="Logo"
                    validateStatus={errors.logo_file && 'error'}
                    help={errors.logo_file}
                >
                    <Upload
                        beforeUpload={(file) => {
                            setData("logo_file", file) // ✅ raw File
                            return false // prevent auto upload
                        }}
                        maxCount={1}
                        listType="picture"
                        accept="image/*"
                    >
                        <Button icon={<UploadOutlined />}>Upload Logo</Button>
                    </Upload>

                    {/* Show current logo if editing */}
                    {category?.logo && !data.logo_file && (
                        <div className="mt-2">
                            <img src={`/storage/${category.logo}`} alt="Category Logo" className="h-16" />
                        </div>
                    )}
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
