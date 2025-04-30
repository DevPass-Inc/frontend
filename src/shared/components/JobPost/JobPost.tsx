import { RecruitmentListContent } from '../../../api/recruitment';
import sampleLogo from '/images/sample/sample_logo.png';
import careerIcon from '/images/svg/icons/career.svg';
import locationIcon from '/images/svg/icons/location.svg';

interface JobPostProps {
  onClick: () => void;
  recruitment: RecruitmentListContent;
}

function JobPost(props: JobPostProps) {
  const { onClick, recruitment } = props;

  return (
    <div className='h-full w-full p-2.5'>
      {/* 기업 공고 */}
      <div
        className='flex h-full w-full cursor-pointer items-start gap-5 rounded-[5px] border border-solid border-[#DAD9D9] bg-white p-3.75'
        onClick={onClick}
      >
        {/* 로고 */}
        <div className='h-20 w-20'>
          <img
            src={recruitment.imageUrl}
            alt='Company Logo'
            className='h-full w-full object-contain'
          />
        </div>

        {/* 정보 */}
        <div className='flex flex-col items-start gap-2'>
          {/* 직무 */}
          <h1 className='font-noto text-sm leading-[19.07px] font-semibold'>
            {recruitment.position}
          </h1>

          {/* 회사명 & 응답 속도 */}
          <div className='flex items-center gap-1.5'>
            {/* 회사명 */}
            <h2 className='text-xxs leading-[13.62px] font-semibold text-[#898989]'>
              {recruitment.companyName}
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
                {recruitment.career}
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
                {recruitment.location}
              </h3>
            </div>
          </div>

          {/* 태그 */}
          <div className='flex h-4 items-center gap-2.5'>
            {recruitment.stacks.slice(0, 3).map((stack, idx) => (
              <div
                key={idx}
                className='text-xxxs flex h-full items-center justify-center rounded-[3px] bg-[#E2E2E2] px-1.25 font-semibold text-[#333D4B]'
              >
                {stack}
              </div>
            ))}
            {recruitment.stacks.length > 3 && (
              <div className='text-xxxs flex h-full items-center justify-center rounded-[3px] bg-[#E2E2E2] px-1.25 font-semibold text-[#333D4B]'>
                외 {recruitment.stacks.length - 3}개
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPost;
