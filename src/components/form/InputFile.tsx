"use client"

import React, { useId } from 'react'
import { Input } from "@material-tailwind/react";
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface Props {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  accept?: string;
  className?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile: React.FC<Props> = ({ name, label, placeholder, value, accept, className, required, onChange }) => {
  const inputId = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="block text-xs font-semibold text-primary-text mb-2">
        {label}
      </label>}
      <div className="flex items-center gap-2">
        <PaperClipIcon className="w-4 h-4 text-primary-text" />
        <div className={`flex items-center border border-dark-lighten-2 rounded-md shadow-sm bg-dark-lighten-1 w-full ${className}`}>
          <Input
            id={inputId}
            name={name}
            type="file"
            accept={accept}
            size="lg"
            placeholder={placeholder}
            className="block w-full text-primary-text focus:outline-none border-none placeholder:opacity-100 placeholder:text-dark-lighten-3 text-xs bg-dark-lighten-1"
            labelProps={{
              className: "hidden",
            }}
            onChange={onChange}
            value={value}
            required={required}
          />
        </div>
      </div>
    </div>
  )
}

export default InputFile