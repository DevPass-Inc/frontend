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
import { motion } from 'framer-motion';
import { fetchStackList } from '../../../api/dev-experience';
import { Stack } from '../../../types/dev-experience.types';

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
  const [page, setPage] = useState<number>(0); // 페이지
  const [keyword, setKeyword] = useState<string>(''); // 검색어
  const [position, setPosition] = useState<string>(''); // 포지션
  const [stackOptions, setStackOptions] = useState<Stack[]>([]); // 기술 스택
  const [stackInputValue, setStackInputValue] = useState<string>(''); // 기술 스택 입력값
  const [selectedStackId, setSelectedStackId] = useState<number | null>(null); // 선택된 기술 스택 ID
  const [isPositionDropdownOpen, setIsPositionDropdownOpen] =
    useState<boolean>(false); // 포지션 드롭다운 여부
  const [career, setCareer] = useState<string>(''); // 선택된 경력
  const [isCareerDropdownOpen, setIsCareerDropdownOpen] =
    useState<boolean>(false); // 경력 드롭다운 여부
  const [region, setRegion] = useState<string>(''); // 선택된 지역
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] =
    useState<boolean>(false); // 지역 드롭다운 여부

  const [searchKeyword, setSearchKeyword] = useState(''); // 조회에 사용
  const [searchPosition, setSearchPosition] = useState<string>(''); // 조회에 사용
  const [searchStackId, setSearchStackId] = useState<number | null>(null); // 조회에 사용
  const [searchCareer, setSearchCareer] = useState<string>(''); // 조회에 사용
  const [searchRegion, setSearchRegion] = useState<string>(''); // 조회에 사용

  // 채용공고 리스트 조회 API 호출
  const {
    data: recruitmentList,
    isLoading: isRecruitmentListLoading,
    isError: isRecruitmentListError,
  } = useQuery({
    queryKey: [
      'recruitmentList',
      searchKeyword,
      page,
      searchPosition,
      searchCareer,
      searchStackId,
      searchRegion,
    ],
    queryFn: () =>
      fetchRecruitmentList(
        page,
        8,
        'DESC',
        searchKeyword,
        searchPosition,
        searchCareer,
        searchStackId!,
        searchRegion
      ),
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

  // 기술 스택 필터링
  const selectedStack = stackOptions.find(
    (option) => option.id === selectedStackId
  );
  const filteredStackOptions = stackOptions.filter((option) =>
    option.name.toLowerCase().includes(stackInputValue.toLowerCase())
  );

  // 페이지네이션 핸들러
  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  // 조회 버튼 클릭 핸들러
  const handleSearchButtonClick = () => {
    setSearchKeyword(keyword);
    setSearchPosition(position);
    setSearchCareer(career);
    setSearchStackId(selectedStackId);
    setSearchRegion(region);
    setPage(0); // 검색하면 항상 1페이지로 초기화
  };

  // 초기화 버튼 클릭 핸들러
  const handleResetButtonClick = () => {
    setPosition('');
    setCareer('');
    setRegion('');
    setKeyword('');
    setStackInputValue('');
    setSelectedStackId(null);
    setPage(0); // 리셋하면 항상 1페이지로 초기화
  };

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

  useEffect(() => {
    fetchStackList().then((res) => {
      console.log('기술 스택 조회 성공', res);
      setStackOptions(res);
    });
  }, []);

  return (
    <motion.div
      className='w-main overflow-hidden'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
    >
      <div className='mt-8.75 mb-12'>
        <div className='flex flex-col items-center'>
          {/* Step Progress Bar */}
          <Stepper step={STEP} currentStep={3} width={700} />

          {/* 검색/필터 영역 */}
          <div className='mt-8.75 flex h-30.5 w-250 items-center justify-center gap-2.5'>
            {/* 직무 / 경력 연봉 */}
            <div className='flex h-full w-full flex-col gap-2.5'>
              <Dropdown
                width={'full'}
                height={56}
                title={'포지션'}
                selected={position ? position : '포지션'} // 현재 선택값
                onSelect={setPosition} // 값 선택 시 setPosition 실행
                isOpen={isPositionDropdownOpen}
                setIsOpen={setIsPositionDropdownOpen}
              />
              <div className='flex h-14 w-full gap-2'>
                <Dropdown
                  width={'full'}
                  height={56}
                  title={'경력'}
                  selected={career ? `${career}년 이상` : '경력'}
                  onSelect={setCareer}
                  isOpen={isCareerDropdownOpen}
                  setIsOpen={setIsCareerDropdownOpen}
                />

                {/* <Dropdown width={'full'} height={'full'} title={'연봉'} /> */}
              </div>
            </div>

            {/* 기술 스택 검색 / 직원 수 / 지역 */}
            <div className='relative flex h-full w-full flex-col gap-2.5'>
              <div className='relative w-full'>
                <SearchItem
                  type={'stack'}
                  width={'full'}
                  height={56}
                  value={stackInputValue}
                  setStack={setStackInputValue}
                />
                {/* 기술 스택 드롭다운 (입력값 자동완성) */}
                {stackInputValue &&
                  filteredStackOptions.length > 0 &&
                  stackInputValue !== (selectedStack?.name ?? '') && (
                    <div className='absolute top-full left-0 z-10 mt-1 w-full rounded-[5px] bg-white p-2 shadow-lg'>
                      <ul className='flex h-fit max-h-[250px] flex-col gap-1.5 overflow-y-auto'>
                        {filteredStackOptions.map((stack) => (
                          <li
                            key={stack.id}
                            className='cursor-pointer px-3 py-1.5 text-sm font-medium hover:bg-[#F5F5F5]'
                            onClick={() => {
                              setStackInputValue(stack.name);
                              setSelectedStackId(stack.id);
                            }}
                          >
                            {stack.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
              <div className='flex h-14 w-full gap-2'>
                {/* <Dropdown width={'full'} height={'full'} title={'직원 수'} /> */}
                <Dropdown
                  width={'full'}
                  height={'full'}
                  title={'지역'}
                  selected={region ? region : '지역'}
                  onSelect={setRegion}
                  isOpen={isRegionDropdownOpen}
                  setIsOpen={setIsRegionDropdownOpen}
                />
              </div>
            </div>

            {/* 회사 이름 검색 / 포지션 테마 */}
            <div className='flex h-full w-full flex-col gap-2.5'>
              <SearchItem
                type={'company'}
                width={'full'}
                height={56}
                value={keyword}
                setKeyword={setKeyword}
              />
              <div className='flex w-full gap-2'>
                <button
                  type='button'
                  onClick={handleResetButtonClick}
                  className='h-14 flex-1 cursor-pointer rounded-xl border border-gray-300 bg-white px-6 text-base font-semibold text-gray-500 shadow-sm transition-all hover:bg-gray-50 active:scale-95'
                  disabled={isRecruitmentListLoading}
                >
                  초기화
                </button>
                <button
                  type='button'
                  onClick={handleSearchButtonClick}
                  className='h-14 flex-1 cursor-pointer rounded-xl bg-blue-600 px-6 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300'
                  disabled={isRecruitmentListLoading}
                >
                  조회
                </button>
              </div>

              {/* <Dropdown width={'full'} height={56} title={'포지션 테마'} /> */}
            </div>
          </div>

          {/* 기업 공고 그리드 */}
          <div className='mt-10.5 flex w-full flex-col items-center'>
            <div className='grid h-139 w-250 grid-cols-2 grid-rows-4'>
              {recruitmentList?.content.map((recruitment, idx) => (
                <motion.div
                  key={recruitment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <JobPost
                    recruitment={recruitment}
                    onClick={() => handleRecruitmentItemClick(recruitment.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* 페이지네이션 */}
          <div className='mt-10'>
            <Pagination
              currentPage={recruitmentList?.number ?? 0}
              totalPages={recruitmentList?.totalPages ?? 1}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ResumeCompany;
