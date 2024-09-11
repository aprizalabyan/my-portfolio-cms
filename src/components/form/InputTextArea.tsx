"use client"

import React, { useId } from 'react'
import { Textarea } from "@material-tailwind/react";

interface Props {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  rows?: number,
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputTextArea: React.FC<Props> = ({ name, label, placeholder, onChange, value, className, rows, required }) => {
  const inputId = useId();

  return (
    <div>
      {label && <label htmlFor={inputId} className="block text-xs font-semibold text-primary-text mb-2">
        {label}
      </label>}
      <div className="flex items-center border border-dark-lighten-2 rounded-md shadow-sm bg-dark-lighten-1">
        <Textarea
          id={inputId}
          name={name}
          rows={rows}
          variant="static"
          placeholder={placeholder}
          className="block w-full !py-2 px-3 !m-0 text-primary-text focus:outline-none border-none placeholder:opacity-100 placeholder:text-dark-lighten-3 text-xs bg-dark-lighten-1"
          labelProps={{
            className: "hidden",
          }}
          onChange={onChange}
          value={value}
          required={required}
        />
      </div>
    </div>
  )
}

export default InputTextArea