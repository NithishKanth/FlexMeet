import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"

export const useGetCallById = (id)=>{
    const [call, setCall] = useState();
    const[isCallLoading,setIsCallLoading] = useState(true);


    const client = useStreamVideoClient();
    useEffect(()=>{
        if(!client) return;

        const loadcall = async()=>{
            const {calls} = await client.queryCalls({
                filter_conditions:{
                    id
                }
            })
            if(calls.length>0){
                setCall(calls[0]);
            }
            setIsCallLoading(false);
        }
        loadcall();
    },[client.id])

    return {call,isCallLoading};
}