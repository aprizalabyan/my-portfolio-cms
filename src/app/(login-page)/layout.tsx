import React from 'react'

const LoginLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="login-layout">
      {children}
    </div>
  )
}

export default LoginLayout
