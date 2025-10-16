"use client"

import {
    BarChart,
    Package,
    Settings,
    Layers,
    Home,
    LogOut,
    MapPin,
} from "lucide-react"
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
import { Link, usePage } from "@inertiajs/react"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
    const { url } = usePage()
    const pathname = url || ""

    const isActive = (path: string) =>
        pathname === path || pathname.startsWith(`${path}/`)

    return (
        <Sidebar className="border-r bg-white dark:bg-gray-900 dark:border-gray-800">
            {/* Header */}
            <SidebarHeader className="flex h-20 items-center border-b border-gray-100 px-6 dark:border-gray-800">
                <Link
                    href="/admin"
                    className="flex items-center gap-3 font-semibold text-lg text-gray-800 dark:text-gray-100"
                >
                    <Package className="h-7 w-7 text-indigo-600" />
                    <span>Audio Gear Admin</span>
                </Link>
            </SidebarHeader>

            {/* Main Content */}
            <SidebarContent>
                <SidebarMenu className="mt-6 space-y-2">
                    {[
                        {
                            href: "/admin/dashboard",
                            icon: BarChart,
                            label: "Dashboard",
                        },
                        {
                            href: "/admin/products",
                            icon: Package,
                            label: "Products",
                        },
                        {
                            href: "/admin/categories",
                            icon: Layers,
                            label: "Categories",
                        },
                        {
                            href: "/admin/brands",
                            icon: MapPin,
                            label: "Brands",
                        },
                        {
                            href: "/admin/settings",
                            icon: Settings,
                            label: "Settings",
                        },
                    ].map(({ href, icon: Icon, label }) => (
                        <SidebarMenuItem key={href}>
                            <SidebarMenuButton asChild isActive={isActive(href)}>
                                <Link
                                    href={href}
                                    className={cn(
                                        "flex items-center gap-4 rounded-xl px-5 py-3 text-[15px] font-medium transition-all duration-150",
                                        isActive(href)
                                            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            "h-5 w-5",
                                            isActive(href)
                                                ? "text-indigo-600 dark:text-indigo-300"
                                                : "text-gray-500 dark:text-gray-400"
                                        )}
                                    />
                                    <span>{label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarSeparator className="my-6" />

            {/* Footer */}
            <SidebarFooter className="pb-6">
                <SidebarMenu className="space-y-2">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link
                                href="/"
                                className="flex items-center gap-4 rounded-xl px-5 py-3 text-[15px] font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                <Home className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                <span>View Store</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link
                                href="/auth/logout"
                                method="post"
                                as="button"
                                className="flex w-full items-center gap-4 rounded-xl px-5 py-3 text-[15px] font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                <LogOut className="h-5 w-5 text-red-500" />
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
