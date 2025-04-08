"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { publishVideo } from '@/store/slices/videoSlice.js'

export function UploadForm() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    video: null,
    thumbnail: null,
    title: "",
    description: "",
  });

  const videoFile = formData.video
  const thumbnailPreview = formData.thumbnail

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const removeThumbnail = () => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { video, thumbnail, title, description } = formData

    if (!video || !thumbnail || !title || !description) {
      alert("Please fill in all fields.")
      return
    }

    await dispatch(publishVideo(formData))
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video-upload">Video File</Label>
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6">
              {videoFile ? (
                <div className="text-center">
                  <p className="font-medium">{videoFile.name}</p>
                  <p className="text-sm text-muted-foreground">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="mb-2 font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">MP4, WebM or MOV (max. 2GB)</p>
                </div>
              )}
              <Input
                id="video-upload"
                type="file"
                name='video'
                accept="video/*"
                className={videoFile ? "hidden" : "mt-4"}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <div className="flex flex-col gap-4">
                {thumbnailPreview ? (
                  <div className="relative w-full max-w-[320px]">
                    <Image
                      src={URL.createObjectURL(thumbnailPreview) || "/placeholder.svg"}
                      alt="Thumbnail preview"
                      width={320}
                      height={180}
                      className="rounded-md object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={removeThumbnail}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6">
                    <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="mb-2 text-sm font-medium">Upload thumbnail image</p>
                    <Label
                      htmlFor="thumbnail-upload"
                      className="cursor-pointer rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
                    >
                      Select Image
                    </Label>
                    <Input
                      id="thumbnail-upload"
                      type="file"
                      name='thumbnail'
                      accept="image/*"
                      className="hidden"
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Video title" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Video description" rows={3} />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit"> Upload </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

