'use client'

import sample from '../assets/sample.png'
import dp from '../assets/dp.jpg'
import { Bell, ChevronDown, ThumbsDown, ThumbsUp, ArrowDownToLine, Forward } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

function Video({videoId}) {
  const [video, setVideo] = useState()
  const [loading,setLoading] = useState(true)

  const handler = useCallback( async () => {
    const response = await axios.get(`${baseUrl}/video/${videoId}`)
    console.log(response.data.data)
    setLoading(false)
  },[]
  )
  
  useEffect(()=>{
    handler()
  },[handler])
  
  return (
    <div className='flex flex-col w-[70%] pl-14 pr-8'>
      <div className='w-full'>
        <Image layout="responsive" width={16} height={9} className='' src={sample.src} alt="" />
        <div>
          <h1 className='my-3 font-semibold text-xl'>Squid Game: Season 2 | Official Trailer Netflix India</h1>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-4'>
              <div className='flex text-sm'>
                <img className='rounded-full h-8 ' src={dp.src} alt="" />
                <div className='flex flex-col ml-3'>
                  <span className='font-semibold'>Netflix India</span>
                  <span className='text-zinc-400 text-xs'>subscribers</span>
                </div>
              </div>
              <div className='flex px-2 py-1 cursor-pointer rounded-full items-center text-sm bg-zinc-800 hover:bg-zinc-700 max-w-max'>
                <Bell className='p-[4px]'/>
                Subscribe
                <ChevronDown className='p-[4px]'/>
              </div>
            </div>
            <div className='flex gap-1 text-sm'>
              <div className='flex items-center rounded-full bg-zinc-800 hover:bg-zinc-700 px-2 py-1'>
                <ThumbsUp className='p-[4px]'/>
                <span className='mx-1 mr-2'>54</span>
                <span className='text-zinc-400'>|</span>
                <ThumbsDown className='ml-1 p-[4px]'/>
              </div>
              <div className='flex items-center rounded-full bg-zinc-800 hover:bg-zinc-700 px-2 py-1'>
                <Forward className='p-[4px] pl-0'/>
                <span className='pr-[4px]'>Share</span>
              </div>
              <div className='flex items-center rounded-full bg-zinc-800 hover:bg-zinc-700 px-2 py-1'>
                <ArrowDownToLine className='p-[4px] pl-0'/>
                <span className='pr-[4px]'>Download</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full my-4'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. At sunt porro minima velit eius vero consequatur officiis, atque ullam sapiente doloremque necessitatibus rem voluptatem incidunt officia dicta natus eligendi corporis expedita. Voluptatibus, cupiditate corporis.
      </div>
    </div>
  )
}

export default Video