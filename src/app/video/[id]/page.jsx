import React from 'react'
import Video from '../../../components/Video.jsx'
import VideoSidebar from '../../../components/VideoSidebar.jsx'

async function VideoPage({params}) {
  const {id} = await params

  return (
    <div className='flex flex-col md:flex-row overflow-hidden'>
      <Video videoId={id}/>
      <VideoSidebar />
    </div>
  )
}

export default VideoPage