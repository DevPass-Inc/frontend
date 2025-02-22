import { Link } from 'react-router-dom';
import sampleLogo from '/images/sample/sample_logo.png';
import careerIcon from '/images/svg/icons/career.svg';
import locationIcon from '/images/svg/icons/location.svg';

function JobPost() {
  return (
    <div className='h-full w-full p-2.5'>
      {/* 기업 공고 */}
      <Link
        to={'/'}
        className='flex h-full w-full items-start gap-5 rounded-[5px] border border-solid border-[#DAD9D9] bg-white p-3.75'
      >
        {/* 로고 */}
        <div className='h-20 w-20'>
          <img
            src={sampleLogo}
            alt='Company Logo'
            className='h-full w-full object-contain'
          />
        </div>

        {/* 정보 */}
        <div className='flex flex-col items-start gap-2'>
          {/* 직무 */}
          <h1 className='font-noto text-sm leading-[19.07px] font-semibold'>
            안드로이드 개발자(Android Developer)
          </h1>

          {/* 회사명 & 응답 속도 */}
          <div className='flex items-center gap-1.5'>
            {/* 회사명 */}
            <h2 className='text-xxs leading-[13.62px] font-semibold text-[#898989]'>
              알고케어
            </h2>

            {/* 응답 속도 */}
            <div className='text-main-blue text-xxxs flex h-4 items-center justify-center rounded-[3px] bg-[#E2E2E2] px-2.25 font-semibold whitespace-nowrap'>
              평균 1일 이내 응답
            </div>
          </div>

          {/* 경력 & 위치 */}
          <div className='flex h-4 items-center gap-2.75'>
            {/* 경력 */}
            <div className='flex h-full items-center gap-1'>
              <img
                src={careerIcon}
                alt='Career'
                className='h-4 w-4 object-contain'
              />
              <h3 className='font-noto text-xxxs font-semibold text-[#898989]'>
                3 ~ 7년
              </h3>
            </div>

            {/* 위치 */}
            <div className='flex h-full items-center gap-1'>
              <img
                src={locationIcon}
                alt='Location'
                className='h-4 w-4 object-contain'
              />
              <h3 className='font-noto text-xxxs font-semibold text-[#898989]'>
                서울 중구
              </h3>
            </div>
          </div>

          {/* 태그 */}
          <div className='flex h-4 items-center gap-2.5'>
            <div className='text-xxxs flex h-full items-center justify-center rounded-[3px] bg-[#E2E2E2] px-1.25 font-semibold text-[#333D4B]'>
              안드로이드
            </div>
            <div className='text-xxxs flex h-full items-center justify-center rounded-[3px] bg-[#E2E2E2] px-1.25 font-semibold text-[#333D4B]'>
              사물인터넷(IoT)
            </div>
            <div className='text-xxxs flex h-full items-center justify-center rounded-[3px] bg-[#E2E2E2] px-1.25 font-semibold text-[#333D4B]'>
              Android
            </div>
            <div className='text-xxxs flex h-full items-center justify-center rounded-[3px] bg-[#E2E2E2] px-1.25 font-semibold text-[#333D4B]'>
              외 2개
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default JobPost;
