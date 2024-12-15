import { File, Search, X } from "lucide-react";
import React from "react";
import { MenuItem } from "./atomic/MenuItem";
import Logo from "./atomic/Logo";
import { FileTextIcon, HomeIcon, RocketIcon } from "@radix-ui/react-icons";

interface MenuModalProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const MenuModal = ({ isMenuOpen, setIsMenuOpen }: MenuModalProps) => {
    return (
        <React.Fragment>
            {isMenuOpen && (
                <div id="menu-modal-bg" className="flex items-center justify-center absolute top-0 left-0 right-0 w-full h-full bg-neutral-900/60 backdrop-blur-md z-[9999] animate-[fadeIn_0.3s_ease-in-out] px-3 md:px-0">
                    <div id="menu-modal" className="flex flex-col gap-3 pb-3 max-w-xl w-full h-fit bg-neutral-800/65 rounded-lg animate-[slideDown_0.3s_ease-in-out] opacity-0 translate-y-[-20px] motion-safe:animate-[slideDown_0.3s_ease-in-out_forwards]">
                        <div className="inline-flex items-center w-full px-3 py-2 border-b border-neutral-800">
                            <Search className="size-6 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-transparent text-white w-full p-2 focus:outline-none"
                            />
                            <button onClick={() => setIsMenuOpen(false)} className="bg-neutral-900/50 p-3 rounded-md hover:bg-neutral-900/80 transition-colors">
                                <X className="size-6 text-white" />
                            </button>
                        </div>
                        <MenuItem href="https://resume.onursedef.dev" icon={<Logo className="size-8 text-white" />} text="Resume" />
                        <MenuItem href="/" icon={<HomeIcon className="size-8 text-white" />} text="Home" />
                        <MenuItem href="/blog" icon={<FileTextIcon className="size-8 text-white" />} text="Blog" />
                        <MenuItem href="/projects" icon={<RocketIcon className="size-8 text-white" />} text="Projects" />
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}