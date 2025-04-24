"use client"

import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Menu, Video, Search, CircleUser } from 'lucide-react';
import { SidebarContext } from '@/contexts/sidebarContext';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { searchVideoByQuery } from '@/store/slices/videoSlice.js' 
import yt from '../assets/yt.png'

function Navbar() {
  const [query, setQuery] = useState('')
  const {toggleFn} = useContext(SidebarContext) 
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.auth.user)

  const handler = useCallback(
    debounce((value) => {
      dispatch(searchVideoByQuery(value))
    }, 500),
    []
  )

  useEffect(()=>{
    if(query) handler(query)
    
    return () => handler.cancel()
  },[query,handler])

  return (
    <div className='flex justify-between items-center px-6 py-2'>
      <div className='flex justify-center items-center gap-5'>
        <Menu onClick={toggleFn} className='hidden md:block cursor-pointer'/>
        <img className='w-28 rounded cursor-pointer' src={yt.src} alt="yt" />
      </div>
      <div className='flex justify-around items-center gap-5'>
        <div className='hidden sm:flex justify-center items-center relative'>
          <input value={query} onChange={(e) => setQuery(e.target.value)} className='rounded-full outline-none w-[40vw] border-2 focus:border-2 bg-transparent focus:border-blue-500 p-2 px-4' type="text" placeholder='Search' />
          <Search className='absolute right-[20px] top-[9px] cursor-pointer'/>
        </div>
      </div>
      <div className='flex justify-around gap-5 items-center'>
        <Video onClick={()=>router.push(user?'/auth/dashboard/upload':'/signup')} className='cursor-pointer'/>
        <div onClick={()=>router.push(user?'/auth/dashboard/profile':'/signup')} className={`${user?'':'border'} p-1 px-2 border-white rounded-full hover:bg-slate-800 cursor-pointer flex items-center gap-2`}>
          {user?<img className='w-8 rounded-full' src={user?.avatar} alt='user'/>:<CircleUser />}
          {user?<></>:<span className='text-sm'>SignUp</span>}
        </div>
      </div>
    </div>
  )
}

export default Navbar