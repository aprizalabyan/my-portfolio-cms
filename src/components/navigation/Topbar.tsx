"use client"

import React from "react"
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import FlatButton from "../button/FlatButton";

const Topbar = () => {
  return (
    <div className="topbar bg-dark-lighten-1">
      <div className="flex justify-end items-center px-8 h-full">
        <FlatButton className="text-primary-text" type="button" icon={ArrowRightStartOnRectangleIcon} onClick={() => { }}>
          <span className="font-semibold text-sm">Logout</span>
        </FlatButton>
      </div>
    </div>
  )
}

export default Topbar