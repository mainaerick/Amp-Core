import React from "react";
import { Form, Input, Row, Col, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { TabsContent } from '@/components/ui/tabs';

interface ContactInfoProps {
    data: any;
    setData: (key: string, value: any) => void;
    onFinish: (values: any) => void;
    isLoading: boolean;
}

export default function ContactInfo({
                                        data,
                                        setData,
                                        onFinish,
                                        isLoading,
                                    }: ContactInfoProps) {
    return (
        <TabsContent value="contact">
        <Form
            layout="vertical"
            initialValues={data.contact}
            onFinish={(values) => onFinish({ contact: values })}
        >
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="companyName"
                        label="Company Name"
                        rules={[{ required: true, message: "Please enter company name" }]}
                    >
                        <Input
                            value={data.contact.companyName}
                            onChange={(e) =>
                                setData("contact", {
                                    ...data.contact,
                                    companyName: e.target.value,
                                })
                            }
                            placeholder="Soundwave Audio Ltd."
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: "Please enter phone number" }]}
                    >
                        <Input
                            value={data.contact.phone}
                            onChange={(e) =>
                                setData("contact", {
                                    ...data.contact,
                                    phone: e.target.value,
                                })
                            }
                            placeholder="+1234567890"
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item name="whatsapp" label="WhatsApp">
                        <Input
                            value={data.contact.whatsapp}
                            onChange={(e) =>
                                setData("contact", {
                                    ...data.contact,
                                    whatsapp: e.target.value,
                                })
                            }
                            placeholder="+1234567890"
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: "Please enter email address" }]}
                    >
                        <Input
                            type="email"
                            value={data.contact.email}
                            onChange={(e) =>
                                setData("contact", {
                                    ...data.contact,
                                    email: e.target.value,
                                })
                            }
                            placeholder="sales@soundwaveaudio.com"
                        />
                    </Form.Item>
                </Col>

                <Col xs={24}>
                    <Form.Item name="address" label="Address">
                        <Input
                            value={data.contact.address}
                            onChange={(e) =>
                                setData("contact", {
                                    ...data.contact,
                                    address: e.target.value,
                                })
                            }
                            placeholder="123 Audio Street, Music City"
                        />
                    </Form.Item>
                </Col>

                <Col xs={24}>
                    <Form.Item name="mapEmbed" label="Map Embed (optional)">
                        <Input
                            value={data.contact.mapEmbed}
                            onChange={(e) =>
                                setData("contact", {
                                    ...data.contact,
                                    mapEmbed: e.target.value,
                                })
                            }
                            placeholder="https://maps.google.com/embed..."
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    icon={<SaveOutlined />}
                >
                    Save Contact Info
                </Button>
            </Form.Item>
        </Form></TabsContent>
    );
}
