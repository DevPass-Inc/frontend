import { useState } from 'react';
import ResumeExperiencePreviewItem from '../../../components/ResumeExperiencePreviewItem';
import Stepper from '../../../shared/components/Stepper';

// Step
const STEP = [
  '내 경험 선택',
  '깃허브 연동',
  '기업 선택',
  'AI 이력서 생성',
  'Success',
];

function ResumeExperience() {
  const [selectedExp, setSelectedExp] = useState<number | null>(null); // 선택된 경험

  // 경험 선택 핸들러
  const handleSelectExp = (index: number) => {
    setSelectedExp(index);
  };

  return (
    <div className='w-main overflow-hidden'>
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
              {Array.from({ length: 4 }).map((_, idx) => (
                <ResumeExperiencePreviewItem
                  key={`exp-${idx}`}
                  index={idx}
                  selectedExp={selectedExp}
                  handleSelectExp={() => handleSelectExp(idx)}
                />
              ))}
            </div>

            {/* 다음 단계로 버튼 */}
            <button
              type='button'
              className='bg-main-blue mt-11.75 flex h-15.75 w-full cursor-pointer items-center justify-center rounded-[10px] text-xl font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:bg-[#87A1E7]'
              disabled={selectedExp === null}
            >
              다음 단계로 &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeExperience;
