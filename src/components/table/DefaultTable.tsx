"use client"

import React from 'react'
import { Avatar, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { PencilIcon, TrashIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { ITableHead, ITableRow } from '@/interfaces/common';

interface Props {
  header: ITableHead[];
  data: ITableRow[];
  onClickEdit: (e: any) => void;
  onClickDelete: (e: any) => void;
}

const DefaultTable: React.FC<Props> = ({ header, data, onClickEdit, onClickDelete }) => {
  return (
    <div>
      <table className="w-full min-w-max table-auto">
        <thead>
          <tr>
            {header.map((head, index) => (
              <th
                key={index}
                className="bg-dark-lighten-1 text-left p-2"
                style={{ width: head.width }}
              >
                <span className="text-sm font-semibold text-primary-text">
                  {head.text}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(
            (item, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? "p-2"
                : "p-2 border-b border-dark-lighten-2";

              return (
                <tr key={index}>
                  <td className={"text-center " + classes}>
                    <span className="text-xs text-secondary-text">{index + 1}</span>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={item.image} alt={item.title} size="sm" variant="square" />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="">
                      <span className="text-xs text-secondary-text">{item.title}</span>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="">
                      <span className="text-xs text-secondary-text">{item.description}</span>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="">
                      <span className="text-xs text-secondary-text">{item.url}</span>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex">
                      <Menu placement="left-start">
                        <MenuHandler>
                          <EllipsisVerticalIcon className="w-4 h-4 cursor-pointer text-secondary-text" />
                        </MenuHandler>
                        <MenuList className="bg-dark-lighten-1 border-none text-primary-text p-1">
                          <MenuItem className="flex gap-2 items-center" onClick={() => onClickEdit(item)}>
                            <PencilIcon className="w-4 h-4" />
                            Edit
                          </MenuItem>
                          <MenuItem className="flex gap-2 items-center"  onClick={() => onClickDelete(index)}>
                            <TrashIcon className="w-4 h-4" />
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DefaultTable