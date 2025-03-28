import Link from "next/link"
import { Home, Upload, User } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 border-l-2 bg-translate p-4">
      <nav className="space-y-2">
        <Link href="/dashboard" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-900">
          <Home className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>
        <Link href="/dashboard/upload" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-900">
          <Upload className="h-4 w-4" />
          <span>Upload</span>
        </Link>
        <Link href="/auth/profile" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-900">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  )
}

