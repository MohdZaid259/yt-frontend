import React from 'react'
import { VideoEditForm } from '@/components/dashboard/VideoEditForm.jsx'

async function page({params}) {
  const {id} = await params

  return (
    <VideoEditForm videoId={id}/>
  )
}

export default page