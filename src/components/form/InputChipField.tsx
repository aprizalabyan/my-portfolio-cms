"use client"

import React, { useId } from 'react'
import { Input, Chip } from "@material-tailwind/react";

interface Props {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  type?: string,
  required?: boolean;
  disabled?: boolean;
  chips: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onDeleteChip: (e: number) => void;
}

const InputChipField: React.FC<Props> = ({ name, label, placeholder, value, className, type, required, chips, disabled, onKeyDown, onChange, onDeleteChip }) => {
  const inputId = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="block text-xs font-semibold text-primary-text mb-2">
        {label}
      </label>}
      <div className={`flex items-center border border-dark-lighten-2 rounded-md shadow-sm bg-dark-lighten-1 ${className}`}>
        {chips.length > 0 && <div className="flex ps-2 gap-1">
          {chips.map((chip, index) => (
            <Chip
              key={index}
              value={chip}
              onClose={() => onDeleteChip(index)}
              size="sm"
              className="bg-dark-lighten-2 text-primary-text rounded-full"
              style={{fontSize: "11px"}}
            />
          ))}
        </div>}
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
          onKeyDown={onKeyDown}
          value={value}
          disabled={disabled}
          required={required}
        />
      </div>
    </div>
  )
}

export default InputChipField