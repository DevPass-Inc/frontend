import { useState } from 'react';

interface PaginationProps {
  currentPage: number; // 0-base
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, onPageChange } = props;

  if (totalPages < 1) return null;

  return (
    <div className='flex items-center gap-6'>
      <button
        className='cursor-pointer rounded bg-gray-200 px-2 py-2 text-xs font-medium text-gray-600 disabled:opacity-50'
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ◀
      </button>
      {Array.from({ length: totalPages }, (_, idx) => idx).map((page) => (
        <button
          key={page}
          className={`cursor-pointer text-xs font-medium ${
            currentPage === page ? 'text-[#191F28]' : 'text-[#B0B8C1]'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </button>
      ))}
      <button
        className='cursor-pointer rounded bg-gray-200 px-2 py-2 text-xs font-medium text-gray-600 disabled:opacity-50'
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ▶
      </button>
    </div>
  );
}

export default Pagination;
