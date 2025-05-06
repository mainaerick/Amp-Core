import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from '@/Layouts/Components/AdminSidebar';
import { AdminHeader } from '@/Layouts/Components/AdminHeader';
import { usePage } from '@inertiajs/react';

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    const user = usePage().props.auth.user;
    return (
        <SidebarProvider>
            <div className="w-full flex min-h-screen bg-background">
                <AdminSidebar />
                <div className="flex flex-col flex-1">
                    <AdminHeader />
                    <main className="flex-1 p-4 md:p-6">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    )
}
