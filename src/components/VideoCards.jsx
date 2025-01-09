'use client'

import React from 'react'
import sample from '../../assets/sample.png'

function VideoCards() {
  return (
    <div className='flex'>
      <img src={sample.src} alt="" />
      <div>
        <h1>Welcome to the new world</h1>
        <span>heading</span>
        <div>
          <span>4k views</span>
          <span>5 years ago</span>
        </div>
      </div>
    </div>
  )
}

export default VideoCards