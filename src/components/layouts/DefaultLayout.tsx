"use client";
import './DefaultLayout.css';
import { useLayoutEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { MenuModal } from '@/components/MenuModal';
import Blob1 from '@/lib/assets/img/blob_1.svg';
import Blob2 from '@/lib/assets/img/blob_2.svg';
import Blob3 from '@/lib/assets/img/blob_3.svg';
import Blob4 from '@/lib/assets/img/blob_4.svg';
import Taksim from "@/lib/assets/img/taksim.png";
import { Command } from 'lucide-react';
import { WeatherAndTime } from '@/components/atomic/WeatherAndTime';
import { NowPlaying } from '@/components/atomic/NowPlaying';
import { XCom } from '@/components/atomic/XCom';
import { LinkedIn } from '@/components/atomic/Linkedin';
import { GitHub } from '@/components/atomic/Github';
import { Kick } from '@/components/atomic/Kick';
import { Medium } from '@/components/atomic/Medium';
import { Youtube } from '@/components/atomic/Youtube';
import React from 'react';

interface DefaultLayoutProps {
    children: React.ReactNode;
    backgroundImage?: StaticImageData | string;
    title?: string;
    isHome: boolean;
}


export default function DefaultLayout({ title, backgroundImage, children, isHome }: DefaultLayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useLayoutEffect(() => {
        if (isMenuOpen) {
            var menuModalBg = document.getElementById('menu-modal-bg');

            menuModalBg?.addEventListener('click', (e: Event) => {
                // check if the click is outside the menu
                if (e.target === menuModalBg) {
                    setIsMenuOpen(false);
                }
            });

            document.addEventListener('keydown', (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    setIsMenuOpen(false);
                }
            })
        }
    })
    return (
        <React.Fragment>
            <div className={`flex relative flex-col items-center overflow-x-clip ${!isMenuOpen && 'pb-20'} ${isMenuOpen ? 'w-screen h-screen overflow-hidden' : 'min-h-screen overflow-y-clip'}`}>
                <MenuModal isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <div className="absolute top-0 left-0 right-0 w-full h-64 bg-gradient-to-t from-neutral-900 to-transparent">
                </div>
                <Image
                    src={Blob4}
                    alt="Blob"
                    className="block absolute -left-36 -rotate-12 top-64 object-cover text-black select-none pointer-events-none md:hidden"
                />
                <Image
                    src={Blob1}
                    alt="Blob"
                    className="absolute top-1/3 -right-1/2 md:right-1/2 md:top-64 -rotate-12 md:-translate-x-1/4  object-cover text-black select-none pointer-events-none"
                />
                <Image
                    src={Blob2}
                    alt="Blob"
                    className="absolute -bottom-36 -right-1/2  md:top-48 md:-right-44 object-cover text-black select-none pointer-events-none"
                />
                <Image
                    src={Blob3}
                    alt="Blob"
                    className="absolute bottom-36 -left-1/2 rotate-90 md:rotate-0 md:-bottom-56 md:left-1/2 object-cover text-black select-none pointer-events-none"
                />
                <div className="max-w-3xl absolute top-0 left-auto right-auto w-full p-4 h-64">
                    <div className="flex flex-col w-full items-end h-full justify-between">
                        <div className="flex justify-end">
                            <button onClick={() => setIsMenuOpen(true)} className="bg-black/70 p-3 rounded-md hover:bg-black/80 transition-colors">
                                <Command className="size-6 text-white" />
                            </button>
                        </div>
                        <div className="w-full flex justify-end md:justify-between items-end">
                            {isHome ? <p className="ml-40 text-2xl hidden md:block">Hello, I am <span className="font-bold">Onur</span> 👋</p> : <p className='text-3xl hidden md:block'>{title}</p>}
                            <WeatherAndTime />
                        </div>
                    </div>
                    <div className="relative top-6">
                        {isHome ? <p className="ml-40 text-xl sm:text-2xl block md:hidden">Hello, I am <span className="font-bold">Onur</span> 👋</p> : <p className='text-xl sm:text-2xl block md:hidden'>{title}</p>}
                    </div>
                    {isHome && (
                        <div className="flex relative bottom-20 md:bottom-16 w-fit h-fit">
                            <Image
                                src="https://secure.gravatar.com/avatar/538d2b19430c2f5bc9ae69620620d8a6?s=512&d=mm&r=g"
                                width={512}
                                height={512}
                                alt="Onur Sedef"
                                className="w-32 h-32 rounded-full object-cover z-10 pointer-events-none select-none"
                            />
                            <Image
                                src="https://secure.gravatar.com/avatar/538d2b19430c2f5bc9ae69620620d8a6?s=512&d=mm&r=g"
                                width={512}
                                height={512}
                                alt="Onur Sedef"
                                className="absolute top-0 rounded-full blur-md z-0 pointer-events-none select-none" />
                        </div>
                    )}
                </div>
                <Image src={backgroundImage ?? Taksim} alt="Taksim" className="h-64 w-full object-cover pointer-events-none select-none" />
                {isHome && (
                    <div className="max-w-3xl w-full h-full inline-flex justify-end md:mt-0 mt-20 md:px-0 px-3 z-10">
                        <div className="max-w-[37rem] border border-neutral-700 bg-neutral-900/50 p-4 rounded-lg w-full h-fit">
                            <p>Hey there! I’m a back-end developer @ <a href="https://ottoo.com" className='font-semibold'>ottoo</a> with 2.5+ years of experience building scalable apps and automating workflows.</p>
                        </div>
                    </div>
                )}
                <div className={`max-w-[46rem] w-full h-full ${isHome ? 'mt-12' : 'mt-5'} flex flex-col z-[110] px-3 md:px-0`}>
                    {children}
                </div>
                <div className="relative flex flex-col w-full items-center mt-auto">
                    <div className={`flex items-center gap-4 my-10 w-full`}>
                        <div className="w-full h-px bg-neutral-600 block"></div>
                        <NowPlaying />
                        <div className="w-full h-px bg-neutral-600 block"></div>
                    </div>
                    <div className="mt-auto max-w-[46rem] w-full h-fit grid grid-cols-2 md:grid-cols-3 gap-5 px-3 md:px-0 ">
                        <XCom />
                        <LinkedIn />
                        <GitHub />
                        <Kick />
                        <Medium />
                        <Youtube />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
