'use client'

import sample from '../../assets/sample.png'
import dp from '../../assets/dp.jpg'
import { useContext } from "react";
import { SidebarContext } from '@/contexts/sidebarContext.jsx';

let videoList = [
  {sample:sample,dp:dp,title:'Squid Game: Season 2 | Official Trailer',channel:'something small'},
  {sample:sample,dp:dp,title:'Squid Game: Season 2 | Official Trailer',channel:'something small'},
  {sample:sample,dp:dp,title:'Squid Game: Season 2 | Official Trailer',channel:'something small'},
  {sample:sample,dp:dp,title:'Squid Game: Season 2 | Official Trailer',channel:'something small'},
  {sample:sample,dp:dp,title:'Squid Game: Season 2 | Official Trailer',channel:'something small'},
  {sample:sample,dp:dp,title:'Squid Game: Season 2 | Official Trailer',channel:'something small'},
  {sample:sample,dp:dp,title:'Squid Game: Season 2 | Official Trailer',channel:'something small'},
  {sample:sample,dp:dp,title:'Squid Game: Season 2 | Official Trailer',channel:'something small'},
  {sample:sample,dp:dp,title:'Squid Game: Season 2 | Official Trailer',channel:'something small'},
]

function HomePage() {
  const {isOpen} = useContext(SidebarContext) 

  return (
    <div className=''>
      <div className="p-5 grid grid-cols-3 content-center place-items-center auto-cols-auto flex-wrap gap-y-8">
        {videoList.map((item,i)=>{
          return (
            <div key={i} className=''>
              <img className={`${isOpen?'w-[400px]':'w-[350px]'} border-t-2 border-white rounded-lg aspect-video object-cover`} src={item.sample.src} alt='item'/>
              <div className='flex items-start justify-start mt-3'>
                <img className='rounded-full w-8 mr-3' src={item.dp.src} alt="dp" />
                <div>
                  <p className='text-sm font-semibold'>{item.title}</p>
                  <p className='text-xs text-zinc-300'>{item.channel}</p>
                  <p className='text-xs text-zinc-300'>4M view - 1 day ago</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage