import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from '@inertiajs/react';
import { DealersTable } from '@/Pages/Admin/Dealers/Components/DealersTable';
function Index() {
    return (
        <AdminLayout>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Authorized Dealers</h1>
                    <Button asChild>
                        <Link href="/admin/dealers/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Dealer
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="search" placeholder="Search dealers..." className="h-9" />
                        <Button type="submit" size="sm" variant="secondary">
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search</span>
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex items-center space-x-2">
                            <Select defaultValue="all">
                                <SelectTrigger className="h-9 w-[180px]">
                                    <SelectValue placeholder="Region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Regions</SelectItem>
                                    <SelectItem value="north">North</SelectItem>
                                    <SelectItem value="south">South</SelectItem>
                                    <SelectItem value="east">East</SelectItem>
                                    <SelectItem value="west">West</SelectItem>
                                    <SelectItem value="international">International</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Select defaultValue="active">
                                <SelectTrigger className="h-9 w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button variant="outline" size="sm" className="h-9">
                            <Filter className="mr-2 h-4 w-4" />
                            More Filters
                        </Button>
                    </div>
                </div>

                <DealersTable />
            </div>
        </AdminLayout>
    );
}

export default Index;
