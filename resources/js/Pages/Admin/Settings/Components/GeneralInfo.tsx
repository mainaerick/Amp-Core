import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { TabsContent } from '@/components/ui/tabs';

function GeneralInfo({ formData,handleChange,saveSettings,isLoading,errors }) {
    return (
        <TabsContent value="general">
            <Card>
                <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Manage your store's general settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="store-name">Store Name</Label>
                            <Input
                                id="store-name"
                                value={formData?.general.storeName}
                                onChange={(e) => handleChange('general', 'storeName', e.target.value)}
                                error={errors?.['general.storeName']}
                            />
                            {errors?.['general.storeName'] && (
                                <p className="text-sm text-red-500">{errors['general.storeName']}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="store-url">Store URL</Label>
                            <Input
                                id="store-url"
                                value={formData?.general.storeUrl}
                                onChange={(e) => handleChange('general', 'storeUrl', e.target.value)}
                                error={errors?.['general.storeUrl']}
                            />
                            {errors?.['general.storeUrl'] && (
                                <p className="text-sm text-red-500">{errors['general.storeUrl']}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="store-description">Store Description</Label>
                        <Textarea
                            id="store-description"
                            value={formData?.general.storeDescription}
                            onChange={(e) => handleChange('general', 'storeDescription', e.target.value)}
                            className="min-h-[100px]"
                            error={errors?.['general.storeDescription']}
                        />
                        {errors?.['general.storeDescription'] && (
                            <p className="text-sm text-red-500">{errors['general.storeDescription']}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="admin-email">Admin Email</Label>
                            <Input
                                id="admin-email"
                                type="email"
                                value={formData?.general.adminEmail}
                                onChange={(e) => handleChange('general', 'adminEmail', e.target.value)}
                                error={errors?.['general.adminEmail']}
                            />
                            {errors?.['general.adminEmail'] && (
                                <p className="text-sm text-red-500">{errors['general.adminEmail']}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Select
                                value={formData?.general.country}
                                onValueChange={(value) => handleChange('general', 'country', value)}
                            >
                                <SelectTrigger id="country">
                                    <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="us">United States</SelectItem>
                                    <SelectItem value="ca">Canada</SelectItem>
                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                    <SelectItem value="au">Australia</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Select
                                value={formData?.general.currency}
                                onValueChange={(value) => handleChange('general', 'currency', value)}
                            >
                                <SelectTrigger id="currency">
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="usd">USD ($)</SelectItem>
                                    <SelectItem value="cad">CAD ($)</SelectItem>
                                    <SelectItem value="gbp">GBP (£)</SelectItem>
                                    <SelectItem value="eur">EUR (€)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Select
                                value={formData?.general.timezone}
                                onValueChange={(value) => handleChange('general', 'timezone', value)}
                            >
                                <SelectTrigger id="timezone">
                                    <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="est">Eastern Time (ET)</SelectItem>
                                    <SelectItem value="cst">Central Time (CT)</SelectItem>
                                    <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                                    <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="maintenance-mode"
                            checked={formData?.general.maintenanceMode}
                            onCheckedChange={(checked) => handleChange('general', 'maintenanceMode', checked)}
                        />
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setShowConfirmation(true)}>
                        Reset to Defaults
                    </Button>
                    <Button onClick={() => saveSettings('general')} disabled={isLoading}>
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

export default GeneralInfo;
