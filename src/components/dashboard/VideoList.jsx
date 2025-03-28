import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function VideoList() {
  const videos = [
    {
      id: "1",
      title: "Getting Started with Next.js",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      views: "12.5K",
      date: "2 days ago",
    },
    {
      id: "2",
      title: "React Basics Tutorial",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      views: "8.3K",
      date: "1 week ago",
    },
    {
      id: "3",
      title: "CSS Tips and Tricks",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      views: "5.7K",
      date: "2 weeks ago",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <Card key={video.id}>
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
                <span>{video.date}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="w-full">
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