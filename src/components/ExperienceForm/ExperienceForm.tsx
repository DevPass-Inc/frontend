import ExperienceInputItem from '../../shared/components/ExperienceInputItem';

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
    </>
  );
}

export default ExperienceForm;
