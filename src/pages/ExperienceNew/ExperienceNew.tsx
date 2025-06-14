import { useEffect, useState } from 'react';
import ExperienceItem from '../../shared/components/ExperienceItem';
import ExperienceNewEmptyAlert from '../../shared/components/ExperienceNewEmptyAlert';
import ExperienceCurrentTab from '../../components/ExperienceCurrentTab';
import ExperienceForm from '../../components/ExperienceForm';
import {
  fetchDevExperienceById,
  fetchDevExperiences,
} from '../../api/dev-experience';
import ExperienceItemNew from '../../shared/components/ExperienceItemNew';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

function ExperienceNew() {
  const [selectedExpId, setSelectedExpId] = useState<number | null>(null); // 선택된 경험
  const [currentTab, setCurrentTab] = useState<'project' | 'stack' | 'intern'>(
    'project'
  ); // 현재 탭

  const [showNewExpForm, setShowNewExpForm] = useState<boolean>(false); // 새로운 경험 추가 폼 표시 여부

  // 마운트 시 개발 경험 목록 조회 API 호출
  const {
    data: devExperiences = [],
    isLoading: isDevExperiencesLoading,
    isError: isDevExperiencesError,
    error: devExperiencesError,
  } = useQuery({
    queryKey: ['devExperiences'],
    queryFn: fetchDevExperiences,
  });

  // 경험 선택 시 선택된 경험 상세 조회 API 호출
  const {
    data: selectedDevExperienceDetail,
    isLoading: isDevExperienceDetailLoading,
    isError: isDevExperienceDetailError,
    error: devExerienceDetailError,
  } = useQuery({
    queryKey: ['devExperienceDetail', selectedExpId],
    queryFn: () => {
      if (selectedExpId === null)
        return Promise.reject('선택된 경험이 없습니다.');
      return fetchDevExperienceById(selectedExpId);
    },
    enabled: !!selectedExpId, // selectedExpId가 null이 아닐 때만 API 호출
  });

  // 새로운 경험 추가 버튼 클릭 핸들러
  const handleAddNewItemButtonClick = () => {
    setShowNewExpForm(true);
  };

  // 경험 탭 선택 핸들러
  const handleTabClick = (tab: 'project' | 'stack' | 'intern') => {
    setCurrentTab(tab);
  };

  // 개발 경험 목록 조회 성공 시 실행
  useEffect(() => {
    if (devExperiences.length > 0) {
      console.log('개발 경험 목록 조회 성공', devExperiences);
    }
  }, [devExperiences]);

  // 개발 경험 목록 조회 실패 시 실행
  useEffect(() => {
    if (isDevExperiencesError) {
      console.error('개발 경험 목록 조회 실패', devExperiencesError);
      alert('개발 경험 목록 조회에 실패했습니다. 다시 시도해 주세요.');
    }
  }, [isDevExperiencesError, devExperiencesError]);

  // 선택한 경험 상세 조회 성공 시 실행
  useEffect(() => {
    if (selectedDevExperienceDetail) {
      console.log('선택한 경험 상세 조회 성공', selectedDevExperienceDetail);
    }
  }, [selectedDevExperienceDetail]);

  // 선택한 경험 상세 조회 실패 시 실행
  useEffect(() => {
    if (isDevExperienceDetailError) {
      console.error('선택한 경험 상세 조회 실패', devExerienceDetailError);
      alert('선택한 경험 상세 조회에 실패했습니다. 다시 시도해 주세요.');
    }
  }, [isDevExperienceDetailError, devExerienceDetailError]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className='w-main overflow-hidden'
    >
      <div className='mt-9.5 mb-15.5'>
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
                onClick={handleAddNewItemButtonClick}
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
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M7.5 2.9165V11.0832'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>

                <span className='text-lg font-medium text-[#4C4C4C] transition-all duration-200 group-hover:text-[#2463EB]'>
                  새로운 경험 추가
                </span>
              </button>

              {/* 경험 추가 폼 */}
              {showNewExpForm && (
                <ExperienceItemNew
                  onCancel={() => setShowNewExpForm(false)}
                  setSelectedExpId={setSelectedExpId}
                />
              )}

              {/* 경험 목록 */}
              {devExperiences.length > 0 &&
                devExperiences.map((exp) => (
                  <ExperienceItem
                    key={exp.id}
                    id={exp.id}
                    title={exp.title}
                    description={exp.description}
                    isSelected={selectedExpId === exp.id}
                    onClick={() => setSelectedExpId(exp.id)}
                  />
                ))}
            </div>

            {/* 선택한 경험이 없는 경우 */}
            {!selectedExpId && (
              <>
                {/* 왼쪽에서 경험을 선택하거나 새로 추가해주세요. */}
                <ExperienceNewEmptyAlert />
              </>
            )}

            {/* 선택한 경험이 있는 경우 */}
            {selectedExpId && selectedDevExperienceDetail && (
              <>
                {/* 경험 추가 폼 */}
                <div className='relative flex min-h-179.5 flex-1 flex-col items-center justify-start rounded-tr-[10px] rounded-b-[10px] border-2 border-solid border-[#DFDFDF] bg-white px-10 py-13'>
                  {/* 탭 선택 */}
                  <ExperienceCurrentTab
                    currentTab={currentTab}
                    handleTabClick={handleTabClick}
                  />

                  {/* 내부 폼 */}
                  <ExperienceForm
                    currentTab={currentTab}
                    selectedDevExperienceDetail={selectedDevExperienceDetail}
                    selectedExpId={selectedExpId}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ExperienceNew;
