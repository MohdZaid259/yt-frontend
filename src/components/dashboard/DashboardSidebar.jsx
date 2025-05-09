'use client'

import Link from "next/link"
import { LayoutDashboard, Upload, User } from "lucide-react"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <div className="md:w-48 w-32 border-l-2 bg-translate pl-2 md:p-4">
      <nav className="space-y-2">
        <Link href="/auth/dashboard" className={`flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-800 ${isActive('/auth/dashboard') ? 'bg-zinc-800' : ''}`}>
          <LayoutDashboard className="h-4 w-4" />
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link href="/auth/dashboard/upload" className={`flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-800 ${isActive('/auth/dashboard/upload') ? 'bg-zinc-800' : ''}`}>
          <Upload className="h-4 w-4" />
          <span className="text-sm">Upload</span>
        </Link>
        <Link href="/auth/dashboard/profile"className={`flex items-center gap-2 rounded-md px-3 py-2 hover:bg-zinc-800 ${isActive('/auth/dashboard/profile') ? 'bg-zinc-800' : ''}`}>
          <User className="h-4 w-4" />
          <span className="text-sm">Profile</span>
        </Link>
      </nav>
    </div>
  )
}