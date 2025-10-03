import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import Swal from "sweetalert2";

interface StoreSettings {
    productsPerPage: number;
    defaultSort:
        | "featured"
        | "newest"
        | "price-asc"
        | "price-desc"
        | "name-asc"
        | "name-desc";
    showOutOfStock: boolean;
    enableReviews: boolean;
    enableWishlist: boolean;
}

interface StoreInfoProps {
    formData: {
        store: StoreSettings;
    };
    handleChange: (section: string, field: keyof StoreSettings, value: any) => void;
    saveSettings: (section: string) => void;
    isLoading: boolean;
    errors?: Record<string, string>;
}

const StoreInfo: React.FC<StoreInfoProps> = ({
                                                 formData,
                                                 handleChange,
                                                 saveSettings,
                                                 isLoading,
                                                 errors,
                                             }) => {
    const handleReset = () => {
        Swal.fire({
            title: "Reset to Defaults?",
            text: "This will reset all store settings to their default values.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reset",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                handleChange("store", "productsPerPage", 12); // default
                handleChange("store", "defaultSort", "featured");
                handleChange("store", "showOutOfStock", true);
                handleChange("store", "enableReviews", true);
                handleChange("store", "enableWishlist", true);

                Swal.fire("Reset!", "Store settings have been reset.", "success");
            }
        });
    };

    return (
        <TabsContent value="store">
            <Card>
                <CardHeader>
                    <CardTitle>Store Settings</CardTitle>
                    <CardDescription>
                        Configure your store's appearance and behavior.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Products per page */}
                        <div className="space-y-2">
                            <Label htmlFor="products-per-page">Products Per Page</Label>
                            <Input
                                id="products-per-page"
                                type="number"
                                value={formData?.store.productsPerPage}
                                onChange={(e) =>
                                    handleChange("store", "productsPerPage", parseInt(e.target.value))
                                }
                            />
                            {errors?.["store.productsPerPage"] && (
                                <p className="text-sm text-red-500">
                                    {errors?.["store.productsPerPage"]}
                                </p>
                            )}
                        </div>

                        {/* Default sort order */}
                        <div className="space-y-2">
                            <Label htmlFor="default-sort">Default Sort Order</Label>
                            <Select
                                value={formData?.store.defaultSort}
                                onValueChange={(value) => handleChange("store", "defaultSort", value)}
                            >
                                <SelectTrigger id="default-sort">
                                    <SelectValue placeholder="Select sort order" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="show-out-of-stock"
                            checked={formData?.store.showOutOfStock}
                            onCheckedChange={(checked) =>
                                handleChange("store", "showOutOfStock", checked)
                            }
                        />
                        <Label htmlFor="show-out-of-stock">
                            Show Out of Stock Products
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="enable-reviews"
                            checked={formData?.store.enableReviews}
                            onCheckedChange={(checked) =>
                                handleChange("store", "enableReviews", checked)
                            }
                        />
                        <Label htmlFor="enable-reviews">Enable Product Reviews</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="enable-wishlist"
                            checked={formData?.store.enableWishlist}
                            onCheckedChange={(checked) =>
                                handleChange("store", "enableWishlist", checked)
                            }
                        />
                        <Label htmlFor="enable-wishlist">Enable Wishlist Feature</Label>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleReset}>
                        Reset to Defaults
                    </Button>
                    <Button onClick={() => saveSettings("store")} disabled={isLoading}>
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

export default StoreInfo;
