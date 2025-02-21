import Stepper from '../../../shared/components/Stepper';

// Step
const STEP = [
  '내 경험 선택',
  '깃허브 연동',
  '기업 선택',
  'AI 이력서 생성',
  'Success',
];

function ResumeCompany() {
  return (
    <div className='w-main overflow-hidden'>
      <div className='mt-8.75 mb-12'>
        <div className='flex flex-col items-center'>
          {/* Step Progress Bar */}
          <Stepper step={STEP} currentStep={3} width={700} />
        </div>
      </div>
    </div>
  );
}

export default ResumeCompany;
