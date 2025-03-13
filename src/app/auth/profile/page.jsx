'use client'

import React from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation.js'
import noImage from '@/assets/noImage.jpeg'
import useLocalStorage from '@/hooks/useLocalStorage.jsx'

const url = process.env.NEXT_PUBLIC_BASE_URL;

function Profile() {
  const router = useRouter()
  const [setAuth,getAuth,removeAuth] = useLocalStorage('auth')
  const [setAccessToken,getAccessToken,removeAccessToken] = useLocalStorage('access')
  const [setRefreshToken,getRefreshToken,removeRefreshToken] = useLocalStorage('refresh')
  
  const [profile, setProfile] = React.useState({
    name: "Mohd Zaid",
    username: "mohdzaid259",
    status: "Online",
    about: "Discuss only on work hour, unless you wanna discuss about music 👍"
  })
  const [profileImage, setProfileImage] = React.useState(noImage.src)

  function modalToggle(){
    router.replace('/')
  };
  function handleInputChange(e){
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev,[name]: value }))
  }
  function handleSubmit(){
    e.preventDefault()
    console.log("Profile data:", profile)
    console.log("Profile image:", profileImage)
  }
  function handleImageChange(e){
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }
  function handleDeleteImage(){
    setProfileImage(noImage.src)
  }
  const handleLogout = async() => {
    try {
      await axios.post(`${url}/user/logout`)
      setAccessToken('')
      setRefreshToken('')
      setAuth('')
      router.replace('/')
    } catch (err) {
      console.log(err);
    }
  }

  return (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={modalToggle}>
    <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-6">
        <div className="space-y-2">
          <label htmlFor="profile-picture">Profile picture</label>
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden bg-pink-100">
              <img src={profileImage || noImage.src} alt="Profile picture" className="object-cover" />
            </div>
            <div className="flex gap-2">
              <button className="text-blue-500 text-sm border border-blue-500 px-2 rounded py-1 hover:bg-blue-50" type="file" onChange={handleImageChange}>Change picture</button>
              <button className="text-red-500 text-sm border px-2 rounded py-1 border-red-500 hover:bg-red-50" onClick={handleDeleteImage}> Delete picture </button>
            </div>
          </div>
        </div>

        <div className="space-y-2 flex flex-col">
          <label className='text-black text-sm' htmlFor="name">Profile name</label>
          <input className='border outline-none px-2 text-sm py-1 rounded border-gray-300 text-gray-900' id="name" name="name" value={profile.name} onChange={handleInputChange} />
        </div>

        <div className="space-y-2 flex flex-col">
          <label className='text-black text-sm' htmlFor="username">Username</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">@</span>
            <input className='border outline-none px-8 text-sm py-1 rounded border-gray-300 text-gray-900' id="username" name="username" value={profile.username} onChange={handleInputChange}/>
          </div>
          <p className="text-xs text-gray-500">Available change in 25/04/2024</p>
        </div>

        <div className="space-y-2 flex flex-col">
          <label className='text-black text-sm' htmlFor="status">Status recently</label>
          <input className='border outline-none px-2 text-sm py-1 rounded border-gray-300 text-gray-900' id="status" name="status" value={profile.status} onChange={handleInputChange} />
        </div>
        <div className="space-y-2 flex flex-col">
          <label className='text-black text-sm' htmlFor="about">About me</label>
          <textarea className='border outline-none px-2 text-sm py-1 rounded border-gray-300 text-gray-900' id="about" name="about" value={profile.about} onChange={handleInputChange} rows={4} />
        </div>
        <div className="flex justify-end items-center gap-4">
          <button type="submit" className="rounded px-2 py-1 bg-red-500 text-white font-semibold text-md hover:bg-red-600" onClick={handleLogout}>Logout</button>
          <button type="submit" className="rounded px-2 py-1 text-white font-semibold text-md bg-gray-500 hover:bg-gray-600">Save changes</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Profile