'use client'
import MeetingTypes from '@/components/MeetingTypes';
import React, { useEffect, useState } from 'react'
import { useGetCalls } from '../../../../hooks/useGetCall';
import { Call } from '@stream-io/video-react-sdk';

const Home = () => {

  const [currentTime, setCurrentTime] = useState(new Date());
  const [callDetails,setCallDetails] = useState(null)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const time = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(currentTime);

  const { upcomingCalls } = useGetCalls();
  function getTime(date){
    const Time =  new Date(date);
    const Start = Time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    return Start;
  }
  return (
    <section className='flex flex-col text-white'>
        <div className='h-[300px] w-full rounded-[20px] flex flex-col justify-between px-6 py-6 hero mb-10'>
          <div className='text-[15px] bg-gray-700 w-fit px-4 py-2 rounded-[10px] flex gap-2'>
            UpComing Meeting at : {(upcomingCalls.length===0)?"None":
            <div className='flex gap-2'>{upcomingCalls.map((call)=>{
              return(
                <div>{getTime(call.state.startsAt)}</div>
              )
            })}</div>}
          </div>
          <div className=''>
          < div className='text-3xl font-semibold'>{time}</div>
            <div className='text-2xl'>{date}</div>
        </div>
        </div>
        <MeetingTypes/>
    </section>
  )
}

export default Home