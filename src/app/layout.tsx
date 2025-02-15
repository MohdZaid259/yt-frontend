'use client'

import "./globals.css";
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { SidebarProvider } from '../contexts/sidebarContext.jsx'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
      <html lang="en" style={{ scrollBehavior: "smooth",scrollbarWidth: "none" }} >
        <body className="dark">
          <SidebarProvider>
            <Navbar/>
            <div className="flex">
              <Sidebar/>
              {children}
            </div>
          </SidebarProvider>
        </body>
      </html>
  );
}
