'use client'

import "./globals.css";
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { SidebarProvider } from '../contexts/sidebarContext.jsx'
import store from '../store/store.js'
import { Provider } from 'react-redux';
import useLocalStorage from '@/hooks/useLocalStorage.jsx'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  // const [setAuth,getAuth,removeAuth] = useLocalStorage('auth')
  // const authRes = getAuth()
  // console.log(authRes)

  return (
      <html lang="en" style={{ scrollBehavior: "smooth",scrollbarWidth: "none" }} >
        <body className="dark">
        <Provider store={store}>
          <SidebarProvider>
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
