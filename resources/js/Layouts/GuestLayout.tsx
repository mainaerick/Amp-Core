import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';
import SiteHeader from '@/Components/SiteHeader';
import SiteFooter from '@/Components/SiteFooter';

export default function Guest({ children }: PropsWithChildren) {
    return (
        // <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">

            <div className=" flex flex-col min-h-screen">
                <SiteHeader/>
                {children}
                <SiteFooter/>
            </div>
        // </div>
    );
}
