import { DevExperience } from '../../types/dev-experience.types';

interface ResumeExperiencePreviewItemProps {
  id: number;
  selectedExp: number | null;
  handleSelectExpId: (id: number) => void;
  devExperience: DevExperience;
}

function ResumeExperiencePreviewItem(props: ResumeExperiencePreviewItemProps) {
  const { id, selectedExp, handleSelectExpId, devExperience } = props;

  return (
    <button
      type='button'
      className={`${
        selectedExp === id
          ? 'border-[#0043CE] bg-[#EEF6FF]'
          : 'border-[#DFDFDF] bg-white hover:bg-[#F9FAFB]'
      } flex h-23 w-full cursor-pointer items-center justify-between rounded-[10px] border-2 border-solid px-7.5 transition-all duration-300 ease-in-out hover:shadow-sm active:scale-[0.98]`}
      onClick={() => handleSelectExpId(id)}
    >
      {/* 경험 제목 / 설명 */}
      <div className='flex flex-col items-start gap-1.5'>
        <h3 className='text-xl leading-[24.2px] font-semibold text-[#4C4C4C]'>
          {devExperience.title}
        </h3>
        <p className='leading-[19.36px] font-medium text-[#4C4C4C]'>
          {devExperience.description}
        </p>
      </div>

      {/* 선택 되었는지 박스 */}
      <div
        className={`${
          selectedExp === id
            ? 'border-main-blue bg-main-blue'
            : 'border-[#D1D5DA] bg-transparent'
        } h-6 w-6 rounded-full border-2 border-solid transition-all duration-300 ease-in-out`}
      ></div>
    </button>
  );
}

export default ResumeExperiencePreviewItem;
