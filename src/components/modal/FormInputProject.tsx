"use client"

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  IconButton,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import InputTextField from "@/components/form/InputTextField"
import InputTextArea from "@/components/form/InputTextArea"
import InputFile from '@/components/form/InputFile';
import PrimaryButton from "@/components/button/PrimaryButton"
import SecondaryButton from "@/components/button/SecondaryButton"
import InputChipField from "@/components/form/InputChipField"
import { IFormData, IFormParams } from '@/interfaces/common';

interface Props {
  openForm: boolean;
  formParams: IFormParams;
  onClose: (e: boolean) => void;
  onSave: (e: IFormData) => void;
}

const FormInputProject: React.FC<Props> = ({ openForm, formParams, onClose, onSave }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    description: "",
    url: "",
    tags: [],
    image: null
  })
  const [inputTag, setInputTag] = useState("")

  const handleInputForm = (e: any) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name == "image" ? files[0] : value
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputTag.trim()) {
      formData.tags.push(inputTag.trim())
      setInputTag("")
    }
  };

  const handleDeleteChip = (chipIndex: number) => {
    const newTags = formData.tags.filter((_, i) => i !== chipIndex);
    setFormData({
      ...formData,
      tags: newTags
    })
  };

  useEffect(() => {
    setOpen(openForm);
    if (formParams.type == "edit") {
      setFormData({
        title: formParams.data.title,
        description: formParams.data.description,
        url: formParams.data.url,
        tags: formParams.data.tags,
        image: formParams.data.image
      });
    } else {
      setFormData({
        title: "",
        description: "",
        url: "",
        tags: [],
        image: null
      });
    }
  }, [openForm])

  return (
    <div>
      <Dialog size="sm" open={open} handler={() => { }} className="bg-dark-lighten-1 p-4">
        <DialogHeader className="relative m-0 p-2 text-primary-text flex items-center justify-between">
          <span className="text-sm font-semibold">Add New Project</span>
          <IconButton
            size="sm"
            variant="text"
            className="text-dark-lighten-3 -me-2"
            onClick={() => onClose(false)}
          >
            <XMarkIcon className="h-5 w-5 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 p-2">
          <InputTextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) => handleInputForm(e)}
          ></InputTextField>
          <InputTextArea
            label="Description"
            name="description"
            rows={8}
            value={formData.description}
            onChange={(e) => handleInputForm(e)}
          ></InputTextArea>
          <InputChipField
            label="Tags"
            name="tags"
            value={inputTag}
            chips={formData.tags}
            disabled={false}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            onDeleteChip={(chipIndex) => handleDeleteChip(chipIndex)}
          ></InputChipField>
          <InputTextField
            label="URL"
            name="url"
            value={formData.url}
            onChange={(e) => handleInputForm(e)}
          ></InputTextField>
          <div className="flex gap-2">
            <InputFile
              label="Image"
              name="image"
              accept="image/*"
              onChange={(e) => handleInputForm(e)}
            ></InputFile>
          </div>
        </DialogBody>
        <DialogFooter className="p-2">
          <div className="flex gap-2">
            <SecondaryButton className="w-fit" onClick={() => onClose(false)}>Cancel</SecondaryButton>
            <PrimaryButton className="w-fit" onClick={() => onSave(formData)}>Save</PrimaryButton>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default FormInputProject