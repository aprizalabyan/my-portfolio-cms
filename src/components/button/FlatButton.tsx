"use client"

import React from 'react'
import { Button } from "@material-tailwind/react";

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
}

const FlatButton: React.FC<Props> = ({ children, onClick, className, icon: Icon, disabled, type, size }) => {
  return (
    <Button 
      type={type} 
      size={size} 
      variant="text"
      ripple={false}
      disabled={disabled}
      onClick={onClick} 
      className={`text-xs font-medium flex justify-center gap-2 items-center px-3 py-2 rounded-md text-primary-text active:opacity-75 ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </Button>
  )
}

export default FlatButton