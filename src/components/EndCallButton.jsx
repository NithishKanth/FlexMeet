'use client'

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter();

    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant  = useLocalParticipant();

    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId == call.state.createdBy.id;


    if(!isMeetingOwner) return null;
  return (
    <Button className="bg-red-500 rounded-2xl px-7 hover:bg-red-400" onClick={async()=>{
        await call.endCall();
        router.push('/');
    }}>End Meeting</Button>
  )
}

export default EndCallButton