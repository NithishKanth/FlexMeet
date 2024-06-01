import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const MeetingCard = ({title,createdAt,link,type,meet}) => {
  function getTime(date){
    const Time =  new Date(date);
    const str = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(Time)
    const Start = Time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    return str+" "+Start;
  }
  const router = useRouter();
  return (
    <div className='bg-dark-1 rounded-[10px] px-6 py-9 flex flex-col gap-2'>
      <Image  src={link} width={27} height={27} className='mb-3'/>
      <div className='text-2xl mb-1'>{title}</div>
      <div className='text-[15px] text-gray-200'>{getTime(createdAt)}</div>
      {(type.includes("UpComing")?
        (
          <div>
            <Button className="bg-blue-800 hover:bg-blue-500 px-10 py-3 rounded-[10px] mt-5"
              onClick={()=>{
                router.push(`/meeting/${meet.id}`)
              }}
            >Join</Button>
          </div>
        )
        :
        (
          <></>
        )
    )}
     {(type.includes("recordings")?
        (
          <div>
            <Button className="bg-blue-800 hover:bg-blue-500 px-10 py-3 rounded-[10px] mt-5"
              onClick={()=>{
                router.push(meet.url);
              }}
            >Play</Button>
          </div>
        )
        :
        (
          <></>
        )
    )}
    </div>
  )
}

export default MeetingCard