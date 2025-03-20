'use client'

import React from 'react'
import { useEffect, useState } from "react"
import { Download, MoreVertical, Play, Shuffle } from "lucide-react"
import VideoItem from '@/components/VideoItem.jsx'

function page() {

  return (
    <div className="flex flex-col md:flex-row bg-black text-white min-h-screen">
    {/* Left Panel - Watch Later */}
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

      <div className="flex gap-2 mb-4">
        <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
          <Download className="w-6 h-6" />
        </button>
        <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-white text-black py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2">
          <Play className="w-5 h-5 fill-black" />
          Play all
        </button>
        <button className="flex-1 bg-gray-700 py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2">
          <Shuffle className="w-5 h-5" />
          Shuffle
        </button>
      </div>
    </div>

    {/* Right Panel - Video List */}
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button className="p-2">
            <MoreVertical className="w-5 h-5" />
          </button>
          <span className="font-medium">Sort</span>
        </div>

        <div className="flex gap-2">
          <button className="bg-white text-black px-4 py-1.5 rounded-full font-medium">All</button>
          <button className="bg-gray-800 px-4 py-1.5 rounded-full font-medium">Videos</button>
          <button className="bg-gray-800 px-4 py-1.5 rounded-full font-medium">Shorts</button>
        </div>
      </div>

      <div className="space-y-3">
        {/* Video Item 1 */}
        <VideoItem
          number={1}
          thumbnail="/placeholder.svg?height=180&width=320"
          title="Aj toh ye ladki bhooka maregi #quillbotpartner#ad#funny #sarcasam #share#viral"
          channel="Deepak Garg"
          views="15K views"
          time="20 hours ago"
          duration="1:01"
        />

        {/* Video Item 2 */}
        <VideoItem
          number={2}
          thumbnail="/placeholder.svg?height=180&width=320"
          title="Why Every Dev Has Imposter Syndrome"
          channel="CodeHead"
          views="18K views"
          time="2 days ago"
          duration="2:41"
        />

        {/* Video Item 3 */}
        <VideoItem
          number={3}
          thumbnail="/placeholder.svg?height=180&width=320"
          title="Hirz e Jaan Zikr E Shafaat Kijiye Owais Qadri Naats || Kalam Ala Hazrat"
          channel="Tayyiba Production"
          views="367K views"
          time="4 years ago"
          duration="12:48"
        />

        {/* Video Item 4 */}
        <VideoItem
          number={4}
          thumbnail="/placeholder.svg?height=180&width=320"
          title="Dars e Quran Mufti Muhammad Akmal Madani - Allama Tahir Shb - Dars 17 2025 - Dua by Mufti Shb"
          channel="AlFurqan Network of Mufti Akmal"
          views="3.7K views"
          time="20 hours ago"
          duration="53:38"
        />

        {/* Video Item 5 */}
        <VideoItem
          number={5}
          thumbnail="/placeholder.svg?height=180&width=320"
          title="I Landed Remote Job at U.S the AGE OF 18"
          channel="Tech Career"
          views="25K views"
          time="1 week ago"
          duration="15:22"
        />
      </div>
    </div>
  </div>
  )
}

export default page