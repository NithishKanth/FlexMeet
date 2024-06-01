'use client'
import React from 'react'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { SideBarLinks } from '../../constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'



const MobileNav = () => {
    const pathName = usePathname();
  return (
    <section>
        <Sheet>
            <SheetTrigger asChild>
                <Image 
                    src="/icons/hamburger.svg"
                    width={36}
                    height={36}
                    className='cursor-pointer sm:hidden'
                />
            </SheetTrigger>
            <SheetContent side="left" className="border-none bg-dark-1">
                <SheetClose asChild>
                    <Link href='/' className='flex items-center gap-3'>
                        <Image src={'/icons/logo.svg'}
                            width={34}
                            height={34}
                            className='max-sm:size-10 border-2 p-1 rounded-md bg-white'
                        />
                        <div className='font-semibold text-2xl text-white'>FlexMeet</div>
                    </Link>
                </SheetClose>
                <div className='flex flex-col h-[calc(100vh-72px)] justify-between overflow-y-auto'>
                    <SheetClose asChild>
                        <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                        {SideBarLinks.map((lnk,index)=>{
                            const isActive = pathName===(lnk.route);
                            return(
                                <SheetClose asChild>
                                    <Link 
                                        href={lnk.route}
                                        key={index}
                                        className={cn('flex gap-4 items-center p-4 rounded-lg font-medium justify-start',{
                                            'bg-dark-2':isActive
                                        })}
                                    >
                                        <Image
                                            src={lnk.imgUrl}
                                            alt={lnk.label}
                                            width={24}
                                            height={24}
                                        />
                                        <div className=''>{lnk.label}</div>
                                    </Link>
                                </SheetClose>
                            )
                        })}
                        </section>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav