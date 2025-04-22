"use client"

import React from "react"
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDispatch,useSelector } from 'react-redux'
import { getVideoById, updateVideo, deleteVideo } from '@/store/slices/videoSlice.js'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function VideoEditForm({ videoId }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const video = useSelector((state)=>state.video.video)
  const [formData, setFormData] = useState({
      thumbnail: null,
      title: "",
      description: "",
    });
  const thumbnailPreview = formData.thumbnail

  useEffect(() => {
    async function handler(){
      await dispatch(getVideoById(videoId))
    }
    handler()
  },[videoId])

  const handleChange = (e) => {
    e.preventDefault()

    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleDelete = () => {
    dispatch(deleteVideo(videoId))
    router.back()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { thumbnail, title, description } = formData
    if (!thumbnail && !title && !description) {
      alert("Fill atleast one field.")
      return
    }
    
    const res = await dispatch(updateVideo({videoId, data:formData}))
    if(res) router.replace('/')
  };

  return (
    <form onSubmit={handleSubmit} className="m-4 mb-20">
      <Card>
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
            <CardDescription>Edit your video information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData?.title} placeholder={video?.title} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData?.description} placeholder={video?.description} onChange={handleChange} rows={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <div className="flex flex-col gap-4">
              {thumbnailPreview && (
                <div className="relative w-full max-w-[320px]">
                  <Image
                    src={URL.createObjectURL(thumbnailPreview) || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    width={320}
                    height={180}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              {!thumbnailPreview && video?.thumbnail && (
                <div className="relative w-full max-w-[320px]">
                  <Image
                    src={video?.thumbnail || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    width={320}
                    height={180}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              <label className="hover:border-white cursor-pointer border rounded-lg text-center px-2 py-1" htmlFor="thumbnail-upload">Upload new</label>
              <Input
                  id="thumbnail-upload"
                  type="file"
                  name='thumbnail'
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-2 flex justify-between">
        <Button variant="outline" type="button" onClick={() => router.back()}>
          Cancel
        </Button>
        <div className="space-x-3">
          <Button variant='destructive' type='button' onClick={handleDelete}>Delete</Button>
          <Button type="submit"> Save Changes </Button>
        </div>
      </div>
    </form>
  )
}

