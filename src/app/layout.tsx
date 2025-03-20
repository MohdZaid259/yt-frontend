'use client'

import "./globals.css";
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { SidebarProvider } from '../contexts/sidebarContext.jsx'
import store from '../store/store.js'
import { Provider } from 'react-redux';
import AuthInitializer from '@/components/AuthInitializer.js'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  
  return (
      <html lang="en" style={{ scrollBehavior: "smooth",scrollbarWidth: "none" }} >
        <body className="dark">
        <Provider store={store}>
          <SidebarProvider>
            <AuthInitializer/>
            <Navbar/>
            <div className="flex">
              <Sidebar/>
              {children}
            </div>
          </SidebarProvider>
          </Provider>
        </body>
      </html>
  );
}
