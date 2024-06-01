import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"

export const useGetCalls =()=>{
    const [calls,setCalls] = useState([]);
    const [isLoad,setLoad] = useState(false);
    const client = useStreamVideoClient();
    const { user } = useUser();
    useEffect(()=>{
        const LoadingCalls = async()=>{
            if(!client || !user?.id) return

            setLoad(true);
            try {
                const {calls}  = await client.queryCalls({});
                setCalls(calls.filter((call)=>call.isCreatedByMe===true))
            } catch (error) {
                console.log(error);
            } finally{
                setLoad(false);
            }
        }
        LoadingCalls();
    },[user?.id,client]);
    const now = new Date();
    const endedCalls = calls.filter(({state:{startAt,endedAt}})=>{
        return (startAt && new Date(startAt) < now || !!endedAt)
    });
    const upcomingCalls = calls.filter(({state:{startsAt}})=>{
        return (startsAt && new Date(startsAt)> now)
    });
    console.log(calls);
    return {
        endedCalls,
        upcomingCalls,
        recordings:calls,
        isLoad
    }
}

