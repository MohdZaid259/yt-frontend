'use client'

import React from 'react'
import sample from '../../assets/sample.png'
import dp from '../../assets/dp.jpg'
import { Bell, ChevronDown, ThumbsDown, ThumbsUp, ArrowDownToLine, Forward } from 'lucide-react'
import Image from 'next/image'

function page() {
  return (
    <div className='flex flex-col px-14'>
      <div className='w-[70%]'>
        <Image layout="responsive" width={16} height={9} className='' src={sample.src} alt="" />
        <div>
          <h1 className='my-2 font-semibold text-xl'>Squid Game: Season 2 | Official Trailer Netflix India</h1>
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
      <div className='w-[30%]'>
        this
      </div>
    </div>
  )
}

export default page