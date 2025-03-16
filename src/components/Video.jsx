'use client'

import dp from '../assets/dp.jpg'
import { Bell, ChevronDown, ThumbsDown, ThumbsUp, ArrowDownToLine, Forward } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getVideoById } from '@/store/slices/videoSlice.js'
import { getChannelProfile } from '@/store/slices/userSlice.js'

function Video({videoId}) {
  const [video, setVideo] = useState()
  const [owner,setOwner] = useState()
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)

  const handler = useCallback( async () => {
    const res = await dispatch(getVideoById(videoId))
    const ownerId = res.payload.owner
    const ownerData = await dispatch(getChannelProfile(ownerId))
    setVideo(res.payload)
    setOwner(ownerData.payload)
    setLoading(false)
  },[]
  )
  
  useEffect(()=>{
    handler()
  },[handler])
  
  if(loading) return <>Loading...</>
  return (
    <div className='flex flex-col w-[70%] pr-8'>
      <div className='w-full'>
        <video width="640" height="720" controls> <source src={video.videoFile} type="video/mp4" /></video>
        <div>
          <h1 className='my-3 font-semibold text-xl'>{video.title}</h1>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-4'>
              <div className='flex text-sm'>
                <img className='rounded-full h-8 ' src={owner.avatar} alt="" />
                <div className='flex flex-col ml-3'>
                  <span className='font-semibold'>{owner.fullname}</span>
                  <span className='text-zinc-400 text-xs'>{owner.subscribersCount} subsribers</span>
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
                <span className='mx-1 mr-2'>{video?.likes?.length}</span>
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
        {video.description}
      </div>
    </div>
  )
}

export default Video