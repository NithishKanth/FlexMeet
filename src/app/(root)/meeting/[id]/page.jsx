'use client'
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetUp from '@/components/MeetingSetUp';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React,{useState} from 'react'
import { useGetCallById } from '../../../../../hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import Loader from '@/components/Loader';

const Meeting = ({ params }) => {
  const [setUp, setsetUp] = useState(false);
  const{user,isLoaded} = useUser();
  const {call,isCallLoading} = useGetCallById(params.id);

  if(!isLoaded || isCallLoading) return <Loader />
  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!setUp ?(
            <MeetingSetUp setsetUp={setsetUp}/>
          ): (
            <MeetingRoom/>
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting