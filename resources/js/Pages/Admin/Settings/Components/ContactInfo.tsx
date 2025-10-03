import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { TabsContent } from '@/components/ui/tabs';

interface Props {
    formData: any;
    handleChange: any;
    saveSettings: any;
    isLoading: any;
    errors: any;
}

function ContactInfo({
                         formData,
                         handleChange,
                         saveSettings,
                         isLoading,
                         errors,
                     }: Props) {
    return (
        <TabsContent value="contact">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                        Manage your store's contact details that appear on the website.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Company Name */}
                    <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input
                            id="company-name"
                            value={formData?.contact.companyName}
                            onChange={(e) =>
                                handleChange('contact', 'companyName', e.target.value)
                            }
                        />
                        {errors?.['contact.companyName'] && (
                            <p className="text-sm text-red-500">
                                {errors['contact.companyName']}
                            </p>
                        )}
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                            id="address"
                            value={formData?.contact.address}
                            onChange={(e) =>
                                handleChange('contact', 'address', e.target.value)
                            }
                            className="min-h-[100px]"
                        />
                        {errors?.['contact.address'] && (
                            <p className="text-sm text-red-500">
                                {errors['contact.address']}
                            </p>
                        )}
                    </div>

                    {/* Phone + WhatsApp */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={formData?.contact.phone}
                                onChange={(e) =>
                                    handleChange('contact', 'phone', e.target.value)
                                }
                            />
                            {errors?.['contact.phone'] && (
                                <p className="text-sm text-red-500">
                                    {errors['contact.phone']}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="whatsapp">WhatsApp Number</Label>
                            <Input
                                id="whatsapp"
                                value={formData?.contact.whatsapp}
                                onChange={(e) =>
                                    handleChange('contact', 'whatsapp', e.target.value)
                                }
                            />
                            {errors?.['contact.whatsapp'] && (
                                <p className="text-sm text-red-500">
                                    {errors['contact.whatsapp']}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData?.contact.email}
                            onChange={(e) =>
                                handleChange('contact', 'email', e.target.value)
                            }
                        />
                        {errors?.['contact.email'] && (
                            <p className="text-sm text-red-500">{errors['contact.email']}</p>
                        )}
                    </div>

                    {/* Map Embed */}
                    <div className="space-y-2">
                        <Label htmlFor="map-embed">Google Maps Embed Code</Label>
                        <Textarea
                            id="map-embed"
                            value={formData?.contact.mapEmbed}
                            onChange={(e) =>
                                handleChange('contact', 'mapEmbed', e.target.value)
                            }
                            placeholder="Paste your Google Maps embed code here"
                            className="min-h-[100px]"
                        />
                        <p className="text-sm text-muted-foreground">
                            This will be used to display your location on the contact page.
                        </p>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={() => {
                            // you need to define setShowConfirmation in this component or pass it as a prop
                            // currently it's missing in your Props
                        }}
                    >
                        Reset to Defaults
                    </Button>
                    <Button onClick={() => saveSettings('contact')} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </TabsContent>
    );
}

export default ContactInfo;
