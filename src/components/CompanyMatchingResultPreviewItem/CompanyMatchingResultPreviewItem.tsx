import sampleCompanyLogo from '/images/sample/sample_company_logo.png';
import neededIcon from '/images/svg/icons/needed.svg';
import notNeededIcon from '/images/svg/icons/not_needed.svg';
import enterIcon from '/images/svg/icons/enter.svg';

function CompanyMatchingResultPreviewItem() {
  return (
    <div className='flex h-98 w-130 flex-col items-start rounded-[10px] border-2 border-solid border-[#DFDFDF] bg-white px-6 py-5.75'>
      {/* 기업 로고 & 기업명 & 직무 */}
      <div className='flex items-end gap-3.25'>
        {/* 기업 로고 */}
        <img
          src={sampleCompanyLogo}
          alt='Company Logo'
          className='h-12.5 w-12.5 object-cover'
        />

        {/* 기업명 & 직무 */}
        <div className='flex flex-col items-start'>
          <h3 className='leading-[19.36px] font-bold text-[#111827]'>
            테크스타트
          </h3>
          <p className='text-sm leading-6.5 font-medium text-[#4C4C4C]'>
            시니어 프론트엔드 개발자
          </p>
        </div>
      </div>

      {/* 매칭 점수 */}
      <div className='mt-5 flex w-full flex-col gap-1.75'>
        {/* 매칭 점수 타이틀 & 점수*/}
        <div className='flex w-full items-center justify-between'>
          <h4 className='text-xs leading-6.5 font-semibold text-[#4B5563]'>
            매칭 점수
          </h4>
          <span className='text-main-blue text-sm leading-6.5 font-bold'>
            85%
          </span>
        </div>

        {/* 매칭 점수 게이지 */}
        <div className='h-1.25 w-full rounded-[50px] bg-[#E4E7EB]'>
          <div
            className='bg-main-blue h-full rounded-[50px]'
            style={{ width: '85%' }}
          />
        </div>
      </div>

      {/* 필요 기술 */}
      <div className='mt-3.5 flex flex-col gap-1.75'>
        {/* 타이틀 */}
        <h4 className='text-xs leading-6.5 font-semibold text-[#4B5563]'>
          필요 기술
        </h4>

        {/* 기술 리스트 */}
        <div className='flex items-center gap-1.75'>
          <div className='flex h-5 items-center justify-center gap-1.25 rounded-[10px] bg-[#D1FAE5] px-3'>
            <span className='font-noto text-xs leading-[16.34px] font-semibold text-[#166434]'>
              React
            </span>
            <img src={neededIcon} alt='Needed' className='h-3 w-3' />
          </div>
          <div className='flex h-5 items-center justify-center gap-1.25 rounded-[10px] bg-[#D1FAE5] px-3'>
            <span className='font-noto text-xs leading-[16.34px] font-semibold text-[#166434]'>
              Typescript
            </span>
            <img src={neededIcon} alt='Needed' className='h-3 w-3' />
          </div>
          <div className='flex h-5 items-center justify-center gap-1.25 rounded-[10px] bg-[#D1FAE5] px-3'>
            <span className='font-noto text-xs leading-[16.34px] font-semibold text-[#166434]'>
              Next.js
            </span>
            <img src={neededIcon} alt='Needed' className='h-3 w-3' />
          </div>
          <div className='flex h-5 items-center justify-center gap-1.25 rounded-[10px] bg-[#FDE2E1] px-3'>
            <span className='font-noto text-xs leading-[16.34px] font-semibold text-[#981B1B]'>
              Javascript
            </span>
            <img src={notNeededIcon} alt='Not Needed' className='h-3 w-3' />
          </div>
        </div>
      </div>

      {/* 개선이 필요한 부분 */}
      <div className='mt-5 flex w-full flex-col items-start gap-1.25 rounded-[5px] bg-[#FEFCE8] px-3 pt-2.25 pb-3.5'>
        {/* 타이틀 */}
        <h4 className='text-xs leading-6.5 font-semibold text-[#844D0F]'>
          개선이 필요한 부분
        </h4>

        {/* 개선이 필요한 부분 리스트 */}
        <div className='flex flex-col items-start'>
          <div className='ml-2 flex items-center gap-2'>
            <div className='h-0.75 w-0.75 rounded-full bg-[#844D0F]'></div>
            <p className='text-xs leading-6.5 font-medium text-[#844D0F]'>
              JavaScript 기술에 대한 학습이 필요합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 상세 정보 보기 버튼 */}
      <button className='mt-6.75 flex h-11 w-full cursor-pointer items-center justify-center gap-3 rounded bg-[#0043CE]'>
        <span className='font-semibold text-white'>상세 정보 보기</span>
        <img src={enterIcon} alt='Go To Detail' className='w-4' />
      </button>
    </div>
  );
}

export default CompanyMatchingResultPreviewItem;
