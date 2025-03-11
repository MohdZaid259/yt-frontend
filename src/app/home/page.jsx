'use client'

import { useContext, useEffect, useCallback } from "react";
import { SidebarContext } from '@/contexts/sidebarContext.jsx';
import { useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

function HomePage() {
  const {isOpen} = useContext(SidebarContext) 
  const [videoList, setVideoList] = useState([])
  const [loading,setLoading] = useState(true)
  const router = useRouter()
    
  const handler = useCallback( async () => {
      try {
        const response = await axios.get(`${baseUrl}/video`)
        setVideoList(response.data.data)
        setLoading(false)
      } catch (error) {
        console.log('Couldnt find videos ',error)
      }
    },[]
  )

  useEffect(()=>{
    handler()
  },[handler])
  
  if(loading) return <Skeleton/>
  return (
    <div className=''>
      <div className={`pr-6 grid grid-cols-3 gap-y-6 gap-x-4 ${isOpen?'pt-2':'p-4'} w-full`}>
        {videoList.map((item,i)=>{
          return (
            <div key={i} onClick={()=>router.push(`/video/${item._id}`)} className={`${isOpen?'w-[370px]':'w-[400px]'} min-h-24 rounded overflow-hidden`}>
              <Link href={`/video/${item._id}`}><img className={`cursor-pointer hover:scale-105 duration-500 rounded-md object-center aspect-video object-cover`} src={item.thumbnail} alt='item'/></Link>
              <div className='flex items-start justify-start mt-3'>
                <Link href={`/video/${item._id}`}><img className='cursor-pointer rounded-full border-[1px] border-red-500 w-9 mr-3' src={item.avatar} alt="dp" /></Link>
                <div>
                  <Link href={`/video/${item._id}`}><span className='cursor-pointer text-sm text-wrap w-[330px] font-semibold'>{item.title}</span></Link>
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