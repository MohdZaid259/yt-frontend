"use client"

import React,{ useContext, useEffect, useState } from 'react'
import { Bell,Menu,Video,Mic,Search,CircleUser } from 'lucide-react';
import yt from '../assets/yt.png'
import { SidebarContext } from '@/contexts/sidebarContext';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '@/store/slices/authSlice';
import useSessionStorage from '@/hooks/useSessionStorage'

function Navbar() {
  const {toggleFn} = useContext(SidebarContext) 
  const [setAccessToken,getAccessToken,removeAccessToken] = useSessionStorage('access')
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.auth.user)
  const router = useRouter()
  const token = getAccessToken()

  useEffect(()=>{
    dispatch(getCurrentUser())
  },[])

  return (
    <div className='flex justify-between items-center px-6 py-2'>
      <div className='flex justify-center items-center gap-5'>
        <Menu onClick={toggleFn} className='cursor-pointer'/>
        <img className='w-28 rounded cursor-pointer' src={yt.src} alt="yt" />
      </div>
      <div className='flex justify-around items-center gap-5'>
        <div className='flex justify-center items-center relative'>
          <input className='rounded-full outline-none w-[40vw] border-2 focus:border-2 bg-transparent focus:border-blue-500 p-2 px-4' type="text" placeholder='Search' />
          <Search className='absolute right-[20px] top-[9px] cursor-pointer'/>
        </div>
        <Mic className='cursor-pointer'/>
      </div>
      <div className='flex justify-around gap-5 items-center'>
        <Video className='cursor-pointer'/>
        <Bell className='cursor-pointer'/>
        <div onClick={()=>router.push(token?'/auth/profile':'/signup')} className={`${token?'':'border'} p-1 px-2 border-white rounded-full hover:bg-slate-800 cursor-pointer flex items-center gap-2`}>
          {token?<img className='w-8 rounded-full' src={user?.data?.avatar} alt='user'/>:<CircleUser />}
          {token?<></>:<span className='text-sm'>SignUp</span>}
        </div>
      </div>
    </div>
  )
}

export default Navbar