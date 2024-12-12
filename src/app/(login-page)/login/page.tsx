"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import PrimaryButton from "@/components/button/PrimaryButton"
import InputTextField from "@/components/form/InputTextField"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from "axios";
import { useAuthStore } from "@/store/auth";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)

  const handleLogin = async () => {
    try {
      setLoading(true)
      await axios.post("/api/auth/login", { username, password })
        .then((res) => {
          const data = res.data.data
          setUser(data.username, data.name, data.access_token)
          router.push("/")
        })
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page h-full">
      <div className="grid grid-cols-3 h-full">
        <div className="left-section col-span-2 bg-dark-lighten-1"></div>
        <div className="right-section flex items-center justify-center">
          <div className="flex flex-col gap-4" style={{ width: "240px" }}>
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
            <PrimaryButton onClick={handleLogin} type="button" className="min-w-20 mt-2" disabled={loading}>Login</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage