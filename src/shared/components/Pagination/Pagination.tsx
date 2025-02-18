import { useState } from 'react';

function Pagination() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10; // 총 페이지 수

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='flex items-center gap-6'>
      {/* 이전 페이지 버튼 */}
      <button
        className='cursor-pointer rounded bg-gray-200 px-2 py-2 text-xs font-medium text-gray-600 disabled:opacity-50'
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        ◀
      </button>

      {/* 페이지 번호 */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`cursor-pointer text-xs font-medium ${
              currentPage === page ? 'text-[#191F28]' : 'text-[#B0B8C1]'
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        )
      )}

      {/* 다음 페이지 버튼 */}
      <button
        className='cursor-pointer rounded bg-gray-200 px-2 py-2 text-xs font-medium text-gray-600 disabled:opacity-50'
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        ▶
      </button>
    </div>
  );
}

export default Pagination;
