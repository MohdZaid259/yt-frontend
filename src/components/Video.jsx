'use client'

import { Bell, CircleCheck, ThumbsDown, Bookmark, ThumbsUp, ArrowDownToLine } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getVideoById, searchVideoById } from '@/store/slices/videoSlice.js'
import { getChannelProfile, updateWatchHistory } from '@/store/slices/userSlice.js'
import toast from 'react-hot-toast'
import useLocalStorage from '@/hooks/useLocalStorage.jsx'

function Video({videoId}) {
  const dispatch = useDispatch()
  const [owner,setOwner] = useState()
  const video = useSelector((state)=>state.video.video)
  const loading = useSelector((state)=>state.video.loading)
  const [status, setStatus] = useState({
    subscribe:false,
    download: false,
    watch: false,
    like: false,
    dislike:false
  });
  const [setDownload,getDownload,removeDownload] = useLocalStorage('download',true)
  const [setWatch,getWatch,removeWatch] = useLocalStorage('watchLater',true)
  const [setLiked, getLiked, removeLiked] = useLocalStorage('likedVideo',true)

  const handler = useCallback( async () => {
    if(videoId.length == 24){
      const res = await dispatch(getVideoById(videoId))
      const ownerId = res.payload.owner
      const ownerData = await dispatch(getChannelProfile(ownerId))
      setOwner(ownerData.payload)
    }else{
      await dispatch(searchVideoById(videoId))
    }
    dispatch(updateWatchHistory(videoId))
  },[videoId,dispatch])

  useEffect(()=>{
    handler()
  },[handler])

  function handleSubscribe(){
    setStatus(prev => ({ ...prev, subscribe: !prev.subscribe }))
    toast.success('Subscribed!!')
  }

  function handleDownload(){
    setStatus(prev => ({ ...prev, download: !prev.download }))
    setDownload({ video, owner })
    toast.success('Video Downloading...')
  }

  function handleLiked(){
    setStatus(prev => ({ ...prev, like: !prev.like }))
    setLiked({ video, owner })
    toast.success('Video Liked!')
  }

  function handleDisliked(){
    setStatus(prev=> ({ ...prev, dislike: !prev.dislike }))
    toast.success('VideoDisliked!')
  }
  
  function handleWatch(){
    setStatus(prev => ({ ...prev, watch: !prev.watch }))
    setWatch({ video, owner })
    toast.success('Video Saved!')
  }

  if(loading) return <>Loading...</>
  return (
    <div className='flex flex-col w-full md:w-[70%] md:pr-8 px-5 mt-5'>
      <div className='w-full'>
        {video?.videoFile && <video width="700" height="360" controls className='rounded-md'> <source src={video?.videoFile} type="video/mp4" /></video>}
        {video?.id && <iframe width="700" height="360" src={`https://www.youtube.com/embed/${video?.id}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="rounded-md"/>}
        <div>
          <h1 className='my-3 mb-5 font-semibold text-xl'>{video?.title || video?.snippet.title}</h1>
          <div className='flex justify-between items-center'>
            <div className='flex items-start gap-6 '>
              <div className='flex text-sm'>
                <img className='rounded-full h-8 md:h-10 border-white border aspect-square' src={owner?.avatar || video?.snippet?.thumbnails?.default?.url} alt="" />
                <div className='flex flex-col ml-3'>
                  <span className='font-semibold'>{owner?.fullname || video?.snippet?.channelTitle}</span>
                  <span className='text-zinc-400 text-xs'>{owner?.subscribersCount || 0} subsribers</span>
                </div>
              </div>
              <div onClick={handleSubscribe} className='hidden px-2 pr-4 py-1 mt-1 cursor-pointer sm:flex rounded-full items-center text-xs sm:text-sm bg-zinc-800 hover:bg-zinc-700 max-w-max'>
                {status.subscribe?<Bell className='p-[4px] fill-white'/>:<Bell className='p-[4px]'/>}
                {status.subscribe?'Subscribed':'Subscribe'}
              </div>
            </div>
            <div className='flex gap-1 text-xs sm:text-sm'>
              <div className='flex items-center rounded-full bg-zinc-800 hover:bg-zinc-700 px-2 py-1'>
                <ThumbsUp onClick={handleLiked} className={`cursor-pointer ${status.like?'fill-white':''} p-[4px]`}/>
                <span className='mx-1 mr-2'>{video?.likes?.length || video?.statistics?.likeCount || 0}</span>
                <span className='cursor-default text-zinc-400'>|</span>
                <ThumbsDown onClick={handleDisliked} className={`cursor-pointer ${status.dislike?'fill-white':''} ml-1 p-[4px]`}/>
              </div>
              <div onClick={handleWatch} className='flex cursor-pointer items-center rounded-full bg-zinc-800 hover:bg-zinc-700 px-2 py-1'>
                <Bookmark className={`p-[4px] ${status.watch?'fill-white':''} pl-0`}/>
                <span className='pr-[4px]'>{status.watch?'Saved':'Save'}</span>
              </div>
              <div onClick={handleDownload} className='hidden sm:flex cursor-pointer items-center rounded-full bg-zinc-800 hover:bg-zinc-700 px-2 py-1'>
                {status.download?<CircleCheck className='p-[2px] invert fill-black pl-0'/>:<ArrowDownToLine className='p-[4px] pl-0'/>}
                <span className='pr-[4px]'>{status.download?'Downloaded':'Download'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full my-6 line-clamp-2 '>
        {video?.description || video?.snippet.localized.description}
      </div>
    </div>
  )
}

export default Video