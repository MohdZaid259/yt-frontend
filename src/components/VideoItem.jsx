'use client'

import React from 'react'
import { Delete } from "lucide-react"
import useLocalStorage from "@/hooks/useLocalStorage"
import { useRouter } from 'next/navigation'

export function VideoItem({setHasChanged, videoId='', type='', thumbnail='sample thumbnail', title='sample title', channel='sample channel', views=0, duration=0 }) {
  const router = useRouter()
  const [setDownload, getDownload, removeDownload] = useLocalStorage('download', true)
  const [setWatch, getWatch, removeWatch] = useLocalStorage('watchLater',true)
  const [setLiked, getLiked, removeLiked] = useLocalStorage('likedVideo',true)

  function handleDelete(){
    if(type=='download') removeDownload(title)
    else if(type=='watchLater') removeWatch(title)
    else if(type=='likedVideo') removeLiked(title)
    setHasChanged(prev=>!prev)
    return
  }

  return (
    <div onClick={() => router.push(`/video/${videoId}`)} className="flex mt-5 bg-[#1d1c1c] justify-center items-start p-2 rounded-lg gap-3">
      <div className="relative min-w-[160px] w-[160px] h-[90px] rounded-sm overflow-hidden">
        <img src={thumbnail || "/placeholder.svg"} alt={title} className="object-cover"></img>
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 px-1 text-xs rounded">{Number(duration).toFixed(2)}</div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm line-clamp-2">{title}</h3>
        <p className="text-gray-400 text-xs mt-1">{channel}</p>
        <div className="flex text-gray-400 text-xs mt-0.5">
          <span>{views}</span>
          <span className="mx-1"> views</span>
        </div>
      </div>
      {!(type=='history') && <button onClick={handleDelete} className="bg-[#1d1c1c] -mt-2 -mr-2 py-2 px-4 rounded-full text-sm"> <Delete  className="w-5 h-5"/></button>}
    </div>
  )
}