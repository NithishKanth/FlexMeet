'use client'

import { useUser } from '@clerk/nextjs';
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
} from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';  
import { tokenProvider } from '../actions/stream.actions';
import Loader from '@/components/Loader';


const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  
const StreamVideoProvider = ({children}) => {

    const [videoClient, setVideoClient] = useState();

    const {user,isLoaded} = useUser();
    useEffect(()=>{
        if(!user || !isLoaded ) return
        if(!apiKey) throw new Error("Stream API missing");

        const client = new StreamVideoClient({
            apiKey,
            user:{
                id:user?.id,
                name:user?.username,
                image:user?.imageUrl
            },
            tokenProvider:tokenProvider
        });

        setVideoClient(client);
    },[user,isLoaded]);

    if(!videoClient){
        return(
            <Loader />
        )
    }
    return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    );
  };
  export default StreamVideoProvider;