import { useLocation, useNavigate } from 'react-router-dom';
import Dropdown from '../../../shared/components/Dropdown';
import JobPost from '../../../shared/components/JobPost';
import Pagination from '../../../shared/components/Pagination';
import SearchItem from '../../../shared/components/SearchItem';
import Stepper from '../../../shared/components/Stepper';
import { useQuery } from '@tanstack/react-query';
import {
  fetchRecruitmentDetailById,
  fetchRecruitmentList,
} from '../../../api/recruitment';
import { useEffect, useState } from 'react';

// Step
const STEP = [
  '내 경험 선택',
  '깃허브 연동',
  '기업 선택',
  'AI 이력서 생성',
  'Success',
];

function ResumeCompany() {
  const navigate = useNavigate();
  const { selectedExpId, githubInfo } = useLocation().state; // 선택된 경험 ID, 깃허브 정보 가져오기

  // 선택된 채용공고 ID
  const [selectedRecruitmentId, setSelectedRecruitmentId] = useState<
    number | null
  >(null);

  // 채용공고 리스트 조회 API 호출
  const {
    data: recruitmentList,
    isLoading: isRecruitmentListLoading,
    isError: isRecruitmentListError,
  } = useQuery({
    queryKey: ['recruitmentList'],
    queryFn: () => fetchRecruitmentList(),
  });

  // 채용공고 상세 조회 API 호출
  const {
    data: recruitments,
    isLoading: isRecruitmentsLoading,
    isError: isRecruitmentsError,
  } = useQuery({
    queryKey: ['recruitments', selectedRecruitmentId],
    queryFn: () => fetchRecruitmentDetailById(selectedRecruitmentId!),
    enabled: !!selectedRecruitmentId, // 선택된 채용공고 ID가 없으면 채용공고 조회 API 호출하지 않음
  });

  // 채용공고 클릭 핸들러
  const handleRecruitmentItemClick = (recruitmentId: number) => {
    setSelectedRecruitmentId(recruitmentId);
  };

  useEffect(() => {
    if (recruitmentList) {
      console.log('채용공고 리스트 조회 성공', recruitmentList);
    }
  }, [recruitmentList]);

  useEffect(() => {
    if (recruitments) {
      console.log('채용공고 상세 조회 성공', recruitments);

      // 채용공고 상세 조회 성공 후 페이지 이동
      navigate(`/resume/company/${recruitments.recruitmentId}`, {
        state: { selectedExpId, githubInfo, recruitments },
      });
    }
  }, [recruitments]);

  return (
    <div className='w-main overflow-hidden'>
      <div className='mt-8.75 mb-12'>
        <div className='flex flex-col items-center'>
          {/* Step Progress Bar */}
          <Stepper step={STEP} currentStep={3} width={700} />

          {/* 검색/필터 영역 */}
          <div className='mt-8.75 flex h-30.5 w-250 items-center justify-center gap-2.5'>
            {/* 직무 / 경력 연봉 */}
            <div className='flex h-full w-full flex-col gap-2.5'>
              <Dropdown width={'full'} height={56} title={'직무'} />
              <div className='flex h-14 w-full gap-2'>
                <Dropdown width={'full'} height={'full'} title={'경력'} />
                <Dropdown width={'full'} height={'full'} title={'연봉'} />
              </div>
            </div>

            {/* 기술 스택 검색 / 직원 수 / 지역 */}
            <div className='flex h-full w-full flex-col gap-2.5'>
              <SearchItem type={'stack'} width={'full'} height={56} />
              <div className='flex h-14 w-full gap-2'>
                <Dropdown width={'full'} height={'full'} title={'직원 수'} />
                <Dropdown width={'full'} height={'full'} title={'지역'} />
              </div>
            </div>

            {/* 회사 이름 검색 / 포지션 테마 */}
            <div className='flex h-full w-full flex-col gap-2.5'>
              <SearchItem type={'company'} width={'full'} height={56} />
              <Dropdown width={'full'} height={56} title={'포지션 테마'} />
            </div>
          </div>

          {/* 기업 공고 그리드 */}
          <div className='mt-10.5 flex w-full flex-col items-center'>
            <div className='grid h-139 w-250 grid-cols-2 grid-rows-4'>
              {recruitmentList?.content.map((recruitment) => (
                <JobPost
                  key={recruitment.id}
                  recruitment={recruitment}
                  onClick={() => handleRecruitmentItemClick(recruitment.id)}
                />
              ))}
            </div>
          </div>

          {/* 페이지네이션 */}
          <div className='mt-10'>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeCompany;
