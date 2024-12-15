import React, { ReactNode } from "react";

interface MenuItemProps {
    href: string;
    icon: ReactNode;
    text: string;
}

export const MenuItem = ({ href, icon, text }: MenuItemProps) => {
    return (
        <a href={href} className="px-3">
            <div className="w-full inline-flex items-center px-3 py-2 hover:bg-neutral-600/50 transition-all rounded-md">
                {icon}
                <p className="text-white p-2">{text}</p>
            </div>
        </a>
    )
}