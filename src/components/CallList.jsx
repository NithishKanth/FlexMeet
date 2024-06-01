'use client'

import React, { useEffect, useState } from 'react'
import { useGetCalls } from '../../hooks/useGetCall'
import MeetingCard from './MeetingCard';
import Loader from './Loader';

const CallList = ({ type }) => {
    const {upcomingCalls ,endedCalls, recordings,isLoad } = useGetCalls();
    const [rec,setRec]  = useState([])

    const getCalls = () =>{
        switch(type){
            case 'ended':
                return endedCalls;
            case 'recordings':
                return rec;
            case 'UpComing':
                return upcomingCalls;
            default:
                return [];
        }
    }

    const getNoCalls = () =>{
        switch(type){
            case 'ended':
                return "No Previous Calls";
            case 'recordings':
                return "No Recordings Found";
            case 'UpComing':
                return "No Upcoming Meeting";
            default:
                return 'asas';
        }
    }

    useEffect(()=>{
        const fetchReacording = async ()=>{
            const callData = await Promise.all(
                recordings?.map((meeting)=>meeting.queryRecordings())??[],
            );

            const Recordings = callData
                .filter((call)=>call.recordings.length>0)
                .flatMap((call)=>call.recordings);

            setRec(Recordings);
            console.log("recordings : ",Recordings);
        }
        if(type.includes("recordings")){
            fetchReacording();
        }
    },[type,recordings]);


    if(isLoad){
        <Loader/>
    }
    const calls = getCalls();


  return (
    <div className='w-full lists'>
        {calls && calls.length > 0 ? calls.map((meet)=>(
            <MeetingCard 
                title={(type.includes("recordings")?"Recording":meet.state.custom$.source._value.description)}
                createdAt={
                    (type.includes("recordings")?meet.start_time:(type.includes("UpComing")?meet.state.startsAt:meet.state.createdAt))
                }
                link={((type.includes("recordings"))?"./icons/recordings.svg":(type.includes('ended')?'./icons/previous.svg':'./icons/upcoming.svg'))}
                type={type} 
                meet={meet}
            />
        )):
        (
            <h1 className='text-2xl'>{getNoCalls()}</h1>
        )
        }
    </div>
  )
}

export default CallList