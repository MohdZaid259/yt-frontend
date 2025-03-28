"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function VideoEditForm({ videoId }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState()

  useEffect(() => {
    setThumbnailPreview("/placeholder.svg?height=720&width=1280")
  }, [videoId])

  const handleThumbnailChange = () => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      router.push("/dashboard/videos")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
            <CardDescription>Edit your video information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" defaultValue="How to Build a Next.js App with TypeScript" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" defaultValue="In this tutorial, we'll walk through building a complete Next.js application with TypeScript, including setup, routing, and deployment." rows={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <div className="flex flex-col gap-4">
              {thumbnailPreview && (
                <div className="relative w-full max-w-[320px]">
                  <Image
                    src={thumbnailPreview || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    width={320}
                    height={180}
                    className="rounded-md object-cover"
                  />
                  <Button type="button" variant="outline" size="sm" className="mt-2">
                    Change Thumbnail
                  </Button>
                </div>
              )}
              <Input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-between">
        <Button variant="outline" type="button" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}

