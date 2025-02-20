import ResumePreviewItem from '../../../components/ResumePreviewItem';

function CompanyMatchingResume() {
  return (
    <div className='w-main overflow-hidden'>
      <div className='mt-12.5 mb-29'>
        <div className='flex flex-col items-center gap-12.5'>
          {/* 타이틀 */}
          <div className='flex flex-col items-center gap-2.5'>
            <h1 className='text-[28px] leading-[33.89px] font-bold text-[#111827]'>
              이력서 선택
            </h1>
            <h2 className='text-xl leading-[24.2px] font-medium text-[#6B7280]'>
              아래 항목 중에서 기업 매칭할 이력서를 선택하세요
            </h2>
          </div>

          {/* 이력서 리스트 */}
          <div className='flex w-full flex-wrap justify-center gap-5'>
            <ResumePreviewItem />
            <ResumePreviewItem />
            <ResumePreviewItem />
            <ResumePreviewItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyMatchingResume;
