import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VideoList } from "@/components/dashboard/VideoList.jsx"

export default function DashboardPage() {
  return (
    <div className="space-y-4 w-full mr-20">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2K</div>
          </CardContent>
        </Card>
      </div>
      <h2 className="mt-6 text-xl font-semibold">Your Videos</h2>
      <VideoList />
    </div>
  )
}