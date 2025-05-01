import { ResumeExperience } from '../../api/resume';

interface ResumeProjectItemProps {
  project: ResumeExperience;
}

function ResumeProjectItem(props: ResumeProjectItemProps) {
  const { project } = props;

  return (
    <div className='flex w-full flex-col rounded-[10px] border border-solid border-[#DFDFDF] bg-white px-5.5 pt-6 pb-4.5'>
      {/* 프로젝트 이름 / 포지션 */}
      <span className='text-lg leading-[21.78px] font-semibold text-[#4C4C4C]'>
        {project?.project}
      </span>

      {/* 프로젝트 기간 */}
      <span className='mt-0.5 text-sm leading-[16.94px] font-medium text-[#898989]'>
        {project?.duration}
      </span>

      {/* 프로젝트 한줄 설명 */}
      <span className='mt-3 leading-[19.36px] font-medium text-[#4C4C4C]'>
        {project?.summary}
      </span>

      {/* 프로젝트 기술 스택 */}
      <div className='mt-3.75 flex items-center gap-2'>
        {project?.skills.split(', ').map((skill) => (
          <div
            key={skill}
            className='flex h-5 items-center justify-center rounded-[10px] bg-[#DBE9FE] px-2.5 text-xs leading-[16.34px] font-semibold text-[#1D40AF]'
          >
            {skill}
          </div>
        ))}
      </div>

      {/* 프로젝트 상세 설명 */}
      <div className='mt-3.75 flex flex-col font-medium text-[#4C4C4C]'>
        {project?.description.map((description) => (
          <p className='leading-6'>{description}</p>
        ))}
      </div>
    </div>
  );
}

export default ResumeProjectItem;
