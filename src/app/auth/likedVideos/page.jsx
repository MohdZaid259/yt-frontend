'use client'

import useLocalStorage from "@/hooks/useLocalStorage"
import { useEffect, useState } from "react"
import { Play, Shuffle } from "lucide-react"
import { VideoItem } from '@/components/VideoItem.jsx'

function page() {
  const [setLiked, getLiked, removeLiked, removeAll] = useLocalStorage('likedVideo', true)
  const [data,setData] = useState([])
  const [hasChanged,setHasChanged] = useState(false)

  useEffect(()=>{
    const res = getLiked()
    setData(res)
  },[hasChanged])

  return (
    <div className="flex flex-col md:flex-row bg-black text-white min-h-screen">

        <div className="w-full md:w-[450px] p-4 md:p-6 bg-[#2c2c2c] rounded-lg">
          <div className="relative w-full aspect-square md:aspect-auto mb-4 rounded-lg overflow-hidden">
          {data.length>0 && <img src={data[0]?.video?.thumbnail} alt="Playlist thumbnail" className="object-cover" /> }
            <div className="mt-2">
              <h1 className="text-4xl font-bold mb-2">Liked Videos</h1>
              <p className="text-lg">{'zaidofficials259' || user?.username}</p>
              <div className="flex items-center gap-2 text-gray-300 mt-1">
                <span>220 videos</span>
                <span>•</span>
                <span>No views</span>
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
    
      <div className="flex-1 w-[500px] p-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-xl">Liked Vidoes</span>
          {data.length>0 && <button onClick={removeAll} className="bg-[#1d1c1c] -mt-2 -mr-2 py-2 px-4 rounded-full text-sm">Remove All</button>}
        </div>
        <div className="space-y-3">
          {data && data.map((item,i)=>{
            return <VideoItem
              setHasChanged={setHasChanged}
              key={i}
              type='likedVideo'
              thumbnail={item?.video?.thumbnail}
              title={item?.video?.title}
              channel={item?.owner?.fullname}
              views={item?.owner?.view}
              duration={item?.video?.duration}
            />
          })}
          {data.length==0 && <span className="text-sm text-gray-400">No Videos yet!</span>}
        </div>
      </div>
    </div>
  )
}

export default page