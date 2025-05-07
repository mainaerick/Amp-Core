import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import DealerForm from '@/Pages/Admin/Dealers/Components/DealerForm';
import { message } from 'antd';
import {Dealer} from '@/Pages/Admin/Dealers/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function Create(props) {
    const {data, setData, post, processing, errors} = useForm<Dealer>({
        name: "",
        location: "",
        region: "",
        phone: "",
        email: "",
        website: "",
        status: "active",
    });

    const handleSubmit = () => {
        post(route("dealers.store"), {
            onSuccess: () => message.success("Dealer created successfully"),
            onError: () => message.error("Error creating dealer"),
        });
    };
    return (
        <AdminLayout>
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/dealers">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">Add New Dealer</h1>
                </div>
                <DealerForm
                    data={data}
                    setData={setData}
                    onSubmit={handleSubmit}
                    processing={processing}
                    mode="create"
                />
            </div>
            </AdminLayout>
    );
}

export default Create;
