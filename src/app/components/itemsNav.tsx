'use client'


import Link from 'next/link';
import React, { JSX } from 'react';
import { usePathname } from 'next/navigation';

interface Props {
    path: string;
    icon: JSX.Element;
    title: string;
}

export const NavbarMenuItem = ({ path, icon, title }: Props) => {
    const currentPath = usePathname();
    //const isActive = currentPath === path;

    return (
        <Link href={path} className={`w-auto px-2 inline-flex space-x-2 items-center  py-3 text-gray-600 hover:text-[#776fff]  transition ease-linear duration-150 ${currentPath === path ? ' border-b-2 text-[#776fff] transition-colors' : ''}`}>
            <div>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className={`text-lg font-bold leading-5 ${currentPath === path ? ' text-[#0b0672] transition-colors' : ''}`} >{title}</span>
            </div>
        </Link>
    )
}


