import { useLocation, useNavigate } from 'react-router-dom';
import { Recruitment } from '../../../api/recruitment';
import { GithubInfo } from '../../../api/github';

function ResumeCompanyDetail() {
  const navigate = useNavigate();

  const { selectedExpId, githubInfo, recruitments } = useLocation().state as {
    selectedExpId: number;
    githubInfo: GithubInfo | null;
    recruitments: Recruitment;
  };

  // 이 기업 선택하기 버튼 클릭 핸들러
  const handleSelectCompanyButtonClick = () => {
    // 페이지 이동 및 상태 전달
    navigate('/resume/create', {
      state: {
        selectedExpId,
        githubInfo,
        recruitmentId: recruitments.recruitmentId,
      },
    });
  };

  return (
    <div className='w-main overflow-hidden'>
      <div className='mt-8.75 mb-12'>
        <div className='flex w-full items-start justify-center gap-5'>
          {/* 채용공고 상세 */}
          <div className='w-201.75 rounded-lg border border-[#dfdfdf] bg-white shadow-sm'>
            {/* 헤더 */}
            <div className='p-6'>
              <div className='flex items-start gap-4'>
                {/* 기업 이미지 */}
                <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-[#3d4c62]'>
                  <img
                    src={recruitments.imageUrl}
                    alt='기업 이미지'
                    className='h-full w-full object-cover'
                  />
                </div>

                {/* 타이틀 */}
                <div className='flex-1'>
                  <div className='flex items-center gap-2'>
                    <h1 className='text-lg font-bold'>
                      [{recruitments.companyName}] {recruitments.position} (
                      {recruitments.career})
                    </h1>
                  </div>
                  <p className='text-sm text-[#6b7280]'>
                    {recruitments.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className='grid grid-cols-2 gap-4 bg-[#f7f7fb] p-6 text-sm'>
              <div>
                <p className='mb-1 text-[#898989]'>직무</p>
                <p className='font-medium'>{recruitments.position}</p>
              </div>
              <div>
                <p className='mb-1 text-[#898989]'>지원 마감</p>
                <p className='font-medium'>{recruitments.deadline}</p>
              </div>
              <div>
                <p className='mb-1 text-[#898989]'>고용 형태</p>
                <p className='font-medium'>정규직</p>
              </div>
              <div>
                <p className='mb-1 text-[#898989]'>경력</p>
                <p className='font-medium'>{recruitments.career}</p>
              </div>
              <div>
                <p className='mb-1 text-[#898989]'>근무 위치</p>
                <p className='font-medium'>{recruitments.location}</p>
              </div>
            </div>

            {/* Job Description */}
            <div className='p-6'>
              <h2 className='mb-4 text-lg font-bold'>업무 소개</h2>

              <p className='mb-4 text-sm'>{recruitments.mainTask}</p>
              <p className='mb-4 text-sm'>{recruitments.qualification}</p>
              <p className='mb-4 text-sm'>{recruitments.preferred}</p>
              <p className='mb-4 text-sm'>{recruitments.benefit}</p>
            </div>
          </div>

          {/* 채용공고 선택하기 */}
          <div className='flex-1 rounded-lg border border-[#dfdfdf] bg-white shadow-sm'>
            <div className='p-8'>
              {/* 기업 이미지 */}
              <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-[#3d4c62]'>
                <img
                  src={recruitments.imageUrl}
                  alt='기업 이미지'
                  className='h-full w-full object-cover'
                />
              </div>

              {/* 타이틀 */}
              <div className='mt-4 flex flex-col gap-1'>
                <span className='text-lg leading-6 font-bold'>
                  [{recruitments.companyName}] {recruitments.position} (
                  {recruitments.career})
                </span>

                {/* 위치 */}
                <p className='text-sm text-[#6b7280]'>
                  {recruitments.location}
                </p>
              </div>

              {/* 이 기업 선택하기 버튼 */}
              <button
                className='bg-main-blue mt-4 w-full cursor-pointer rounded-sm py-2 text-white'
                onClick={handleSelectCompanyButtonClick}
              >
                이 기업 선택하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeCompanyDetail;
