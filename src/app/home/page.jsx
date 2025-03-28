'use client'

import { useState, useContext, useEffect, useCallback } from "react";
import { SidebarContext } from '@/contexts/sidebarContext.jsx';
import { useDispatch,useSelector } from 'react-redux'
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllVideos } from '@/store/slices/videoSlice.js'
import makeVidoesNull from '@/store/slices/videoSlice.js'

function HomePage() {
  const {isOpen} = useContext(SidebarContext) 
  const router = useRouter()
  const dispatch = useDispatch()
  const video = useSelector((state)=>state.video.videos)
  const loading = useSelector((state)=>state.video.loading)
    
  const handler = useCallback( () => {
    dispatch(getAllVideos())
    
    return ()=> dispatch(makeVidoesNull())
  },[])

  useEffect(()=>{
    handler()
  },[handler])
  
  if(loading) return <Skeleton/>
  return (
    <div className=''>
      <div className={`pr-6 grid grid-cols-3 gap-y-6 gap-x-4 ${isOpen?'pt-2':'p-4'} w-full`}>
        {video?.map((item,i)=>{
          return (
            <div key={i} onClick={()=>router.push(`/video/${item._id}`)} className={`${isOpen?'w-[370px]':'w-[400px]'} min-h-24 rounded overflow-hidden`}>
              <img className={`cursor-pointer hover:scale-105 duration-500 rounded-md object-center aspect-video object-cover`} src={item.thumbnail} alt='item'/>
              <div className='flex items-start justify-start mt-3'>
                <img className='cursor-pointer rounded-full border-[1px] border-red-500 w-9 mr-3' src={item.avatar} alt="dp" />
                <div>
                  <span className='cursor-pointer text-sm text-wrap w-[330px] font-semibold'>{item.title}</span>
                  <p className='text-sm text-zinc-300'>{item.ownerName}</p>
                  <p className='text-xs text-zinc-300'>4M view - 1 day ago</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage