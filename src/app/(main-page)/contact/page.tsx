"use client"

import React, { useState, useEffect, useRef } from 'react'
import PrimaryButton from '@/components/button/PrimaryButton';
import SecondaryButton from '@/components/button/SecondaryButton';
import FlatButton from '@/components/button/FlatButton';
import InputTextField from '@/components/form/InputTextField';
import { TrashIcon } from "@heroicons/react/24/solid"
import { IContact } from '@/interfaces/common';
import { useContactStore } from '@/store/contact';

const ContactPage = () => {
  const isMounted = useRef(false)
  const { s_dataEmail, s_dataSocmed, loading_contact, getContactData, updateContactData } = useContactStore()
  const [dataEmail, setDataEmail] = useState<IContact[]>([
    {
      type: "",
      title: "",
      url: ""
    }
  ])
  const [dataSocmed, setDataSocmed] = useState<IContact[]>([
    {
      type: "",
      title: "",
      url: ""
    }
  ])
  const [isEdited, setIsEdited] = useState({
    email: false,
    socmed: false,
  });

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

  const handleSaveContact = async () => {
    let dataContact = [
      {
        category: "email",
        data: dataEmail,
      },
      {
        category: "socmed",
        data: dataSocmed,
      },
    ]

    try {
      const res = await updateContactData(dataContact)
      if (res.status == 200)
        setIsEdited({ email: false, socmed: false });
    } catch (err: any) {
    } finally {
      setTimeout(() => {
        getContactData()
      }, 500);
    }
  }

  useEffect(() => {
    if (isMounted.current) return
    isMounted.current = true

    getContactData()
  }, [])

  useEffect(() => {
    const deepCopiedEmail = JSON.parse(JSON.stringify(s_dataEmail));
    setDataEmail(deepCopiedEmail)
  }, [s_dataEmail])

  useEffect(() => {
    const deepCopiedSocmed = JSON.parse(JSON.stringify(s_dataSocmed));
    setDataSocmed(deepCopiedSocmed)
  }, [s_dataSocmed])

  useEffect(() => {
    setIsEdited((item) => ({ ...item, email: JSON.stringify(dataEmail) !== JSON.stringify(s_dataEmail) }));
  }, [dataEmail, s_dataEmail]);

  useEffect(() => {
    setIsEdited((item) => ({ ...item, socmed: JSON.stringify(dataSocmed) !== JSON.stringify(s_dataSocmed) }));
  }, [dataSocmed, s_dataSocmed]);

  return (
    <div className="contact-info flex flex-col gap-6">
      <span className="text-sm font-semibold">Contact Info</span>
      <div className="grid grid-cols-12 gap-6">
        <div className="form-section col-span-9 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between w-11/12">
              <span className="text-xs font-semibold">Email</span>
              <SecondaryButton onClick={addEmail} type="button" className="w-fit">Add email +</SecondaryButton>
            </div>
            {dataEmail.map((email, index) => {
              return (
                <div className="grid grid-cols-12 gap-2 w-full" key={index}>
                  <div className="col-span-2">
                    <InputTextField
                      placeholder={loading_contact ? "Loading..." : "Type"}
                      name="type"
                      value={email.type}
                      disabled={loading_contact}
                      onChange={(e) => handleInputEmail(e, index)}
                    ></InputTextField>
                  </div>
                  <div className="col-span-4">
                    <InputTextField
                      placeholder={loading_contact ? "Loading..." : "Title"}
                      name="title"
                      value={email.title}
                      disabled={loading_contact}
                      onChange={(e) => handleInputEmail(e, index)}
                    ></InputTextField>
                  </div>
                  <div className="col-span-5">
                    <InputTextField
                      placeholder={loading_contact ? "Loading..." : "Url"}
                      name="url"
                      value={email.url}
                      disabled={loading_contact}
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
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between w-11/12">
              <span className="text-xs font-semibold">Social Media</span>
              <SecondaryButton onClick={addSocmed} type="button" className="w-fit">Add socmed +</SecondaryButton>
            </div>
            {dataSocmed.map((socmed, index) => {
              return (
                <div className="grid grid-cols-12 gap-2 w-full" key={index}>
                  <div className="col-span-2">
                    <InputTextField
                      placeholder={loading_contact ? "Loading..." : "Type"}
                      name="type"
                      value={socmed.type}
                      disabled={loading_contact}
                      onChange={(e) => handleInputSocmed(e, index)}
                    ></InputTextField>
                  </div>
                  <div className="col-span-4">
                    <InputTextField
                      placeholder={loading_contact ? "Loading..." : "Title"}
                      name="title"
                      value={socmed.title}
                      disabled={loading_contact}
                      onChange={(e) => handleInputSocmed(e, index)}
                    ></InputTextField>
                  </div>
                  <div className="col-span-5">
                    <InputTextField
                      placeholder={loading_contact ? "Loading..." : "Url"}
                      name="url"
                      value={socmed.url}
                      disabled={loading_contact}
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
          <PrimaryButton
            onClick={handleSaveContact}
            type="button"
            className="w-fit"
            disabled={loading_contact || (!isEdited.email && !isEdited.socmed)}
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default ContactPage