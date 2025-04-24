'use client'

import React from 'react'
import { useEffect, useState } from "react"
import { Play, Shuffle } from "lucide-react"
import { VideoItem } from '@/components/VideoItem.jsx'
import { watchHistory } from '@/store/slices/userSlice.js'
import useLocalStorage from '@/hooks/useLocalStorage.jsx'
import { useDispatch, useSelector } from 'react-redux'

//disptach & selector

function page() {
  const [setAuth,getAuth,removeAuth] = useLocalStorage('auth')
  const [data,setData] = useState([])
  const [user,setUser] = useState('')
  const dispatch = useDispatch()

  useEffect(()=>{
    setUser(getAuth())

    async function log(){
      const data = await dispatch(watchHistory())
      setData(data.payload)
    }
    log()
  },[])

  return (
    <div className="flex flex-col rounded-lg  md:flex-row bg-black text-white min-h-screen">

    <div className="w-full md:w-[450px] p-4 lg:p-6 mx-auto bg-gradient-to-b from-black/90 to-white/10 rounded-lg">
      <div className="relative w-full aspect-auto mb-4 rounded-lg overflow-hidden">
      {data && <img src={data[0]?.thumbnail} alt="Playlist thumbnail" className="object-cover w-full rounded aspect-video" /> }
        <div className="mt-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold m-4 ml-0">Your History</h1>
          <p className="text-sm sm:text-base lg:text-lg">{user?.username || 'zaidofficials259'}</p>
          <div className="flex items-center gap-2 text-gray-300 mt-1 text-xs sm:text-sm lg:text-base">
            <span>220 videos</span>
            <span>•</span>
            <span>No views</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-white text-black py-2 px-4 rounded-full font-medium flex items-center justify-center gap-2 text-sm sm:text-base">
          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black" />
          Play all
        </button>
        <button className="flex-1 bg-gray-700 py-2 px-4 rounded-full font-medium flex items-center justify-center gap-2 text-sm sm:text-base">
          <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
          Shuffle
        </button>
      </div>
    </div>

    <div className="flex-1 w-full lg:w-[500px] p-4">
      <span className="font-semibold text-lg sm:text-xl">Your History</span>
      <span className='text-xs text-gray-500 block'>History is unalterable</span>
      <div className="space-y-3">
        {data && data.map((item,i)=>{
          return <VideoItem
            setHasChanged={''}
            key={i}
            videoId={item?.video?._id}
            type='history'
            thumbnail={item?.thumbnail}
            title={item?.title}
            channel={item?.fullname}
            views={item?.view}
            duration={item?.duration}
          />
        })}
        {!data && <span className="text-sm sm:text-base text-gray-400">No Videos yet!</span>}
      </div>
    </div>
  </div>
  )
}

export default page