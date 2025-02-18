import ExperienceInputItem from '../../shared/components/ExperienceInputItem';
import ExperienceSaveOrAddButton from '../../shared/components/ExperienceSaveOrAddButton';

interface ExperienceFormProps {
  currentTab: 'project' | 'stack' | 'intern';
}

const PROJECT_TITLES = [
  '프로젝트명',
  '프로젝트 개요 (간단한 소개)',
  '담당 분야',
  '기간',
  '사용한 기술 스택',
  '구현 내용',
];

const STACK_TITLES = ['기술 스택 추가'];

const INTERN_TITLES = [
  '회사명',
  '직무',
  '기간',
  '사용한 기술 스택',
  '구현 내용',
];

function ExperienceForm(props: ExperienceFormProps) {
  const { currentTab } = props;

  return (
    <>
      {/* 프로젝트 */}
      {currentTab === 'project' && (
        <div className='flex w-full flex-col gap-3.5'>
          {PROJECT_TITLES.map((title, idx) => (
            <ExperienceInputItem key={`${title}-${idx}`} title={title} />
          ))}
        </div>
      )}

      {/* 스택 */}
      {currentTab === 'stack' && (
        <div className='flex w-full flex-col gap-4.5'>
          <div className='flex w-full flex-col gap-3.5'>
            {STACK_TITLES.map((title, idx) => (
              <ExperienceInputItem key={`${title}-${idx}`} title={title} />
            ))}
          </div>
          <div>
            <span className='text-sm leading-4 font-semibold text-[#4c4c4c]'>
              선택된 기술 스택
            </span>
          </div>
        </div>
      )}

      {/* 인턴 */}
      {currentTab === 'intern' && (
        <div className='flex w-full flex-col gap-3.5'>
          {INTERN_TITLES.map((title, idx) => (
            <ExperienceInputItem key={`${title}-${idx}`} title={title} />
          ))}
        </div>
      )}

      {/* 저장 / 프로젝트 추가 버튼 */}
      <div className='mt-20 flex w-full justify-end'>
        <ExperienceSaveOrAddButton title={'저장'} />
      </div>
    </>
  );
}

export default ExperienceForm;
