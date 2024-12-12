"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import FlatButton from "../button/FlatButton";
import { useAuthStore } from "@/store/auth";
import axios from "axios";

const Topbar = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true)
      await axios.get("/api/auth/logout")
        .then((res) => {
          useAuthStore.persist.clearStorage()
          router.push("/login")
        })
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="topbar bg-dark-lighten-1">
      <div className="flex justify-end items-center px-8 h-full">
        <FlatButton className="text-primary-text" type="button" icon={ArrowRightStartOnRectangleIcon} disabled={loading} onClick={handleLogout}>
          <span className="font-semibold text-sm">Logout</span>
        </FlatButton>
      </div>
    </div>
  )
}

export default Topbar