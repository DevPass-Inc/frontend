import CompanyMatchingResultPreviewItem from '../../../components/CompanyMatchingResultPreviewItem';

function CompanyMatchingResult() {
  return (
    <div className='w-main overflow-hidden'>
      <div className='mt-12.5'>
        <div className='flex flex-col items-center gap-39'>
          {/* 타이틀 */}
          <div className='flex flex-col items-center gap-2.5'>
            <h1 className='text-[28px] leading-[33.89px] font-bold text-[#111827]'>
              기업 매칭 결과
            </h1>
            <h2 className='text-xl leading-[24.2px] font-medium text-[#6B7280]'>
              상세 정보 보기 버튼을 눌러 채용 정보와 피드백을 확인해보세요
            </h2>
          </div>

          {/* 기업 매칭 결과 리스트 */}
          <div className='flex w-full flex-wrap justify-center gap-5'>
            {Array.from({ length: 2 }).map((_, index) => (
              <CompanyMatchingResultPreviewItem
                key={`company-matching-result-preview-item-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyMatchingResult;
