"use client"

import { useContext } from "react";
import { ListVideo, Home, Inbox, Film, Lightbulb, ArrowDownToLine, Video, History, ThumbsUp, Clock, ChevronRight, CircleUser } from "lucide-react"
import { SidebarContext } from '@/contexts/sidebarContext';
import Link from "next/link";

function Sidebar() {
  const {isOpen} = useContext(SidebarContext) 
  
  if(isOpen){
  return (
    <div className={` w-[17%] mr-6 text-sm flex flex-col gap-1 pt-2 px-4`}>
      <Link href='/' className={`flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800`}>
        <Home className="p-[2px] "/>
        <span className="ml-5">Home</span>
      </Link>
      <Link href='/shorts' className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <Film className="p-[2px]"/>
        <span className="ml-5">Shorts</span>
      </Link>
      <Link href='/subscriptions' className="flex p-2 pr-4 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <Inbox className="p-[2px]"/>
        <span className="ml-5">Subscriptions</span>
      </Link>
      <hr className=" my-2" />
      <div className="flex p-2 cursor-default pb-0 items-center gap-2">
        <span className="text-base font-semibold">You</span>
        <ChevronRight className="p-[2px]"/>
      </div>
      <Link href='/history' className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <History className="p-[2px]"/>
        <span className="ml-5">History</span>
      </Link>
      <Link href='/playlist' className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <ListVideo className="p-[2px]"/>
        <span className="ml-5">Playlist</span>
      </Link>
      <Link href='https://studio.youtube.com/channel/UCLg-fzcvGfG0dRgJCMqNvhQ/videos/upload?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D ' className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <Video className="p-[2px]"/>
        <span className="ml-5">Your videos</span>
      </Link>
      <Link href='/courses' className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <Lightbulb className="p-[2px]"/>
        <span className="ml-5">Your courses</span>
      </Link>
      <Link href='/watch-later' className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <Clock className="p-[2px]"/>
        <span className="ml-5">Watch Later</span>
      </Link>
      <Link href='liked-videos' className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <ThumbsUp className="p-[2px]"/>
        <span className="ml-5">Liked videos</span>
      </Link>
      <Link href='/downloads' className="flex p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <ArrowDownToLine className="p-[2px]"/>
        <span className="ml-5">Downloads</span>
      </Link>
      <hr className="bg-white my-2"/>
    </div>
  )}
  else{
    return (
      <div className={`mr-4 flex justify-start flex-col gap-3`}>
        <Link href='/' className={`flex flex-col p-2 px-1 gap-y-1 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800`}>
          <Home className="p-[2px] "/>
          <span className="text-xs">Home</span>
        </Link>
        <Link href='/shorts' className="flex flex-col p-2 gap-y-1  items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
          <Film className="p-[2px]"/>
          <span className="text-xs">Shorts</span>
        </Link>
        <Link href='courses' className="flex flex-col p-2 gap-y-1 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
          <Inbox className="p-[2px]"/>
          <span className="text-xs">Courses</span>
        </Link>
        <div className="flex flex-col cursor-default p-2 gap-y-1 items-center gap-2">
          <CircleUser className="p-[2px]"/>
          <span className="text-xs font-semibold">You</span>
        </div>
        <Link href='/history' className="flex flex-col p-2 items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
        <History className="p-[2px]"/>
        <span className="text-xs">History</span>
        </Link>
        <Link href='/downloads' className="flex flex-col p-2 px-1 gap-y-1  items-center justify-start rounded-lg cursor-pointer hover:bg-zinc-800">
          <ArrowDownToLine className=""/>
          <span className="text-xs">Downloads</span>
        </Link>
      </div>
    )
  }
}

export default Sidebar