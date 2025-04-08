'use client'

import { Pencil } from 'lucide-react';
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function VideoList({prop}) {
  const [data,setData] = useState([])
  const router = useRouter()

  useEffect(()=>{
    setData([prop])
  },[prop])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((video,i) => (
        <Card key={i}>
          <CardContent className="p-3">
            <div className="space-y-2">
              <div className="aspect-video overflow-hidden rounded-md">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  width={640}
                  height={360}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-medium">{video.title}</h3>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{video.views} views</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={()=>router.push(`/auth/dashboard/editVideo/${video._id}`)} size="sm" variant="outline" className="w-full text-sm hover:bg-zinc-800 hover:border-white">
                  <Pencil className='p-[2px]'/>
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}