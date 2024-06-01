import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex justify-between z-50 fixed top-0 w-full bg-dark-1 px-7 py-6 lg:px-10'>
      <Link href='/' className='flex items-center gap-3'>
        <Image src={'/icons/logo.svg'}
          width={34}
          height={34}
          className='max-sm:size-10 p-1 rounded-[10px] bg-white'
        />
        <div className='font-semibold text-2xl text-white max-sm:hidden'>FlexMeet</div>
      </Link>
      <div className='flex justify-between gap-5'>
        <SignedIn>
          <UserButton/>
        </SignedIn>
        <MobileNav/>
      </div>
    </nav>
  )
}

export default Navbar