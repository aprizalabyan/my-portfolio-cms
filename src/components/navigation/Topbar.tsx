"use client"

import React from "react"
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "../button/PrimaryButton";

const Topbar = () => {
  return (
    <div className="topbar bg-dark-lighten-1">
      <div className="flex justify-end items-center px-8 h-full">
        <PrimaryButton type="button" onClick={() => { }}>
          <ArrowRightStartOnRectangleIcon className="size-5" />
          <span className="font-semibold text-sm">Logout</span>
        </PrimaryButton>
      </div>
    </div>
  )
}

export default Topbar