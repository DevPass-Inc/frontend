import Stepper from '../../../shared/components/Stepper';
import saveIcon from '/images/svg/icons/save.svg';
import sampleCompanyLogoIcon from '/images/sample/sample_company_logo.png';

// Step
const STEP = [
  '내 경험 선택',
  '깃허브 연동',
  '기업 선택',
  'AI 이력서 생성',
  'Success',
];

function ResumeCreate() {
  return (
    <div className='w-main overflow-hidden'>
      <div className='mt-8.75 mb-12.75'>
        <div className='flex flex-col items-center'>
          {/* Step Progress Bar */}
          <Stepper step={STEP} currentStep={4} width={700} />

          {/* AI 이력서 생성 결과 */}
          <div className='mt-8.75 flex w-197.5 flex-col gap-5'>
            {/* 타이틀 / 제목 입력 / 저장 버튼 */}
            <div className='flex w-full items-center justify-between'>
              {/* 타이틀 */}
              <h1 className='text-2xl leading-[29.05px] font-bold text-[#111827]'>
                AI 이력서 생성 결과
              </h1>

              {/* 제목 입력 / 저장 버튼 */}
              <div className='flex items-center gap-4.75'>
                <div className='h-10.5 w-46.5 rounded-[5px] border border-solid border-[#DAD9D9] bg-white'>
                  <input
                    type='text'
                    className='h-full w-full px-4 font-normal outline-[#2463EB] placeholder:text-[#00000080]'
                    placeholder='이력서 제목'
                  />
                </div>
                <button
                  type='button'
                  className='flex h-10.5 w-32.75 cursor-pointer items-center justify-center gap-2 rounded bg-[#0043CE]'
                >
                  <img src={saveIcon} alt='Save' className='h-6.5 w-6.5' />
                  <span className='leading-[19.36px] font-medium text-white'>
                    저장하기
                  </span>
                </button>
              </div>
            </div>

            {/* 이력서 생성 결과 */}
            <div className='flex w-full flex-col rounded-[10px] border-2 border-solid border-[#DFDFDF] bg-white px-8 py-10.5'>
              {/* 프로필 */}
              <div className='flex items-start gap-10.75'>
                {/* 프로필 이미지 */}
                <div className='h-42.5 w-42.5 overflow-hidden rounded-full'>
                  <img
                    src={sampleCompanyLogoIcon}
                    alt='Profile Image'
                    className='h-full w-full object-cover'
                  />
                </div>

                {/* 프로필 정보 */}
                <div className='flex flex-col items-start'>
                  <span className='text-[28px] leading-[33.89px] font-bold text-[#111827]'>
                    홍길동
                  </span>
                  <span className='mt-1 text-lg leading-[21.78px] font-medium text-[#6B7280]'>
                    프론트엔드 개발자
                  </span>
                  <div className='mt-3.25 flex flex-col font-medium text-[#4B5563]'>
                    <span className='leading-6.5'>
                      이메일: hong@example.com
                    </span>
                    <span className='leading-6.5'>연락처: 010-1234-5678</span>
                    <span className='leading-6.5'>
                      깃허브: github.com/honggildong
                    </span>
                    <span className='leading-6.5'>
                      블로그: blog.example.com
                    </span>
                  </div>
                </div>
              </div>

              {/* 구분선 */}
              <hr className='mt-9.25 w-full text-[#CFCFCF]' />

              {/* 요약 */}
              <div className='mt-8.5 flex flex-col items-start gap-3.25'>
                {/* 타이틀 */}
                <h2 className='text-xl leading-[24.02px] font-bold text-[#111827]'>
                  요약
                </h2>

                {/* 요약 내용 */}
                <p className='leading-6.5 font-medium break-all text-[#4B5563]'>
                  3년차 프론트엔드 개발자로서 React와 TypeScript를 활용한 웹
                  애플리케이션 개발에 전문성을 보유하고 있습니다. 사용자 경험
                  향상에 중점을 두고 개발하며, 지속적인 성능 최적화와 코드 품질
                  향상을 위해 노력하고 있습니다.
                </p>
              </div>

              {/* 구분선 */}
              <hr className='mt-8.5 w-full text-[#CFCFCF]' />

              {/* 프로젝트 */}
              <div className='mt-8.5 flex flex-col items-start gap-3.25'>
                {/* 타이틀 */}
                <h2 className='text-xl leading-[24.02px] font-bold text-[#111827]'>
                  프로젝트
                </h2>

                {/* 프로젝트 리스트 */}
                <div className='flex w-full flex-col gap-3.25'>
                  {/* // TODO : 프로젝트 리스트 컴포넌트 만들어야함 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeCreate;
