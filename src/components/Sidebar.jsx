"use client"

import { useContext } from "react";
import { ListVideo, Home, Inbox, Film, Lightbulb, ArrowDownToLine, Video, History, ThumbsUp, Clock, ChevronRight } from "lucide-react"
import { SidebarContext } from '@/contexts/sidebarContext';

function Sidebar() {
  const {isOpen} = useContext(SidebarContext) 

  return (
    <div className={`${isOpen?'hidden':''} w-[17%] text-sm flex flex-col gap-1 pt-2 px-4`}>
      <div className={`flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800`}>
        <Home className="p-[2px] "/>
        <span className="ml-5">Home</span>
      </div>
      <div className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <Film className="p-[2px]"/>
        <span className="ml-5">Shorts</span>
      </div>
      <div className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <Inbox className="p-[2px]"/>
        <span className="ml-5">Subscriptions</span>
      </div>
      <hr className=" my-2" />
      <div className="flex p-2 pb-0 items-center gap-2">
        <span className="text-base font-semibold">You</span>
        <ChevronRight className="p-[2px]"/>
      </div>
      <div className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <History className="p-[2px]"/>
        <span className="ml-5">History</span>
      </div>
      <div className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <ListVideo className="p-[2px]"/>
        <span className="ml-5">Playlist</span>
      </div>
      <div className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <Video className="p-[2px]"/>
        <span className="ml-5">Your videos</span>
      </div>
      <div className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <Lightbulb className="p-[2px]"/>
        <span className="ml-5">Your courses</span>
      </div>
      <div className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <Clock className="p-[2px]"/>
        <span className="ml-5">Watch Later</span>
      </div>
      <div className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <ThumbsUp className="p-[2px]"/>
        <span className="ml-5">Liked videos</span>
      </div>
      <div className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <ArrowDownToLine className="p-[2px]"/>
        <span className="ml-5">Downloads</span>
      </div>
      <hr className="bg-white my-2"/>
    </div>
  )
}

export default Sidebar