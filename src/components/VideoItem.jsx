import React from 'react'
import { MoreVertical } from "lucide-react"

function VideoItem({ number, thumbnail, title, channel, views, time, duration }) {
  return (
    <div className="flex gap-3">
      <div className="w-6 text-gray-400 pt-1 text-center">{number}</div>
      <div className="relative min-w-[160px] w-[160px] h-[90px] rounded-lg overflow-hidden">
        <img src={thumbnail || "/placeholder.svg"} alt={title} className="object-cover"></img>
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 px-1 text-xs rounded">{duration}</div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm line-clamp-2">{title}</h3>
        <p className="text-gray-400 text-xs mt-1">{channel}</p>
        <div className="flex text-gray-400 text-xs mt-0.5">
          <span>{views}</span>
          <span className="mx-1">•</span>
          <span>{time}</span>
        </div>
      </div>
      <button className="text-gray-400 self-start">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  )
}

export default VideoItem