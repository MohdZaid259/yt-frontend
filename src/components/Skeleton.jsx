import React from 'react'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { useContext } from "react";
import { SidebarContext } from '@/contexts/sidebarContext.jsx';

function SkeletonPage() {
  const {isOpen} = useContext(SidebarContext) 
  
  return (
    <div className={`grid grid-cols-3 gap-y-6 gap-x-4 ${isOpen?'pt-2':'pt-4'} w-full`}>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[175px] w-[350px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[350px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[175px] w-[350px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[350px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[175px] w-[350px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[350px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[175px] w-[350px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[350px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[175px] w-[350px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[350px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[175px] w-[350px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[350px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[175px] w-[350px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[350px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[175px] w-[350px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[350px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[175px] w-[350px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[350px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonPage