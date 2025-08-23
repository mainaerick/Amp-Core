import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { TimeInput } from '@/Pages/Admin/Settings/Components/TimeInput';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { TabsContent } from '@/components/ui/tabs';

function StoreHoursInfo({ formData,handleChange,saveSettings,isLoading,errors }) {
    return (
        <TabsContent value="hours">
            <Card>
                <CardHeader>
                    <CardTitle>Opening Hours</CardTitle>
                    <CardDescription>Set your store's opening hours.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Monday */}
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="monday-open"
                                checked={formData?.hours.monday.isOpen}
                                onCheckedChange={(checked) => handleHoursChange('monday', 'isOpen', checked)}
                            />
                            <Label htmlFor="monday-open">Monday</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <TimeInput
                                value={formData?.hours.monday.open}
                                onChange={(value) => handleHoursChange('monday', 'open', value)}
                                disabled={!formData?.hours.monday.isOpen}
                                label="Open"
                            />
                            <span className="text-muted-foreground">to</span>
                            <TimeInput
                                value={formData?.hours.monday.close}
                                onChange={(value) => handleHoursChange('monday', 'close', value)}
                                disabled={!formData?.hours.monday.isOpen}
                                label="Close"
                            />
                        </div>
                    </div>

                    {/* Tuesday */}
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="tuesday-open"
                                checked={formData?.hours.tuesday.isOpen}
                                onCheckedChange={(checked) => handleHoursChange('tuesday', 'isOpen', checked)}
                            />
                            <Label htmlFor="tuesday-open">Tuesday</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <TimeInput
                                value={formData?.hours.tuesday.open}
                                onChange={(value) => handleHoursChange('tuesday', 'open', value)}
                                disabled={!formData?.hours.tuesday.isOpen}
                                label="Open"
                            />
                            <span className="text-muted-foreground">to</span>
                            <TimeInput
                                value={formData?.hours.tuesday.close}
                                onChange={(value) => handleHoursChange('tuesday', 'close', value)}
                                disabled={!formData?.hours.tuesday.isOpen}
                                label="Close"
                            />
                        </div>
                    </div>

                    {/* Wednesday */}
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="wednesday-open"
                                checked={formData?.hours.wednesday.isOpen}
                                onCheckedChange={(checked) => handleHoursChange('wednesday', 'isOpen', checked)}
                            />
                            <Label htmlFor="wednesday-open">Wednesday</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <TimeInput
                                value={formData?.hours.wednesday.open}
                                onChange={(value) => handleHoursChange('wednesday', 'open', value)}
                                disabled={!formData?.hours.wednesday.isOpen}
                                label="Open"
                            />
                            <span className="text-muted-foreground">to</span>
                            <TimeInput
                                value={formData?.hours.wednesday.close}
                                onChange={(value) => handleHoursChange('wednesday', 'close', value)}
                                disabled={!formData?.hours.wednesday.isOpen}
                                label="Close"
                            />
                        </div>
                    </div>

                    {/* Thursday */}
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="thursday-open"
                                checked={formData?.hours.thursday.isOpen}
                                onCheckedChange={(checked) => handleHoursChange('thursday', 'isOpen', checked)}
                            />
                            <Label htmlFor="thursday-open">Thursday</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <TimeInput
                                value={formData?.hours.thursday.open}
                                onChange={(value) => handleHoursChange('thursday', 'open', value)}
                                disabled={!formData?.hours.thursday.isOpen}
                                label="Open"
                            />
                            <span className="text-muted-foreground">to</span>
                            <TimeInput
                                value={formData?.hours.thursday.close}
                                onChange={(value) => handleHoursChange('thursday', 'close', value)}
                                disabled={!formData?.hours.thursday.isOpen}
                                label="Close"
                            />
                        </div>
                    </div>

                    {/* Friday */}
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="friday-open"
                                checked={formData?.hours.friday.isOpen}
                                onCheckedChange={(checked) => handleHoursChange('friday', 'isOpen', checked)}
                            />
                            <Label htmlFor="friday-open">Friday</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <TimeInput
                                value={formData?.hours.friday.open}
                                onChange={(value) => handleHoursChange('friday', 'open', value)}
                                disabled={!formData?.hours.friday.isOpen}
                                label="Open"
                            />
                            <span className="text-muted-foreground">to</span>
                            <TimeInput
                                value={formData?.hours.friday.close}
                                onChange={(value) => handleHoursChange('friday', 'close', value)}
                                disabled={!formData?.hours.friday.isOpen}
                                label="Close"
                            />
                        </div>
                    </div>

                    {/* Saturday */}
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="saturday-open"
                                checked={formData?.hours.saturday.isOpen}
                                onCheckedChange={(checked) => handleHoursChange('saturday', 'isOpen', checked)}
                            />
                            <Label htmlFor="saturday-open">Saturday</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <TimeInput
                                value={formData?.hours.saturday.open}
                                onChange={(value) => handleHoursChange('saturday', 'open', value)}
                                disabled={!formData?.hours.saturday.isOpen}
                                label="Open"
                            />
                            <span className="text-muted-foreground">to</span>
                            <TimeInput
                                value={formData?.hours.saturday.close}
                                onChange={(value) => handleHoursChange('saturday', 'close', value)}
                                disabled={!formData?.hours.saturday.isOpen}
                                label="Close"
                            />
                        </div>
                    </div>

                    {/* Sunday */}
                    <div className="flex items-center justify-between pb-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="sunday-open"
                                checked={formData?.hours.sunday.isOpen}
                                onCheckedChange={(checked) => handleHoursChange('sunday', 'isOpen', checked)}
                            />
                            <Label htmlFor="sunday-open">Sunday</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <TimeInput
                                value={formData?.hours.sunday.open}
                                onChange={(value) => handleHoursChange('sunday', 'open', value)}
                                disabled={!formData?.hours.sunday.isOpen}
                                label="Open"
                            />
                            <span className="text-muted-foreground">to</span>
                            <TimeInput
                                value={formData?.hours.sunday.close}
                                onChange={(value) => handleHoursChange('sunday', 'close', value)}
                                disabled={!formData?.hours.sunday.isOpen}
                                label="Close"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 pt-4">
                        <Label htmlFor="hours-note">Special Hours Note</Label>
                        <Textarea
                            id="hours-note"
                            placeholder="e.g., Closed on public holidays"
                            value={formData?.hours.specialNote}
                            onChange={(e) => handleChange('hours', 'specialNote', e.target.value)}
                            className="min-h-[80px]"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setShowConfirmation(true)}>
                        Reset to Defaults
                    </Button>
                    <Button onClick={() => saveSettings('hours')} disabled={isLoading}>
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

export default StoreHoursInfo;
