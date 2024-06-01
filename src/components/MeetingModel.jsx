import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'
  
const MeetingModel = ({isOpen,onClose,title,buttonText,className,children,handleClick,image}) => {
  return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex w-full max-w-[520px]  flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
                <DialogHeader className={"text-2xl"}>{title}</DialogHeader>
                {children}
                <Button className={"bg-blue-700 py-6 rounded-[5px] text-[17px] focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-blue-900"} onClick={()=>{
                    handleClick()
                    onClose()
                }}>{buttonText}</Button>
            </DialogContent>
        </Dialog>

  )
}

export default MeetingModel