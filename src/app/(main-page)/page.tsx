"use client"

import { useAuthStore } from '@/store/auth'
import axios from 'axios'
import React, { useEffect, useRef } from 'react'

const HomePage = () => {
  const isMounted = useRef(false)
  const name = useAuthStore((state) => state.name)

  const getUsers = async () => {
    axios.get("/api/user")
  }

  useEffect(() => {
    if (isMounted.current) return
    isMounted.current = true

    // getUsers()
  }, [])

  return (
    <div className="">Welcome back { name } !</div>
  )
}

export default HomePage