'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VideoList } from "@/components/dashboard/VideoList.jsx"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getUserData, getUserVideos } from '@/store/slices/dashboardSlice.js'

export default function DashboardPage() {
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.dashboard.loading)
  const data = useSelector((state)=>state.dashboard.data)
  const videos = useSelector((state)=>state.dashboard.videos) || []

  useEffect(()=>{
    dispatch(getUserData())
    dispatch(getUserVideos())
  },[])
  
  if(loading) return <>Loading...</>
  return (
    <div className="space-y-4 px-4 lg:mr-20 mb-20">
      <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{data?.totalVideos || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{data?.totalViews || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{data?.totalSubscribers || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{data?.totalLikes || 0}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="mt-6 text-lg sm:text-xl font-semibold">Your Videos</h2>
      {!videos.length > 0 && (
        <span className="text-sm sm:text-base text-slate-400 inline-block">
          You didn't post anything yet!!
        </span>
      )}
      {videos.length > 0 &&
        videos.map((item, i) => (
          <VideoList key={i} prop={item} />
        ))}
    </div>
  )
}