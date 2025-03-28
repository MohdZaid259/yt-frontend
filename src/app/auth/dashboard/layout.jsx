import {Sidebar} from '@/components/dashboard/DashboardSidebar.jsx'

export default function Layout({ children }) {
    return (
      <div className="flex mt-5">
      <Sidebar/>
      <main className="flex-1">{children}</main>
      </div>
    )
}