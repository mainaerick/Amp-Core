"use client"

import { BarChart, ShoppingBag, Users, Package, Settings, Layers, Home, LogOut } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { Link } from '@inertiajs/react';

export function AdminSidebar() {
    const pathname = "admin/products"

    const isActive = (path: string) => {
        return pathname === path || pathname?.startsWith(`${path}/`)
    }

    return (
        <Sidebar>
            <SidebarHeader className="flex h-14 items-center px-4">
                <Link href="/admin" className="flex items-center gap-2 font-bold">
                    <Package className="h-6 w-6" />
                    <span>Audio Gear Admin</span>
                </Link>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin")}>
                            <Link href="/admin">
                                <BarChart className="h-4 w-4" />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin/products")}>
                            <Link href="/admin/products">
                                <Package className="h-4 w-4" />
                                <span>Products</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin/categories")}>
                            <Link href="/admin/categories">
                                <Layers className="h-4 w-4" />
                                <span>Categories</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin/orders")}>
                            <Link href="/admin/orders">
                                <ShoppingBag className="h-4 w-4" />
                                <span>Orders</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin/customers")}>
                            <Link href="/admin/customers">
                                <Users className="h-4 w-4" />
                                <span>Customers</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive("/admin/settings")}>
                            <Link href="/admin/settings">
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/">
                                <Home className="h-4 w-4" />
                                <span>View Store</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/auth/logout">
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
