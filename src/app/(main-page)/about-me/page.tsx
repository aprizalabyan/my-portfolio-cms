"use client"

import React, { useState, useEffect } from "react"
import InputTextField from "@/components/form/InputTextField"
import InputChipField from "@/components/form/InputChipField"
import InputTextArea from "@/components/form/InputTextArea"
import PrimaryButton from "@/components/button/PrimaryButton"
import SecondaryButton from "@/components/button/SecondaryButton"
import FlatButton from "@/components/button/FlatButton"
import { TrashIcon } from "@heroicons/react/24/solid"

interface IDetails {
  header: string;
  subheader: string;
  description: string;
}

interface ISubcategory {
  title: string;
  value: string;
}

interface IExpertise {
  category: string;
  data: ISubcategory[];
}

interface IExperience {
  year: string;
  position: string;
  company: string;
  description: string;
  tags: string[];
  inputTag: string;
}

const AboutmePage = () => {
  const [dataDetails, setDataDetails] = useState<IDetails>({
    header: "",
    subheader: "",
    description: "",
  })
  const [dataExpertise, setDataExpertise] = useState<IExpertise[]>([
    {
      category: "",
      data: [
        {
          title: "",
          value: "",
        }
      ]
    }
  ])
  const [dataExperience, setDataExperience] = useState<IExperience[]>([
    {
      year: "",
      position: "",
      company: "",
      description: "",
      tags: [],
      inputTag: ""
    }
  ])

  const handleInputDetails = (e: any) => {
    const { name, value } = e.target;
    setDataDetails({ ...dataDetails, [name]: value })
  }

  const handleSaveDetails = () => {
    console.log("save", dataDetails);
  }

  const handleInputExpertise = (e: React.ChangeEvent<HTMLInputElement>, catIndex: number, subcatIndex: number | null) => {
    const { name, value } = e.target;
    const updatedExpertise = [...dataExpertise]

    if (subcatIndex === null) {
      updatedExpertise[catIndex].category = value
    } else {
      updatedExpertise[catIndex].data[subcatIndex] = {
        ...updatedExpertise[catIndex].data[subcatIndex],
        [name]: value
      }
    }

    setDataExpertise(updatedExpertise)
  }

  const addExpertiseCategory = () => {
    setDataExpertise([
      ...dataExpertise,
      {
        category: "",
        data: [
          {
            title: "",
            value: "",
          }
        ]
      }
    ])
  }

  const removeExpertiseCategory = (catIndex: number) => {
    const updatedExpertise = dataExpertise.filter((_, index) => index !== catIndex)
    setDataExpertise(updatedExpertise)
  }

  const addExpertiseSubcat = (catIndex: number) => {
    const updatedExpertise = [...dataExpertise]
    updatedExpertise[catIndex].data.push({ title: "", value: "" })
    setDataExpertise(updatedExpertise)
  }

  const removeExpertiseSubcat = (catIndex: number, subcatIndex: number) => {
    const updatedExpertise = [...dataExpertise]
    updatedExpertise[catIndex].data = updatedExpertise[catIndex].data.filter((_, index) => index !== subcatIndex)
    setDataExpertise(updatedExpertise)
  }

  const handleSaveExpertise = () => {
    console.log("save", dataExpertise);
  }

  const handleInputExperience = (e: any, expIndex: number, isTag: boolean) => {
    const { name, value } = e.target;
    const updatedExperience = [...dataExperience]

    if (isTag) {
      updatedExperience[expIndex].inputTag = value
    } else {
      updatedExperience[expIndex] = {
        ...updatedExperience[expIndex],
        [name]: value
      }
    }
    setDataExperience(updatedExperience)
  }

  const addExperience = () => {
    setDataExperience([
      ...dataExperience,
      {
        year: "",
        position: "",
        company: "",
        description: "",
        tags: [],
        inputTag: ""
      }
    ])
  }

  const removeExperience = (expIndex: number) => {
    const updatedExperience = dataExperience.filter((_, index) => index !== expIndex)
    setDataExperience(updatedExperience)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, expIndex: number) => {
    if (e.key === 'Enter' && dataExperience[expIndex].inputTag.trim()) {
      const updatedExperience = [...dataExperience]
      updatedExperience[expIndex].tags.push(dataExperience[expIndex].inputTag.trim())
      updatedExperience[expIndex].inputTag = ""
      setDataExperience(updatedExperience)
    }
  };

  const handleDeleteChip = (chipIndex: number, expIndex: number) => {
    const updatedExperience = [...dataExperience]
    const newTags = updatedExperience[expIndex].tags.filter((_, i) => i !== chipIndex);
    updatedExperience[expIndex].tags = newTags
    setDataExperience(updatedExperience)
  };

  const handleSaveExperience = () => {
    console.log("save", dataExperience);
  }

  return (
    <div className="about-me flex flex-col gap-6">
      <span className="text-sm font-semibold">About Me</span>
      <div className="grid grid-cols-12 gap-6">
        <div className="left-section col-span-5 flex flex-col gap-4" style={{ maxWidth: "80%" }}>
          <InputTextField
            label="Header"
            name="header"
            value={dataDetails.header}
            onChange={(e) => handleInputDetails(e)}
          ></InputTextField>
          <InputTextArea
            label="Sub-header"
            name="subheader"
            rows={10}
            value={dataDetails.subheader}
            onChange={(e) => handleInputDetails(e)}
          ></InputTextArea>
          <InputTextArea
            label="Other Description"
            name="description"
            rows={10}
            value={dataDetails.description}
            onChange={(e) => handleInputDetails(e)}
          ></InputTextArea>
          <PrimaryButton onClick={handleSaveDetails} type="button" className="w-fit">Save</PrimaryButton>
        </div>
        <div className="right-section col-span-7 flex flex-col gap-4" style={{ maxWidth: "80%" }}>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold">Expertise</span>
            {dataExpertise.map((expertise, index1) => {
              return (
                <div className="grid grid-cols-10 gap-2 w-full" key={index1}>
                  <div className="col-span-4">
                    <InputTextField
                      placeholder="Category"
                      name="category"
                      value={expertise.category}
                      onChange={(e) => handleInputExpertise(e, index1, null)}
                    ></InputTextField>
                  </div>
                  <div className="flex flex-col gap-2 col-span-6">
                    {expertise.data.map((subcategory, index2) => {
                      return (
                        <div className="flex gap-2" key={index2}>
                          <InputTextField
                            placeholder="Sub-category"
                            name="title"
                            value={subcategory.title}
                            onChange={(e) => handleInputExpertise(e, index1, index2)}
                          ></InputTextField>
                          <div className="w-32">
                            <InputTextField
                              placeholder="value"
                              name="value"
                              value={subcategory.value}
                              onChange={(e) => handleInputExpertise(e, index1, index2)}
                            ></InputTextField>
                          </div>
                          <FlatButton className="text-dark-lighten-3 p-1" icon={TrashIcon} onClick={() => {
                            if (expertise.data.length < 2) removeExpertiseCategory(index1)
                            else removeExpertiseSubcat(index1, index2)
                          }}></FlatButton>
                        </div>
                      )
                    })}
                    <SecondaryButton onClick={() => addExpertiseSubcat(index1)} type="button" className="w-fit">Add sub-category +</SecondaryButton>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex gap-2">
            <SecondaryButton onClick={addExpertiseCategory} type="button" className="w-fit">Add category +</SecondaryButton>
            <PrimaryButton onClick={handleSaveExpertise} type="button" className="w-fit">Save</PrimaryButton>
          </div>
          <hr style={{ opacity: 0.2 }} />
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold">Experience</span>
            {dataExperience.map((experience, index) => {
              return (
                <div className="flex gap-2 items-start" key={index}>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex gap-2">
                      <div className="w-64">
                        <InputTextField
                          placeholder="Year"
                          name="year"
                          value={experience.year}
                          onChange={(e) => handleInputExperience(e, index, false)}
                        ></InputTextField>
                      </div>
                      <InputTextField
                        placeholder="Position"
                        name="position"
                        value={experience.position}
                        onChange={(e) => handleInputExperience(e, index, false)}
                      ></InputTextField>
                      <InputTextField
                        placeholder="Company"
                        name="company"
                        value={experience.company}
                        onChange={(e) => handleInputExperience(e, index, false)}
                      ></InputTextField>
                    </div>
                    <InputTextArea
                      placeholder="Description"
                      name="description"
                      rows={6}
                      value={experience.description}
                      onChange={(e) => handleInputExperience(e, index, false)}
                    ></InputTextArea>
                    <InputChipField
                      placeholder={experience.tags.length > 0 ? "" : "Tags"}
                      name="tags"
                      value={experience.inputTag}
                      chips={experience.tags}
                      onChange={(e) => handleInputExperience(e, index, true)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onDeleteChip={(chipIndex) => handleDeleteChip(chipIndex, index)}
                    ></InputChipField>
                  </div>
                  <FlatButton className="text-dark-lighten-3 p-1 mt-1" icon={TrashIcon} onClick={() => removeExperience(index)}></FlatButton>
                </div>
              )
            })}
          </div>
          <div className="flex gap-2">
            <SecondaryButton onClick={addExperience} type="button" className="w-fit">Add experience +</SecondaryButton>
            <PrimaryButton onClick={handleSaveExperience} type="button" className="w-fit">Save</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutmePage