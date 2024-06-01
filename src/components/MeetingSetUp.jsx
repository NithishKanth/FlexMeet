'use client'
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetUp = ({setsetUp}) => {

  const [isMic,setMic] = useState(false);
  const cal = useCall();
  useEffect(()=>{
    if(isMic){
      cal?.camera.disable();
      cal?.microphone.disable();
    } else{
      cal?.camera.enable();
      cal?.microphone.enable();
    }
  },[isMic,cal?.camera,cal?.microphone]);
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-3 text-white'>
      <div className='font-bold text-3xl'>Meeting SetUp</div>
      <VideoPreview/>
      <div className=''>
        <label className='flex items-center gap-2 text-[17px]'>
          <input type="checkbox" checked={isMic} onChange={(e)=>{
            setMic(e.target.checked)
          }}/>
          Join with Mic and camera off
        </label>
        <DeviceSettings/>
      </div>
      <Button className="bg-blue-600 rounded-xl px-5 hover:bg-blue-700" onClick={()=>{
        cal.join();
        setsetUp(true)
      }}>Join Meeting</Button>
    </div>
  )
}

export default MeetingSetUp