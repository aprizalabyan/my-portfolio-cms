"use client"

import React from 'react'
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DefaultPagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={i === currentPage ? "filled" : "text"}
            onClick={() => handlePageClick(i)}
            className={`text-xs font-medium flex justify-center gap-2 items-center px-3 py-2 rounded-md ${i === currentPage ? "text-dark-base bg-accent-blue hover:bg-accent-blue-darken-1" : "text-primary-text hover:bg-hover"} active:opacity-100 focus:opacity-100`}
          >
            {i}
          </Button>
        );
      }
    } else {
      pages.push(
        <Button
          key={1}
          variant={1 === currentPage ? "filled" : "text"}
          onClick={() => handlePageClick(1)}
          className={`text-xs font-medium flex justify-center gap-2 items-center px-3 py-2 rounded-md ${1 === currentPage ? "text-dark-base bg-accent-blue hover:bg-accent-blue-darken-1" : "text-primary-text hover:bg-hover"} active:opacity-100 focus:opacity-100`}
        >
          1
        </Button>
      );

      if (currentPage > halfVisible + 2) {
        pages.push(<span key="start-dots" className="mx-1">...</span>);
      }

      let startPage = Math.max(2, currentPage - halfVisible);
      let endPage = Math.min(totalPages - 1, currentPage + halfVisible);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            key={i}
            variant={i === currentPage ? "filled" : "text"}
            onClick={() => handlePageClick(i)}
            className={`text-xs font-medium flex justify-center gap-2 items-center px-3 py-2 rounded-md ${i === currentPage ? "text-dark-base bg-accent-blue hover:bg-accent-blue-darken-1" : "text-primary-text hover:bg-hover"} active:opacity-100 focus:opacity-100`}
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - halfVisible - 1) {
        pages.push(<span key="end-dots" className="mx-1">...</span>);
      }

      pages.push(
        <Button
          key={totalPages}
          variant={totalPages === currentPage ? "filled" : "text"}
          onClick={() => handlePageClick(totalPages)}
          className={`text-xs font-medium flex justify-center gap-2 items-center px-3 py-2 rounded-md ${totalPages === currentPage ? "text-dark-base bg-accent-blue hover:bg-accent-blue-darken-1" : "text-primary-text hover:bg-hover"} active:opacity-100 focus:opacity-100`}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-end space-x-1">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        variant="outlined"
        className="text-xs font-medium px-3 py-2 text-primary-text hover:bg-hover focus:ring-opacity-0"
      >
        <ArrowLeftIcon className="h-4 w-4" />
      </Button>

      {renderPageNumbers()}

      <IconButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
        variant="outlined"
        className="text-xs font-medium px-3 py-2 text-primary-text hover:bg-hover focus:ring-opacity-0"
      >
        <ArrowRightIcon className="h-4 w-4" />
      </IconButton>
    </div>
  )
}

export default DefaultPagination