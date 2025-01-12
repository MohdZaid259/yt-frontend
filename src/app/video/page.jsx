'use client'

import React from 'react'
import Video from '../../components/Video.jsx'
import VideoSidebar from '../../components/VideoSidebar.jsx'

function VideoPage() {
  return (
    <div className='flex'>
      <Video />
      <VideoSidebar />
    </div>
  )
}

export default VideoPage