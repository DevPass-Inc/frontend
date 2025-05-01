import { Resume } from '../../api/resume';
import checkBlueIcon from '/images/svg/icons/check_blue.svg';

interface ResumePreviewItemProps {
  selectedResume: string | null;
  handleSelectResume: (resumeId: string) => void;
  resume: Resume;
}

function ResumePreviewItem(props: ResumePreviewItemProps) {
  const { selectedResume, handleSelectResume, resume } = props;

  return (
    <div
      className={`${selectedResume === resume.id ? 'border-[#3B81F6]' : 'border-[#DFDFDF] hover:bg-cyan-50'} relative flex h-65 w-130 cursor-pointer flex-col items-start overflow-hidden rounded-[10px] border-2 border-solid bg-white px-8 pt-5.75 pb-5 transition-all duration-200`}
      onClick={() => handleSelectResume(resume.id)}
    >
      {/* 체크 아이콘 (선택됨) */}
      {selectedResume === resume.id && (
        <img
          src={checkBlueIcon}
          alt='Selected Resume'
          className='absolute top-7.25 right-6.25 w-4'
        />
      )}

      {/* 이름 & 직무 */}
      <div className='flex flex-col items-start gap-0.5'>
        <h3 className='text-xl leading-[24.2px] font-bold text-[#111827]'>
          {resume.resume.name}
        </h3>
        <p className='leading-6.5 font-medium text-[#4C4C4C]'>
          {resume.resume.title}
        </p>
      </div>

      {/* 프로젝트 */}
      <div className='mt-3 flex flex-col items-start'>
        <h4 className='text-sm leading-6.5 font-semibold text-[#4B5563]'>
          프로젝트
        </h4>
        <p className='text-xs leading-6.5 font-medium text-[#4C4C4C]'>
          {resume.resume.experience[0].project}
        </p>
      </div>

      {/* 보유 기술 */}
      <div className='mt-2.25 flex flex-col items-start'>
        <h4 className='text-sm leading-6.5 font-semibold text-[#4B5563]'>
          보유 기술
        </h4>
        <div className='flex items-center gap-3'>
          {resume.resume.skills.slice(0, 3).map((skill) => (
            <div
              key={skill.skill}
              className='flex h-5 items-center justify-center rounded-[10px] bg-[#DBE9FE] px-2.5 text-xs leading-[16.34px] font-semibold whitespace-nowrap text-[#1D40AF]'
            >
              {skill.skill}
            </div>
          ))}
          {resume.resume.skills.length > 3 && (
            <div className='flex h-5 items-center justify-center rounded-[10px] bg-[#DBE9FE] px-2.5 text-xs leading-[16.34px] font-semibold whitespace-nowrap text-[#1D40AF]'>
              +{resume.resume.skills.length - 3}
              <span className='ml-0.5'> </span>
            </div>
          )}
        </div>
      </div>

      {/* 한줄 설명 */}
      <span className='mt-5 w-full overflow-hidden text-sm leading-6.5 font-medium text-ellipsis whitespace-nowrap'>
        {resume.resume.summary[0]}
      </span>
    </div>
  );
}

export default ResumePreviewItem;
