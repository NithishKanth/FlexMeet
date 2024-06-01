'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { useGetCallById } from '../../../../../hooks/useGetCallById'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'

const Table =({title,description})=>(
  <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='text-base font-medium text-sky-100 lg:text-xl xl:min-w-32'>{title}</h1>
    <h1 className='max-sm:truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>{description}</h1>
  </div>
)
const PersonalRoom = () => {
  const { user } = useUser();
  const meetindId = user?.id;
  const meetingLink = `http://localhost:3000/meeting/${meetindId}?personal=true`;
  
  const { call } = useGetCallById(meetindId);
  const client = useStreamVideoClient();
  const router = useRouter();

  const startRoom = async()=>{
    if(!client || !user) return;

    if(!call){
      const newCall = client.call('default',meetindId);
      const desc = user.username+' personal room';
      await newCall.getOrCreate({
        data:{
          starts_at: new Date().toISOString(),
          custom:{
            desc
          }
        }
      })
    }
    router.push(`/meeting/${meetindId}?personal=true`)
  }
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        Personal Room
      </h1>
      <div className='flex w-full flex-1 gap-8 flex-col xl:max-w-[900px] '>
        <Table title={"Topic: "} description={`${user?.username}'s meeting Room`}/>
        <Table title={"Meeting Id: "} description={`${meetindId}!`}/>
        <Table title={"Invite Link: "} description={`${meetingLink}`}/>
      </div>
      <div className='flex gap-5'>
        <Button className="bg-blue-700 hover:bg-blue-400 rounded-[10px]" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button className="bg-dark-1 rounded-[10px] hover:bg-black" onClick={()=>{
          navigator.clipboard.writeText(meetingLink);
        }}>
          Copy Code
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom