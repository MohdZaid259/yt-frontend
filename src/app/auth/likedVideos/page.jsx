'use client'

import { useEffect, useState } from "react"
import { Play, Shuffle } from "lucide-react"
import VideoItem from '@/components/VideoItem.jsx'

function page() {
  
  return (
    <div className="flex flex-col md:flex-row bg-black text-white min-h-screen">

        <div className="w-full md:w-[450px] p-4 md:p-6 bg-[#2c2c2c] rounded-lg">
          <div className="relative w-full aspect-square md:aspect-auto md:h-[300px] mb-4 rounded-lg overflow-hidden">
            <img src="/placeholder.svg?height=300&width=300" alt="Playlist thumbnail" className="object-cover" ></img>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-4xl font-bold mb-2">Watch Later</h1>
              <p className="text-lg">zaidofficials1236</p>
              <div className="flex items-center gap-2 text-gray-300 mt-1">
                <span>220 videos</span>
                <span>•</span>
                <span>No views</span>
                <span>•</span>
                <span>Updated today</span>
              </div>
            </div>
          </div>
    
          <div className="flex gap-2">
            <button className="flex-1 bg-white text-black py-2 px-4 rounded-full font-medium flex items-center justify-center gap-2">
              <Play className="w-5 h-5 fill-black" />
              Play all
            </button>
            <button className="flex-1 bg-gray-700 py-2 px-4 rounded-full font-medium flex items-center justify-center gap-2">
              <Shuffle className="w-5 h-5" />
              Shuffle
            </button>
          </div>
        </div>
    
      <div className="flex-1 p-4">
        <span className="font-semibold text-xl">Downloaded Vidoes</span>
        <div className="space-y-3">
          {data.map((item,i)=>{
            <VideoItem
              number={i}
              thumbnail={item?.video?.thumbnail}
              title={item?.video?.title}
              channel={item?.owner?.fullname}
              views={item?.owner?.view}
              duration={item?.video?.duration}
            />
          })}
        </div>
      </div>
    </div>
  )
}

export default page