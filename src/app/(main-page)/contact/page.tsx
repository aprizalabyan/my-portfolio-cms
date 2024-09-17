"use client"

import React, { useState } from 'react'
import PrimaryButton from '@/components/button/PrimaryButton';
import SecondaryButton from '@/components/button/SecondaryButton';
import FlatButton from '@/components/button/FlatButton';
import InputTextField from '@/components/form/InputTextField';
import { TrashIcon } from "@heroicons/react/24/solid"

interface Contact {
  type: string;
  title: string;
  url: string;
}

const ContactPage = () => {
  const [dataEmail, setDataEmail] = useState<Contact[]>([
    {
      type: "",
      title: "",
      url: ""
    }
  ])
  const [dataSocmed, setDataSocmed] = useState<Contact[]>([
    {
      type: "",
      title: "",
      url: ""
    }
  ])

  const addEmail = () => {
    setDataEmail([
      ...dataEmail,
      {
        type: "",
        title: "",
        url: ""
      }
    ])
  }

  const removeEmail = (emailIndex: number) => {
    const updatedEmail = dataEmail.filter((_, index) => index !== emailIndex)
    setDataEmail(updatedEmail)
  }

  const handleInputEmail = (e: any, emailIndex: number) => {
    const { name, value } = e.target;
    const updatedEmail = [...dataEmail]

    updatedEmail[emailIndex] = {
      ...updatedEmail[emailIndex],
      [name]: value
    }

    setDataEmail(updatedEmail)
  }

  const handleSaveEmail = () => {
    console.log("save", dataEmail);
  }

  const addSocmed = () => {
    setDataSocmed([
      ...dataSocmed,
      {
        type: "",
        title: "",
        url: ""
      }
    ])
  }
  
  const removeSocmed = (socmedIndex: number) => {
    const updatedSocmed = dataSocmed.filter((_, index) => index !== socmedIndex)
    setDataSocmed(updatedSocmed)
  }

  const handleInputSocmed = (e: any, socmedIndex: number) => {
    const { name, value } = e.target;
    const updatedSocmed = [...dataSocmed]

    updatedSocmed[socmedIndex] = {
      ...updatedSocmed[socmedIndex],
      [name]: value
    }

    setDataSocmed(updatedSocmed)
  }

  const handleSaveSocmed = () => {
    console.log("save", dataSocmed);
  }

  return (
    <div className="contact-info flex flex-col gap-6">
      <span className="text-sm font-semibold">Contact Info</span>
      <div className="grid grid-cols-12 gap-6">
        <div className="form-section col-span-9 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold">Email</span>
            {dataEmail.map((email, index) => {
              return (
                <div className="grid grid-cols-12 gap-2 w-full" key={index}>
                  <div className="col-span-2">
                    <InputTextField
                      placeholder="Type"
                      name="type"
                      value={email.type}
                      onChange={(e) => handleInputEmail(e, index)}
                    ></InputTextField>
                  </div>
                  <div className="col-span-4">
                    <InputTextField
                      placeholder="Title"
                      name="title"
                      value={email.title}
                      onChange={(e) => handleInputEmail(e, index)}
                    ></InputTextField>
                  </div>
                  <div className="col-span-5">
                    <InputTextField
                      placeholder="Url"
                      name="url"
                      value={email.url}
                      onChange={(e) => handleInputEmail(e, index)}
                    ></InputTextField>
                  </div>
                  <div className="col-span-1">
                    <FlatButton className="text-dark-lighten-3 p-1 mt-1" icon={TrashIcon} onClick={() => removeEmail(index)}></FlatButton>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex gap-2">
            <SecondaryButton onClick={addEmail} type="button" className="w-fit">Add email +</SecondaryButton>
            <PrimaryButton onClick={handleSaveEmail} type="button" className="w-fit">Save</PrimaryButton>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold">Social Media</span>
            {dataSocmed.map((socmed, index) => {
              return (
                <div className="grid grid-cols-12 gap-2 w-full" key={index}>
                  <div className="col-span-2">
                    <InputTextField
                      placeholder="Type"
                      name="type"
                      value={socmed.type}
                      onChange={(e) => handleInputSocmed(e, index)}
                    ></InputTextField>
                  </div>
                  <div className="col-span-4">
                    <InputTextField
                      placeholder="Title"
                      name="title"
                      value={socmed.title}
                      onChange={(e) => handleInputSocmed(e, index)}
                    ></InputTextField>
                  </div>
                  <div className="col-span-5">
                    <InputTextField
                      placeholder="Url"
                      name="url"
                      value={socmed.url}
                      onChange={(e) => handleInputSocmed(e, index)}
                    ></InputTextField>
                  </div>
                  <div className="col-span-1">
                    <FlatButton className="text-dark-lighten-3 p-1 mt-1" icon={TrashIcon} onClick={() => removeSocmed(index)}></FlatButton>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex gap-2">
            <SecondaryButton onClick={addSocmed} type="button" className="w-fit">Add socmed +</SecondaryButton>
            <PrimaryButton onClick={handleSaveSocmed} type="button" className="w-fit">Save</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage