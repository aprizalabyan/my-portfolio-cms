"use client"

import React, { useState } from 'react'
import PrimaryButton from '@/components/button/PrimaryButton';
import DefaultTable from '@/components/table/DefaultTable';
import DefaultPagination from '@/components/pagination/DefaultPagination';
import FormInputProject from '@/components/modal/FormInputProject';
import { IFormParams } from '@/interfaces/common';

const ProjectPage = () => {
  const header = [
    {
      text: "",
      width: "5%"
    },
    {
      text: "Cover",
      width: "8%"
    },
    {
      text: "Title",
      width: "25%"
    },
    {
      text: "Description",
      width: "32%"
    },
    {
      text: "URL",
      width: "25%"
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
        image: "https://docs.material-tailwind.com/img/face-2.jpg",
      },
      {
        title: "Title 2",
        description: "description",
        url: "https://",
        image: "https://docs.material-tailwind.com/img/face-2.jpg",
      },
    ],
    totalData: 36,
    totalPages: 10,
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [formParams, setFormParams] = useState<IFormParams>({
    type: "add",
    data: {
      title: "",
      description: "",
      url: "",
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
    setOpenForm(true);
    setFormParams({
      type: "edit",
      data: e
    });
  }

  const handleSave = (e: any) => {
    console.log('savee', e);
  }

  const handleDelete = (e: any) => {
    console.log('delll', e);
  }

  return (
    <div className="project-list flex flex-col gap-6">
      <span className="text-sm font-semibold">Project List</span>
      <div className="flex flex-col gap-2">
        <div className="flex justify-end">
          <PrimaryButton onClick={handleAdd} type="button" className="w-fit">Add Project +</PrimaryButton>
        </div>
        <DefaultTable header={header} data={projects.data} onClickEdit={handleEdit} onClickDelete={handleDelete} />
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