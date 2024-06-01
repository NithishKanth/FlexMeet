'use client'
import React from 'react'
import { SideBarLinks } from '../../constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
const SideBar = () => {

    const pathName = usePathname();
  return (
    <section className='sticky left-0 top-0 h-screen w-fit flex flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
        <div className='flex flex-col gap-3'>
            {SideBarLinks.map((lnk,index)=>{
                const isActive = pathName===(lnk.route);
                return(
                    <Link 
                        href={lnk.route}
                        key={index}
                        className={cn('flex gap-4 items-center p-4 rounded-[10px] font-medium justify-start',{
                            'bg-dark-2':isActive
                        })}
                    >
                        <Image
                            src={lnk.imgUrl}
                            alt={lnk.label}
                            width={24}
                            height={24}
                        />
                        <div className='hidden md:block'>{lnk.label}</div>
                    </Link>
                )
            })}
        </div>
    </section>
  )
}

export default SideBar