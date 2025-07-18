import { useEffect, useState } from 'react';
import ResumeExperiencePreviewItem from '../../../components/ResumeExperiencePreviewItem';
import Stepper from '../../../shared/components/Stepper';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchDevExperiences } from '../../../api/dev-experience';
import { motion } from 'framer-motion';

// Step
const STEP = [
  '내 경험 선택',
  '깃허브 연동',
  '기업 선택',
  'AI 이력서 생성',
  'Success',
];

function ResumeExperience() {
  const navigate = useNavigate();

  const [selectedExpId, setSelectedExpId] = useState<number | null>(null); // 선택된 경험

  // 개발 경험 목록 조회 API 호출
  const {
    data: devExperiences = [],
    isLoading: isDevExperiencesLoading,
    isError: isDevExperiencesError,
  } = useQuery({
    queryKey: ['devExperiences'],
    queryFn: fetchDevExperiences,
  });

  // 경험 선택 핸들러
  const handleSelectExpId = (id: number) => {
    setSelectedExpId(id);
  };

  // 다음 단계로 버튼 핸들러
  const handleNextStepButtonClick = () => {
    // 다음 단계로 이동 및 선택된 경험 ID 전달
    navigate('/resume/github', { state: { selectedExpId } });
  };

  // 개발 경험 목록 조회 API 성공 시 실행
  useEffect(() => {
    if (devExperiences.length > 0) {
      console.log('개발 경험 목록 조회 성공', devExperiences);
    }
  }, [devExperiences]);

  // 개발 경험 목록 조회 API 실패 시 실행
  useEffect(() => {
    if (isDevExperiencesError) {
      console.error('개발 경험 목록 조회 실패');
    }
  }, [isDevExperiencesError]);

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
          <Stepper step={STEP} currentStep={1} width={700} />

          {/* 경험 선택 리스트 */}
          <div className='mt-17.5 flex w-210 flex-col rounded-[10px] border-2 border-solid border-[#DFDFDF] bg-white p-9.25'>
            {/* 타이틀 */}
            <h2 className='text-2xl leading-[29.05px] font-bold text-[#111827]'>
              이력서에 포함할 경험을 선택해주세요
            </h2>

            {/* 경험 리스트 */}
            <div className='mt-11 flex w-full flex-col gap-7'>
              {devExperiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.3 }}
                >
                  <ResumeExperiencePreviewItem
                    id={exp.id}
                    selectedExp={selectedExpId}
                    handleSelectExpId={() => handleSelectExpId(exp.id)}
                    devExperience={exp}
                  />
                </motion.div>
              ))}
            </div>

            {/* 다음 단계로 버튼 */}
            <button
              type='button'
              className='bg-main-blue mt-11.75 flex h-15.75 w-full cursor-pointer items-center justify-center rounded-[10px] text-xl font-semibold text-white transition-all duration-300 ease-in-out hover:brightness-90 active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-[#87A1E7]'
              disabled={selectedExpId === null}
              onClick={handleNextStepButtonClick}
            >
              다음 단계로 &gt;
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ResumeExperience;
