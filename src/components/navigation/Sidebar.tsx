"use client"

import React, { useState, useEffect } from 'react'
import {
  List,
  ListItem,
} from "@material-tailwind/react";
import { HomeIcon, NewspaperIcon, Square2StackIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname == path;

  const listMenu = [
    {
      title: "Home",
      url: "/",
      icon: <HomeIcon className="size-5" />
    },
    {
      title: "About Me",
      url: "/about-me",
      icon: <NewspaperIcon className="size-5" />
    },
    {
      title: "Project List",
      url: "/project",
      icon: <Square2StackIcon className="size-5" />
    },
    {
      title: "Contact Info",
      url: "/contact",
      icon: <IdentificationIcon className="size-5" />
    },
  ]

  return (
    <div className="sidebar bg-dark-lighten-1">
      <div className="flex items-center gap-4 px-6" style={{ height: "64px" }}>
        <img
          className="h-8 w-8 rounded-full object-cover object-center"
          src="/img/logo.png"
          alt="logo"
        />
        <span className="text-xl font-bold">Aprzl</span>
      </div>
      <List className="font-inter px-0 py-4 bg-none text-primary-text">
        {listMenu.map((menu, index) => {
          return (
            <Link href={menu.url} key={index}>
              <ListItem className={`"items-center gap-3 py-2 px-6 hover:bg-dark-lighten-2 focus:bg-transparent active:text-accent-blue rounded-none active:bg-transparent ${isActive(menu.url) ? "text-accent-blue hover:text-accent-blue focus:text-accent-blue" : "hover:text-primary-text focus:text-primary-text"}`} ripple={false}>
                {menu.icon}
                <span className="text-sm font-semibold">{menu.title}</span>
              </ListItem>
            </Link>
          )
        })}
      </List>
    </div>
  )
}

export default Sidebar