import sampleCompanyLogo from '/images/sample/sample_company_logo.png';
import locationIcon from '/images/svg/icons/location.svg';
import neededStacksIcon from '/images/svg/icons/needed_stacks.svg';
import farewellIcon from '/images/svg/icons/farewell.svg';
import {
  CompanyMatchingResultItem,
  RecruitmentDetail,
} from '../../api/recruitment';

interface CompanyMatchingDetailInfoProps {
  result: CompanyMatchingResultItem;
  recruitmentDetail: RecruitmentDetail;
}

function CompanyMatchingDetailInfo(props: CompanyMatchingDetailInfoProps) {
  const { result, recruitmentDetail } = props;

  return (
    <div className='w-200 rounded-[10px] border border-solid border-[#DFDFDF] bg-white px-8.5 py-5'>
      {/* 기업 로고 & 기업명 & 직무 */}
      <div className='flex items-center gap-7.5'>
        {/* 기업 로고 */}
        <div className='h-25 w-25'>
          <img
            src={recruitmentDetail?.imageUrl}
            alt='Company Logo'
            className='h-full w-full object-cover'
          />
        </div>

        {/* 기업명 & 직무 */}
        <div className='flex flex-col gap-2.25'>
          <h1 className='text-[28px] leading-[33.89px] font-bold text-[#111827]'>
            {recruitmentDetail?.companyName}
          </h1>
          <h2 className='text-lg leading-6.5 font-medium text-[#4C4C4C]'>
            {recruitmentDetail?.position}
          </h2>
        </div>
      </div>

      {/* 기업 소개 */}
      <div className='mt-8.5 flex flex-col gap-2.5'>
        <h3 className='text-xl leading-6.5 font-semibold text-[#4B5563]'>
          기업 소개
        </h3>
        <p className='leading-6.5 font-medium text-[#4C4C4C]'>
          혁신적인 웹 서비스를 개발하는 스타트업입니다.
        </p>
      </div>

      {/* 위치 & 필요 기술 */}
      <div className='mt-8.75 flex items-center'>
        {/* 위치 */}
        <div className='flex w-75 items-start gap-2'>
          <img src={locationIcon} alt='Location' className='h-6 w-6' />
          <div className='flex flex-col gap-1'>
            <h3 className='font-noto leading-6 font-semibold text-[#898989]'>
              위치
            </h3>
            <p className='text-sm leading-6.5 font-medium text-[#4C4C4C]'>
              {recruitmentDetail?.location}
            </p>
          </div>
        </div>

        {/* 필요 기술 */}
        <div className='flex flex-1 flex-col gap-2.5'>
          {/* 타이틀 */}
          <div className='flex items-center gap-2'>
            <img
              src={neededStacksIcon}
              alt='Needed Stacks'
              className='h-6 w-6'
            />
            <h3 className='font-noto leading-6 font-semibold text-[#898989]'>
              필요 기술
            </h3>
          </div>

          {/* 기술 리스트 */}
          <div className='flex items-center gap-3'>
            {result?.stacks.map((stack) => (
              <div
                key={stack.id}
                className='flex h-5 items-center justify-center rounded-[10px] bg-[#DBE9FE] px-2.5 text-xs leading-[16.34px] font-semibold text-[#1D40AF]'
              >
                {stack.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 복리후생 */}
      <div className='mt-8.5 flex flex-col gap-3'>
        {/* 타이틀 */}
        <div className='flex items-center gap-2'>
          <img src={farewellIcon} alt='Farewell' className='h-6 w-6' />
          <h3 className='font-noto leading-6 font-semibold text-[#898989]'>
            복리후생
          </h3>
        </div>

        {/* 복리후생 리스트 */}
        <div className='ml-6 grid w-fit grid-cols-2 grid-rows-2 gap-x-5 gap-y-2.5'>
          <div className='flex items-center gap-2.5'>
            <div className='h-2.5 w-2.5 rounded-full bg-[#21C55D]' />
            <p className='font-noto text-sm leading-6 font-medium'>유연근무</p>
          </div>
          <div className='flex items-center gap-2.5'>
            <div className='h-2.5 w-2.5 rounded-full bg-[#21C55D]' />
            <p className='font-noto text-sm leading-6 font-medium'>원격근무</p>
          </div>
          <div className='flex items-center gap-2.5'>
            <div className='h-2.5 w-2.5 rounded-full bg-[#21C55D]' />
            <p className='font-noto text-sm leading-6 font-medium'>건강검진</p>
          </div>
          <div className='flex items-center gap-2.5'>
            <div className='h-2.5 w-2.5 rounded-full bg-[#21C55D]' />
            <p className='font-noto text-sm leading-6 font-medium'>교육지원</p>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <hr className='mt-5 w-full text-[#CFCFCF]' />

      {/* 매칭 분석 */}
      <div className='mt-8.5 flex flex-col items-start gap-5'>
        {/* 타이틀 */}
        <h3 className='text-xl leading-6.5 font-semibold text-[#4B5563]'>
          매칭 분석
        </h3>

        {/* 매칭 분석 결과 */}
        <div className='bg-main flex w-full flex-col gap-2.75 rounded-[5px] px-5 pt-5 pb-4.5'>
          {/* 매칭 점수 */}
          <div className='flex items-center gap-1'>
            <span className='text-lg leading-6.5 font-medium text-[#4C4C4C]'>
              매칭점수 :
            </span>
            <span className='text-lg leading-6.5 font-bold text-[#2463EB]'>
              {result?.finalScore}
            </span>
          </div>

          {/* 개선이 필요한 부분 */}
          <div className='flex flex-col gap-1.25'>
            <span className='ml-1 text-xs leading-6.5 font-semibold text-[#161D2C]'>
              개선이 필요한 부분
            </span>
            <div className='ml-2 flex flex-col'>
              <div className='flex items-center gap-2'>
                <div className='h-0.75 w-0.75 rounded-full bg-[#161D2C]'></div>
                <p className='text-xs leading-6.5 font-medium text-[#161D2C]'>
                  JavaScript 기술에 대한 학습이 필요합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyMatchingDetailInfo;
