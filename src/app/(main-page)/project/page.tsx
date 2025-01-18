"use client"

import React, { useState, useEffect, useRef } from 'react'
import PrimaryButton from '@/components/button/PrimaryButton';
import DefaultTable from '@/components/table/DefaultTable';
import DefaultPagination from '@/components/pagination/DefaultPagination';
import FormInputProject from '@/components/modal/FormInputProject';
import { IFormParams, IProject } from '@/interfaces/common';
import { useProjectStore } from '@/store/project'

const ProjectPage = () => {
  const header = [
    {
      text: "",
      width: "5%"
    },
    {
      text: "Cover",
      width: "5%"
    },
    {
      text: "Title",
      width: "20%"
    },
    {
      text: "Description",
      width: "25%"
    },
    {
      text: "Tag",
      width: "20%"
    },
    {
      text: "URL",
      width: "20%"
    },
    {
      text: "",
      width: "5%"
    },
  ];
  const projects = {
    data: [
      {
        title: "Title 1",
        description: "description",
        url: "https://",
        tags: ["satu", "dua"],
        image: "https://docs.material-tailwind.com/img/face-2.jpg",
      },
      {
        title: "Title 2",
        description: "description",
        url: "https://",
        tags: ["dua"],
        image: "https://docs.material-tailwind.com/img/face-2.jpg",
      },
    ],
    totalData: 36,
    totalPages: 10,
  }
  const isMounted = useRef(false)
  const { s_dataProjects, loading_project, getProjectData, addProjectData, updateProjectData, deleteProjectData } = useProjectStore()
  const [dataProjects, setDataProjects] = useState<IProject[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [editedId, setEditedId] = useState("");
  const [formParams, setFormParams] = useState<IFormParams>({
    type: "add",
    data: {
      title: "",
      description: "",
      url: "",
      tags: [],
      image: null
    }
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAdd = () => {
    setOpenForm(true);
    setFormParams({
      ...formParams,
      type: "add"
    });
  }

  const handleEdit = (e: any) => {
    setEditedId(e.id)
    setOpenForm(true);
    setFormParams({
      type: "edit",
      data: e
    });
  }

  const handleSave = async (e: any) => {
    try {
      if (formParams.type == "add") {
        const res = await addProjectData(e)
        if (res.status == 200)
          setOpenForm(false)
      } else {
        const payload = { ...e, id: editedId }
        const res = await updateProjectData(payload)
        if (res.status == 200)
          setOpenForm(false)
      }
    } catch (err: any) {
    } finally {
      setTimeout(() => {
        getProjectData()
      }, 500);
    }
  }

  const handleDelete = async (e: any) => {
    console.log('delll', e);
    try {
      const res = await deleteProjectData(e.id)
    } catch (err: any) {
    } finally {
      setTimeout(() => {
        getProjectData()
      }, 500);
    }
  }

  useEffect(() => {
    if (isMounted.current) return
    isMounted.current = true

    getProjectData();
  }, [])

  useEffect(() => {
    setDataProjects(s_dataProjects)
  }, [s_dataProjects])

  return (
    <div className="project-list flex flex-col gap-6">
      <span className="text-sm font-semibold">Project List</span>
      <div className="flex flex-col gap-2">
        <div className="flex justify-end">
          <PrimaryButton onClick={handleAdd} type="button" className="w-fit">Add Project +</PrimaryButton>
        </div>
        <DefaultTable header={header} data={dataProjects} loading={loading_project} onClickEdit={handleEdit} onClickDelete={handleDelete} />
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs font-medium">Total: {projects.totalData} data</span>
          </div>
          <DefaultPagination currentPage={currentPage} totalPages={projects.totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
      <FormInputProject formParams={formParams} openForm={openForm} onClose={(e) => setOpenForm(e)} onSave={handleSave} />
    </div>
  )
}

export default ProjectPage