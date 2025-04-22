'use client'

import React from 'react'
import Chip from './ui/chip.jsx'
import { useDispatch } from 'react-redux'
import { searchVideoByQuery, getAllVideos } from '@/store/slices/videoSlice.js'

let chipData = ['All', 'Music', 'Sitcoms', 'Mixes', 'Gaming', 'News', 'Satire', 'Source Code', 'Comedy Clubs','Live','Animated Films','Watchs','Discovery','Cartoons','Science','Vocal Music','Recently uploaded','Sketch comedy']

function ChipsTab() {
  const dispatch = useDispatch()
  async function handleChip(item){
    if(item=='All'){
      dispatch(getAllVideos())
      return
    }
    dispatch(searchVideoByQuery(item))
  }

  return(
    <div className='mx-4 mr-4 md:mr-10 my-2 flex gap-3 whitespace-nowrap overflow-x-hidden'>
      {chipData.map((item,i)=> <div onClick={()=>handleChip(item)} key={i}><Chip props={item}/></div>)}
    </div>
  )
}

export default ChipsTab