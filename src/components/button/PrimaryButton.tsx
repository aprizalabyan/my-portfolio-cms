"use client"

import React from 'react'
import { Button } from "@material-tailwind/react";

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "outlined" | "gradient" | "text";
}

const PrimaryButton: React.FC<Props> = ({ children, onClick, className, icon: Icon, type, size, variant }) => {
  return (
    <Button 
      type={type} 
      size={size} 
      variant={variant} 
      ripple={false} 
      onClick={onClick} 
      className={`flex justify-center gap-2 items-center px-2 py-2 rounded shadow-sm normal-case ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </Button>
  )
}

export default PrimaryButton