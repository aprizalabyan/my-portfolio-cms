import React from 'react'

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="main-layout">
      {children}
    </div>
  )
}

export default HomeLayout
