'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const Card = ({url,heading,para,color,str,handleClick}) => {
  return (
    <div className={`${color} flex flex-col justify-between xl:max-w-[270px] min-h-[260px] rounded-[14px] px-6 py-7`}
      onClick={()=>{
        handleClick()
      }}
    >
        <div className='glassmorphism size-16 grid place-content-center rounded-[8px]'>
            <Image
                src={url}
                width={27}
                height={27}
            />
        </div>
        <div className='flex flex-col gap-2'>
            <h1 className='text-2xl'>{heading}</h1>
            <p className='text-[18px]'>{para}</p>
        </div>
    </div>
  )
}

export default Card