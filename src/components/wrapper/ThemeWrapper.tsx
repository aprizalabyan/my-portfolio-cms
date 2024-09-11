"use client"

import React from 'react'
import { ThemeProvider } from "@material-tailwind/react";
import CustomTheme from "@/themes/theme";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider value={CustomTheme}>
      {children}
    </ThemeProvider>
  )
}

export default ThemeWrapper