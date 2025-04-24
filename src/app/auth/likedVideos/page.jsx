'use client'

import useLocalStorage from "@/hooks/useLocalStorage"
import { useEffect, useState } from "react"
import { Play, Shuffle } from "lucide-react"
import { VideoItem } from '@/components/VideoItem.jsx'

function page() {
  const [setLiked, getLiked, removeLiked, removeAll] = useLocalStorage('likedVideo', true)
  const [setAuth,getAuth,removeAuth] = useLocalStorage('auth')
  const [data,setData] = useState([])
  const [user,setUser] = useState('')
  const [hasChanged,setHasChanged] = useState(false)

  useEffect(()=>{
    setUser(getAuth())
    
    const res = getLiked()
    setData(res)
  },[hasChanged])

  return (
    <div className="flex flex-col md:flex-row rounded-lg  mx-auto bg-black text-white min-h-screen">

        <div className="w-full md:w-[450px] p-4 lg:p-6 bg-gradient-to-b from-black/90 to-white/10 rounded-lg">
          <div className="relative w-full aspect-auto mb-4 rounded-lg overflow-hidden">
          {data.length>0 && <img src={data[0]?.video?.thumbnail} alt="Playlist thumbnail" className="object-cover w-full aspect-video" /> }
            <div className="mt-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Liked Videos</h1>
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
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg sm:text-xl">Liked Vidoes</span>
          {data.length>0 && <button onClick={removeAll} className="bg-[#1d1c1c] py-2 px-4 rounded-full text-xs sm:text-sm">Remove All</button>}
        </div>
        <div className="space-y-3">
          {data && data.map((item,i)=>{
            return <VideoItem
              setHasChanged={setHasChanged}
              key={i}
              videoId={item?.video?._id}
              type='likedVideo'
              thumbnail={item?.video?.thumbnail}
              title={item?.video?.title}
              channel={item?.owner?.fullname}
              views={item?.owner?.view}
              duration={item?.video?.duration}
            />
          })}
          {data.length==0 && <span className="text-sm sm:text-base text-gray-400">No Videos yet!</span>}
        </div>
      </div>
    </div>
  )
}

export default page