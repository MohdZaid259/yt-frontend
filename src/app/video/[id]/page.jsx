import React from 'react'
import Video from '../../../components/Video.jsx'
import VideoSidebar from '../../../components/VideoSidebar.jsx'
// import { useParams } from 'next/navigation.js'

async function VideoPage({params}) {
  const {id} = await params

  return (
    <div className='flex'>
      <Video videoId={id}/>
      <VideoSidebar />
    </div>
  )
}

export default VideoPage