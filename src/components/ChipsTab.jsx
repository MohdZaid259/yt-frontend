import React from 'react'
import Chip from './ui/chip.jsx'

let chipData = ['All', 'Music', 'Sitcoms', 'Mixes', 'Gaming', 'News', 'Satire', 'Source Code', 'Comedy Clubs','Live','Animated Films','Watched','New to you','Cartoons','Science','Vocal Music','Recently uploaded','Sketch comedy']

function ChipsTab() {
  return(
    <div className='mx-0 mr-10 my-2 flex gap-3 whitespace-nowrap overflow-x-hidden'>
      {chipData.map((item,i)=> <div key={i}><Chip props={item}/></div>)}
    </div>
  )
}

export default ChipsTab