'use client';
import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallState, CallingState, PaginatedGridLayout, SpeakerLayout, useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import { Copy } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LayoutList, Loader } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';


const MeetingRoom = () => {
  const path = usePathname().split('/')[2];
  const router = useRouter();
  const call = useCall();
  const SearchParams = useSearchParams();
  const isPeroanlRoom = SearchParams.get('personal')
  const [layout,setLayout] = useState('speaker-left')
  const [showParticipants,setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if(callingState === CallingState.LEFT){
    router.push('/');
  }
  if(callingState !== CallingState.JOINED){
    return <Loader/>
  }
  const CallLayout =()=>{
    switch(layout){
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition='left'/>
      default:
        return <SpeakerLayout participantsBarPosition='right'/>

    }
  }
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='ml-3 absolute z-50'>
          <Dialog >
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white text-black rounded-xl">Share</Button>
            </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-dark-2 text-white">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to join this meeting.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue={`${path}`}
                  readOnly
                />
              </div>
              <Button type="submit" className="bg-white rounded-xl text-black hover:bg-white" size="sm" 
                onClick={()=>{
                  navigator.clipboard.writeText(`${path}`)
                }}
              >
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="bg-white rounded-2xl text-black hover:outline hover:text-white">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showParticipants})}>
          <CallParticipantsList onClose={()=>{
            setShowParticipants(false);
          }}/>
        </div>
      </div>

      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
        <CallControls/>
        <div className='flex items-center'>
          <DropdownMenu>
            <div className='flex items-center'>
              <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                <LayoutList size={20} className='text-white'/>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className={'border-dark-1 bg-dark-1 text-white'}>
              {['Grid','Speaker-Left','Speaker-Right'].map((item,index)=>{
                return(
                  <div key={index}>
                    <DropdownMenuItem className="cursor-pointer" onClick={()=>{
                      setLayout(item.toLowerCase());
                    }}>
                      {item}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-dark-1"/>
                  </div>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {!isPeroanlRoom && <EndCallButton/>}
      </div>
    </section>
  )
}

export default MeetingRoom