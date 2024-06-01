'use client'
import { useToast } from './ui/use-toast'
import React,{ useState } from 'react'
import Card from './Card'
import { useRouter } from 'next/navigation'
import MeetingModel from './MeetingModel'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import Image from 'next/image'


const MeetingTypes = () => {


  const router = useRouter();
  const [meetstate,SetMeetState] = useState("");
  const {user} = useUser();
  const { toast } = useToast();
  const client = useStreamVideoClient();

  const [value,setValues] = useState({
    dateTime:new Date(),
    description:"",
    link:""
  });
  const [callDetails,setCallDetails] = useState(null)
  const createMeeting = async()=>{
    if(!user || !client) return;
    try {
      if(!value.dateTime){
        toast({title:"Please Select a data and time"})
      }
      const id = crypto.randomUUID();
      const call = client.call('default',id);

      if(!call) throw new Error('Error');
      const startsAt = value.dateTime.toISOString();

      const description = value.description || 'Instant Meeting';

      await call.getOrCreate({
        data:{
          starts_at:startsAt,
          custom:{
            description
          }
        }
      })
      setCallDetails(call);
      if(!value.description){
        router.push(`/meeting/${call.id}`)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const meetingLink = `http://localhost:3000/meeting/${callDetails?.id}`
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 cursor-pointer'>
      <Card
        url={'/icons/add-personal.svg'}
        heading={"New Meeting"}
        para={"Start an Instant Meeting"}
        color={"bg-orange-500"}
        str={"new-meeting"}
        handleClick={()=>{
          SetMeetState("isInstantMeeting")
        }}
      />
      <Card
        url={'/icons/join-meeting.svg'}
        heading={"Join Meeting"}
        para={"via invitation link"}
        color={"bg-Blue-1"}
        str={"join-meeting"}
        handleClick={()=>{
          SetMeetState("isJoinMeet")
        }}
      />
      <Card
        url={'/icons/schedule.svg'}
        heading={"Schedule Meeting"}
        para={"Plan your meeting"}
        color={"bg-purple-800"}
        handleClick={()=>{
          SetMeetState('isschedule');
        }}
      />
      <Card
        url={'/icons/recordings.svg'}
        heading={"View Recordings"}
        para={"check out!"}
        color={"bg-red-600"}
        handleClick={()=>{
          router.push('/recordings')
        }}
      />
      <MeetingModel
        isOpen = {meetstate.includes("isInstantMeeting")}
        onClose ={()=> SetMeetState("")}
        title={"Start an Instant Meeting"}
        className={"text-center"}
        buttonText={"Start Meeting"}
        handleClick={createMeeting}
      />
      {!callDetails ? (
        <MeetingModel 
          isOpen={meetstate.includes("isschedule")}
          onClose={()=>SetMeetState("")}
          title={"Create Meeting"}
          className={"text-center"}
          buttonText={"Create"}
          handleClick={createMeeting}
        >
          <div className='flex flex-col gap-2.5'>
            <label className='text-base font-normal leading[22.4px] text-gray-400'>Add Description:</label>
            <Textarea className="border-none bg-dark-2 resize-none rounded-xl" value={value.description} onChange={(e)=>{
              setValues({...value,description:e.target.value})
            }}/>
          </div>
          <div className='flex flex-col gap-2.5'>
            <label className='text-base font-normal leading[22.4px] text-gray-400'>Select Date and Time:</label>
            <ReactDatePicker 
              selected={value.dateTime}
              onChange={(date)=>{
                setValues({...value,dateTime:date})
              }}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='time'
              dateFormat={"MMMM d, yyyy h:mm aa"}
              className='w-full rounded bg-dark-2 p-2 focus:outline-none'
            />
          </div>
        </MeetingModel>
      ) : (
        <MeetingModel
          isOpen={meetstate.includes("isschedule")}
          onClose={()=>SetMeetState("")}
          title={"Meeting Created"}
          className={"text-center"}
          buttonText={"Copy Meeting Link"}
          handleClick={()=>{
            navigator.clipboard.writeText(meetingLink);
            toast({title:"Link Copied"})
          }}
        >
          <div className='flex items-center justify-center'>
            <Image src={'/icons/checked.svg'} width={40} height={10}/>
          </div>
        </MeetingModel>
      )}
      <MeetingModel
        isOpen={meetstate.includes("isJoinMeet")}
        onClose={()=>SetMeetState("")}
        title={"Join Meeting Room"}
        buttonText={"Join"}
        handleClick={()=>{
          router.push(`/meeting/${value.link}`)
        }}
      >
        <input type='text' className='bg-dark-2 h-10 rounded-[10px] px-5' placeholder='Enter a Code or Link' value={value.link} onChange={(e)=>{
          setValues({
            ...value,
            link:e.target.value
          })
        }}/>
      </MeetingModel>
    </section>
  )
}

export default MeetingTypes