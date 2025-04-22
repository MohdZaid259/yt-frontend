'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation.js'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/store/slices/authSlice.js'
import useLocalStorage from '@/hooks/useLocalStorage.jsx'
import useSessionStorage from '@/hooks/useSessionStorage'

function Profile() {
  const [setAuth,getAuth,removeAuth] = useLocalStorage('auth')
  const [setAccessToken,getAccessToken,removeAccessToken] = useSessionStorage('access')
  const [setRefreshToken,getRefreshToken,removeRefreshToken] = useSessionStorage('refresh')
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.auth?.user)

  function handleLogout(){
    dispatch(logoutUser())
    setAccessToken('')
    setRefreshToken('')
    setAuth('')
    router.replace('/')
  }
  
  return (
    <div className="max-w-3xl scale-75 aspect-auto border-white border rounded-xl">
      <div className="relative h-48 md:h-64 sm rounded-t-lg overflow-hidden">
        <img src={user?.coverImage} alt="Channel Cover" className="w-full h-full rounded-xl object-cover" />
      </div>
      <Card className="mt-[-4rem] relative border-0 shadow-none">
        <CardContent className="pt-0">
          <div className="flex flex-row gap-4 items-end">
            <div className="ml-4 mt-16 sm:mt-20 relative z-10">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-background">
                <AvatarImage src={user?.avatar} alt={user?.fullname} />
                <AvatarFallback className="text-xl sm:text-2xl">
                  {user?.fullName}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Creator Info */}
            <div className="flex-1">
              <h1 className="text-lg sm:text-2xl font-bold mt-4 md:mt-0">{user?.fullname}</h1>
              <p className=" text-muted-foreground">@{user?.username}</p>
              <div className="flex gap-4 mt-2 text-xs sm:text-sm text-muted-foreground">
                <span>10 subscribers</span>
              </div>
            </div>
            <Button type="button" variant="default" className="text-xs sm:text-sm" onClick={()=>router.replace("/auth/dashboard")}> Back </Button>
            <Button type="submit" variant="destructive" className="text-xs sm:text-sm"  onClick={handleLogout}>Logout</Button>
            </div>

          {/* Additional Info */}
          <div className="mt-6 space-y-4 border-t pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Email</h3>
                <p className="text-xs sm:text-sm">{user?.email}</p>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Joined</h3>
                <p className="text-xs sm:text-sm">
                  {user?.createdAt.split('T')[0]}
                </p>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-sm sm:text-base">About</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Tech enthusiast sharing tutorials, reviews, and tech news. New videos every Tuesday and Friday!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile