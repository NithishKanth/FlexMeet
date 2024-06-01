"use client"

import React from 'react'
import { useGetCalls } from '../../../../../hooks/useGetCall'
import CallList from '@/components/CallList';

const Recordings = () => {
  const { recordings } = useGetCalls();
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        Recordings
      </h1>
      <CallList type="recordings"/>
    </section>
  )
}

export default Recordings