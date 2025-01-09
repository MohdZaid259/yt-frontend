'use client'

import { createContext, useState } from "react";

export const SidebarContext = createContext()

export const SidebarProvider = ({children}) => {
  const [isOpen,setIsOpen] = useState(true)

  const toggleFn = () => setIsOpen((prev) => !prev)

  return (
    <SidebarContext.Provider value={{ isOpen,toggleFn }}>
      {children}
    </SidebarContext.Provider>
  )
}