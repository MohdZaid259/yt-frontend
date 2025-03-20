'use client'

import { Bell, ChevronDown, ThumbsDown, ThumbsUp, ArrowDownToLine, Forward } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getVideoById, searchVideo } from '@/store/slices/videoSlice.js'
import { getChannelProfile } from '@/store/slices/userSlice.js'
import toast from 'react-hot-toast'
import useLocalStorage from '@/hooks/useLocalStorage.jsx'

function Video({videoId}) {
  const [owner,setOwner] = useState()
  const video = useSelector((state)=>state.video.video)
  const loading = useSelector((state)=>state.video.loading)
  const dispatch = useDispatch()
  const [setDownload,getDownload,removeDownload] = useLocalStorage('download',true)

  const handler = useCallback( async () => {
    if(videoId.length == 24){
      const res = await dispatch(getVideoById(videoId))
      const ownerId = res.payload.owner
      const ownerData = await dispatch(getChannelProfile(ownerId))
      setOwner(ownerData.payload)
    }else{
      await dispatch(searchVideo(videoId))
    }
  },[])
  
  useEffect(()=>{
    handler()
  },[handler])

  function handleDownload(){
    setDownload({ video, owner })
    toast.success('Video Downloading...')
  }
  
  if(loading) return <>Loading...</>
  return (
    <div className='flex flex-col w-[70%] pr-8 mt-5'>
      <div className='w-full'>
        {video.videoFile && <video width="680" height="360" controls className='rounded-md'> <source src={video.videoFile} type="video/mp4" /></video>}
        {video.id && <iframe width="680" height="360" src={`https://www.youtube.com/embed/${video.id}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="rounded-md"/>}
        <div>{console.log(video.id)}
          <h1 className='my-3 font-semibold text-xl'>{video.title || video.snippet.title}</h1>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-4 space-y-8'>
              <div className='flex text-sm'>
                <img className='rounded-full h-10 border-white border aspect-square' src={owner?.avatar || video.snippet.thumbnails.default.url} alt="" />
                <div className='flex flex-col ml-3'>
                  <span className='font-semibold'>{owner?.fullname || video?.snippet.channelTitle}</span>
                  <span className='text-zinc-400 text-xs'>{owner?.subscribersCount || 0} subsribers</span>
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
                <ThumbsUp className='cursor-pointer p-[4px]'/>
                <span className='mx-1 mr-2'>{video?.likes?.length || video?.statistics?.likeCount}</span>
                <span className='cursor-default text-zinc-400'>|</span>
                <ThumbsDown className='cursor-pointer ml-1 p-[4px]'/>
              </div>
              <div className='flex cursor-pointer items-center rounded-full bg-zinc-800 hover:bg-zinc-700 px-2 py-1'>
                <Forward className='p-[4px] pl-0'/>
                <span className='pr-[4px]'>Share</span>
              </div>
              <div onClick={handleDownload} className='flex cursor-pointer items-center rounded-full bg-zinc-800 hover:bg-zinc-700 px-2 py-1'>
                <ArrowDownToLine className='p-[4px] pl-0'/>
                <span className='pr-[4px]'>Download</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full my-4 line-clamp-2 '>
        {video.description || video.snippet.localized.description}
      </div>
    </div>
  )
}

export default Video