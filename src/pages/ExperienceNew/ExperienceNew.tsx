import ExperienceItem from '../../shared/components/ExperienceItem';
import ExperienceNewEmptyAlert from '../../shared/components/ExperienceNewEmptyAlert';

function ExperienceNew() {
  return (
    <div className='w-main overflow-hidden'>
      <div className='mt-9.5'>
        <div className='flex w-full flex-col gap-9.25'>
          {/* 타이틀 */}
          <div className='flex flex-col gap-1.75'>
            <h1 className='text-[28px] leading-[33.89px] font-bold text-[#111827]'>
              개발 커리어 관리
            </h1>
            <h2 className='text-main-gray-light text-lg leading-[21.78px]'>
              당신의 개발 커리어를 한눈에 관리하세요.
            </h2>
          </div>

          {/* 경험 추가 */}
          <div className='flex w-full items-start gap-9.25'>
            {/* 경험 목록 및 추가 */}
            <div className='flex min-h-40 min-w-101 flex-col gap-7 rounded-[10px] border border-solid border-[#DFDFDF] bg-white px-7 py-8.25'>
              <h3 className='text-2xl leading-[29.05px] font-semibold'>
                개발 경험
              </h3>

              {/* 새로운 경험 추가 버튼 */}
              <button
                type='button'
                className='group flex h-9.5 w-full cursor-pointer items-center justify-center gap-4 rounded-[5px] border-2 border-dashed border-[#B2B2B2] bg-transparent transition-all duration-200 hover:border-[#2463EB]'
              >
                {/* 플러스 아이콘 */}
                <svg
                  width='15'
                  height='14'
                  viewBox='0 0 15 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='text-[#4C4C4C] transition-all duration-200 group-hover:text-[#2463EB]'
                >
                  <path
                    d='M3.41699 7H11.5837'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M7.5 2.9165V11.0832'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>

                <span className='text-lg font-medium text-[#4C4C4C] transition-all duration-200 group-hover:text-[#2463EB]'>
                  새로운 경험 추가
                </span>
              </button>

              {/* 경험 목록 */}
              <ExperienceItem />
            </div>

            {/* 왼쪽에서 경험을 선택하거나 새로 추가해주세요. */}
            <ExperienceNewEmptyAlert />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceNew;
