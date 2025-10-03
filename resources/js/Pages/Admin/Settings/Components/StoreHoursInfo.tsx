import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TimeInput } from "@/Pages/Admin/Settings/Components/TimeInput";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import Swal from "sweetalert2";

type Day =
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";

interface DayHours {
    isOpen: boolean;
    open: string;
    close: string;
}

interface HoursData {
    monday: DayHours;
    tuesday: DayHours;
    wednesday: DayHours;
    thursday: DayHours;
    friday: DayHours;
    saturday: DayHours;
    sunday: DayHours;
    specialNote: string;
}

interface StoreHoursInfoProps {
    formData: {
        hours: HoursData;
    };
    handleChange: (section: string, field: string, value: any) => void;
    handleHoursChange: (day: Day, field: keyof DayHours, value: any) => void;
    saveSettings: (section: string) => void;
    isLoading: boolean;
    errors?: Record<string, string>;
}

const StoreHoursInfo: React.FC<StoreHoursInfoProps> = ({
                                                           formData,
                                                           handleChange,
                                                           handleHoursChange,
                                                           saveSettings,
                                                           isLoading,
                                                           errors,
                                                       }) => {
    const days: { key: Day; label: string }[] = [
        { key: "monday", label: "Monday" },
        { key: "tuesday", label: "Tuesday" },
        { key: "wednesday", label: "Wednesday" },
        { key: "thursday", label: "Thursday" },
        { key: "friday", label: "Friday" },
        { key: "saturday", label: "Saturday" },
        { key: "sunday", label: "Sunday" },
    ];

    const handleReset = () => {
        Swal.fire({
            title: "Reset to Defaults?",
            text: "This will reset all opening hours to default values.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reset",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                // Example reset → you can customize this
                days.forEach((d) => {
                    handleHoursChange(d.key, "isOpen", false);
                    handleHoursChange(d.key, "open", "");
                    handleHoursChange(d.key, "close", "");
                });
                handleChange("hours", "specialNote", "");
                Swal.fire("Reset!", "Store hours have been reset.", "success");
            }
        });
    };

    return (
        <TabsContent value="hours">
            <Card>
                <CardHeader>
                    <CardTitle>Opening Hours</CardTitle>
                    <CardDescription>Set your store's opening hours.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {days.map((day) => (
                        <div
                            key={day.key}
                            className="flex items-center justify-between border-b pb-4"
                        >
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id={`${day.key}-open`}
                                    checked={formData?.hours[day.key].isOpen}
                                    onCheckedChange={(checked) =>
                                        handleHoursChange(day.key, "isOpen", checked)
                                    }
                                />
                                <Label htmlFor={`${day.key}-open`}>{day.label}</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <TimeInput
                                    value={formData?.hours[day.key].open}
                                    onChange={(value) =>
                                        handleHoursChange(day.key, "open", value)
                                    }
                                    disabled={!formData?.hours[day.key].isOpen}
                                    label="Open"
                                />
                                <span className="text-muted-foreground">to</span>
                                <TimeInput
                                    value={formData?.hours[day.key].close}
                                    onChange={(value) =>
                                        handleHoursChange(day.key, "close", value)
                                    }
                                    disabled={!formData?.hours[day.key].isOpen}
                                    label="Close"
                                />
                            </div>
                        </div>
                    ))}

                    <div className="space-y-2 pt-4">
                        <Label htmlFor="hours-note">Special Hours Note</Label>
                        <Textarea
                            id="hours-note"
                            placeholder="e.g., Closed on public holidays"
                            value={formData?.hours.specialNote}
                            onChange={(e) =>
                                handleChange("hours", "specialNote", e.target.value)
                            }
                            className="min-h-[80px]"
                        />
                        {errors?.["hours.specialNote"] && (
                            <p className="text-sm text-red-500">
                                {errors["hours.specialNote"]}
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleReset}>
                        Reset to Defaults
                    </Button>
                    <Button onClick={() => saveSettings("hours")} disabled={isLoading}>
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
};

export default StoreHoursInfo;
