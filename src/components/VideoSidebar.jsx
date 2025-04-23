'use client'

import { useState, useEffect, useCallback } from "react"
import { getShorts } from '@/store/slices/videoSlice.js'
import { useDispatch } from 'react-redux'
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [data,setData] = useState({
    shorts:[],
    videos:[]
  })
  
  const handler = useCallback( async () => {
    const res = await dispatch(getShorts())
    setData((prev)=>({
      ...prev,
      shorts:res.payload.shorts,
      videos:res.payload.videos
    }))  
  },[])

  useEffect(()=>{
    handler()
  },[handler])

  return (
    <aside className="space-y-6 md:w-3/5 w-full px-5">
      <div className="space-y-4 mt-5">
        <h2 className="font-semibold text-xl">Shorts</h2>
        <div className="flex justify-center">
          {data.shorts.map((item,i) => (
            <div onClick={()=>router.push(`/video/${item.id.videoId}`)} key={i} className="p-2 rounded-lg w-1/3">
              <img src={item.snippet.thumbnails.default.url} alt="shorts" className="h-32 object-cover rounded-md" />
              <h3 className="mt-2 text-sm">{item.snippet.title.slice(0, 30) + "..."}</h3>
              <p className="text-xs text-gray-500">{item.snippet.channelTitle}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4 ">
      <h2 className="font-semibold  my-5 text-xl">Recommendations</h2>
        {data.videos.map((item, i) => (
          <div onClick={()=>router.push(`/video/${item.id}`)} key={i} className="flex gap-2">
            <img src={item.snippet.thumbnails.default.url} alt="" className="scale-110 rounded-md aspect-video"/>
            <div className="ml-5">
              <h3 className="font-medium text-sm line-clamp-2">{item.snippet.title.slice(0, 50) + "..."}</h3>
              <p className="text-xs text-muted-foreground">{item.snippet.channelTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
