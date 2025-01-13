"use client"

import React, { useState, useEffect, useRef } from "react"
import InputTextField from "@/components/form/InputTextField"
import InputChipField from "@/components/form/InputChipField"
import InputTextArea from "@/components/form/InputTextArea"
import PrimaryButton from "@/components/button/PrimaryButton"
import SecondaryButton from "@/components/button/SecondaryButton"
import FlatButton from "@/components/button/FlatButton"
import { TrashIcon } from "@heroicons/react/24/solid"
import { IDetails, IExpertise, IExperience } from "@/interfaces/common"
import { useAboutStore } from "@/store/about";
import { useExpertiseStore } from "@/store/expertise";
import { useExperienceStore } from "@/store/experience";

const AboutmePage = () => {
  const isMounted = useRef(false)
  const { s_dataAbout, loading_about, getAboutData, updateAboutData } = useAboutStore()
  const { s_dataExpertise, loading_expertise, getExpertiseData, updateExpertiseData } = useExpertiseStore()
  const { s_dataExperience, loading_experience, getExperienceData, updateExperienceData } = useExperienceStore()
  const [dataAbout, setDataAbout] = useState<IDetails>({
    header: "",
    subheader: "",
    description: "",
  })
  const [dataExpertise, setDataExpertise] = useState<IExpertise[]>([
    {
      category: "",
      sub_category: [
        {
          name: "",
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
  const [isEdited, setIsEdited] = useState({
    details: false,
    expertise: false,
    experience: false,
  });

  const handleInputDetails = (e: any) => {
    const { name, value } = e.target;
    setDataAbout({ ...dataAbout, [name]: value })
  }

  const handleSaveDetails = async () => {
    try {
      const res = await updateAboutData(dataAbout)
      if (res.status == 200)
        setIsEdited((item) => ({ ...item, details: false }));
    } catch (err: any) {
    } finally {
      setTimeout(() => {
        getExpertiseData()
      }, 500);
    }
  }

  const handleInputExpertise = (e: React.ChangeEvent<HTMLInputElement>, catIndex: number, subcatIndex: number | null) => {
    const { name, value } = e.target;
    const updatedExpertise = [...dataExpertise]

    if (subcatIndex === null) {
      updatedExpertise[catIndex].category = value
    } else {
      updatedExpertise[catIndex].sub_category[subcatIndex] = {
        ...updatedExpertise[catIndex].sub_category[subcatIndex],
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
        sub_category: [
          {
            name: "",
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
    updatedExpertise[catIndex].sub_category.push({ name: "", value: "" })
    setDataExpertise(updatedExpertise)
  }

  const removeExpertiseSubcat = (catIndex: number, subcatIndex: number) => {
    const updatedExpertise = [...dataExpertise]
    updatedExpertise[catIndex].sub_category = updatedExpertise[catIndex].sub_category.filter((_, index) => index !== subcatIndex)
    setDataExpertise(updatedExpertise)
  }

  const handleSaveExpertise = async () => {
    try {
      const res = await updateExpertiseData(dataExpertise)
      if (res.status == 200)
        setIsEdited((item) => ({ ...item, expertise: false }));
    } catch (err: any) {
    } finally {
      setTimeout(() => {
        getExpertiseData()
      }, 500);
    }
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

  const handleSaveExperience = async () => {
    try {
      const res = await updateExperienceData(dataExperience)
      if (res.status == 200)
        setIsEdited((item) => ({ ...item, experience: false }));
    } catch (err: any) {
    } finally {
      setTimeout(() => {
        getExperienceData()
      }, 500);
    }
  }

  useEffect(() => {
    if (isMounted.current) return
    isMounted.current = true

    getExperienceData()
    getExpertiseData();
    getAboutData();
  }, [])

  useEffect(() => {
    setDataAbout(s_dataAbout)
  }, [s_dataAbout])

  useEffect(() => {
    const deepCopiedExpertise = JSON.parse(JSON.stringify(s_dataExpertise));
    setDataExpertise(deepCopiedExpertise)
  }, [s_dataExpertise])

  useEffect(() => {
    const deepCopiedExperience = JSON.parse(JSON.stringify(s_dataExperience));
    setDataExperience(deepCopiedExperience)
  }, [s_dataExperience])

  useEffect(() => {
    setIsEdited((item) => ({ ...item, details: JSON.stringify(dataAbout) !== JSON.stringify(s_dataAbout) }));
  }, [dataAbout, s_dataAbout]);

  useEffect(() => {
    setIsEdited((item) => ({ ...item, expertise: JSON.stringify(dataExpertise) !== JSON.stringify(s_dataExpertise) }));
  }, [dataExpertise, s_dataExpertise]);

  useEffect(() => {
    setIsEdited((item) => ({ ...item, experience: JSON.stringify(dataExperience) !== JSON.stringify(s_dataExperience) }));
  }, [dataExperience, s_dataExperience]);

  return (
    <div className="about-me flex flex-col gap-6">
      <span className="text-sm font-semibold">About Me</span>
      <div className="grid grid-cols-12 gap-6">
        <div className="left-section col-span-5 flex flex-col gap-4" style={{ maxWidth: "80%" }}>
          <InputTextField
            label="Header"
            name="header"
            placeholder={loading_about ? "Loading..." : ""}
            value={dataAbout.header}
            disabled={loading_about}
            onChange={(e) => handleInputDetails(e)}
          ></InputTextField>
          <InputTextArea
            label="Sub-header"
            name="subheader"
            rows={10}
            placeholder={loading_about ? "Loading..." : ""}
            value={dataAbout.subheader}
            disabled={loading_about}
            onChange={(e) => handleInputDetails(e)}
          ></InputTextArea>
          <InputTextArea
            label="Other Description"
            name="description"
            rows={10}
            placeholder={loading_about ? "Loading..." : ""}
            value={dataAbout.description}
            disabled={loading_about}
            onChange={(e) => handleInputDetails(e)}
          ></InputTextArea>
          <PrimaryButton
            onClick={handleSaveDetails}
            type="button"
            className="w-fit"
            disabled={loading_about || !isEdited.details}
          >
            Save
          </PrimaryButton>
        </div>
        <div className="right-section col-span-7 flex flex-col gap-4" style={{ maxWidth: "80%" }}>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold">Expertise</span>
            {dataExpertise.map((expertise, index1) => {
              return (
                <div className="grid grid-cols-10 gap-2 w-full" key={index1}>
                  <div className="col-span-4">
                    <InputTextField
                      placeholder={loading_expertise ? "Loading..." : "Category"}
                      name="category"
                      value={expertise.category}
                      disabled={loading_expertise}
                      onChange={(e) => handleInputExpertise(e, index1, null)}
                    ></InputTextField>
                  </div>
                  <div className="flex flex-col gap-2 col-span-6">
                    {expertise.sub_category.map((subcategory, index2) => {
                      return (
                        <div className="flex gap-2" key={index2}>
                          <InputTextField
                            placeholder={loading_expertise ? "Loading..." : "Sub-category"}
                            name="name"
                            value={subcategory.name}
                            disabled={loading_expertise}
                            onChange={(e) => handleInputExpertise(e, index1, index2)}
                          ></InputTextField>
                          <div className="w-32">
                            <InputTextField
                              placeholder={loading_expertise ? "Loading..." : "Value"}
                              name="value"
                              value={subcategory.value}
                              disabled={loading_expertise}
                              onChange={(e) => handleInputExpertise(e, index1, index2)}
                            ></InputTextField>
                          </div>
                          <FlatButton className="text-dark-lighten-3 p-1" icon={TrashIcon} onClick={() => {
                            if (expertise.sub_category.length < 2) removeExpertiseCategory(index1)
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
            <PrimaryButton
              onClick={handleSaveExpertise}
              type="button"
              className="w-fit"
              disabled={loading_expertise || !isEdited.expertise}
            >
              Save
            </PrimaryButton>
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
                          placeholder={loading_experience ? "Loading..." : "Year"}
                          name="year"
                          value={experience.year}
                          disabled={loading_experience}
                          onChange={(e) => handleInputExperience(e, index, false)}
                        ></InputTextField>
                      </div>
                      <InputTextField
                        placeholder={loading_experience ? "Loading..." : "Position"}
                        name="position"
                        value={experience.position}
                        disabled={loading_experience}
                        onChange={(e) => handleInputExperience(e, index, false)}
                      ></InputTextField>
                      <InputTextField
                        placeholder={loading_experience ? "Loading..." : "Company"}
                        name="company"
                        value={experience.company}
                        disabled={loading_experience}
                        onChange={(e) => handleInputExperience(e, index, false)}
                      ></InputTextField>
                    </div>
                    <InputTextArea
                      placeholder={loading_experience ? "Loading..." : "Description"}
                      name="description"
                      rows={6}
                      value={experience.description}
                      disabled={loading_experience}
                      onChange={(e) => handleInputExperience(e, index, false)}
                    ></InputTextArea>
                    <InputChipField
                      placeholder={experience.tags.length > 0 ? "" : "Tags"}
                      name="tags"
                      value={experience.inputTag}
                      chips={experience.tags}
                      disabled={loading_experience}
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
            <PrimaryButton
              onClick={handleSaveExperience}
              type="button"
              className="w-fit"
              disabled={loading_experience || !isEdited.experience}
            >
              Save
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutmePage