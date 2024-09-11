"use client"

import React, { useId } from 'react'
import { Input, Button } from "@material-tailwind/react";

interface Props {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  type?: string,
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prevendIcon?: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & React.RefAttributes<SVGSVGElement>>;
  appendIcon?: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & React.RefAttributes<SVGSVGElement>>;
  onClickAppend?: () => void;
}

const InputTextField: React.FC<Props> = ({ name, label, placeholder, onChange, value, className, type, required, prevendIcon: PrevendIcon, appendIcon: AppendIcon, onClickAppend }) => {
  const inputId = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="block text-xs font-semibold text-primary-text mb-2">
        {label}
      </label>}
      <div className={`flex items-center border border-dark-lighten-2 rounded-md shadow-sm bg-dark-lighten-1 ${className}`}>
        {PrevendIcon && <PrevendIcon className="w-4 h-4 text-dark-lighten-3" />}
        <Input
          id={inputId}
          name={name}
          type={type || "text"}
          size="md"
          placeholder={placeholder}
          className="block w-full text-primary-text focus:outline-none border-none placeholder:opacity-100 placeholder:text-dark-lighten-3 text-xs bg-dark-lighten-1"
          labelProps={{
            className: "hidden",
          }}
          onChange={onChange}
          value={value}
          required={required}
        />
        {AppendIcon && <div className="ps-0 pe-3">
          <Button size="sm" variant="text" ripple={false} onClick={onClickAppend} className="p-0">
            {AppendIcon && <AppendIcon className="w-4 h-4 text-dark-lighten-3" />}
          </Button>
        </div>}
      </div>
    </div>
  )
}

export default InputTextField