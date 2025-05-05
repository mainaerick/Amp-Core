import React from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

function Index({ products }) {
    console.log(products)
    return (
        <Authenticated>
            <main className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                        <Button asChild>
                            <Link href="/admin/products/new">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Product
                            </Link>
                        </Button>
                    </div>

                    <Card>
                        <ProductsTable />
                    </Card>
                </div>
            </main>

        </Authenticated>

    );
}

export default Index;
