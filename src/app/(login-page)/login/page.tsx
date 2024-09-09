"use client"

import React, { useState, useEffect } from "react"
import PrimaryButton from "@/components/button/PrimaryButton"
import InputTextField from "@/components/form/InputTextField"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="login-page h-full">
      <div className="grid grid-cols-3 h-full">
        <div className="left-section col-span-2 bg-dark-lighten-1"></div>
        <div className="right-section flex items-center justify-center">
          <div className="flex flex-col gap-4" style={{width: "240px"}}>
            <InputTextField
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            ></InputTextField>
            <InputTextField
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              appendIcon={showPass ? EyeSlashIcon : EyeIcon}
              type={showPass ? "text" : "password"}
              required
              onClickAppend={() => setShowPass(!showPass)}
            ></InputTextField>
            <PrimaryButton onClick={() => {}} type="button" className="bg-accent-blue text-dark-base min-w-20 text-sm font-medium mt-2">Login</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage