function ResumeProjectItem() {
  return (
    <div className='flex w-full flex-col rounded-[10px] border border-solid border-[#DFDFDF] bg-white px-5.5 pt-6 pb-4.5'>
      {/* 프로젝트 이름 / 포지션 */}
      <span className='text-lg leading-[21.78px] font-semibold text-[#4C4C4C]'>
        커머스 플랫폼 개발 / Frontend Engineer
      </span>

      {/* 프로젝트 기간 */}
      <span className='mt-0.5 text-sm leading-[16.94px] font-medium text-[#898989]'>
        2022.03 - 2023.04
      </span>

      {/* 프로젝트 한줄 설명 */}
      <span className='mt-3 leading-[19.36px] font-medium text-[#4C4C4C]'>
        React, TypeScript, Next.js를 활용한 이커머스 플랫폼 프론트엔드 개발
      </span>

      {/* 프로젝트 기술 스택 */}
      <div className='mt-3.75 flex items-center gap-3'>
        <div className='flex h-5 items-center justify-center rounded-[10px] bg-[#DBE9FE] px-2.5 text-xs leading-[16.34px] font-semibold text-[#1D40AF]'>
          React
        </div>
        <div className='flex h-5 items-center justify-center rounded-[10px] bg-[#DBE9FE] px-2.5 text-xs leading-[16.34px] font-semibold text-[#1D40AF]'>
          Typescript
        </div>
        <div className='flex h-5 items-center justify-center rounded-[10px] bg-[#DBE9FE] px-2.5 text-xs leading-[16.34px] font-semibold text-[#1D40AF]'>
          Next.js
        </div>
      </div>

      {/* 프로젝트 상세 설명 */}
      <div className='mt-3.75 flex flex-col font-medium text-[#4C4C4C]'>
        <p className='leading-5.5'>- 상품 검색 및 필터링 기능 구현 </p>
        <p className='leading-5.5'>- 상품 상세 페이지 개발</p>
      </div>
    </div>
  );
}

export default ResumeProjectItem;
