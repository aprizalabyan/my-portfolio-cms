import React from 'react'
import Sidebar from '@/components/navigation/Sidebar'
import Topbar from '@/components/navigation/Topbar'

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <div className="main-content p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
