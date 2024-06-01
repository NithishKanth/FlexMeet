import Navbar from '@/components/Navbar'
import SideBar from '@/components/SideBar'
import React from 'react'

const HomeLayout = ({children}) => {
  return (
    <main className='relative'>
        <Navbar/>
        <div className='flex'>
            <SideBar/>

            <section className='flex min-h-screen flex-1 flex-col px-10 pb-6 pt-28 max-md:pb-14 sm:px-13'>
                <div className='w-full'>
                    {children}
                </div>
            </section>
        </div>
    </main>
  )
}

export default HomeLayout