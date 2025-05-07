import React from "react";
import { Button, Card, Form, Input, Select, Space } from 'antd';
import { Dealer } from '@/Pages/Admin/Dealers/lib/types';

const {Option} = Select;

type Props = {
    data: Dealer;
    setData: (field: string, value: any) => void;
    onSubmit: () => void;
    processing: boolean;
    mode: "create" | "edit";
};

const DealerForm: React.FC<Props> = ({ data, setData, onSubmit, processing, mode }) => {
    const [form] = Form.useForm();

    return (
        <Card title={`${mode === 'create' ? 'Create' : 'Edit'} Dealer`}>
        <Form
            layout="vertical"
            form={form}
            onFinish={onSubmit}
            initialValues={data}
        >
            <Form.Item label="Dealer Name" name="name" rules={[{ required: true }]}>
                <Input onChange={(e) => setData("name", e.target.value)} />
            </Form.Item>

            <Form.Item label="Location" name="location">
                <Input onChange={(e) => setData("location", e.target.value)} />
            </Form.Item>

            <Form.Item label="Region" name="region">
                <Input onChange={(e) => setData("region", e.target.value)} />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
                <Input onChange={(e) => setData("phone", e.target.value)} />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
                <Input onChange={(e) => setData("email", e.target.value)} />
            </Form.Item>

            <Form.Item label="Website" name="website">
                <Input onChange={(e) => setData("website", e.target.value)} />
            </Form.Item>

            <Form.Item label="Status" name="status" rules={[{ required: true }]}>
                <Select onChange={(value) => setData("status", value)}>
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button type="default" href="/admin/dealers">Cancel</Button>
                    <Button type="primary" htmlType="submit" loading={processing}>
                        {mode === "create" ? "Create" : "Update"} Dealer
                    </Button>
                </Space>
            </Form.Item>
        </Form>
        </Card>
    );
};

export default DealerForm;
