'use client'

import { act, useContext, useEffect } from "react";
import { SidebarContext } from '@/contexts/sidebarContext.jsx';
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/navigation";
import Skeleton from "@/components/Skeleton.jsx";
import { getAllVideos, incrementIndex } from '@/store/slices/videoSlice.js'

function HomePage() {
  const {isOpen} = useContext(SidebarContext) 
  const router = useRouter()
  const dispatch = useDispatch()
  const {videos, loading, index, stopFetching } = useSelector((state)=>state.video)
  
  useEffect(() => {
    if (!loading && !stopFetching) {
      dispatch(getAllVideos(index)).then((action) => {
        if(action?.type == 'getAllVideos/fulfilled')
          dispatch(incrementIndex());
      });
    }
  }, [dispatch, index, stopFetching]);

  if (loading && videos.length == 0) return <Skeleton />;
  return (
    <div className="px-4">
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 ${isOpen ? 'pt-2' : 'pt-4'} w-full`}>
        {(videos.length>0) && videos.map((item, i) => {
          const itemId = item._id || item.videoId;
          return (
            <div
              key={i}
              onClick={() => router.push(`/video/${itemId}`)}
              className="w-full min-h-24 rounded overflow-hidden"
            >
              <img
                className="cursor-pointer hover:scale-105 duration-500 rounded-md object-center aspect-video object-cover"
                src={item.thumbnail}
                alt="item"
              />
              <div className="flex items-start justify-start mt-3">
                <img
                  className="cursor-pointer aspect-square rounded-full border-[1px] border-red-500 w-9 mr-3"
                  src={item.avatar}
                  alt="dp"
                />
                <div>
                  <span className="cursor-pointer text-sm text-wrap font-semibold block truncate">
                    {item.title}
                  </span>
                  <p className="text-sm text-zinc-300">{item.ownerName}</p>
                  <p className="text-xs text-zinc-300">4M views - 1 day ago</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;