function ResumePreviewItem() {
  return (
    <button
      type='button'
      className='flex h-65 w-130 flex-col items-start rounded-[10px] border-2 border-solid border-[#DFDFDF] bg-white px-8 pt-5.75 pb-5'
    >
      {/* 이름 & 직무 */}
      <div className='flex flex-col items-start gap-0.5'>
        <h3 className='text-xl leading-[24.2px] font-bold text-[#111827]'>
          홍길동
        </h3>
        <p className='leading-6.5 font-medium text-[#4C4C4C]'>
          프론트엔드 개발자
        </p>
      </div>

      {/* 프로젝트 */}
      <div className='mt-3 flex flex-col items-start'>
        <h4 className='text-sm leading-6.5 font-semibold text-[#4B5563]'>
          프로젝트
        </h4>
        <p className='text-xs leading-6.5 font-medium text-[#4C4C4C]'>
          커머스 플랫폼, B2B 서비스
        </p>
      </div>

      {/* 보유 기술 */}
      <div className='mt-2.25 flex flex-col items-start'>
        <h4 className='text-sm leading-6.5 font-semibold text-[#4B5563]'>
          보유 기술
        </h4>
        <div className='flex items-center gap-3'>
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
      </div>

      {/* 한줄 설명 */}
      <span className='mt-5 text-sm leading-6.5 font-medium'>
        사용자 중심의 웹 애플리케이션 개발에 열정을 가진 프론트엔드
        개발자입니다.
      </span>
    </button>
  );
}

export default ResumePreviewItem;
