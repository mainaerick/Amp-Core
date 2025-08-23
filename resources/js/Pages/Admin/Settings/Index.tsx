import React, { useState, useEffect } from "react";
import { Button, Form, Input, Row, Col, notification, Tabs } from 'antd';
import { useForm as useInertiaForm, usePage } from '@inertiajs/react';
import { SaveOutlined, LoadingOutlined } from '@ant-design/icons';

interface SettingsProps {
    settings: any; // Adjust type as needed
}

const SettingsIndex: React.FC<SettingsProps> = ({ settings }) => {
    const { data, setData, post, processing, errors, reset } = useInertiaForm<any>({
        general: {
            storeName: settings.general?.storeName || "",
            storeUrl: settings.general?.storeUrl || "",
            storeDescription: settings.general?.storeDescription || "",
            adminEmail: settings.general?.adminEmail || "",
            country: settings.general?.country || "us",
            currency: settings.general?.currency || "usd",
            timezone: settings.general?.timezone || "est",
            maintenanceMode: settings.general?.maintenanceMode || false,
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
            address: settings.contact?.address || "",
            phone: settings.contact?.phone || "",
            whatsapp: settings.contact?.whatsapp || "",
            email: settings.contact?.email || "",
            mapEmbed: settings.contact?.mapEmbed || "",
        },
        hours: {
            monday: settings.hours?.monday || { isOpen: true, open: "09:00", close: "18:00" },
            tuesday: settings.hours?.tuesday || { isOpen: true, open: "09:00", close: "18:00" },
            wednesday: settings.hours?.wednesday || { isOpen: true, open: "09:00", close: "18:00" },
            thursday: settings.hours?.thursday || { isOpen: true, open: "09:00", close: "18:00" },
            friday: settings.hours?.friday || { isOpen: true, open: "09:00", close: "18:00" },
            saturday: settings.hours?.saturday || { isOpen: false, open: "10:00", close: "16:00" },
            sunday: settings.hours?.sunday || { isOpen: false, open: "00:00", close: "00:00" },
            specialNote: settings.hours?.specialNote || "",
        },
        social: {
            facebook: settings.social?.facebook || "",
            instagram: settings.social?.instagram || "",
            twitter: settings.social?.twitter || "",
            youtube: settings.social?.youtube || "",
            linkedin: settings.social?.linkedin || "",
        },
        payment: {
            currencyFormat: settings.payment?.currencyFormat || "symbol",
            enableCreditCard: settings.payment?.enableCreditCard || true,
            enablePaypal: settings.payment?.enablePaypal || true,
            enableBankTransfer: settings.payment?.enableBankTransfer || false,
        },
        shipping: {
            enableShipping: settings.shipping?.enableShipping || true,
            enableStandard: settings.shipping?.enableStandard || true,
            enableExpress: settings.shipping?.enableExpress || true,
            enableFree: settings.shipping?.enableFree || true,
            freeShippingThreshold: settings.shipping?.freeShippingThreshold || null,
        },
        emails: {
            senderEmail: settings.emails?.senderEmail || "",
            senderName: settings.emails?.senderName || "",
            newOrder: settings.emails?.newOrder || true,
            orderStatus: settings.emails?.orderStatus || true,
            newAccount: settings.emails?.newAccount || true,
            passwordReset: settings.emails?.passwordReset || true,
        },
        users: {
            allowRegistration: settings.users?.allowRegistration || true,
            requireVerification: settings.users?.requireVerification || false,
            defaultRole: settings.users?.defaultRole || "customer",
        },
    });

    const onFinish = (values: any) => {
        post(route('admin.settings.update', { section: currentTab }), {
            ...values[currentTab], // Send only the data for the current tab
            onSuccess: () => {
                notification.success({
                    message: 'Settings Updated',
                    description: `${currentTab} settings have been updated successfully.`,
                });
            },
            onError: () => {
                notification.error({
                    message: 'Error',
                    description: 'Failed to update settings.',
                });
            },
        });
    };

    const [currentTab, setCurrentTab] = useState<string>('general');

    const handleTabChange = (key: string) => {
        setCurrentTab(key);
    };

    const initialValues = {
        general: data.general,
        store: data.store,
        contact: data.contact,
        hours: data.hours,
        social: data.social,
        payment: data.payment,
        shipping: data.shipping,
        emails: data.emails,
        users: data.users,
    };

    return (
        <div>
            {/* Ant Design Tabs */}
            <Tabs defaultActiveKey="general" onChange={handleTabChange}>
                <Tabs.TabPane tab="General" key="general">
                    <Form
                        layout="vertical"
                        initialValues={initialValues.general}
                        name="general-form"
                        onFinish={(values) => onFinish({ general: values })}
                    >
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item
                                    name="storeName"
                                    label="Store Name"
                                    rules={[{ required: true, message: 'Please input the store name!' }]}
                                >
                                    <Input onChange={(e) => setData('general.storeName', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item
                                    name="storeUrl"
                                    label="Store URL"
                                    rules={[{ required: true, message: 'Please input the store URL!', type: 'url' }]}
                                >
                                    <Input onChange={(e) => setData('general.storeUrl', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="storeDescription" label="Store Description">
                                    <Input.TextArea rows={3} onChange={(e) => setData('general.storeDescription', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item
                                    name="adminEmail"
                                    label="Admin Email"
                                    rules={[{ required: true, message: 'Please input the admin email!', type: 'email' }]}
                                >
                                    <Input onChange={(e) => setData('general.adminEmail', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item name="country" label="Country">
                                    <Input onChange={(e) => setData('general.country', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item name="currency" label="Currency">
                                    <Input onChange={(e) => setData('general.currency', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item name="timezone" label="Timezone">
                                    <Input onChange={(e) => setData('general.timezone', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="maintenanceMode" label="Maintenance Mode" valuePropName="checked">
                                    <Input type="checkbox" onChange={(e) => setData('general.maintenanceMode', e.target.checked)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={processing && currentTab === 'general'} icon={<SaveOutlined />}>
                                Save General Settings
                            </Button>
                        </Form.Item>
                    </Form>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Store" key="store">
                    <Form
                        layout="vertical"
                        initialValues={initialValues.store}
                        name="store-form"
                        onFinish={(values) => onFinish({ store: values })}
                    >
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item name="productsPerPage" label="Products Per Page" rules={[{ required: true, message: 'Please input the number of products per page!', type: 'number' }]}>
                                    <Input type="number" onChange={(e) => setData('store.productsPerPage', Number(e.target.value))} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item name="defaultSort" label="Default Sort">
                                    <Input onChange={(e) => setData('store.defaultSort', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="showOutOfStock" label="Show Out of Stock" valuePropName="checked">
                                    <Input type="checkbox" onChange={(e) => setData('store.showOutOfStock', e.target.checked)} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="enableReviews" label="Enable Reviews" valuePropName="checked">
                                    <Input type="checkbox" onChange={(e) => setData('store.enableReviews', e.target.checked)} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="enableWishlist" label="Enable Wishlist" valuePropName="checked">
                                    <Input type="checkbox" onChange={(e) => setData('store.enableWishlist', e.target.checked)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={processing && currentTab === 'store'} icon={<SaveOutlined />}>
                                Save Store Settings
                            </Button>
                        </Form.Item>
                    </Form>
                </Tabs.TabPane>

                {/* Add more Tabs.TabPane components for other settings sections (contact, hours, etc.) */}
                <Tabs.TabPane tab="Contact" key="contact">
                    <Form
                        layout="vertical"
                        initialValues={initialValues.contact}
                        name="contact-form"
                        onFinish={(values) => onFinish({ contact: values })}
                    >
                        {/* Contact form fields */}
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item name="companyName" label="Company Name">
                                    <Input onChange={(e) => setData('contact.companyName', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item name="phone" label="Phone">
                                    <Input onChange={(e) => setData('contact.phone', e.target.value)} />
                                </Form.Item>
                            </Col>
                            {/* ... other contact fields ... */}
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={processing && currentTab === 'contact'} icon={<SaveOutlined />}>
                                Save Contact Settings
                            </Button>
                        </Form.Item>
                    </Form>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Hours" key="hours">
                    <Form
                        layout="vertical"
                        initialValues={initialValues.hours}
                        name="hours-form"
                        onFinish={(values) => onFinish({ hours: values })}
                    >
                        {/* Hours form fields - you might need a more complex UI for this */}
                        <Row gutter={16}>
                            {/* Example for Monday */}
                            <Col xs={24} sm={12}>
                                <Form.Item name={['monday', 'isOpen']as any} valuePropName="checked">
                                    <Input type="checkbox" onChange={(e) => setData('hours.monday.isOpen', e.target.checked)} /> Monday Open
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Item name={['monday', 'open']} label="Open Time">
                                    <Input onChange={(e) => setData('hours.monday.open', e.target.value)} disabled={!data.hours.monday.isOpen} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Item name={['monday', 'close']} label="Close Time">
                                    <Input onChange={(e) => setData('hours.monday.close', e.target.value)} disabled={!data.hours.monday.isOpen} />
                                </Form.Item>
                            </Col>
                            {/* ... similar fields for other days ... */}
                            <Col span={24}>
                                <Form.Item name="specialNote" label="Special Note">
                                    <Input.TextArea rows={2} onChange={(e) => setData('hours.specialNote', e.target.value)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={processing && currentTab === 'hours'} icon={<SaveOutlined />}>
                                Save Hours Settings
                            </Button>
                        </Form.Item>
                    </Form>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Social" key="social">
                    <Form
                        layout="vertical"
                        initialValues={initialValues.social}
                        name="social-form"
                        onFinish={(values) => onFinish({ social: values })}
                    >
                        {/* Social form fields */}
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item name="facebook" label="Facebook URL">
                                    <Input type="url" onChange={(e) => setData('social.facebook', e.target.value)} />
                                </Form.Item>
                            </Col>
                            {/* ... other social links ... */}
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={processing && currentTab === 'social'} icon={<SaveOutlined />}>
                                Save Social Settings
                            </Button>
                        </Form.Item>
                    </Form>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Payment" key="payment">
                    <Form
                        layout="vertical"
                        initialValues={initialValues.payment}
                        name="payment-form"
                        onFinish={(values) => onFinish({ payment: values })}
                    >
                        {/* Payment form fields */}
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={12}>
                                <Form.Item name="currencyFormat" label="Currency Format">
                                    <Input onChange={(e) => setData('payment.currencyFormat', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="enableCreditCard" label="Enable Credit Card" valuePropName="checked">
                                    <Input type="checkbox" onChange={(e) => setData('payment.enableCreditCard', e.target.checked)} />
                                </Form.Item>
                            </Col>
                            {/* ... other payment options ... */}
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={processing && currentTab === 'payment'} icon={<SaveOutlined />}>
                                Save Payment Settings
                            </Button>
                        </Form.Item>
                    </Form>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Shipping" key="shipping">
                    <Form
                        layout="vertical"
                        initialValues={initialValues.shipping}
                        name="shipping-form"
                        onFinish={(values) => onFinish({ shipping: values })}
                    >
                        {/* Shipping form fields */}
                        <Row gutter={16}>

                            <Col span={24}>
                                <Form.Item name="enableShipping" label="Enable Shipping" valuePropName="checked">
                                <Input type="checkbox" onChange={(e) => setData('shipping.enableShipping', e.target.checked)} />
                            </Form.Item>
                        </Col>
                        {/* ... other shipping options ... */}
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={processing && currentTab === 'shipping'} icon={<SaveOutlined />}>
                            Save Shipping Settings
                        </Button>
                    </Form.Item>
                </Form>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Emails" key="emails">
                <Form
                    layout="vertical"
                    initialValues={initialValues.emails}
                    name="emails-form"
                    onFinish={(values) => onFinish({ emails: values })}
                >
                    {/* Emails form fields */}
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12}>
                            <Form.Item name="senderEmail" label="Sender Email" rules={[{ type: 'email', message: 'Please input a valid email!' }]}>
                                <Input onChange={(e) => setData('emails.senderEmail', e.target.value)} />
                            </Form.Item>
                        </Col>
                        {/* ... other email settings ... */}
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={processing && currentTab === 'emails'} icon={<SaveOutlined />}>
                            Save Emails Settings
                        </Button>
                    </Form.Item>
                </Form>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Users" key="users">
                <Form
                    layout="vertical"
                    initialValues={initialValues.users}
                    name="users-form"
                    onFinish={(values) => onFinish({ users: values })}
                >
                    {/* Users form fields */}
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="allowRegistration" label="Allow Registration" valuePropName="checked">
                                <Input type="checkbox" onChange={(e) => setData('users.allowRegistration', e.target.checked)} />
                            </Form.Item>
                        </Col>
                        {/* ... other user settings ... */}
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={processing && currentTab === 'users'} icon={<SaveOutlined />}>
                            Save Users Settings
                        </Button>
                    </Form.Item>
                </Form>
            </Tabs.TabPane>
        </Tabs>
</div>
);
};

export default SettingsIndex;
