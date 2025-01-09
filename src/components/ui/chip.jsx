import React from 'react'

function Chip({props}) {
  return (
    <div className='px-3 py-2 flex items-center rounded-lg cursor-pointer bg-zinc-800 hover:bg-zinc-700'>
      <span className='text-xs font-semibold'>{props}</span>
    </div>
  )
}

export default Chip