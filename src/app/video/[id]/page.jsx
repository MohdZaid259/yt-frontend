'use client'

import React from 'react'
import Video from '../../../components/Video.jsx'
import VideoSidebar from '../../../components/VideoSidebar.jsx'
import { useParams } from 'next/navigation.js'

function VideoPage() {
  const params = useParams()
  const {id} = params

  console.log(id)

  return (
    <div className='flex'>
      <Video videoId={id}/>
      <VideoSidebar />
    </div>
  )
}

export default VideoPage